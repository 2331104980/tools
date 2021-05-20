import { Body, Controller, Inject, Post } from "@nestjs/common";
import { MysqlService } from '../../service/mysql.service';

@Controller('mysql')
export class MysqlController {
    @Inject()
    private readonly mysqlService: MysqlService;
    @Post('/query')
    public async query(@Body() body: any) {
        //host: string, user: string, password: string, port: Number, database: string, connectionLimit: Number, supportBigNumbers: boolean = true, bigNumberStrings: boolean = true, sql: string, params: any
        const { host, user, password, port, database, connectionLimit, supportBigNumbers, bigNumberStrings, sql, params } = body;
        let data = await this.mysqlService.execSql(host, user, password, port, database, connectionLimit, supportBigNumbers, bigNumberStrings, sql, params);
        return data;
    }
}


