const wsurl = "ws://127.0.0.1:9527"
var ws = new WebSocket(wsurl);
var observer = null
var chatObserverrom = null
var timer = null
const timeinterval = 10 * 1000 // 断线重连轮询间隔


const chatDom = document.querySelector('.webcast-chatroom___items').children[0]
const roomJoinDom = document.querySelector('.webcast-chatroom___bottom-message')


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
                    let fansinfo = utils.getFansLight(msg.childNodes[0])
                    let user = msg.childNodes[1].innerText.replace("：", '')
                    let text = msg.childNodes[2].innerText
                    ws.send(JSON.stringify({ action: 'message', user: user, message: text, fansinfo: fansinfo }));
                }
            }
        }
    });
    chatObserverrom.observe(chatDom, { childList: true });
}


var utils = {}

// 获取粉丝灯牌和等比
/**
 * // 获取dom image
 * @param {*} dom 
 * @returns {
 *  lightName: 粉丝灯牌,
 *  userLevel:用户等级,
 *  fansLevel:粉丝灯牌等级
 * }
 */
utils.getFansLight = function(dom) {
    let result = {}
    dom.childNodes.forEach(item => {
        result.lightName = item.innerText
        let images = item.querySelectorAll('img')
        images.forEach((img, i) => {
            // 用户等级
            if (i === 0) {
                result.userLevel = img.currentSrc
            }
            // 用户粉丝等级
            if (i === 1) {
                result.fansLevel = img.currentSrc
            }
        })
    })
    return result
}

utils.getGiftInfo = function(dom) {
    let result = {}
    let giftImage = dom.querySelector('img')
    result.gift = giftImage.currentSrc
    if (giftImage) {
        result.num = giftImage.nextSibling.childNodes[1].data
    }
    return result
}