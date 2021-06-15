import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '../../config/index.config';
// import { ApolloClient } from '../core/apollo.client'
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  console.log(config)
  // const apolloClinet: ApolloClient = ApolloClient.getApolloClient();
  const dirPath = path.join(__dirname, './apolloConfig');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
  //http://pc.vanelink:8080/4001/default/json.json
  // let url = `http://pc.vanelink:8080/configs/4001/default/json.json`;
  let url = `http://uatmeta.dcfx-internal.com:8080/configs/service.auth.verifyCode/default/dcfx.json`;
  // await apolloClinet.start(url, config, { timeout: 10000, dirPath })
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    console.log('app listen 3000 port');
  });

}
bootstrap();

//
