import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import * as IORedis from 'ioredis';
import { Observable, throwError } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class AppRedisService {
  constructor(@InjectRedis() private readonly redis: IORedis.Redis) {}

  async createIdempotencyKey(
    requestType: string,
    data: any,
    callback: () => Promise<any> | Observable<any>,
    expiry?: number,
  ) {
    const prekey = this.createDataHash(data);
    const key = `idempotency:${requestType}:${prekey}`;
    const exists = await this.redis.exists(key);

    if (exists) {
      return throwError(() => {
        return;
      });
    }
    const timeout = expiry ? expiry : 60 * 60 * 24;
    await this.redis.set(key, '1', 'EX', timeout);
    return callback();
  }

  private createDataHash(data: any): string {
    const sha256 = crypto.createHash('sha256');
    const jsonStr = JSON.stringify(data);
    sha256.update(jsonStr);
    return sha256.digest('hex');
  }
}
