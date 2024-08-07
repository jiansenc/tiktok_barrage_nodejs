```javascript
⚠️ ⚠️ 由于 2024.7.16 抖音更新了SCP 安全策略，webscoket 被拦截 项目无法使用
```

- JavaScript 实现抖音弹幕监听, 并发送到 websocket
- 你的业务端需要监听 ws://127.0.0.1:2019 端口, 并接收弹幕信息

### 使用方法

- 1.启动的 ws 服务
- 2.打开抖音直播间, 按 F12, 点击 Console, 粘贴下面代码, 回车执行
- 3.载入完成后便会开始抓取弹幕并发送到 ws 服务

```javascript
var scriptElement = document.createElement('script')
scriptElement.src = 'https://jiansenc.github.io/tiktok_barrage_nodejs/index.js?t=' + Math.random()
document.body.appendChild(scriptElement)
```

### 消息格式 JSON string

```json
{
  "message_type": "gift",
  "user_follow_status": "y",
  "user_id": "123456",
  "user_url": "https://www.douyin.com/user/xxx",
  "user_nickName": "userxxx",
  "user_avatar": "https://p3.douyinpic.com/xxx.jpeg",
  "user_gender": "女",
  "user_is_admin": "n",
  "user_is_super_admin": "n",
  "user_level_value": "7",
  "user_level_icon": "http://p3-webcast.douyinpic.com/xxx.image",
  "user_fans_light_level_value": "2",
  "user_fans_light_level_name": "xxx",
  "user_fans_light_icon_url": "http://p3-webcast.douyinpic.com/xxx.image",
  "gift_id": "685",
  "gift_url": "http://p11-webcast.douyinpic.com/img/xxx.png",
  "gift_name": "粉丝团灯牌",
  "gift_total_count": "1",
  "message_describe": "userxxx 送出了 粉丝团灯牌 x1"
}
```

### JSON 字段说明

| 字段                        | 说明                                                     |
| --------------------------- | -------------------------------------------------------- |
| message_type                | 消息类型 text:文字 join: 进入房间, like:点赞, gift:礼物, |
| user_follow_status          | 是否关注, y: 是, n: 否                                   |
| user_id                     | 抖音号                                                   |
| user_url                    | 抖音 web 个人中心                                        |
| user_nickName               | 用户昵称                                                 |
| user_avatar                 | 用户头像                                                 |
| user_gender                 | 用户性别                                                 |
| user_is_admin               | 是否管理员, y: 是, n: 否                                 |
| user_is_super_admin         | 是否超级管理员, y: 是, n: 否                             |
| user_level_value            | 抖音等级                                                 |
| user_level_icon             | 抖音等级图片                                             |
| user_fans_light_level_value | 粉丝灯牌等级                                             |
| user_fans_light_level_name  | 粉丝灯牌名称                                             |
| user_fans_light_icon_url    | 粉丝灯牌图片                                             |
| gift_id                     | 礼物 ID                                                  |
| gift_url                    | 礼物图片 URL                                             |
| gift_name                   | 礼物名称                                                 |
| gift_total_count            | 礼物个数                                                 |
| message_describe            | 消息描述                                                 |

## 正向 websocket (辅助)

如果你的业务代码没能力启动 websocket 服务,你可以使用本项目的辅助工具 [**ws 服务助手.exe**](https://github.com/jiansenc/tiktok_barrage_nodejs/raw/main/ws%E6%9C%8D%E5%8A%A1%E5%8A%A9%E6%89%8B.exe) (易语言编写,谨防安全软件误杀),该软件会接受并转发弹幕消息。你的业务端只需接收弹幕信息。

## 使用 demo 例程

- 1.启动的 [ws 服务助手.exe](https://github.com/jiansenc/tiktok_barrage_nodejs/raw/main/ws%E6%9C%8D%E5%8A%A1%E5%8A%A9%E6%89%8B.exe)
- 2.打开本项目 [web_socket_test.html(测试)](https://github.com/jiansenc/tiktok_barrage_nodejs/blob/main/web_socket_test.html) 文件
- 3.打开抖音直播间粘贴代码
- 4.载入完成后便会接收到信息。观察 web_socket_test.html 页面状态

![run](https://jiansenc.github.io/tiktok_barrage_nodejs/src/images/20240531172717.jpg)

![run](https://jiansenc.github.io/tiktok_barrage_nodejs/src/images/20240531172531.jpg)
![run](https://jiansenc.github.io/tiktok_barrage_nodejs/src/images/20240531173008.jpg)
