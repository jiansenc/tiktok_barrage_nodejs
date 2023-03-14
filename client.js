const wsurl = "ws://127.0.0.1:9527"
var ws = new WebSocket(wsurl);
var observer = null
var chatObserverrom = null
var timer = null
const timeinterval = 10 * 1000 // 断线重连轮询间隔

/**
 * 初始化 DOM 
 * chatDom 聊天文字DOM
 * roomJoinDom 粉丝进入
 */
const chatDom = document.querySelector('.webcast-chatroom___items').children[0]
const roomJoinDom = document.querySelector('.webcast-chatroom___bottom-message')


/**
 * WebSocket 脚本执行完后等待 后台nodejs 服务器启动, 如果一直断开时每10秒轮询一次 服务器状态
 */
ws.onclose = function() {
    console.log('服务器断开')
    if (timer !== null) {
        return
    }
    observer && observer.disconnect();
    chatObserverrom && chatObserverrom.disconnect();
    timer = setInterval(() => {
        console.log('正在等待服务器启动..')
        ws = new WebSocket(wsurl);
        console.log('状态 ->', ws.readyState)
        setTimeout(() => {
            if (ws.readyState === 1) {
                openWs()
            }
        }, 2000)

    }, timeinterval)
}
ws.onopen = function() {
    openWs()
}

function openWs() {
    console.log('连接成功')
    clearInterval(timer)
    init()
}

function init() {

    observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                let obj = mutation.addedNodes[0]
                let user = obj.children[0]
                let userNick = user.childNodes[1].innerText
                ws.send(JSON.stringify({ action: 'join', message: userNick }));
            }
        }
    });
    observer.observe(roomJoinDom, { childList: true });

    chatObserverrom = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                let obj = mutation.addedNodes[0]
                let msg = obj.children[0]
                if (msg) {
                    let mesgobj = utils.messageParse(msg)
                    ws.send(JSON.stringify({ action: 'message', message: mesgobj }));
                }
            }
        }
    });
    chatObserverrom.observe(chatDom, { childList: true });
}


var utils = {}

utils.messageParse = function(dom) {
    let nodes = dom.childNodes
    const result = {}
    nodes.forEach((el, index) => {
        switch (index) {
            case 0: // 用户信息
                let userinfo_image = el.querySelectorAll('img')
                let len = userinfo_image.length // 0 啥也没有 1 没有粉丝灯牌, 2 有粉丝灯牌, 3管理员
                    // 管理员
                if (userinfo_image.length === 3) {
                    userinfo_image[0] = userinfo_image[1]
                    result.admin = true
                }
                // 用户等级
                if (userinfo_image[0]) {
                    result.userLevelSrc = userinfo_image[0].src
                    result.userLevel = utils.getLevel(userinfo_image[0].src)
                }
                if (userinfo_image[1]) {
                    result.fansLevelSrc = userinfo_image[1].src
                    result.fansLevel = utils.getLevel(userinfo_image[1].src)
                    result.fansLightName = el.childNodes[0].innerText
                }
                break
            case 1: // 昵称
                result.userNick = el.childNodes[0].data
                break
            case 2: // 内容
                let clen = el.childNodes.length // 1 礼物
                let msgitem = el.childNodes[0]
                result.message = msgitem.outerText

                if (msgitem.children.length) {
                    let gift = msgitem.querySelector('img')
                    result.isGift = true
                    result.giftUrl = gift.src

                    // 将礼物图片转换成名称, 需要补充
                    result.giftId = utils.getGiftId(gift.src)
                        // 修改礼物消息 
                    result.message = result.message.replace('×', result.giftId + ' ×')

                    // 礼物数量
                    if (gift.nextSibling) {
                        result.giftNum = gift.nextSibling.childNodes[1].data
                    }
                }
                break
        }
    })
    return result
}

utils.getLevel = function(str) {
    if (!str) return 0
    return str.substring(str.lastIndexOf('_') + 1, str.indexOf('.png'))
}

utils.getGiftId = function(str) {
    if (!str) return ''
    let id = str.substring(str.lastIndexOf('/') + 1, str.indexOf('~'))
    return GIFT_IDS_ENUM[id] || '礼物'
}



// 礼物哈希值
const GIFT_IDS_ENUM = {
    '0ea40b8376ef8157791b928a339ed9c9': '小心心',
    '898bc8988a737b909e952854747c8f7e': '玫瑰',
    'a29d6cdc0abb7286fdd403915196eaa7': '鲜花',
    'bd4ad62dfcc021fda39080166bcbd698': '跑车',
    'cadd229a47b7fad58ba021c7d4638516': '棒棒糖',
    'a24b3cc863742fd4bc3de0f53dac4487': '啤酒',
    'eee04e798ad7f08c9faf577f52e258f9': '墨镜',
    '722e56b42551d6490e5ebd9521287c67': '粉丝灯牌',
    '802a21ae29f9fae5abe3693de9f874bd': '抖币',
    '53b3b0e512c62bd1eb4ea9df9bf38cf7': '520',
}
