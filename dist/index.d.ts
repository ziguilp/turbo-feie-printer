import { FeiePrinter } from "./libs/printer";
import { FeieTemplate } from "./libs/template";
/**
 * 飞鹅打印机
 */
export declare class Feie {
    private http;
    constructor(user: string, key: string);
    /**
     * 打印机
     * @returns
     */
    getPrinterManger(): FeiePrinter;
    /**
     * 打印
     * @returns
     */
    getTemplateManager(): FeieTemplate;
}
