import { HASH_KEY } from '@config/constant';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class SyncInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<any>> {
    const request = context.switchToHttp().getRequest();
    const key = HASH_KEY + new Date().getTime();
    const encodedData = Buffer.from(key).toString('base64');
    request.headers['authorization'] = encodedData;
    return next.handle();
  }
}
