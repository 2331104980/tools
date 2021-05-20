/**
 * 验证码模块
 */
import { Module } from '@nestjs/common';
import { RPCClientController } from './rpc.controller';
import { RPCClientService } from '../../service/rpc.service';
@Module({
    controllers: [RPCClientController],
    providers: [RPCClientService]
})
export class RPCClientModule {
    //
}
