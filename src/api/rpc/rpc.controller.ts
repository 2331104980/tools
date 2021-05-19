import { Body, Controller, Get, Post } from '@nestjs/common';
import { RPCClientService } from '../service/rpc.service';

@Controller('rpc')
export class RPCClientController {
    constructor(private readonly rPCClientService: RPCClientService) { }

    @Post('/request')
    async desEncrypto(@Body() body: any) {
        const { host, packagename, serverName, methodName, params, protoPath } = body;
        let result = await this.rPCClientService.request(host, packagename, serverName, methodName, params, protoPath);
        return { result }
    }
}
