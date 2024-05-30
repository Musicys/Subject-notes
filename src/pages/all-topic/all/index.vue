<script>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<script setup>
import { ref, onMounted, computed } from '@vue/composition-api'
import TabsColumn from '../../../components/Tabs/column.vue'
import { getAllTopicLevel1, getAllTopicLevel2 } from '../../../api/index'
import { getShareInfo } from '../../../utils/index'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

const currentTab = ref(0)
const sidebarList = ref([])

const dataList = ref([])

const firstRow = computed(() => {
  if (dataList.value.length > 0) {
    return dataList.value[0]
  } else {
    return null
  }
})

const otherRow = computed(() => {
  if (dataList.value.length > 0) {
    return dataList.value.slice(1)
  } else {
    return []
  }
})

const fetchLevel1Data = async () => {
  const res = await getAllTopicLevel1()
  if (res) {
    sidebarList.value = res.map(item => ({ ...item, value: item.rate + '%' }))
    updateDataList()
  }
}

const fetchLevel2Data = async (parentId) => {
  const res = await getAllTopicLevel2(parentId)
  if (res) {
    dataList.value = res.map(item => ({ ...item, label: item.name, value: item.rate + '%' }))
  }
}

const handleTabChange = (e) => {
  currentTab.value = e
  updateDataList()
}

const updateDataList = () => {
  if (sidebarList.value && sidebarList.value.length > 0) {
    fetchLevel2Data(sidebarList.value[currentTab.value].subjectId)
  }
}

const handleDetail = (item) => {
  uni.navigateTo({
    url: `/pages/hot-topic/detail/index?id=${item.subjectId}`
  })
}

onMounted(() => {
  fetchLevel1Data()
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
  <view class="all-tab">
    <view class="left">
      <TabsColumn style="width: 100%;" :list="sidebarList" :current="currentTab" @change="handleTabChange" />
    </view>
    <view class="right">
      <template v-if="dataList && dataList.length > 0">
        <view class="desc-info" v-if="firstRow"  @click="handleDetail(firstRow)">
          <view class="detail-btn">
            <u-icon name="arrow-right" color="#ffffff" size="30"></u-icon>
          </view>
          <view class="tips">
            <u-icon name="volume" color="#333" size="30"></u-icon>
            {{ firstRow.label }}
          </view>
          <view class="tips-info">
            {{ firstRow.outline }}
          </view>
        </view>
        <view class="desc-list">
          <view class="desc-item" v-for="item in otherRow" :key="item.subjectId" @click="handleDetail(item)">
            <view class="detail-btn">
              <u-icon name="arrow-right" color="#ffffff" size="30"></u-icon>
            </view>
            <view class="label">{{ item.label }}</view>
            <view class="value">{{ item.value }}</view>
          </view>
        </view>
      </template>
      <u-empty v-else :textSize="26" :iconSize="150" marginTop="80"></u-empty>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.all-tab {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  .left {
    position: relative;
    width: calc(100% / 3 + 20rpx);
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .right {
    width: calc(100% / 3 * 2 - 20rpx);
    height: 100%;
    background: #fff;
    border-radius: 8rpx;
    margin: 6rpx 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .desc-info {
      position: relative;
      width: calc(100% - 40rpx);
      padding: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .tips {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
        color: #FE2C2B;

        image {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }

      .tips-info {
        font-size: 12px;
        color: #1F1F1F;
        line-height: 1.8;
        margin-top: 20rpx;
      }
    }

    .desc-item {
      position: relative;
      padding: 20rpx;
      margin-bottom: 8rpx;
      background: #FFDBDB;

      .label {
        width: 100%;
        font-size: 12px;
        color: #363636;
        text-align: left;
      }

      .value {
        width: 100%;
        font-size: 12px;
        color: #FF2929;
        text-align: left;
      }
    }

    .detail-btn {
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      width: 30rpx;
      height: 30rpx;
      border-radius: 50%;
      background-color: #1F1F1F;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
