import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';
import { idParamSchema, codeSchema, poolSchema } from '../lib/schemas';
import { generatePoolCode } from '../lib/utils';

const poolInclude = {
  _count: {
    select: {
      participants: true,
    },
  },
  participants: {
    select: {
      id: true,
      user: {
        select: {
          avatarUrl: true,
        },
      },
    },
    take: 4,
  },
  owner: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  fastify.post('/pools', async (request, reply) => {
    const { title } = poolSchema.parse(request.body);
    const code = generatePoolCode();

    try {
      await request.jwtVerify();

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,
          participants: {
            create: {
              userId: request.user.sub,
            },
          },
        },
      });
    } catch {
      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });
    }

    return reply.status(201).send({ code });
  });

  fastify.post('/pools/join', {
    onRequest: [authenticate],
  }, async (request, reply) => {
    const { code } = codeSchema.parse(request.body);

    const pool = await prisma.pool.findUnique({
      where: { code },
      select: {
        id: true,
        ownerId: true,
        participants: {
          where: { userId: request.user.sub },
          select: { id: true },
        },
      },
    });

    if (!pool) {
      return reply.status(404).send({
        message: 'Pool not found.',
      });
    }

    if (pool.participants.length > 0) {
      return reply.status(400).send({
        message: 'You have already joined this pool.',
      });
    }

    if (!pool.ownerId) {
      await prisma.pool.update({
        where: {
          id: pool.id,
        },
        data: {
          ownerId: request.user.sub,
        }
      })
    }

    await prisma.participant.create({
      data: {
        poolId: pool.id,
        userId: request.user.sub,
      }
    })

    return reply.status(201).send()
  })

  fastify.get('/pools', {
    onRequest: [authenticate],
  }, async (request) => {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub,
          },
        },
      },
      include: poolInclude,
    });

    return { pools };
  });

  fastify.get('/pools/:id', {
    onRequest: [authenticate],
  }, async (request) => {
    const { id } = idParamSchema.parse(request.params);

    const pool = await prisma.pool.findUnique({
      where: { id },
      include: poolInclude,
    });

    return { pool };
  });
}
