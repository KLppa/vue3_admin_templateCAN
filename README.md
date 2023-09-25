<!-- 判断是上午还是下午还是晚上 0 - 9.00 早上  9 12上午， 12 18.00下午 18-24晚上 24之后就是早上了 -->

let date = new Date().getHours()
dateHandle(date)

export default function dateHandle(dateHours: number): string {
let msg = ''
if (dateHours <= 9) {
msg = '早上好'
} else if (dateHours <= 12) {
msg = '上午好'
} else if (dateHours <= 18) {
msg = '下午好'
} else {
msg = '晚上好'
}
return msg
}

<!-- 全局路由守卫。可以监视路由切换的进度
     用到插件 yarn add nprogress
-->

接口文档
服务器 http://sph-api.atguigu.cn

http://39.98.123.211:8510/swagger-ui.html#/

http://139.198.104.58:8212/swagger-ui.html#/
