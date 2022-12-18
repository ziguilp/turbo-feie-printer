/**
 * 飞鹅打印机
 */
export interface FeieResponse<T> {
    msg: string;
    ret: number;
    data: T | null;
    serverExecutedTime?: number;
}
export interface FeiePrinterItem {
    /**
     * 打印机底部序列号
     */
    sn: string;
    /**
     * 打印机识别码
     */
    key: string;
    /**
     * 流量卡编码
     */
    simno?: string;
    /**
     * 打印机名称
     */
    remark?: string;
}
/**
 * 打印参数
 */
export interface FeiePrinterConf {
    /**
     * 打印次数,默认1
     */
    printTimes?: number;
    /**
     * 订单失效UNIX时间戳，10位，精确到秒，打印时超过该时间该订单将抛弃不打印，
     * 取值范围为：当前时间<订单失效时间≤24小时后。
     */
    expired?: number;
    /**
     * 必须先在管理后台设置，回调数据格式详见《订单状态回调》
     */
    backurl?: string;
}
