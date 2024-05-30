<script setup>
import { ref } from '@vue/composition-api'
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import PageTopBg from '../../../components/PageTopBg'
import Tabs from '../../../components/Tabs/index.vue'
import Topic from './Topic'
import Emotion from './Emotion'
import Finance from './Finance'
import { getTopicRanking, addOptional, cancelOptional } from '../../../api/index'
import { getStorageSync } from '../../../utils/index'

const title = ref('')
const currentTab = ref(0)
const detailId = ref(null)
const isAddOptional = ref(false)
const detail = ref({})

const tabs = ref([
  { name: '题材排名' },
  { name: '情绪排名' },
  { name: '财务排名' }
])

const handleTabChange = (i) => {
  currentTab.value = i
}

const fetchTopicDetail = async () => {
  const res = await getTopicRanking(detailId.value)
  if (res) {
    title.value = res.name
    detail.value = res
    console.log('详情', res)
  }
}

const handleBack = () => {
  uni.navigateBack()
}

const handleAddOptional = async () => {
  const userInfo = getStorageSync(uni.$u.globalVal.USER_INFO)
  if (userInfo.openid) {
    const res = await addOptional({
      openid: userInfo.openid,
      type: '2',
      businessId: detailId.value
    })
    console.log(res)
    if (res) {
      isAddOptional.value = true
      console.log('添加自选', res)
    }
  }
}

const handleCancelOptional = async () => {
  const userInfo = getStorageSync(uni.$u.globalVal.USER_INFO)
  if (userInfo.openid) {
    const res = await cancelOptional(detailId.value, userInfo.openid)
    if (res) {
      isAddOptional.value = false
      console.log('取消自选', res)
    }
  }
}

onLoad((options) => {
  if (options && options.id) {
    detailId.value = options.id
    fetchTopicDetail()
  }
})

onShareAppMessage((options) => {
  console.log('shareAppMessage', options)
})

onShareTimeline((options) => {
  console.log('shareTimeline', options)
})
</script>

<template>
  <view class="hot-topic-detail">
    <PageTopBg />
    <u-navbar :title="title" bgColor="transparent" leftIconColor="#fff" leftIconSize="20px" :fixed="false"
      @leftClick="handleBack">
    </u-navbar>
    <view class="page-container">
      <view class="tab-area">
        <div class="tabs-nav-box">
          <Tabs :list="tabs" :current="currentTab" @change="handleTabChange" />
        </div>
        <view class="tab-container">
          <Topic v-if="currentTab === 0" :detail="detail" />
          <Emotion v-if="currentTab === 1" />
          <Finance v-if="currentTab === 2" />
        </view>
      </view>
      <view class="placeholder"></view>
      <view class="bottom-btn">
        <view class="share-btn">
          <u-button class="share-btn" icon="share-square" iconColor="#fff" open-type="share" text="分享"></u-button>
        </view>
        <view class="add-btn">
          <u-button v-if="!isAddOptional" class="add-btn" icon="plus-circle" iconColor="#fff" text="添加自选"
            @click="handleAddOptional"></u-button>
          <u-button v-if="isAddOptional" class="add-btn" icon="minus-circle" iconColor="#fff" text="取消自选"
            @click="handleCancelOptional"></u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.hot-topic-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  ::v-deep .u-navbar {
    width: 100%;

    .u-navbar__content {
      .u-navbar__content__title {
        color: #fff;
      }
    }
  }
}

.page-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;

  .tab-area {
    width: calc(100% - 20rpx);
    height: calc(100% - 20rpx);
    padding: 10rpx;
    overflow: hidden;

    .tabs-nav-box {
      height: 90rpx;
      margin-bottom: 10rpx;
    }

    .tab-container {
      height: calc(100% - 100rpx);
      overflow-y: auto;
      background-color: #f9f9f9;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
    }
  }

  .placeholder {
    width: 100%;
    height: 118rpx;
    background-color: transparent;
    background: transparent;
  }
}


.bottom-btn {
  position: fixed;
  bottom: 30rpx;
  left: 0;
  padding: 0 30rpx;
  width: calc(100% - 60rpx);
  height: 88rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ::v-deep .u-button {
    height: 100%;
    background-color: transparent;
    border: none;
    border-radius: 16rpx;
    color: #fff;

    &::before {
      display: none;
    }

    &::after {
      display: none;
    }

    .u-icon {
      text {
        font-size: 22px !important;
      }
    }
  }

  .share-btn {
    width: calc(50% - 6rpx);
    height: 100%;
    margin-right: 6rpx;
    background-color: #FF5027;
    color: #fff;
    font-size: 17px;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .add-btn {
    width: calc(50% - 6rpx);
    height: 100%;
    margin-left: 6rpx;
    background-color: #FE2C2B;
    color: #fff;
    font-size: 17px;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
