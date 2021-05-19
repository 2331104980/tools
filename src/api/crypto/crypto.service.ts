import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'
@Injectable()
export class CryptoService {
  desEncrypt(algorithm, key, iv, text): string {
    if (!text || !key || !iv || iv.length < 8) {
      return '';
    }
    iv = iv.substring(0, 8);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const str = cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
    return str;
  }
}
