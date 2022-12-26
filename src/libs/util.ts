/*
 * @Author        : turbo 664120459@qq.com
 * @Date          : 2022-12-26 08:01:05
 * @LastEditors   : turbo 664120459@qq.com
 * @LastEditTime  : 2022-12-26 11:17:16
 * @FilePath      : /turbo-feie-printer/src/libs/util.ts
 * @Description   : 
 * 
 * Copyright (c) 2022 by turbo 664120459@qq.com, All Rights Reserved. 
 */
export class Util {


    /**
     * 是否全角字符
     * @param ch 
     * @returns 
     */
    static isFullWidthCharacter(ch: string) {
        const charCode = ch.charCodeAt(0);
        return (charCode >= 0x3000 && charCode <= 0x9fff) || (charCode >= 0xff01 && charCode <= 0xff5e);
    }

    /**
     * 是否是中文
     * @param str 
     * @returns 
     */
    static isChinese(str: string) {
        const charCode = str.charCodeAt(0);
        return charCode >= 0x4e00 && charCode <= 0x9fff;
    }

    /**
     * 是否是emoji
     * @param str 
     * @returns 
     */
    static isEmoji(str: string) {
        const codePoint = str.codePointAt(0);
        return codePoint && codePoint >= 0x1f000 && codePoint <= 0x1f9ff;
    }

    /**
     * UTF8-字符长度[1个汉字或者emoji为2个长度，英文为1个]
     * 仅能准确处理 UTF-16 编码的字符串。如果你需要处理其他编码的字符串，你可能需要使用其他的方法来计算多字节字符的数量
     */
    static mb_strlen(str: string): number {
        return str.split('').reduce((p, c) => {
            p += Util.isChinese(c) || Util.isFullWidthCharacter(c) || Util.isEmoji(c) ? 2 : 1
            return p
        }, 0)
    }

    /**
     * 数字/字母字符长度
     * @param str 
     * @returns 
     */
    static strlen(str: string): number {
        return str.length
    }

    /**
     * 将字符串截取为等长的
     * @param str 
     * @param start 
     * @param length 
     * @param encoding 
     * @returns str[]
     */
    static mb_string_chunk(str: string, length: number = 1): string[] {
        let res = [], si = 0, width = length - 1;
        for (let i = 0; i < str.length + 1; i++) {
            const s = str.substring(si, i);
            const l = Util.mb_strlen(s)
            if (l >= width || i == str.length) {
                si = i
                res.push(s + ''.padEnd(length - l, ' '))
            }
        }
        return res;
    }

    /**
     * UTF8字符宽度
     * @param str 
     * @param encoding 
     * @returns 
     */
    static mb_strwidth(str: string): number {
        let width = 0;
        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i);
            // 如果字符的 Unicode 编码值在 0x0000 到 0x007f 之间，则该字符由一个字节组成，宽度为 1
            if (charCode >= 0x0000 && charCode <= 0x007f) {
                width += 1;
            }
            // 如果字符的 Unicode 编码值在 0x0080 到 0x07ff 之间，则该字符由两个字节组成，宽度为 1
            else if (charCode >= 0x0080 && charCode <= 0x07ff) {
                width += 1;
            }
            // 如果字符的 Unicode 编码值在 0x0800 到 0xffff 之间，则该字符由三个字节组成，宽度为 1
            else if (charCode >= 0x0800 && charCode <= 0xffff) {
                width += 1;
            }
            // 如果字符的 Unicode 编码值在 0x10000 到 0x10ffff 之间，则该字符由四个字节组成，宽度为 2
            else if (charCode >= 0x10000 && charCode <= 0x10ffff) {
                width += 2;
            }
        }
        return width;
    }
}