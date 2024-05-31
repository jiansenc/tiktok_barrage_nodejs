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
  "message_type": "join",
  "user_follow_status": "y",
  "user_id": "xxx",
  "user_url": "https://www.douyin.com/user/xx",
  "user_nickName": "userxxx",
  "user_avatar": "https://p3.douyinpic.com/xxx.jpeg",
  "user_gender": "男",
  "user_is_admin": "n",
  "user_is_super_admin": "n",
  "user_level_value": null,
  "user_level_icon": null,
  "user_fans_light_level_value": null,
  "user_fans_light_level_name": null,
  "user_fans_light_icon_url": null,
  "gift_combo_count": null,
  "gift_id": null,
  "gift_url": null,
  "gift_name": null,
  "gift_total_count": null,
  "message_describe": "userxxx 来了"
}
```

### JSON 字段说明

| 字段                        | 类型   | 说明                                                     |
| --------------------------- | ------ | -------------------------------------------------------- |
| message_type                | string | 消息类型 text:文字 join: 进入房间, like:点赞, gift:礼物, |
| user_follow_status          | string | 是否关注, y: 是, n: 否                                   |
| user_id                     | string | 抖音号                                                   |
| user_url                    | string | 抖音 web 个人中心                                        |
| user_nickName               | string | 用户昵称                                                 |
| user_avatar                 | string | 用户头像                                                 |
| user_gender                 | string | 用户性别                                                 |
| user_is_admin               | string | 是否管理员, y: 是, n: 否                                 |
| user_is_super_admin         | string | 是否超级管理员, y: 是, n: 否                             |
| user_level_value            | number | 抖音等级                                                 |
| user_level_icon             | string | 抖音等级图片                                             |
| user_fans_light_level_value | number | 粉丝灯牌等级                                             |
| user_fans_light_level_name  | string | 粉丝灯牌名称                                             |
| user_fans_light_icon_url    | string | 粉丝灯牌图片                                             |
| gift_combo_count            | number | 送出礼物个数                                             |
| gift_id                     | string | 礼物 ID                                                  |
| gift_url                    | string | 礼物图片 URL                                             |
| gift_name                   | string | 礼物名称                                                 |
| gift_total_count            | string | 礼物个数                                                 |
| message_describe            | string | 消息描述                                                 |

## 正向 websocket (辅助)

如果你的业务代码没能力启动 websocket 服务,你可以使用本项目的辅助工具 **ws 服务助手.exe** (易语言编写,谨防安全软件误杀),该软件会接受并转发弹幕消息。你的业务端只需接收弹幕信息。

## 使用 demo 例程

- 1.启动的 ws 服务助手.exe
- 2.打开本项目 web_socket_test.html 文件
- 3.打开抖音直播间粘贴代码
- 4.载入完成后便会接收到信息。观察 web_socket_test.html 页面状态

## end

- 如果你有更好的想法,欢迎提交 PR
- 欢迎加入 QQ 群 590109588：https://qm.qq.com/q/YAs31tGvUm
