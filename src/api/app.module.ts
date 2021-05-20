import { Module } from '@nestjs/common';
import { CryptoController } from './crypto/crypto.controller';
import { CryptoService } from './crypto/crypto.service';
import { RPCClientModule } from './rpc/rpc.module';
import { RedisModule } from './redis/redis.module';
import { MysqlModule } from './mysql/mysql.module'
@Module({
  imports: [RPCClientModule, RedisModule, MysqlModule],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class AppModule {
  //
}
