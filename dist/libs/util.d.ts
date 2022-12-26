export declare class Util {
    /**
     * 是否全角字符
     * @param ch
     * @returns
     */
    static isFullWidthCharacter(ch: string): boolean;
    /**
     * 是否是中文
     * @param str
     * @returns
     */
    static isChinese(str: string): boolean;
    /**
     * 是否是emoji
     * @param str
     * @returns
     */
    static isEmoji(str: string): boolean | 0 | undefined;
    /**
     * UTF8-字符长度[1个汉字或者emoji为2个长度，英文为1个]
     * 仅能准确处理 UTF-16 编码的字符串。如果你需要处理其他编码的字符串，你可能需要使用其他的方法来计算多字节字符的数量
     */
    static mb_strlen(str: string): number;
    /**
     * 数字/字母字符长度
     * @param str
     * @returns
     */
    static strlen(str: string): number;
    /**
     * 将字符串截取为等长的
     * @param str
     * @param start
     * @param length
     * @param encoding
     * @returns str[]
     */
    static mb_string_chunk(str: string, length?: number): string[];
    /**
     * UTF8字符宽度
     * @param str
     * @param encoding
     * @returns
     */
    static mb_strwidth(str: string): number;
}
