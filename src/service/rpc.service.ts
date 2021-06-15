'use strict';
import * as path from 'path';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { Injectable } from '@nestjs/common';
import { resolve } from 'path';


@Injectable()
export class RPCClientService {
    /**
     * RPC 客户端测试工具
     * @param host 
     * @param packagename 
     * @param serverName 
     * @param methodName 
     * @param params 
     * @param PROTO_PATH proto下的文件名称
     * @returns 
     */
    async request(host, packagename, serverName, methodName, params, protoPath): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log()
            const PROTO_PATH = path.join(__dirname, `../../../protos/${protoPath}`)
            const packageDefinition = protoLoader.loadSync(
                PROTO_PATH,
                {
                    keepCase: true,
                    longs: String,
                    enums: String,
                    defaults: true,
                    oneofs: true
                }
            );
            const nodeauth_proto = grpc.loadPackageDefinition(packageDefinition)[packagename]//['nodeauth'];

            // 调用 Greeter 的存根构造函数，指定服务器地址和端口。
            const client = new nodeauth_proto[serverName](host, grpc.credentials.createInsecure());

            // 构造调用服务的方法：使用事件或者回调函数去获得结果
            function log(error, response) {
                if (error) {
                    console.log(error);
                    // return;
                    resolve(null);
                } else {
                    resolve(response)
                }
                // console.log('response: ', response)
            }
            client[methodName](params, log);//{"name": 'locy', city: '上海'}
        });
    }
}


// const serverName = `NodeAuthSrv`;
// const host = '192.168.20.66:42129';
// const methodName = `VerifyTicket`;
// const params = { "nation": '62', "mobile": '', 'email': "1621308835136@wanelink.net", "ticket": "U80XjMJ0KAewORWT9SdANfq22X2wvCRNCEgb6ocPd3hFjHUOl6pigBs1lUvBnYMA5DQFDSrQxwVXdQc6jTVB1g" };


// request(host, serverName, methodName, params)
