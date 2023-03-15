import { WebSocketServer } from "ws";
const wss = new WebSocketServer({
    port: 9527,
});


wss.on("connection", function connection(ws) {
    console.log("客户端连接成功");
    ws.on("message", function message(data) {
        let message = JSON.parse(data.toString())
        switch (message.action) {
            case 'message':
                if (message.message) {
                    console.log(`[${new Date().toLocaleTimeString()}] : ${message.message.user_nickName}${message.message.message}`)
                }
                break
            case 'join':
                console.log(`[${new Date().toLocaleTimeString()}] : ${message.message} 进入`)
                break
        }
    });
});

console.log('打开-> http://127.0.0.1:9527')