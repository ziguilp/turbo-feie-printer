/*
 * @Author        : turbo 664120459@qq.com
 * @Date          : 2022-12-18 19:23:34
 * @LastEditors   : turbo 664120459@qq.com
 * @LastEditTime  : 2022-12-26 12:11:10
 * @FilePath      : /turbo-feie-printer/index.ts
 * @Description   : 
 * 
 * Copyright (c) 2022 by turbo 664120459@qq.com, All Rights Reserved. 
 */
import { Feie } from "./dist";
import { FeieTemplate } from "./dist/libs/template";


const user = '********';
const ukey = '********';

const feie = new Feie(user, ukey);

const printer = feie.getPrinterManger()

const { sn, key } = printer.parseQrCode('1234567:7yet221')

// 添加打印机
printer.add({
    sn: sn,
    key: key,
    remark: '厨房',
    simno: ''
}).then((res) => {
    console.log(`添加打印机`, res)
})
// // 移除打印机
// printer.remove('d111231111')

// // 修改
// printer.modify({
//     sn: 'd111231111',
//     remark: '厨房',
//     simno: '621000000000000'
// })

// 查询打印机状态
printer.queryPrinterStatus(sn).then((p) => {
    console.log(`打印机状态：`, p)
})

// 解析飞鹅打印机背后的二维码得到sn和key
// console.log(printer.parseQrCode('9211011283821:sdisi218281'))



// 查询订单打印状态
// printer.queryOrderPrintState('816501678_20160919184316_1419533539')


// 清空待打印
// printer.flushUnPrintedOrder('816501678')

// 查询打印订单
printer.queryPrinterOrderNumByDate('816501678', '2022-12-26')

// 打印58mm宽的纸
const goods = [
    {
        title: "番茄炒粉",
        price: 1200,
        goodsNum: 1,
        amount: 1200
    },
    {
        title: "西红柿炒鸡蛋",
        price: 1200,
        goodsNum: 1,
        amount: 1200
    },
    {
        title: "西红柿炒鸡蛋(500g装)",
        price: 1200,
        goodsNum: 1,
        amount: 1200
    },
    {
        title: "西红柿炒鸡蛋(1500g装)",
        price: 3500,
        goodsNum: 3,
        amount: 10500
    },
    {
        title: "老北京乡土走地鸡(1500g装)",
        price: 3500,
        goodsNum: 3,
        amount: 10500
    },
    {
        title: "日本进口雪花和牛(3kg装)",
        price: 35000,
        goodsNum: 3,
        amount: 105000
    },
    {
        title: "日本进口😄雪花和牛(3kg装)",
        price: 35000,
        goodsNum: 3,
        amount: 105000
    },
    {
        title: "YSL井口装2023元旦纪念版",
        price: 350.00,
        goodsNum: 3,
        amount: 1050.00
    },
    {
        title: "戴尔（DELL）成就3690商用办公台式电脑家用迷你单主机【i5-11400 16G 512G固态 定制】",
        price: 3450.00,
        goodsNum: 1,
        amount: 3450.00
    },
    {
        title: 'ThinkPad 联想ThinkBook16+ 22款12代英特尔酷睿处理器 16英寸笔记本电脑 i5-12500H 16G Xe显卡 01CD',
        price: 5629.00,
        goodsNum: 1,
        amount: 5629.00
    }
]



const tmp = feie.getTemplateManager()
tmp.addText(FeieTemplate.textCenterAndBigger("1# 新订单"))
    .addText(FeieTemplate.textRightAlign(`#2号店`))
    .barcodeC('2022120000120001234567')//订单号
    .textBr()
    .textBr()
    .addText('名称           单价  数量 金额')
    .addText('--------------------------------')
    .addText(FeieTemplate.orderRowsFormat(goods, {
        titleLength: 14,
        priceLength: 6,
        numLength: 3,
        amountLength: 6
    }))
    .addText('--------------------------------')
    .addText(`合计：xx.0元`)
    .addText('--------------------------------')
    .addText(`收货人：王大锤`)
    .addText(`地址：xxxxxxxxxxxxxxxxx`)
    .addText(`联系电话：138000000000`)
    .addText(`时间：2022-12-25 19:30:10`)
    .addText(`备注：多家点辣椒`)
    .textBr()
    .addText('------请扫描二维码关注我们------')
    .textBr()
    .qrcode('https://baidu.com')
    .printLogo()
    .setPrinter(sn)
    .cutPaper()
    .doPrint().then(res => {
        console.log(`打印成功`, res)
    })
console.log(tmp.getPrintContent().replace(/\<BR\>/g, '\n'))

