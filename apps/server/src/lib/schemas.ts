import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export const codeSchema = z.object({
  code: z.string().length(6).toUpperCase(),
});

export const poolSchema = z.object({
  title: z.string().min(1),
});

export const guessParamsSchema = z.object({
  poolId: z.string().uuid(),
  gameId: z.string().uuid(),
});

export const guessBodySchema = z.object({
  firstTeamPoints: z.number().int().min(0),
  secondTeamPoints: z.number().int().min(0),
});

export const accessTokenSchema = z.object({
  access_token: z.string(),
});
