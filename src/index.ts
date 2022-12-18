/*
 * @Author        : turbo 664120459@qq.com
 * @Date          : 2022-12-17 08:41:40
 * @LastEditors   : turbo 664120459@qq.com
 * @LastEditTime  : 2022-12-18 19:27:47
 * @FilePath      : /turbo-feie-printer/src/index.ts
 * @Description   : 
 * 
 * Copyright (c) 2022 by turbo 664120459@qq.com, All Rights Reserved. 
 */
import { FeieHttp } from "./libs/base";
import { FeiePrinter } from "./libs/printer";
import { FeieTemplate } from "./libs/template";


/**
 * 飞鹅打印机
 */
export class Feie {

    private http: FeieHttp;

    constructor(user: string, key: string) {
        this.http = new FeieHttp(user, key)
    }

    /**
     * 打印机
     * @returns 
     */
    getPrinterManger() {
        return new FeiePrinter(this.http)
    }

    /**
     * 打印
     * @returns 
     */
    getTemplateManager() {
        return new FeieTemplate(this.http)
    }
} 