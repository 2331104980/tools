// import { Injectable } from "@nestjs/common";
import * as mysql from 'mysql';
// @Injectable()
export class MysqlService {
    private static pools = {

    }
    private createPool(host: string, user: string, password: string, port: Number, database: string, connectionLimit: Number, supportBigNumbers: boolean = true, bigNumberStrings: boolean = true): any {
        try {
            const pool = mysql.createPool({
                host,
                user,
                password,
                port,
                database,
                connectionLimit,
                supportBigNumbers,
                bigNumberStrings
            });
            return pool;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    public execSql(host: string, user: string, password: string, port: Number, database: string, connectionLimit: Number, supportBigNumbers: boolean = true, bigNumberStrings: boolean = true, sql: string, params: any) {
        let key = `${host}_${port}_${user}_${password}_${database}`;
        let pool = MysqlService.pools[key];
        if (!pool) {
            pool = this.createPool(host, user, password, port, database, connectionLimit, supportBigNumbers, bigNumberStrings);
            MysqlService.pools[key] = pool;
        }
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, data) => {
                if (err) {
                    throw err;
                }
                else {
                    resolve(data)
                }
            })
        });
    }
}