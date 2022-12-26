/*
 * @Author        : turbo 664120459@qq.com
 * @Date          : 2022-12-18 16:12:13
 * @LastEditors   : turbo 664120459@qq.com
 * @LastEditTime  : 2022-12-25 18:01:10
 * @FilePath      : /turbo-feie-printer/src/libs/printer.ts
 * @Description   : 
 * 
 * Copyright (c) 2022 by turbo 664120459@qq.com, All Rights Reserved. 
 */
import { FeiePrinterItem, FeieResponse } from "./types";
import { FeieHttp } from "./base";


/**
 * 飞鹅打印机
 */
export class FeiePrinter {

    private http: FeieHttp;

    constructor(http: FeieHttp) {
        this.http = http
    }

    /**
     * 添加打印机
     */
    async add(...printers: FeiePrinterItem[]) {

        if (printers.length < 1) {
            throw new Error(`请填写打印机参数`)
        }

        if (printers.length > 100) {
            throw new Error(`最多添加100台`)
        }

        let snlist: string[] = printers.map((printer) => {
            return `${printer.sn}#${printer.key}#${printer.remark || ''}#${printer.simno || ''}`
        })

        const data = {
            apiname: "Open_printerAddlist",
            printerContent: snlist.join("\n")
        }


        const res: FeieResponse<{
            ok: string[]
            no: string[]
        }> = await this.http.request(data)


        return {
            success: res.data?.ok || [],
            failed: res.data?.no || [],
        }
    }

    /**
     * 移除打印机
     */
    async remove(sn: string) {
        const data = {
            apiname: "Open_printerDelList",
            snlist: sn
        }

        const res: FeieResponse<{
            ok: string[]
            no: string[]
        }> = await this.http.request(data)

        return {
            success: res.data?.ok || [],
            failed: res.data?.no || [],
        }
    }

    /**
    * 修改打印机
    */
    async modify(printer: Pick<FeiePrinterItem, 'sn' | 'remark' | 'simno'>) {

        const data = {
            apiname: "Open_printerEdit",
            sn: printer.sn,
            name: printer.remark || '',
            phonenum: printer.simno || ''
        }

        const res: FeieResponse<boolean> = await this.http.request(data)

        return res.data
    }

    /**
     * 查询打印机状态
     * @param sn 打印机底部的序列号
     * @return 返回打印机状态信息，
     * 官方文档：返回打印机状态信息。共三种：
        1、离线。
        2、在线，工作状态正常。
        3、在线，工作状态不正常。
        备注：异常一般是无纸，离线的判断是打印机与服务器失去联系超过2分钟。
     */
    async queryPrinterStatus(sn: string) {

        const data = {
            apiname: "Open_queryPrinterStatus",//不需要修改
            sn: sn//打印机编号
        }

        const res: FeieResponse<string> = await this.http.request(data)

        return res.data
    }

    /**
     * 根据打印返回的订单ID查询是否打印成功
     * @param orderId 提交打印时根据sn返回的编码
     * @returns 打印返回true,未打印返回false。
     */
    async queryOrderPrintState(orderId: string) {
        const data = {
            apiname: "Open_queryPrinterStatus",//不需要修改
            orderid: orderId,
        }

        const res: FeieResponse<boolean> = await this.http.request(data)

        return res.data || false
    }

    /**
     * 解析打印机背部的二维码
     * @param str
     */
    parseQrCode(str: string) {
        const r = str.split(":")
        return {
            sn: r && r[0],
            key: r && r[1]
        }
    }
}