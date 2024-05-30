<script setup>
import { ref } from '@vue/composition-api'
import PageTopBg from '../../components/PageTopBg/index.vue'
import Tabs from '../../components/Tabs/index.vue'
import All from './all'
import Wheel from './wheel'
import Replay from './replay'
import Concept from './concept'

const currentTab = ref(0)

const tabs = ref([
  { name: '全部题材' },
  { name: '题材轮动' },
  { name: '每日复盘' },
  { name: '新增概念' }
])

const handleTabChange = (i) => {
  currentTab.value = i
}

const handleToSearch = () => {
  uni.navigateTo({
    url: '/pages/search/index'
  })
}
</script>

<template>
  <view class="all-topic-page">
    <PageTopBg />
    <u-navbar title="全部题材" bgColor="transparent" :fixed="false">
    </u-navbar>
    <view class="page-container">
      <view class="search-box">
        <u-search shape="round" placeholder="请输入题材或个股名称搜索" :clearabled="true" :showAction="false" borderColor="#d5d5d5"
          :disabled="true" @click="handleToSearch"></u-search>
      </view>
      <view class="tab-area">
        <div class="tabs-nav-box">
          <Tabs :list="tabs" :current="currentTab" @change="handleTabChange" />
        </div>
        <view class="tab-container">
          <All v-if="currentTab === 0" />
          <Wheel v-if="currentTab === 1" />
          <Replay v-if="currentTab === 2" />
          <Concept v-if="currentTab === 3" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.all-topic-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.page-container {
  width: calc(100% - 28rpx);
  height: calc(100% - 20rpx);
  padding: 10rpx 14rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  background-color: #fff;

  >.search-box {
    height: 54rpx;
    margin-bottom: 10rpx;

    ::v-deep .u-search {
      width: 100%;
      height: 100%;

      .u-icon__icon {
        font-size: 24px !important;
      }

      .u-search__content {
        height: 100%;
        background-color: transparent !important;
      }

      .u-search__content__input {
        background-color: transparent !important;
      }
    }
  }

  .tab-area {
    width: 100%;
    height: calc(100% - 64rpx);

    .tabs-nav-box {
      height: 90rpx;
    }

    .tab-container {
      width: calc(100% - 20rpx);
      height: calc(100% - 110rpx);
      padding: 10rpx;
      background-color: #ececec;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
    }
  }
}
</style>
