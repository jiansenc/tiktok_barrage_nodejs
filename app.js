import { WebSocketServer } from "ws";
const wss = new WebSocketServer({
    port: 9527,
});

wss.on("connection", function connection(ws) {
    console.log("客户端连接成功");
    ws.on("message", function message(data) {
        wss.clients.forEach(cen => {
            cen.send(JSON.stringify(data.toString()))
        })
    });
});

console.log('打开-> http://127.0.0.1:9527')