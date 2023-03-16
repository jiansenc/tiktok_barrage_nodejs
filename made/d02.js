const wsurl = "ws://127.0.0.1:9527"
var ws = new WebSocket(wsurl);
var observer = null
var chatObserverrom = null
var timer = null
const timeinterval = 10 * 1000 // 断线重连轮询间隔
var propsId = Object.keys(document.querySelector('.webcast-chatroom___list'))[1]
console.log(propsId)
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
                let dom = mutation.addedNodes[0]
                let user = dom[propsId].children.props.message.payload.user
                let msg = {
                    user_id: user.id,
                    user_nickName: user.nickname,
                    user_avatar: user.avatarThumb.urlList[0],
                    msg_content: `${user.nickname} 来了`
                }
                ws.send(JSON.stringify({ action: 'join', message: msg }));
            }
        }
    });
    observer.observe(roomJoinDom, { childList: true });

    chatObserverrom = new MutationObserver(function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                let b = mutation.addedNodes[0]
                if (b[propsId].children.props.message) {
                    let message = utils.messageParse(b)
                    if (message) {
                        ws.send(JSON.stringify({ action: 'message', message: message }));
                    }
                }
            }
        }
    });
    chatObserverrom.observe(chatDom, { childList: true });
}


var utils = {}

utils.messageParse = function(dom) {
    if (!dom[propsId].children.props.message) {
        return null
    }
    let msg = dom[propsId].children.props.message.payload
    let result = {
        gift_id: null,
        gift_name: null,
        gift_number: null,
        gift_image: null,
        gift_diamondCount: null,
        gift_describe: null,
        user_nickName: msg.user.nickname,
        user_id: msg.user.id,
        user_gender: msg.user.gender === 1 ? '男' : '女',
        user_level: msg.user.level,
        user_levelImage: msg.user.badgeImageListList[0] && msg.user.badgeImageListList[0].urlListList[0],
        user_avatar: msg.user.avatarThumb.urlListList[0],
        user_isAdmin: msg.user.userAttr.isAdmin,
        user_fansLevel: msg.user.badgeImageListV2List[0] && parseInt(msg.user.badgeImageListV2List[0].content.level),
        user_fansLightName: msg.user.badgeImageListV2List[0] && msg.user.badgeImageListV2List[0].content.alternativeText,
    }
    switch (msg.common.method) {
        case 'WebcastGiftMessage':
            result = Object.assign(result, {
                msg_content: msg.common.describe,
                isGift: true,
                gift_id: msg.gift.id,
                gift_name: msg.gift.name,
                gift_number: parseInt(msg.comboCount),
                gift_image: msg.gift.icon.urlListList[0],
                gift_diamondCount: msg.gift.diamondCount,
                gift_describe: msg.gift.describe,
            })
            break
        case 'WebcastChatMessage':
            result = Object.assign(result, {
                isGift: false,
                msg_content: msg.content
            })
            break
        default:
            result = Object.assign(result, {
                isGift: false,
                msg_content: msg.content
            })
            break
    }
    return result
}

function setObject(obj) {
    let b = obj || {}
    if (!b.urlListList) {
        b.urlListList = [{}]
    }
    if (!b.content) {
        b.content = {}
    }
    return b
}

// 礼物ID