
import { RedisController } from './redis.controller';
import { Module } from '@nestjs/common';
import { RedisService } from '../../service/redis.service'
@Module({
    controllers: [RedisController],
    providers: [RedisService]
})
export class RedisModule {
    //
}