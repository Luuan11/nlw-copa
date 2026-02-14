import { FastifyInstance, FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { env } from '../lib/env';

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError, _request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error',
        errors: error.flatten().fieldErrors,
      });
    }

    if (error.statusCode === 401) {
      return reply.status(401).send({
        message: 'Unauthorized',
      });
    }

    if (env.NODE_ENV === 'development') {
      console.error(error);
    } else {
      app.log.error(error);
    }

    return reply.status(error.statusCode || 500).send({
      message: error.message || 'Internal server error',
    });
  });
}
