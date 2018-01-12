# vajax

> A Vue.js project

### <font color=#C71585>使用方式</font>
```js
// main.js
import vajax from 'vajax'
Vue.use(vajax)

// js 简单使用
this.$vajax({
  url: 'abc/api'
}).then(r=> {
  console.log(r);
})
// 返回promise()
```
###### <font color=#e47128>【可选配置】</font>
设置 | 值 | 解释
----|------|----
url | String  | （必选）接口地址
type | String  | （可选）'get' || 'post'(默认)
dataType | String  | （可选）'json'(默认)
data | Object  | （可选）传入参数 （默认{}）
