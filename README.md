# vxajax

> A Vue.js project

### <font color=#C71585>使用方式</font>
```js
// main.js
import vxajax from 'vxajax'
Vue.use(vxajax)

// js 简单使用
this.$ajax({
  url: 'abc/api'
}).then(r=> {
  console.log(r);  // r是response
})
// 返回promise()
// toast，vload参数仅指开关， 开启后看效果的话，保证window下有全局方法
// toast => 对应window.insertToast
// vload => 对应window.insertLoad  window.deleteLoad
```
###### <font color=#e47128>【可选配置】</font>
设置 | 值 | 解释
----|------|----
url | String  | （必选）接口地址
type | String  | （可选）'get' || 'post'(默认)
dataType | String  | （可选）'json'(默认)
data | Object  | （可选）传入参数 （默认{}）
toast | String  | 'true'
vload | String  | 'false'
