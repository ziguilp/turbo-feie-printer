"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeieTemplate = void 0;
/**
 * 飞鹅打印机
 */
var FeieTemplate = /** @class */ (function () {
    function FeieTemplate(http) {
        /**
         * 打印内容
         */
        this.content = '';
        /**
         * 被选择的打印机
         */
        this.snlist = [];
        this.http = http;
    }
    /**
     * 清空打印内容
     */
    FeieTemplate.prototype.clear = function () {
        this.content = '';
        return this;
    };
    /**
     * 清空所选打印机
     */
    FeieTemplate.prototype.resetPrinters = function () {
        this.snlist = [];
        return this;
    };
    /**
     * 添加换行指令
     */
    FeieTemplate.prototype.textBr = function () {
        this.content += "<BR>";
        return this;
    };
    /**
     * 添加切纸指令
     */
    FeieTemplate.prototype.cutPaper = function () {
        this.content += "<CUT>";
        return this;
    };
    /**
    * 添加打印LOGO指令
    * (前提是预先在机器内置LOGO图片)
    */
    FeieTemplate.prototype.printLogo = function () {
        this.content += "<LOGO>";
        return this;
    };
    /**
     * 添加语音播报退单指令
     */
    FeieTemplate.prototype.audioRefund = function () {
        this.content += "<AUDIO-REFUND>";
        return this;
    };
    /**
     * 添加语音播报申请取消订单指令
     */
    FeieTemplate.prototype.audioCancel = function () {
        this.content += "<AUDIO-CANCEL>";
        return this;
    };
    /**
    * 添加二维码
    */
    FeieTemplate.prototype.qrcode = function (text) {
        this.content += "<QR>".concat(text, "</QR>");
        return this;
    };
    /**
     * 添加条形码:数字字母混合条形码,最多支持14位数字大写字母混合
     */
    FeieTemplate.prototype.barcodeA = function (text) {
        this.content += "<BC128_A>".concat(text, "</BC128_A>");
        return this;
    };
    /**
     * 添加条形码:最多支持22位纯数字
     */
    FeieTemplate.prototype.barcodeC = function (text) {
        this.content += "<BC128_C>".concat(text, "</BC128_C>");
        return this;
    };
    /**
    * 文本居中放大一倍
    */
    FeieTemplate.textCenterAndBigger = function (text) {
        return "<CB>".concat(text, "</CB>");
    };
    /**
    * 文本居中
    */
    FeieTemplate.textCenter = function (text) {
        return "<C>".concat(text, "</C>");
    };
    /**
    * 文本放大一倍
    */
    FeieTemplate.textBigger = function (text) {
        return "<B>".concat(text, "</B>");
    };
    /**
    * 文本变高一倍
    */
    FeieTemplate.textHigher = function (text) {
        return "<L>".concat(text, "</L>");
    };
    /**
    * 文本变宽一倍
    */
    FeieTemplate.textWidder = function (text) {
        return "<W>".concat(text, "</W>");
    };
    /**
    * 文本加粗
    */
    FeieTemplate.textBolder = function (text) {
        return "<BOLD>".concat(text, "</BOLD>");
    };
    /**
     * 文本右对齐
     */
    FeieTemplate.textRightAlign = function (text) {
        return "<RIGHT>".concat(text, "</RIGHT>");
    };
    /**
     * @param text 添加文本内容
     * @autoBr 自动添加换行符号
     */
    FeieTemplate.prototype.addText = function (content, autoBr) {
        if (autoBr === void 0) { autoBr = true; }
        this.content += "".concat(content).concat(autoBr ? '<BR>' : '');
        return this;
    };
    /**
     * 选择打印机
     * @returns
     */
    FeieTemplate.prototype.setPrinter = function () {
        var snlist = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            snlist[_i] = arguments[_i];
        }
        this.snlist = Array.from(new Set(snlist));
        if (this.snlist.length > 10) {
            throw new Error("\u8D85\u51FA\u53EF\u6253\u5370\u673A\u5668\u6570\u91CF");
        }
        return this;
    };
    FeieTemplate.prototype.getPrintContent = function () {
        return this.content;
    };
    /**
     * 开始打印
     * @param printConf
     */
    FeieTemplate.prototype.doPrint = function (printConf) {
        if (printConf === void 0) { printConf = {
            printTimes: 1,
            backurl: '',
        }; }
        return __awaiter(this, void 0, void 0, function () {
            var success, failed, printeTimes, index, sn, data, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        success = {};
                        failed = {};
                        printeTimes = String(printConf.printTimes);
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < this.snlist.length)) return [3 /*break*/, 6];
                        sn = this.snlist[index];
                        data = {
                            apiname: "Open_printMsg",
                            sn: sn,
                            content: this.content,
                            times: printeTimes
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.http.request(data)];
                    case 3:
                        res = _a.sent();
                        success[sn] = res.data || '';
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        failed[sn] = error_1.message;
                        return [3 /*break*/, 5];
                    case 5:
                        index++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, {
                            success: success,
                            failed: failed
                        }];
                }
            });
        });
    };
    return FeieTemplate;
}());
exports.FeieTemplate = FeieTemplate;
//# sourceMappingURL=template.js.map