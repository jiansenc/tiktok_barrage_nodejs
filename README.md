- 1.打开项目跟目录 安装 node 依赖 并运行

```node
npm i // 或 cnpm i
npm run dev
```

- 2.进入直播间页面，打开浏览器按 F12 控制台 注入下面代码

```javascript
var scriptElement = document.createElement('script')
scriptElement.src = 'https://jiansenc.github.io/tiktok_barrage_nodejs/client.js?t=' + Math.random()
document.body.appendChild(scriptElement)
```

- 3.观察 node 控制台,这时候弹幕信息会进来

- 消息格式

```json
{
  "user_nickName": "成成",
  "user_id": "105171130648",
  "user_gender": "男",
  "user_level": 0,
  "user_levelImage": "http://p3-webcast.douyinpic.com/img/webcast/user_grade_level_v5_17.png~tplv-obj.image",
  "user_avatar": "https://p11.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_f8711d5bc03513fe1d3def88d6d07384.jpeg?from=3067671334",
  "user_isAdmin": false,
  "user_fansLevel": 17,
  "user_fansLightName": "荣誉等级17级勋章",
  "message": "成成:送给主播 1个人气票",
  "isGift": true,
  "gift_id": "3992",
  "gift_name": "人气票",
  "gift_number": 1,
  "gift_image": "http://p6-webcast.douyinpic.com/img/webcast/e9b7db267d0501b8963d8000c091e123.png~tplv-obj.png",
  "gift_diamondCount": 1,
  "gift_describe": "送出人气票"
}
```

| 字段               | 说明         | 类型    |
| ------------------ | ------------ | ------- |
| msg_content        | 消息内容     | String  |
| user_nickName      | 昵称         | String  |
| user_id            | 用户 ID      | String  |
| user_gender        | 性别         | String  |
| user_level         | 用户等级     | Int     |
| user_levelImage    | 用户等级徽章 | String  |
| user_avatar        | 用户头像     | String  |
| user_isAdmin       | 是否管理员   | Boolean |
| user_fansLevel     | 粉丝灯牌等级 | Int     |
| user_fansLightName | 粉丝灯牌     | String  |
| isGift             | 是否是礼物   | Boolean |
| gift_id            | 礼物 ID      | String  |
| gift_name          | 礼物名称     | String  |
| gift_number        | 礼物数量     | Int     |
| gift_image         | 礼物图片     | String  |
| gift_diamondCount  | 礼物 A       | Int     |
| gift_describe      | 礼物文本     | String  |

## 正向 websocket

考虑到编程语言环境问题,使用易语言开发了 WSLINK.exe(易语言编写请误杀),
启动软件后开启 websocket 服务 ws://127.0.0.1:9527 , 其他编程语言或前端直接监听就好了。
