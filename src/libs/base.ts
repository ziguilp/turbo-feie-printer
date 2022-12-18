import http, { AxiosResponse } from "axios";
import qs from "qs";
import crypto from "crypto";
import { FeieResponse } from "./types";


/**
 * 飞鹅打印机
 */
export class FeieHttp {

    /**
     * 接口主机
     */
    private host = 'https://api.feieyun.cn/Api/Open/';

    /**
     * 接口账户
     */
    private user: string = '';

    /**
    * 接口账户KEY
    */
    private ukey: string = '';


    constructor(user: string, key: string) {
        this.user = user
        this.ukey = key
    }

    async request(data: any = {}) {

        const stime = Math.floor(new Date().getTime() / 1000);//请求时间,当前时间的秒数	

        const sign = crypto.createHash('sha1').update(this.user + this.ukey + String(stime)).digest('hex');//获取签名

        const post_data = Object.assign(data, {
            user: this.user,//账号
            stime,//当前时间的秒数，请求时间
            sig: sign,//签名
        });

        const res: AxiosResponse<FeieResponse<any>> = await http.request({
            url: this.host,
            method: 'POST',
            data: qs.stringify(post_data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        }).catch((error) => {
            console.error(error)
            throw new Error(`飞鹅打印机: ${error.message}`)
        })

        if (res.data.ret === 0) {
            return res.data
        } else {
            throw new Error(`飞鹅打印机: ${res.data.msg || JSON.stringify(res.data)}`)
        }
    }
} 