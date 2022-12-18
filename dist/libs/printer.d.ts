import { FeiePrinterItem } from "./types";
import { FeieHttp } from "./base";
/**
 * 飞鹅打印机
 */
export declare class FeiePrinter {
    private http;
    constructor(http: FeieHttp);
    /**
     * 添加打印机
     */
    add(...printers: FeiePrinterItem[]): Promise<{
        success: string[];
        failed: string[];
    }>;
    /**
     * 移除打印机
     */
    remove(sn: string): Promise<{
        success: string[];
        failed: string[];
    }>;
    /**
    * 修改打印机
    */
    modify(printer: Pick<FeiePrinterItem, 'sn' | 'remark' | 'simno'>): Promise<boolean | null>;
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
    queryPrinterStatus(sn: string): Promise<string | null>;
    /**
     * 根据打印返回的订单ID查询是否打印成功
     * @param orderId 提交打印时根据sn返回的编码
     * @returns 打印返回true,未打印返回false。
     */
    queryOrderPrintState(orderId: string): Promise<boolean>;
}
