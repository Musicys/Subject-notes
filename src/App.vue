<script>
import { setStorageSync, getStorageSync } from './utils/index'
import { wxAuthorize } from './api/index'

export default {
  onLaunch(options) {
    console.log('App Launch', options)
    // 获取邀请码并缓存起来
    const { inviteCode } = options.query
    if (inviteCode) {
      setStorageSync(uni.$u.globalVal.INVITE_CODE, inviteCode)
    }
    if (options.shareTicket) {
      this.getShareInfo(options.shareTicket)
    }

    const systemInfo = uni.getSystemInfoSync()
    const statusBarHeight = systemInfo.statusBarHeight
    setStorageSync(uni.$u.globalVal.STATUS_BAR_HEIGHT, statusBarHeight)
    this.wxLogin()
    this.shareReady()
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
  methods: {
    wxLogin() { // 微信登录
      uni.login({
        provider: 'weixin',
        onlyAuthorize: true,
        success: (result) => {
          if (result.code) { // 获取到微信的code，然后用来换取后端的token以及用户信息
            this.userLogin(result.code)
          }
        }
      })
    },
    async userLogin(code) {
      // 用户登录并缓存用户信息
      const res = await wxAuthorize({ code, inviteCode: getStorageSync(uni.$u.globalVal.INVITE_CODE) })
      if (res) {
        console.log(res)
        setStorageSync(uni.$u.globalVal.USER_INFO, res)
      }
    },
    shareReady() { // 分享前置设置，开启ticket后，在用户的分享链接中会携带ticket
      wx.showShareMenu({
        withShareTicket: true,
        menus: [
          'shareAppMessage',
          'shareTimeline'
        ]
      })
    },
    getShareInfo(ticket) { // 拿到分享的ticket后，可以通过ticket获取到分享的详细信息
      wx.getShareInfo({
        shareTicket: ticket,
        success: (res) => {
          // TODO 此处分享信息数据需解密，后续再搞
          console.log('分享信息', res)
        }
      })
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}

page {
  width: 100vw;
  height: 100vh;
}
</style>
