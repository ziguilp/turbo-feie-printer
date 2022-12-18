/*
 * @Author        : turbo 664120459@qq.com
 * @Date          : 2022-12-18 19:23:34
 * @LastEditors   : turbo 664120459@qq.com
 * @LastEditTime  : 2022-12-18 20:21:37
 * @FilePath      : /turbo-feie-printer/index.ts
 * @Description   : 
 * 
 * Copyright (c) 2022 by turbo 664120459@qq.com, All Rights Reserved. 
 */
import { Feie } from "./dist";
import { FeieTemplate } from "./dist/libs/template";


// orderInfo = "<CB>测试打印</CB><BR>";//标题字体如需居中放大,就需要用标签套上
// orderInfo += "名称　　　　　 单价  数量 金额<BR>";
// orderInfo += "--------------------------------<BR>";
// orderInfo += "番　　　　　　 1.0    1   1.0<BR>";
// orderInfo += "番茄　　　　　 10.0   10  10.0<BR>";
// orderInfo += "番茄炒　　　　 10.0   100 100.0<BR>";
// orderInfo += "番茄炒粉　　　 100.0  100 100.0<BR>";
// orderInfo += "番茄炒粉粉　　 1000.0 1   100.0<BR>";
// orderInfo += "番茄炒粉粉粉粉 100.0  100 100.0<BR>";
// orderInfo += "番茄炒粉粉粉粉 15.0   1   15.0<BR>";
// orderInfo += "备注：快点送到xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<BR>";
// orderInfo += "--------------------------------<BR>";
// orderInfo += "合计：xx.0元<BR>";
// orderInfo += "送货地点：xxxxxxxxxxxxxxxxx<BR>";
// orderInfo += "联系电话：138000000000<BR>";
// orderInfo += "订餐时间：2011-01-06 19:30:10<BR><BR>";
// orderInfo += "----------请扫描二维码----------";
// orderInfo += "<QR>http://www.dzist.com</QR>";//把二维码字符串用标签套上即可自动生成二维码

const feie = new Feie('jia', '1231231')


const printer = feie.getPrinterManger()

// 添加打印机
printer.add({
    sn: 'd111231111',
    key: '12345678',
    remark: '厨房',
    simno: '621000000000000'
})

// 移除打印机
printer.remove('d111231111')

// 修改
printer.modify({
    sn: 'd111231111',
    remark: '厨房',
    simno: '621000000000000'
})

// 查询打印机状态
printer.queryPrinterStatus('d111231111')


// 查询订单打印状态
printer.queryOrderPrintState('816501678_20160919184316_1419533539')

// 打印
const tmp = feie.getTemplateManager()
tmp.addText(FeieTemplate.textCenterAndBigger("示例"))
    .addText(FeieTemplate.textRightAlign(`#2号店`))
    .addText('名称　　　　　 单价  数量 金额')
    .addText('番　　　　　　 1.0    1   1.0')
    .addText('番茄　　　　　 1.0    1   1.0')
    .addText('番茄炒　　　　 1.0    1   1.0')
    .addText('番茄炒粉　　　 1.0    1   1.0')
    .addText('番茄炒粉　　　 100.0    1   100.0')
    .addText('--------------------------------')
    .addText(`合计：xx.0元`)
    .addText('--------------------------------')
    .addText(`地址：xxxxxxxxxxxxxxxxx`)
    .addText(`联系电话：138000000000`)
    .addText(`时间：2011-01-06 19:30:10`)
    .textBr()
    .addText('----------请扫描二维码----------')
    .qrcode('https://baidu.com')
    .printLogo()
    .cutPaper()
    .doPrint()

console.log(tmp.getPrintContent())