import { Body, Controller, Get, Post } from '@nestjs/common';
// import { RPCClientService } from '../service/rpc.service';
import * as redis from 'redis';

@Controller('redis')
export class RedisController {

    @Post('/get')
    async get(@Body() body: any) {
        //连接需要优化
        const { host, port, password, key, db = 0 } = body;
        const client = redis.createClient(port * 1, host, { db });
        client.on("error", function (error) {
            console.error(error);
        });
        client.auth(password, function () {
            console.log('redis auth pass');
        });
        return new Promise((resolve, reject) => {
            client.get(key, function (err, data) {
                if (err) {
                    throw err
                }
                else {

                    resolve(data)
                }
            });
        });
    }

    @Post('/set')
    async set(@Body() body: any) {
        //连接需要优化
        const { host, port, password, key, value, db } = body;
        const client = redis.createClient(port, host, { db });
        client.on("error", function (error) {
            console.error(error);
        });
        client.auth(password, function () {
            console.log('redis auth pass');
        });
        return new Promise((resolve, reject) => {
            client.set(key, value, function (err, reply) {
                if (err) {
                    throw err
                }
                else {
                    resolve(reply.toString())
                }
            });
        });
    }
}