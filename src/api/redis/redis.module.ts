
import { RedisController } from './redis.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [RedisController],
    providers: []
})
export class RedisModule {
    //
}