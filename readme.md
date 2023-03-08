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

- 消息格式

```json
{
  "userLevelSrc": "https://p6-webcast.douyinpic.com/img/webcast/user_grade_level_v5_38.png~tplv-obj.image",
  "userLevel": "38", // 用户等级
  "fansLevelSrc": "https://p6-webcast.douyinpic.com/img/webcast/fansclub_level_v6_10.png~tplv-obj.image",
  "fansLevel": "10", // 粉丝灯牌等级
  "fansLightName": "灯牌7", // 粉丝灯牌名称
  "userNick": "wjunkop", // 用户昵称
  "message": "送出了 粉丝灯牌 × 1", // 消息内容体
  "isGift": true, // 是否礼物消息
  "giftUrl": "https://p3-webcast.douyinpic.com/img/webcast/722e56b42551d6490e5ebd9521287c67~tplv-obj.png",
  "giftId": "粉丝灯牌", // 礼物名称
  "giftNum": "1" // 礼物个数
}
```
