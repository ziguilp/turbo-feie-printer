import { FeiePrinterConf } from "./types";
import { FeieHttp } from "./base";
/**
 * 飞鹅打印机
 */
export declare class FeieTemplate {
    /**
     * 打印内容
     */
    private content;
    private http;
    /**
     * 被选择的打印机
     */
    private snlist;
    constructor(http: FeieHttp);
    /**
     * 清空打印内容
     */
    clear(): this;
    /**
     * 清空所选打印机
     */
    resetPrinters(): this;
    /**
     * 添加换行指令
     */
    textBr(): this;
    /**
     * 添加切纸指令
     */
    cutPaper(): this;
    /**
    * 添加打印LOGO指令
    * (前提是预先在机器内置LOGO图片)
    */
    printLogo(): this;
    /**
     * 添加语音播报退单指令
     */
    audioRefund(): this;
    /**
     * 添加语音播报申请取消订单指令
     */
    audioCancel(): this;
    /**
    * 添加二维码
    */
    qrcode(text: string): this;
    /**
     * 添加条形码:数字字母混合条形码,最多支持14位数字大写字母混合
     */
    barcodeA(text: string): this;
    /**
     * 添加条形码:最多支持22位纯数字
     */
    barcodeC(text: string): this;
    /**
    * 文本居中放大一倍
    */
    static textCenterAndBigger(text: string): string;
    /**
    * 文本居中
    */
    static textCenter(text: string): string;
    /**
    * 文本放大一倍
    */
    static textBigger(text: string): string;
    /**
    * 文本变高一倍
    */
    static textHigher(text: string): string;
    /**
    * 文本变宽一倍
    */
    static textWidder(text: string): string;
    /**
    * 文本加粗
    */
    static textBolder(text: string): string;
    /**
     * 文本右对齐
     */
    static textRightAlign(text: string): string;
    /**
     * @param text 添加文本内容
     * @autoBr 自动添加换行符号
     */
    addText(content: string, autoBr?: boolean): this;
    /**
     * 选择打印机
     * @returns
     */
    setPrinter(...snlist: string[]): this;
    getPrintContent(): string;
    /**
     * 开始打印
     * @param printConf
     */
    doPrint(printConf?: FeiePrinterConf): Promise<{
        success: Record<string, string>;
        failed: Record<string, string>;
    }>;
}
