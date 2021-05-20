import { Injectable } from "@nestjs/common";
import * as redis from 'redis';

@Injectable()
export class RedisService {
    private pools = {

    }
    //建立连接
    //todo 使用连接pool
    createClient(port, host, config: any): any {
        let key = `${host}_${port}_${config.db}`;
        if (this.pools[key]) {
            return this.pools[key]
        }
        const client = redis.createClient(port, host, { db: config.db });
        client.on("error", function (error) {
            client.disconnect()
            console.error(error);
        });
        if (config.password) {
            client.auth(config.password, function () {
                console.log('redis auth pass');
            });
        }
        this.pools[key] = client;
        return client;
    }


}