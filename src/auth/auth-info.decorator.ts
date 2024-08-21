import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthInfo = createParamDecorator(
  (_, ctx: ExecutionContext): { id: number; email: string } =>
    ctx.switchToHttp().getRequest().auth,
);

export type AuthInfo = { id: number; email: string };
