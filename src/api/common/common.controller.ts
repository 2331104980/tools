import { Controller } from "@nestjs/common";


@Controller('/common')
export class CommonController {
    /**
     * 生成随机字符串
     * @param length 随机字符串长度
     */
    randomString(length: number): string {
        return '';
    }

}