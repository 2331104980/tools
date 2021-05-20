import { Module } from "@nestjs/common";
import { MysqlController } from './mysql.controller';
import { MysqlService } from '../../service/mysql.service';

@Module({
    providers: [MysqlService],
    controllers: [MysqlController]
})
export class MysqlModule {

}