<!--
 * @Author        : turbo 664120459@qq.com
 * @Date          : 2022-12-18 19:29:30
 * @LastEditors   : turbo 664120459@qq.com
 * @LastEditTime  : 2022-12-18 20:56:07
 * @FilePath      : /turbo-feie-printer/README.md
 * @Description   : 
 * 
 * Copyright (c) 2022 by turbo 664120459@qq.com, All Rights Reserved. 
-->
## 飞鹅打印机SDK --- 手上没有打印机，未经验证
根据飞鹅开放平台放出的文档简单处理，[原文档传送门](http://help.feieyun.com/document.php)


---
### 使用文档

```
yarn add turbo-feie-printer
```

``` Typescript
import { Feie } from 'turbo-feie-printer';
import { FeieTemplate } from 'turbo-feie-printer/dist/libs/template';

const feie = new Feie('test', '1231231')
 

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
```