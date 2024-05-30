<script>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<script setup>
import { ref, onMounted } from '@vue/composition-api'
import PageTopBg from '../../components/PageTopBg'
import { getHotData, getHotData2 } from '../../api/index'
import { getShareInfo } from '../../utils/index'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

const tagIconMap = {
  '新': 'new',
  '沸': 'order'
}

const hotList = ref([])

const message = ref([])

const handleItemClick = (item) => {
  uni.navigateTo({
    url: `/pages/hot-topic/detail/index?id=${item.subjectId}`
  })
}

const fetchHotData = async () => {
  const data = await getHotData()
  const data2 = await getHotData2()
  if (data) {
    hotList.value = [
      ...data.map(item => ({ ...item, tag: '新' })),
      ...data2.map(item => ({ ...item, tag: '沸' }))
    ]
  }
}

const handleToSearch = () => {
  uni.navigateTo({
    url: '/pages/search/index'
  })
}

const handleContact = (e) => {
  console.log('客服**********', e)
}

onMounted(() => {
  fetchHotData()
})

onShareAppMessage(() => {
  return {
    ...getShareInfo('appMessage')
  }
})

onShareTimeline(() => {
  return {
    ...getShareInfo('timeline')
  }
})
</script>

<template>
  <view class="hot-topic-page">
    <PageTopBg />
    <u-navbar title="热点题材" bgColor="transparent" :fixed="false">
    </u-navbar>
    <view class="page-container">
      <view class="top">
        <view class="search-box">
          <view class="message-tips">
            <view class="msg-badge">
              <u-badge type="warning" max="10" :value="message.length"></u-badge>
            </view>
            <view class="msg-icon">
              <u-button class="custom-style" open-type="contact" :hairline="false" icon="bell" color="transparent"
                iconColor="#fff" @contact="handleContact">
              </u-button>
            </view>
          </view>
          <view class="search-input" style="flex: 1; margin-left: 30rpx;">
            <u-search shape="round" placeholder="请输入题材或个股名称搜索" :clearabled="true" :showAction="false" :disabled="true"
              @click="handleToSearch">
            </u-search>
          </view>
        </view>
        <view class="share">
          <view class="hot-title">热榜TOP50</view>
          <view class="share-btn">
            <u-button class="custom-style" open-type="share" color="#fff" :hairline="false" icon="share-square"
              iconColor="#FF2929" text="分享" :customStyle="{ color: '#FF2929' }">
            </u-button>
          </view>
        </view>
      </view>
      <view class="hot-list">
        <u-empty v-if="!hotList || hotList.length === 0" :textSize="26" :iconSize="150" marginTop="80"></u-empty>
        <u-list>
          <u-list-item v-for="(item, index) in hotList" :key="item.subjectId">
            <u-cell @click="handleItemClick(item)">
              <view slot="icon" class="sort">{{ index + 1 }}</view>
              <view slot="title" class="name">{{ item.name }}</view>
              <view slot="value" class="tag">
                <image class="share-icon" mode="aspectFit"
                  :src="`../../static/image/icon_hot_${tagIconMap[item.tag]}.png`"></image>
                <text>{{ item.tag }}</text>
              </view>
            </u-cell>
          </u-list-item>
        </u-list>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.hot-topic-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;

  ::v-deep .u-navbar {
    width: 100%;

    .u-navbar__content__left {
      display: none;
    }

    .u-navbar__content {
      .u-navbar__content__title {
        color: #fff;
      }
    }
  }
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}

.page-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;

  >.top {
    padding: 10rpx 30rpx 30rpx 30rpx;

    >.search-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      >.message-tips {
        position: relative;
        width: 64rpx;
        height: 64rpx;
        background: rgba(255, 255, 255, .3);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .msg-badge {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(25%, -20%);
          z-index: 2;
        }

        .msg-icon {
          width: 100%;
          height: 100%;

          ::v-deep .u-button {
            width: 100%;
            height: 100%;
            padding: 0;
            border-radius: 50%;

            .u-icon {
              text {
                font-size: 20px !important;
                color: #fff;
              }
            }

            &::after {
              display: none;
            }
          }
        }
      }

      >.search-input {
        width: 100%;

        ::v-deep .u-search {
          width: 100%;
          height: 64rpx;

          .u-icon__icon {
            font-size: 24px !important;
          }

          .u-search__content {
            height: 100%;
          }
        }
      }
    }

    >.share {
      margin-top: 36rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      >.hot-title {
        font-size: 60rpx;
        color: #fff;
        font-style: italic;
        font-weight: 700;
      }

      >.share-btn {
        width: fit-content;
        height: 55rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        ::v-deep .u-button {
          height: 55rpx;
          border-radius: 16rpx;

          .u-icon {
            text {
              font-size: 18px !important;
            }
          }

          &::after {
            display: none;
          }
        }
      }
    }
  }

  >.hot-list {
    width: 100%;
    height: calc(100% - 220rpx);
    background-color: #fff;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 99;

    ::v-deep .u-list {
      height: 100% !important;

      .u-line {
        border-bottom-style: dashed !important;
      }
    }

    .sort {
      width: 50rpx;
      font-size: 16px;
      font-style: italic;
      color: #FF6325;
      text-align: center;
      margin-right: 30rpx;
    }

    .name {
      flex: 1;
      font-size: 14px;
      color: #555555;
      text-align: left;
    }

    .tag {
      width: 45rpx;
      height: 45rpx;
      font-size: 10px;
      color: #fff;
      text-align: center;
      position: relative;

      image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      }

      text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -45%);
      }
    }
  }
}
</style>
