import { WebSocketServer } from "ws";
const wss = new WebSocketServer({
    port: 9527,
});


/**
 * {
    "userLevelSrc": "https://p6-webcast.douyinpic.com/img/webcast/user_grade_level_v5_38.png~tplv-obj.image",
    "userLevel": "38",
    "fansLevelSrc": "https://p6-webcast.douyinpic.com/img/webcast/fansclub_level_v6_10.png~tplv-obj.image",
    "fansLevel": "10",
    "fansLightName": "琳琳7",
    "userNick": "wjunkop",
    "message": "送出了 粉丝灯牌 × 1",
    "isGift": true,
    "giftUrl": "https://p3-webcast.douyinpic.com/img/webcast/722e56b42551d6490e5ebd9521287c67~tplv-obj.png",
    "giftId": "粉丝灯牌",
    "giftNum": "1"
}
 */
wss.on("connection", function connection(ws) {
    console.log("客户端连接成功");
    ws.on("message", function message(data) {
        let message = JSON.parse(data.toString())
        switch (message.action) {
            case 'message':
                console.log(`[${new Date().toLocaleTimeString()}] : ${message.userNick}${message.message}`)
                break
            case 'join':
                console.log(`[${new Date().toLocaleTimeString()}] : ${message.message} 进入`)
                break
        }
    });
});

console.log('打开-> http://127.0.0.1:9527')