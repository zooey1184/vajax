const ajaxPlugin = {}
ajaxPlugin.install = function(Vue, options = {}) {

  function formate(params, type = 'POST') {
    let d = null
    if (type == 'POST') {
      let form = new FormData()
      let arr = []
      let str = ''
      for (let a of Object.keys(params)) {
        arr.push(a)
      }
      let arrSort = arr.sort()
      for (let b of arrSort) {
        let val = params[b]
        form.append(b, val)
      }
      d = form
    } else {
      let arr = []
      let str = ''
      for (let a of Object.keys(params)) {
        arr.push(a)
      }
      let arrSort = arr.sort()
      for (let b of arrSort) {
        let val = params[b]
        str += `${b}=${val}&`
      }
      let l = str.length - 1
      let ss = str.substr(0, l)
      d = ss
    }
    return d
  }

  function ajax(options) {
    var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    // 基础设置
    options.type = (options.type || 'POST').toUpperCase()
    options.dataType = options.dataType || 'json'
    options.async = options.async || true
    options.data = options.data || {}
    options.toast = options.toast || "true"
    options.vload = options.vload || "false"
    options.requestDataType = options.requestDataType || 'string'

    // 返回promise
    return new Promise(function(resolve, reject) {
      if (options.type === 'GET') {
        // get方式
        let data = formate(options.data, 'GET')
        let href = (data == '') ? options.url : options.url + '?' + encodeURI(data)
        request.open('GET', href, options.async)
        request.send()
        // get发起统一的loading
        if(options.vload=='true') {
          if (!!window.vload) {
            window.vload.$load.show()
          }
        }
      } else if (options.type === 'POST') {
        // post方式
        let data = options.requestDataType === 'string' ? JSON.stringify(options.data) : options.data
        // let data = formate(options.data, 'POST')
        request.open('POST', options.url, options.async)
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        request.send(data)
        // post发起统一的loading
        if(options.vload=='true') {
          if (!!window.vload) {
            window.vload.$load.show()
          }
        }
      }

      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status === 200) {
            // 移除统一的loading
            if(options.vload=='true') {
              if (!!window.vload) {
                window.vload.$load.hide()
              }
            }

            if (request.responseText) {
              // 处理 返回的字符串 => Object json 对象
              // console.log(request.responseText);
              let r = request.responseText
              let rjson = r
              try {
                rjson = JSON.parse(request.responseText)
                // 统一的信息提示
                if (!!window.vm) {
                  if (!rjson.success) {
                    if(options.toast=='true') {
                      window.vm.$toast(rjson.msg)
                    }else {
                      console.log('禁用toast');
                    }
                  }
                }
                resolve(rjson);
              } catch (e) {
                rjson = request.responseText
                resolve(rjson);
              } finally {
                rjson = request.responseText
                resolve(rjson);
              }
            } else {
              console.log('error1');
              reject(request.status);
            }
          } else {
            if (options.error) {
              console.log('error2');
              options.error(request)
            } else {
              console.log('error3');
              if(!!window._Log) {
                try {
                  window._Log.Crash(request.responseText, {
                    mark: options.url
                  })
                } catch (e) {
                  console.log(e);
                } finally {
                  console.log('try _log');
                }
              }
            }
          }
        }
      };
    });
  }
  Vue.prototype.$ajax = (options = {}) => {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      return
    }
    return ajax(options)
  }
}
export default ajaxPlugin
