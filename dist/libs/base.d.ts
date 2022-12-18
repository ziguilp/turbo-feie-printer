import { FeieResponse } from "./types";
/**
 * 飞鹅打印机
 */
export declare class FeieHttp {
    /**
     * 接口主机
     */
    private host;
    /**
     * 接口账户
     */
    private user;
    /**
    * 接口账户KEY
    */
    private ukey;
    constructor(user: string, key: string);
    request(data?: any): Promise<FeieResponse<any>>;
}
