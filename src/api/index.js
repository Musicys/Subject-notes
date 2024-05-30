import request from './request'
export * from './mairui'
// 微信授权认证
// { code: '', inviteCode: '' }
export const wxAuthorize = (data) => {
  return request({
    url: '/app/wx/authorize',
    method: uni.$u.globalVal.REQUEST_METHOD.POST,
    data
  })
}

// 首页热点数据
export const getHotData = () => {
  return request({
    url: '/app/hot'
  })
}

// 首页沸点数据
export const getHotData2 = () => {
  return request({
    url: '/app/hot2'
  })
}

// 全部题材-一级分类
export const getAllTopicLevel1 = () => {
  return request({
    url: '/all/list'
  })
}

// 全部题材-二级分类
export const getAllTopicLevel2 = (parentId) => {
  return request({
    url: `/all/child-tree/${parentId}`
  })
}

// 全部题材-题材轮动
export const getAllTopicWheel = (startDate, endDate, type) => {
  return request({
    url: `/all/subjectCircle?startDate=${startDate}&endDate=${endDate}&type=${type}`
  })
}

// 全部题材-每日复盘
export const getAllTopicReplay = (day) => {
  return request({
    url: `/all/dailyReplay?day=${day}`
  })
}

// 全部题材-新增概念
export const getAllTopicConcept = (day) => {
  return request({
    url: `/all/addedStock?day=${day}`
  })
}

// 题材详情-题材排名
export const getTopicRanking = (parentId) => {
  return request({
    url: `/all/child-stock-tree/${parentId}`
  })
}

// 自选-自选列表
export const getOptionalList = (type, openid) => {
  return request({
    url: `/self/list?type=${type}&openid=${openid}`
  })
}

// 自选-添加自选
// { openid: '', type: '', businessId: '' }
export const addOptional = (data) => {
  return request({
    url: '/self',
    method: uni.$u.globalVal.REQUEST_METHOD.POST,
    data,
    fullData: true
  })
}

// 自选-取消自选
export const cancelOptional = (id, openid) => {
  return request({
    url: `/self/disabled?id=${id}&openid=${openid}`,
    fullData: true
  })
}

// 充值相关-vip产品列表
export const getRechargeList = () => {
  return request({
    url: '/recharge/product'
  })
}

// 充值相关-微信充值
// { key: '' }
export const wxRecharge = (data) => {
  return request({
    url: '/recharge/recharge',
    method: uni.$u.globalVal.REQUEST_METHOD.POST,
    data
  })
}

// 充值相关-微信充值回调
export const wxRechargeCallback = () => {
  return request({
    url: '/recharge/callback',
    method: uni.$u.globalVal.REQUEST_METHOD.POST
  })
}

// 搜索
export const search = (name) => {
  return request({
    url: `/app/search?name=${name}`
  })
}
