import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RedisService } from '../../service/redis.service'
@Controller('redis')
export class RedisController {

    @Inject()
    private readonly redis: RedisService;
    @Post('/get')
    async get(@Body() body: any) {
        console.log(new Date())
        //连接需要优化
        const { host, port, password, key, db = 0 } = body;
        const client = this.redis.createClient(port * 1, host, { db, password });
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
        const client = this.redis.createClient(port, host, { db, password });
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

    /**
     * 设置key的过期时间
     * @param body 
     */
    @Post('/expire')
    async expire(@Body() body: any) {
        const { host, port, password, key, value, db } = body;
        const client = this.redis.createClient(port, host, { db, password });
        return new Promise((resolve, reject) => {
            client.expire(key, value, (err, reply) => {
                if (err) {
                    throw err
                }
                else {
                    resolve(reply.toString())
                }
            })
        });

    }

    //hget
    @Post('/hget')
    async hget(@Body() body: any) {
        //todo 
        const { host, port, password, key, field, db } = body;
        const client = this.redis.createClient(port, host, { db, password });
        return new Promise((resolve, reject) => {
            client.hget(key, field, (err, data) => {
                if (err) {
                    resolve(null)
                }
                else {
                    resolve(data)
                }

            });
        });
    }

    //hset
    @Post('/hset')
    async hset(@Body() body: any) {
        //todo
        const { host, port, password, key, field, value, db } = body;
        const client = this.redis.createClient(port, host, { db, password });
        return new Promise((resolve, reject) => {
            client.hset(key, field, value, (err, reply) => {
                console.log(err)
                resolve(1);
            });
        });
    }

    //hgetall
    @Post('/hgetall')
    async hgetall(@Body() body: any) {
        const { host, port, password, key, db } = body;
        const client = this.redis.createClient(port, host, { db, password });
        //todo
        return new Promise((resolve, reject) => {
            client.hgetall(key, (err, data) => {
                if (err) {
                    resolve(null)
                }
                else {
                    resolve(data)
                }

            });
        });
    }

    //sadd
    @Post('/sadd')
    async sadd(@Body() body: any) {
        const { host, port, password, key, array, db } = body;
        const client = this.redis.createClient(port, host, { db, password });
        //todo
        return new Promise((resolve, reject) => {
            client.sadd(key, array, function (err, data) {
                resolve(data)
            })
        });
    }

    //smembers
    @Post('/smembers')
    async smembers(@Body() body: any) {
        const { host, port, password, key, db } = body;
        const client = this.redis.createClient(port, host, { db, password });
        //todo
        return new Promise((resolve, reject) => {
            client.smembers(key, (err, data) => {
                if (err) {
                    console.log(err)
                }
                resolve(data)
            })
        });
    }
}