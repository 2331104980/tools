import { Body, Controller, Get, Post } from '@nestjs/common';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) { }

  @Post('/desencrypto')
  async desEncrypto(@Body() body: any) {
    const { algorithm, key, iv, text } = body;
    let sign = this.cryptoService.desEncrypt(algorithm, key, iv, text);
    return { sign }
  }



}