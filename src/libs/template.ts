/*
 * @Author        : turbo 664120459@qq.com
 * @Date          : 2022-12-18 16:12:13
 * @LastEditors   : turbo 664120459@qq.com
 * @LastEditTime  : 2022-12-26 11:34:49
 * @FilePath      : /turbo-feie-printer/src/libs/template.ts
 * @Description   : 
 * 
 * Copyright (c) 2022 by turbo 664120459@qq.com, All Rights Reserved. 
 */
import { FeiePrinterConf, FeieResponse, OrderRow } from "./types";
import { FeieHttp } from "./base";
import { Util } from "./util";


/**
 * 飞鹅打印机
 */
export class FeieTemplate {

    /**
     * 打印内容
     */
    private content = '';

    private http: FeieHttp;

    /**
     * 被选择的打印机
     */
    private snlist: string[] = [];

    constructor(http: FeieHttp) {
        this.http = http
    }

    /**
     * 清空打印内容
     */
    clear() {
        this.content = '';
        return this;
    }

    /**
     * 清空所选打印机
     */
    resetPrinters() {
        this.snlist = [];
        return this;
    }

    /**
     * 添加换行指令
     */
    textBr() {
        this.content += `<BR>`
        return this
    }

    /**
     * 添加切纸指令
     */
    cutPaper() {
        this.content += `<CUT>`
        return this
    }

    /**
    * 添加打印LOGO指令
    * (前提是预先在机器内置LOGO图片)
    */
    printLogo() {
        this.content += `<LOGO>`
        return this
    }

    /**
     * 添加语音播报退单指令
     */
    audioRefund() {
        this.content += `<AUDIO-REFUND>`
        return this
    }

    /**
     * 添加语音播报申请取消订单指令
     */
    audioCancel() {
        this.content += `<AUDIO-CANCEL>`
        return this
    }

    /**
    * 添加二维码
    */
    qrcode(text: string) {
        this.content += `<QR>${text}</QR>`
        return this
    }

    /**
     * 添加条形码:数字字母混合条形码,最多支持14位数字大写字母混合
     */
    barcodeA(text: string) {
        this.content += `<BC128_A>${text}</BC128_A>`
        return this
    }

    /**
     * 添加条形码:最多支持22位纯数字
     */
    barcodeC(text: string) {
        this.content += `<BC128_C>${text}</BC128_C>`
        return this
    }

    /**
    * 文本居中放大一倍
    */
    static textCenterAndBigger(text: string) {
        return `<CB>${text}</CB>`
    }

    /**
    * 文本居中
    */
    static textCenter(text: string) {
        return `<C>${text}</C>`
    }

    /**
    * 文本放大一倍
    */
    static textBigger(text: string) {
        return `<B>${text}</B>`
    }

    /**
    * 文本变高一倍
    */
    static textHigher(text: string) {
        return `<L>${text}</L>`
    }

    /**
    * 文本变宽一倍
    */
    static textWidder(text: string) {
        return `<W>${text}</W>`
    }

    /**
    * 文本加粗
    */
    static textBolder(text: string) {
        return `<BOLD>${text}</BOLD>`
    }

    /**
     * 文本右对齐
     */
    static textRightAlign(text: string) {
        return `<RIGHT>${text}</RIGHT>`
    }




    /**
     * 订单行格式化
     * 58mm的机器,一行打印16个汉字,32个字母;80mm的机器,一行打印24个汉字,48个字母
     * @param orderRow
     * @param titleLength 品名字符长度 58mm的机器建议14个字符[7个汉字]
     * @param priceLength 单价字符长度 58mm的机器建议6个字符 
     * @param numLength 数量字符长度 58mm的机器建议3个字符 
     * @param amountLength 金额字符长度 58mm的机器建议6个字符 
     * @param 
     * @returns 
     */
    static orderRowFormat(orderRow: OrderRow, {
        titleLength = 14,
        priceLength = 6,
        numLength = 3,
        amountLength = 6
    } = {}) {
        let name = orderRow.title,
            price = String(orderRow.price).padEnd(priceLength, ' '),
            num = String(orderRow.goodsNum).padEnd(numLength, ' '),
            prices = String(orderRow.amount).padEnd(amountLength, ' ');

        const lan = Util.mb_strlen(name)

        if (lan <= titleLength) {
            name += ''.padEnd(titleLength - lan, ' ')
            return `${name} ${price} ${num} ${prices}<BR>`
        }

        // 超长的字符串要进行多段截取
        return (Util.mb_string_chunk(name, titleLength).reduce((p, c, i) => {
            if (i == 0) {
                p.push(`${c} ${price} ${num} ${prices}`)
            } else {
                p.push(`${c}`)
            }
            return p
        }, [] as any)).join("<BR>") + '<BR>'

    }

    /**
     * 订单行格式化
     * 58mm的机器,一行打印16个汉字,32个字母;80mm的机器,一行打印24个汉字,48个字母
     * @param orderRow
     * @param titleLength 品名字符长度 58mm的机器建议14个字符[7个汉字]
     * @param priceLength 单价字符长度 58mm的机器建议6个字符 
     * @param numLength 数量字符长度 58mm的机器建议3个字符 
     * @param amountLength 金额字符长度 58mm的机器建议6个字符 
     * @param 
     * @returns 
     */
    static orderRowsFormat(orderRows: OrderRow[], {
        titleLength = 14,
        priceLength = 6,
        numLength = 3,
        amountLength = 6
    } = {}) {
        return orderRows.reduce((p, c, i) => {
            return p += FeieTemplate.orderRowFormat(c, {
                titleLength,
                priceLength,
                numLength,
                amountLength
            })
        }, '')
    }

    /**
     * @param text 添加文本内容
     * @autoBr 自动添加换行符号 
     */
    addText(content: string, autoBr: boolean = true) {
        this.content += `${content}${autoBr ? '<BR>' : ''}`
        return this
    }


    /**
     * 选择打印机
     * @returns 
     */
    setPrinter(...snlist: string[]) {
        this.snlist = Array.from(new Set(snlist))
        if (this.snlist.length > 10) {
            throw new Error(`超出可打印机器数量`)
        }
        return this
    }

    getPrintContent() {
        return this.content
    }

    /**
     * 开始打印
     * @param printConf  
     */
    async doPrint(printConf: FeiePrinterConf = {
        printTimes: 1,
        backurl: '',
    }) {

        let success: Record<string, string> = {};
        let failed: Record<string, string> = {};
        const printeTimes = String(printConf.printTimes)

        for (let index = 0; index < this.snlist.length; index++) {

            const sn = this.snlist[index];

            const data = {
                apiname: "Open_printMsg",//不需要修改
                sn,//打印机编号
                content: this.content,//打印内容
                times: printeTimes
            }

            try {
                const res: FeieResponse<string> = await this.http.request(data)
                success[sn] = res.data || ''
            } catch (error: any) {
                failed[sn] = error.message
            }

        }

        return {
            success,
            failed
        }
    }


}