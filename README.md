# 抖音弹幕获取

- 1. 本脚本通过浏览器控制台注入，实现抖音直播弹幕信息的实时捕获，并以 JSON 格式输出。
     脚本默认连接 WebSocket 服务器地址：ws://127.0.0.1:8080 并发送消息
- 2. ⚠️ 注意：由于抖音最新安全策略（截至 2024.7.16），浏览器直接访问 WebSocket 服务存在限制。建议根据实际情况灵活调整接入方案。
- 3. 若 WebSocket 服务无法正常连接，脚本将自动降级为控制台输出模式，方便调试和数据追踪。

```javascript
var scriptElement = document.createElement('script')
scriptElement.src =
	'https://jiansenc.github.io/tiktok_barrage_nodejs/index.js?t=' + Math.random()
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

![run](https://jiansenc.github.io/tiktok_barrage_nodejs/src/images/001.jpg)

# 礼物代码表

https://jiansenc.github.io/tiktok_barrage_nodejs/src/lib/git_code.html
