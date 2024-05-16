import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { decode } from 'jsonwebtoken';

export const GetUserId = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].replace('Bearer ', '');

    const payload = decode(token);
    return payload;
  },
);
