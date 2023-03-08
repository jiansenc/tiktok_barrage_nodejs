- 1.打开项目跟目录 安装 node 依赖 并运行

```node
npm i // 或 cnpm i
npm run dev
```

- 2.进入直播间页面，打开浏览器按 F12 控制台 注入下面代码

```javascript
var scriptElement = document.createElement('script')
scriptElement.src = 'https://ey5740.github.io/tiktok_barrage_nodejs/client.js?t=' + Math.random()
document.body.appendChild(scriptElement)
```

- 3.观察 node 控制台,这时候弹幕信息会进来
