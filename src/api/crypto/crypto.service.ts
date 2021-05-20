import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto'
@Injectable()
export class CryptoService {
  /**
   * des 加密
   * @param algorithm 
   * @param key 
   * @param iv 
   * @param text 
   * @param inputEncoding 
   * @param outputEncoding 
   * @returns 
   */
  desEncrypt(algorithm: string, key: string, iv: string, text: string, inputEncoding: string = 'utf8', outputEncoding: string = 'base64'): string {
    if (!text || !key || !iv || iv.length < 8) {
      return '';
    }
    iv = iv.substring(0, 8);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const str = cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
    return str;
  }
  /**
   * des解密
   * @param algorithm 
   * @param text 
   * @param key 
   * @param iv 
   * @param inputEncoding 
   * @param outputEncoding 
   * @returns 
   */
  desDecrypt(algorithm: string, text: string, key: string, iv: string, inputEncoding: any = 'base64', outputEncoding: any = 'utf8') {
    if (!text || !key || !iv || iv.length < 8) {
      return '';
    }
    iv = iv.substring(0, 8);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const str = decipher.update(text, inputEncoding, outputEncoding) + decipher.final(outputEncoding);
    return str;
  }
}
