<script setup>
import { ref } from '@vue/composition-api'
import PageTopBg from '../../components/PageTopBg'
import MainProduct from './MainProduct.vue'
import Finance from './Finance.vue'
import HotTopic from './HotTopic.vue'
import ShareHolder from './ShareHolder.vue'
import CandleChart from '../../components/CandleChart'

const newInfo = ref([
  { name: '开盘价', value: 22.22 },
  { name: '开盘价', value: 22.22 },
  { name: '开盘价', value: 22.22 },
  { name: '开盘价', value: 22.22 },
  { name: '开盘价', value: 22.22 },
  { name: '开盘价', value: 22.22 },
  { name: '开盘价', value: 22.22 },
  { name: '开盘价', value: 22.22 },
  { name: '开盘价', value: 22.22 },
  { name: '开盘价', value: 22.22 }
])
const currentTimeType = ref('分时')
const currentType = ref('主营')

const handleBack = () => {
  uni.navigateBack()
}

const handleChangeTime = (value) => {
  currentTimeType.value = value
}

const handleType = (value) => {
  currentType.value = value
}
</script>

<template>
  <view class="topic-detail">
    <PageTopBg />
    <u-navbar
      title="全部题材"
      bgColor="transparent"
      leftIconColor="#fff"
      leftIconSize="20px"
      :fixed="false"
      @leftClick="handleBack"
    >
    </u-navbar>
    <view class="page-container">
      <view class="top">
        <view class="new-info">
          <view class="title">最新行情</view>
          <view class="infos">
            <view class="info-item" v-for="item in newInfo">
              <view class="name">
                {{ item.name }}
              </view>
              <view class="value">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>
        <view class="chart-info">
          <view class="chart-box">
            <CandleChart
              id="chart-info"
              style="width: 100%; height: 400rpx;"
              :categories="[]"
              :series="[]"
            ></CandleChart>
          </view>
          <view class="time-btn">
            <view :class="['btn', currentTimeType === '分时' ? 'active' : '']" @click="handleChangeTime('分时')">分时</view>
            <view :class="['btn', currentTimeType === '日' ? 'active' : '']" @click="handleChangeTime('日')">日</view>
            <view :class="['btn', currentTimeType === '周' ? 'active' : '']" @click="handleChangeTime('周')">周</view>
            <view :class="['btn', currentTimeType === '月' ? 'active' : '']" @click="handleChangeTime('月')">月</view>
            <view :class="['btn', currentTimeType === '年' ? 'active' : '']" @click="handleChangeTime('年')">年</view>
            <view :class="['btn', currentTimeType === '更多' ? 'active' : '']" @click="handleChangeTime('更多')">更多</view>
          </view>
        </view>
      </view>
      <view class="tab-box">
        <view :class="['tab-item', currentType === '主营' ? 'active' : '']" @click="handleType('主营')">主营</view>
        <view :class="['tab-item', currentType === '财务' ? 'active' : '']" @click="handleType('财务')">财务</view>
        <view :class="['tab-item', currentType === '热点' ? 'active' : '']" @click="handleType('热点')">热点</view>
        <view :class="['tab-item', currentType === '十大流通股东' ? 'active' : '']" @click="handleType('十大流通股东')">十大流通股东</view>
      </view>
      <view class="tab-view">
        <MainProduct v-if="currentType === '主营'" />
        <Finance v-if="currentType === '财务'" />
        <HotTopic v-if="currentType === '热点'" />
        <ShareHolder v-if="currentType === '十大流通股东'" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.topic-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 100%;
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
  .top {
    width: calc(100% - 40rpx);
    margin: 10rpx auto;
    padding: 10rpx;
    background-color: #ececec;
    border-radius: 8rpx;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .new-info {
    width: calc(100% - 60rpx);
    background-color: #fff;
    border-radius: 8rpx;
    padding: 20rpx 30rpx;
    .title {
      font-size: 18px;
      color: #000;
    }
    .infos {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      .info-item {
        width: calc(50% - 50rpx);
        font-size: 14px;
        color: #555;
        position: relative;
        padding-left: 20rpx;
        margin-top: 5rpx;
        margin-bottom: 5rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .name {
          color: #555;
        }
        .value {
          color: #000;
        }
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4rpx;
          height: 20rpx;
          background-color: #FF4B28;
        }
        &:nth-child(2n-1) {
          margin-right: 30rpx;
        }
        &:nth-child(2n) {
          margin-left: 30rpx;
        }
      }
    }
  }
  .chart-info {
    width: calc(100% - 20rpx);
    background-color: #fff;
    border-radius: 8rpx;
    padding: 10rpx;
    margin-top: 10rpx;
    .chart-box {
      width: 100%;
      height: 400rpx;
    }
    .time-btn {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 10rpx;
      .btn {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f6f6f6;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 6rpx;
        font-size: 16px;
        color: #363636;
        margin: 0 5rpx;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        &.active {
          background-color: #FE2C2B;
          color: #fff;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0%;
            transform: translate(-50%, -100%);
            width: 0;
            height: 0;
            border: 6rpx solid transparent;
            border-left-width: 4rpx;
            border-right-width: 4rpx;
            border-bottom-color: #FE2C2B;
          }
        }
      }
    }
  }
  .tab-box {
    width: calc(100% - 20rpx);
    margin: 10rpx auto;
    padding: 10rpx;
    height: 70rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .tab-item {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #000;
      margin-left: 5rpx;
      margin-right: 5rpx;
      border: 1rpx solid #c2c2c2;
      border-radius: 10rpx;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
        flex: 1.5;
      }
      &.active {
        background-color: #FBCACA;
        border-color: #FE2C2B;
        color: #FE2C2B;
      }
    }
  }
}
</style>
