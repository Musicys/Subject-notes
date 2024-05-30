const request = (options) => {
  const { url, method, data, header, timeout, fullData } = options
  if (!url) return Promise.reject('url不能为空')
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${uni.$u.globalVal.REQUEST_HOST}${uni.$u.globalVal.REQUEST_PREFIX}${url}`,
      method: method || uni.$u.globalVal.REQUEST_METHOD.GET,
      data: data || {},
      header: {
        ...header
      },
      timeout: timeout || 5000,
      dataType: 'json',
      responseType: 'text',
      enableHttp2: false, // 开启http2
      enableQuic: false, // 开启quic
      success: (res) => {
        const { data, statusCode } = res
        if (statusCode === 200) {
          if (data && data.code === 200) {
            resolve(fullData ? data : data.data)
          } else {
            uni.showToast({
              icon: 'none',
              title: data.msg
            })
            reject(data.msg)
          }
        } else {
          uni.showToast({
            icon: 'none',
            title: '请求失败，失败原因请查看控制台'
          })
          console.log('请求失败：', data)
          reject()
        }
      },
      fail: (error) => {
        uni.showToast({
          icon: 'none',
          title: '请求失败，失败原因请查看控制台'
        })
        console.log('请求失败：', error)
        reject()
      }
    })
  })
}

export default request
