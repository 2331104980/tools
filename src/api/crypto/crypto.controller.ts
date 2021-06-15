import { Body, Controller, Get, Post } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import config from '../../../config/index.config';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) { }


  @Post('/desencrypto')
  async desEncrypto(@Body() body: any) {
    const { algorithm, key, iv, text } = body;
    let sign = this.cryptoService.desEncrypt(algorithm, key, iv, text);
    return { sign }
  }

  @Post('/desdecrypt')
  async desDecrypt(@Body() body: any) {
    const { algorithm, text, key, iv } = body;
    let des = this.cryptoService.desDecrypt(algorithm, text, key, iv);
    return des;
  }

}
