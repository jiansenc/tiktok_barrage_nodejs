console.log(`[${new Date().toLocaleTimeString()}]`, `欢迎加入QQ群590109588：https://qm.qq.com/q/YAs31tGvUm`)
console.log(`[${new Date().toLocaleTimeString()}]`, '正在删除视频流..')
const videoel = document.querySelector('video')
if (videoel) {
    document.querySelector('video').remove()
}
console.log(`[${new Date().toLocaleTimeString()}]`, '正在载入JS,请稍后..')
var scriptElement = document.createElement('script')
scriptElement.src = 'https://jiansenc.github.io/tiktok_barrage_nodejs/index.js?t=' + Math.random()
document.body.appendChild(scriptElement)