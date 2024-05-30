<script>
export default {
  options: {
    styleIsolation: 'shared',
    disableScroll: false
  }
}
</script>

<script setup>
import { ref, onMounted } from '@vue/composition-api'
import MTable from '../../../components/MTable'
import { getAllTopicWheel } from '../../../api/index'
import dayjs from 'dayjs'

const currentMenu = ref('1')
const column = ref([])

const tableData = ref([])

const handleMenuClick = (menu) => {
  currentMenu.value = menu
  fetchTableData()
}

const fetchTableData = async () => {
  const endDate = dayjs().startOf('day').format('YYYY-MM-DD')
  const startDate = dayjs().subtract(30, 'day').format('YYYY-MM-DD')
  const res = await getAllTopicWheel(startDate, endDate, currentMenu.value)
  if (res) {
    column.value = [
      {
        label: '排名',
        prop: 'index',
        fixed: 'left',
        width: '100rpx'
      }
    ]
    tableData.value = []
    const keys = Object.keys(res)
    keys.forEach(item => {
      column.value.push({
        label: dayjs(item).format('MM月DD日'),
        prop: item,
        width: '150rpx'
      })
    })
    const values = Object.values(res)
    if (values) {
      values[0].forEach(item => {
        tableData.value.push({})
      })
      tableData.value.forEach((item, i) => {
        keys.forEach((key, ki) => {
          const cellItem = values[ki][i]
          item[key] = {
            ...cellItem,
            value: cellItem.rate + '%'
          }
        })
      })
    }
  } else {
    column.value = []
    tableData.value = []
  }
}

const handleCellClick = (item) => {
  uni.navigateTo({
    url: `/pages/hot-topic/detail/index?id=${item.subjectId}`
  })
}

onMounted(() => {
  fetchTableData()
})
</script>

<template>
  <view class="wheel-tab">
    <view class="top-menu">
      <view :class="['menu', currentMenu === '1' ? 'active' : '']" @click="handleMenuClick('1')">涨停数量</view>
      <view :class="['menu', currentMenu === '2' ? 'active' : '']" @click="handleMenuClick('2')">资金净流入</view>
      <view :class="['menu', currentMenu === '3' ? 'active' : '']" @click="handleMenuClick('3')">涨幅</view>
    </view>
    <view class="table-view">
      <template>
        <m-table :column="column" :data="tableData" @cellClick="handleCellClick"></m-table>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
.wheel-tab {
  height: 100%;
  background-color: #fff;
  border: 1rpx solid #FF5427;
  border-radius: 8rpx;
  .top-menu {
    width: 100%;
    height: 70rpx;
    line-height: 60rpx;
    display: flex;
    justify-content: space-between;
    .menu {
      flex: 1;
      font-size: 16px;
      color: #363636;
      text-align: center;
      &.active {
        color: #FE2C2B;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: 8rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 54rpx;
          height: 4rpx;
          border-radius: 4rpx;
          background-color: #FE2C2B;
          overflow: hidden;
        }
      }
    }
  }
  .table-view {
    width: 100%;
    height: calc(100% - 70rpx);
    overflow: hidden;
  }
}
</style>
