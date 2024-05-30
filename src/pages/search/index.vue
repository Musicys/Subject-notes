<script setup>
import { ref, onUnmounted, computed } from '@vue/composition-api'
import PageTopBg from '../../components/PageTopBg'
import { setStorageSync, getStorageSync } from '../../utils/index'
import { search } from '../../api/index'

const keywords = ref('')
const searchName = ref('')
const keywordsList = ref(getStorageSync('keywords'))
const remindList = ref([])
const resultList = ref({
  subject: null,
  stock: null
})
const currentTab = ref('subject')
const currentStatus = computed(() => {
  if (keywords.value === null || keywords.value === '') {
    return 'history'
  } else if (resultList.value.subject || resultList.value.stock) {
    return 'result'
  } else if (remindList.value && remindList.value.length > 0) {
    return 'remind'
  }
})

const handleBack = () => {
  uni.navigateBack()
}

const handleSearch = () => {
  searchName.value = keywords.value
  if (searchName.value) {
    fetchSearchList()
    keywordsList.value.unshift(keywords.value)
  } else {
    resultList.value = {
      subject: null,
      stock: null
    }
  }
}

const handleKeywordClick = (value) => {
  keywords.value = value
}

const handleKeywordChange = () => {
  if (keywords.value) {
    fetchRemindList()
  } else {
    remindList.value = []
  }
}

const handleRemindClick = () => {
  fetchSearchList()
}

const handleToggle = (value) => {
  currentTab.value = value
}

const handleShowDetail = (item) => {
  setStorageSync('selectedData', item)
  uni.switchTab({
    url: '/pages/all-topic/index'
  })
}

const fetchRemindList = async () => {
  const res = await search(keywords.value)
  if (res) {
    remindList.value = res.tips
  } else {
    remindList.value = []
  }
}

const fetchSearchList = async () => {
  const res = await search(keywords.value)
  if (res) {
    resultList.value = {
      subject: res.subjectList,
      stock: res.stockList
    }
  } else {
    resultList.value = {
      subject: [],
      stock: []
    }
  }
  remindList.value = []
}

onUnmounted(() => {
  setStorageSync('keywords', [...keywordsList.value])
})
</script>

<template>
  <view class="search-page">
    <PageTopBg />
    <u-navbar title="题材库-搜索" bgColor="transparent" leftIconColor="#fff" leftIconSize="20px" :fixed="false"
      @leftClick="handleBack">
    </u-navbar>
    <view class="page-container">
      <view class="search-input">
        <u-search shape="round" v-model="keywords" placeholder="请输入题材或公司名称搜索" :clearabled="true" :showAction="true"
          height="80" searchIconSize="48"
          :actionStyle="{ backgroundColor: '#FE2C2B', color: '#fff', height: '70rpx', borderRadius: '70rpx', lineHeight: '70rpx', padding: '0 20rpx' }"
          @click="handleSearch" @change="handleKeywordChange" @search="handleSearch" @custom="handleSearch">
        </u-search>
      </view>
      <view class="search-history" v-if="currentStatus === 'history'">
        <view class="title">最近搜索</view>
        <view class="history-keywords-list">
          <view class="keywords-item" v-for="item in keywordsList" :key="item" @click="handleKeywordClick(item)">{{ item
          }}</view>
        </view>
      </view>
      <view class="search-remind" v-if="currentStatus === 'remind'">
        <view class="remind-list">
          <view class="remind-item" v-for="item in remindList" :key="item.id" @click="handleRemindClick(item)">{{
            item.name }}</view>
        </view>
      </view>
      <view class="search-result" v-if="currentStatus === 'result'">
        <view class="result-tab">
          <view :class="['result-tab-item', currentTab === 'subject' ? 'active' : '']" @click="handleToggle('subject')">题材
          </view>
          <view :class="['result-tab-item', currentTab === 'stock' ? 'active' : '']" @click="handleToggle('stock')">个股
          </view>
        </view>
        <view class="result-list">
          <view class="result-item" v-for="item in (resultList[currentTab] ? resultList[currentTab] : [])"
            :key="item.subjectId" @click="handleShowDetail(item)">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.search-page {
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: calc(100% - 40rpx);
  padding: 20rpx;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;

  .search-input {
    width: 100%;
    height: 80rpx;
    margin-bottom: 40rpx;
  }

  .search-history {
    width: 100%;

    .title {
      width: 100%;
      font-size: 12px;
      line-height: 2.5;
      color: #666;
      border-bottom: 1rpx solid #e7e6e4;
      margin-bottom: 20rpx;
    }

    .history-keywords-list {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: center;
      line-height: 2;

      .keywords-item {
        margin-right: 40rpx;
        font-size: 14px;
        color: #333;
      }
    }
  }

  .search-remind {
    width: 100%;

    .remind-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .remind-item {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;

        &:not(:last-child) {
          border-bottom: 1rpx solid #e7e6e4;
        }
      }
    }
  }

  .search-result {
    width: 100%;

    .result-tab {
      width: calc(100% - 2rpx);
      height: 68rpx;
      line-height: 68rpx;
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 10rpx;
      border: 1rpx solid #FE2C2B;

      .result-tab-item {
        height: 100%;
        flex: 1;
        text-align: center;

        &:first-child {
          border-right: 1rpx solid #FE2C2B;
        }

        &.active {
          color: #fff;
          background-color: #FE2C2B;
        }
      }
    }

    .result-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .result-item {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;

        &:not(:last-child) {
          border-bottom: 1rpx solid #e7e6e4;
        }
      }
    }
  }
}
</style>
