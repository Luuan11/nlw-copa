import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';
import { idParamSchema } from '../lib/schemas';

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/:id/games', {
    onRequest: [authenticate],
  }, async (request) => {
    const { id } = idParamSchema.parse(request.params);

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'desc',
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId: request.user.sub,
              poolId: id,
            },
          },
          select: {
            id: true,
            firstTeamPoints: true,
            secondTeamPoints: true,
            createdAt: true,
          },
        },
      },
    });

    return {
      games: games.map((game: any) => ({
        ...game,
        guess: game.guesses[0] ?? null,
        guesses: undefined,
      })),
    };
  });
}
