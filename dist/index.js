"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feie = void 0;
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
var base_1 = require("./libs/base");
var printer_1 = require("./libs/printer");
var template_1 = require("./libs/template");
/**
 * 飞鹅打印机
 */
var Feie = /** @class */ (function () {
    function Feie(user, key) {
        this.http = new base_1.FeieHttp(user, key);
    }
    /**
     * 打印机
     * @returns
     */
    Feie.prototype.getPrinterManger = function () {
        return new printer_1.FeiePrinter(this.http);
    };
    /**
     * 打印
     * @returns
     */
    Feie.prototype.getTemplateManager = function () {
        return new template_1.FeieTemplate(this.http);
    };
    return Feie;
}());
exports.Feie = Feie;
//# sourceMappingURL=index.js.map