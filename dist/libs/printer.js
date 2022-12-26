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
exports.FeiePrinter = void 0;
/**
 * 飞鹅打印机
 */
var FeiePrinter = /** @class */ (function () {
    function FeiePrinter(http) {
        this.http = http;
    }
    /**
     * 添加打印机
     */
    FeiePrinter.prototype.add = function () {
        var _a, _b;
        var printers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            printers[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var snlist, data, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (printers.length < 1) {
                            throw new Error("\u8BF7\u586B\u5199\u6253\u5370\u673A\u53C2\u6570");
                        }
                        if (printers.length > 100) {
                            throw new Error("\u6700\u591A\u6DFB\u52A0100\u53F0");
                        }
                        snlist = printers.map(function (printer) {
                            return "".concat(printer.sn, "#").concat(printer.key, "#").concat(printer.remark || '', "#").concat(printer.simno || '');
                        });
                        data = {
                            apiname: "Open_printerAddlist",
                            printerContent: snlist.join("\n")
                        };
                        return [4 /*yield*/, this.http.request(data)];
                    case 1:
                        res = _c.sent();
                        return [2 /*return*/, {
                                success: ((_a = res.data) === null || _a === void 0 ? void 0 : _a.ok) || [],
                                failed: ((_b = res.data) === null || _b === void 0 ? void 0 : _b.no) || [],
                            }];
                }
            });
        });
    };
    /**
     * 移除打印机
     */
    FeiePrinter.prototype.remove = function (sn) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var data, res;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        data = {
                            apiname: "Open_printerDelList",
                            snlist: sn
                        };
                        return [4 /*yield*/, this.http.request(data)];
                    case 1:
                        res = _c.sent();
                        return [2 /*return*/, {
                                success: ((_a = res.data) === null || _a === void 0 ? void 0 : _a.ok) || [],
                                failed: ((_b = res.data) === null || _b === void 0 ? void 0 : _b.no) || [],
                            }];
                }
            });
        });
    };
    /**
    * 修改打印机
    */
    FeiePrinter.prototype.modify = function (printer) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            apiname: "Open_printerEdit",
                            sn: printer.sn,
                            name: printer.remark || '',
                            phonenum: printer.simno || ''
                        };
                        return [4 /*yield*/, this.http.request(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
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
    FeiePrinter.prototype.queryPrinterStatus = function (sn) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            apiname: "Open_queryPrinterStatus",
                            sn: sn //打印机编号
                        };
                        return [4 /*yield*/, this.http.request(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * 查询打印机的订单数
     * @param sn
     * @param date 查询日期，格式YY-MM-DD，如：2016-09-20
     * @returns
     */
    FeiePrinter.prototype.queryPrinterOrderNumByDate = function (sn, date) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            apiname: "Open_queryOrderInfoByDate",
                            sn: sn,
                            date: date
                        };
                        return [4 /*yield*/, this.http.request(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    /**
     * 根据打印返回的订单ID查询是否打印成功
     * @param orderId 提交打印时根据sn返回的编码
     * @returns 打印返回true,未打印返回false。
     */
    FeiePrinter.prototype.queryOrderPrintState = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            apiname: "Open_queryOrderState",
                            orderid: orderId,
                        };
                        return [4 /*yield*/, this.http.request(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data || false];
                }
            });
        });
    };
    /**
     * 清空待打印的订单
     * @param sn
     * @returns 打印返回true,未打印返回false。
     */
    FeiePrinter.prototype.flushUnPrintedOrder = function (sn) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            apiname: "Open_delPrinterSqs",
                            sn: sn,
                        };
                        return [4 /*yield*/, this.http.request(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data || false];
                }
            });
        });
    };
    /**
     * 解析打印机背部的二维码
     * @param str
     */
    FeiePrinter.prototype.parseQrCode = function (str) {
        var r = str.split(":");
        return {
            sn: r && r[0],
            key: r && r[1]
        };
    };
    return FeiePrinter;
}());
exports.FeiePrinter = FeiePrinter;
//# sourceMappingURL=printer.js.map