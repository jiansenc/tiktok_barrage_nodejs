- 1.打开项目跟目录 安装 node 依赖 并运行

```node
npm i // 或 cnpm i
npm run dev
```

- 2.进入直播间页面，打开浏览器按 F12 控制台 注入下面代码

```javascript
var script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'https://raw.githubusercontent.com/EY5740/tiktok_barrage_nodejs/main/client.js?t=' + new Date().getTime()
document.getElementsByTagName('head')[0].appendChild(script)
```

- 3.观察 node 控制台,这时候弹幕信息会进来
