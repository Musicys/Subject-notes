<script>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<script setup>
import { ref, onMounted } from '@vue/composition-api'
import TabsColumn from '../../../components/Tabs/column'
import { getAllTopicReplay } from '../../../api/index'
import dayjs from 'dayjs'

const currentTab = ref(0)
const sidebarList = ref([])

const descList = ref([])

const handleTabChange = (value) => {
  currentTab.value = value
  updateDataList()
}

const updateDataList = () => {
  if (sidebarList.value && sidebarList.value.length > 0) {
    fetchDataList(sidebarList.value[currentTab.value].value)
  }
}

const fetchDataList = async (date) => {
  const res = await getAllTopicReplay(date)
  if (res) {
    descList.value = Object.entries(res).reverse().map(([label, childs]) => {
      return {
        label: `${label}连扳`,
        child: childs.map(childItem => {
          return {
            ...childItem,
            label: childItem.mc,
            desc: `${childItem.mc}，涨停时间${childItem.lbt}`
          }
        })
      }
    })
    console.log(descList.value)
  }
}

const handleDetail = (e) => {
  const subjectId = e.currentTarget.dataset.item.subjectId
  uni.navigateTo({
    url: `/pages/hot-topic/detail/index?id=${subjectId}`
  })
}

onMounted(() => {
  for (let i = 1; i < 31; i++) {
    const date = dayjs().subtract(i, 'day')
    sidebarList.value.push({
      name: date.format('MM月DD日'),
      value: date.format('YYYY-MM-DD')
    })
  }
  updateDataList()
})
</script>

<template>
  <view class="replay-tab">
    <view class="left">
      <TabsColumn style="width: 100%;" :list="sidebarList" :show-value="false" :current="currentTab"
        @change="handleTabChange" />
    </view>
    <view class="right">
      <u-empty v-if="!descList || descList.length === 0" :textSize="26" :iconSize="150" marginTop="80"></u-empty>
      <view class="desc-list">
        <view class="desc-item" v-for="item in descList" :key="item.label">
          <view class="label">{{ item.label }}</view>
          <view class="child">
            <view class="child-items" v-for="childItem in item.child" :key="childItem.label" :data-item="childItem" @click="handleDetail">
              <view class="name">{{ childItem.label }}</view>
              <view class="desc">{{ childItem.desc }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.replay-tab {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  .left {
    position: relative;
    width: 150rpx;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-x: hidden;
    overflow-y: auto;

    .van-sidebar {
      position: absolute;
      width: calc(100% - 10rpx) !important;
    }

    .van-sidebar-item {
      width: calc(100% - 12rpx);
      height: 50rpx;
      padding: 0;
      margin: 6rpx;
      background: #f6f6f6;
      border-radius: 8rpx;
      box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, .12), 0 0 12rpx rgba(0, 0, 0, .04);

      &--selected {
        position: relative;
        border: none;
        background: #FE2C2B;
        overflow: visible !important;

        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(100%, -50%);
          width: 0;
          height: 0;
          border: 10rpx solid transparent;
          border-top-width: 4rpx;
          border-bottom-width: 4rpx;
          border-left-color: #FE2C2B;
        }

        .label {
          color: #fff !important;
        }

        .value {
          color: #fff !important;
        }
      }

      .van-sidebar-item__text {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .label {
        width: 100%;
        font-size: 12px;
        color: #363636;
        text-align: center;
      }

      .value {
        width: 100%;
        font-size: 12px;
        color: #FF2929;
        text-align: center;
      }
    }
  }

  .right {
    width: calc(100% - 158rpx);
    height: calc(100% - 8rpx);
    background: #fff;
    border-radius: 8rpx;
    margin: 6rpx 0;
    padding: 4rpx;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .desc-item {
      position: relative;
      padding-left: 100rpx;
      height: fit-content;
      margin-bottom: 8rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 1rpx solid #ddd;
      border-radius: 8rpx;

      .label {
        position: absolute;
        left: 0;
        top: 0;
        width: 100rpx;
        height: 100%;
        font-size: 13px;
        font-weight: 700;
        color: #363636;
        background: #FFDBDB;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .child {
        width: 100%;
        font-size: 12px;
        text-align: left;
        display: flex;
        flex-direction: column;

        .child-items {
          width: 100%;
          height: 50rpx;
          line-height: 50rpx;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;

          &:not(:last-child) {
            border-bottom: 1rpx solid #ddd;
          }

          .name {
            width: 120rpx;
            height: 100%;
            text-align: center;
            font-size: 12px;
            color: #000;
            border-right: 1rpx solid #ddd;
          }

          .desc {
            width: calc(100% - 120rpx);
            height: 100%;
            font-size: 12px;
            color: #F57E2E;
            padding: 0 15rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
