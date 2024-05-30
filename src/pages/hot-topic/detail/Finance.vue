<script>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<script setup>
import { ref } from '@vue/composition-api'
import NormalTable from '../../../components/MTable/normal.vue'
import TabsColumn from '../../../components/Tabs/column.vue'

const activeKey = ref('')
const sidebarList = ref([
  { name: '营业总收入', value: '' },
  { name: '总收入同比增长率', value: '' },
  { name: '扣非净利润', value: '' },
  { name: '扣非净利润增长率', value: '' },
  { name: '销售毛利率', value: '' },
  { name: '销售净利率', value: '' },
  { name: '资产负债率', value: '' },
])

const column = ref([
  {
    label: '个股名称',
    prop: 'name',
    fixed: 'left',
    width: '150rpx'
  },
  {
    label: '财务',
    prop: '10-14',
    width: '150rpx'
  },
  {
    label: '当天涨幅',
    prop: '10-13',
    width: '150rpx'
  },
  {
    label: '当天涨幅',
    prop: '10-12',
    width: '150rpx',
    slot: 'customCell'
  },
  {
    label: '当天涨幅',
    prop: '10-11',
    width: '150rpx',
    slot: 'customCell'
  }
])

const tableData = ref([
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
  {
    'name': '个股名称',
    '10-14': '2.45亿',
    '10-13': '+0.55%',
    '10-12': '213',
    '10-11': '435'
  },
])

</script>

<template>
  <view class="finance-section">
    <view class="filter-box">
      <view class="prev">
        <view class="icon">
          <u-icon name="arrow-left" color="#ffffff" size="30"></u-icon>
        </view>
        上一季度
      </view>
      <view class="curr">
        <view class="icon">
          <u-icon name="calendar-fill" color="#ffffff" size="30"></u-icon>
        </view>
        2023年中报
        <view class="icon">
          <u-icon name="arrow-down" color="#ffffff" size="30"></u-icon>
        </view>
      </view>
      <view class="next">
        下一季度
        <view class="icon">
          <u-icon name="arrow-right" color="#ffffff" size="30"></u-icon>
        </view>
      </view>
    </view>
    <view class="container">
      <view class="left">
        <TabsColumn
          style="width: 100%;"
          :list="sidebarList"
          :current="currentTab"
          @change="handleTabChange"
        />
        <van-sidebar :active-key="activeKey">
          <van-sidebar-item v-for="item in sidebarList" :key="item.label">
            <template #title>
              <view class="label">{{ item.label }}</view>
              <view class="value">{{ item.value }}</view>
            </template>
          </van-sidebar-item>
        </van-sidebar>
      </view>
      <view class="right">
        <NormalTable :column="column" :data="tableData"></NormalTable>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.finance-section {
  height: 100%;
  display: flex;
  flex-direction: column;

  .filter-box {
    width: calc(100% - 20rpx);
    height: 60rpx;
    padding: 0 10rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10rpx 0;
    .prev {
      height: 100%;
      flex: 2;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 18rpx;
      font-size: 14px;
      color: #363636;
      .icon {
        margin-right: 10rpx;
      }
    }
    .curr {
      height: 100%;
      flex: 3;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-radius: 18rpx;
      font-size: 14px;
      color: #363636;
      margin-left: 10rpx;
      margin-right: 10rpx;
      padding: 0 20rpx;
      .icon {
        margin: 0 10rpx;
      }
    }
    .next {
      height: 100%;
      flex: 2;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 18rpx;
      font-size: 14px;
      color: #363636;
      .icon {
        margin-left: 10rpx;
      }
    }
    .icon {
      width: 36rpx;
      height: 36rpx;
      border-radius: 50%;
      background-color: #eb5a3a;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .container {
    height: calc(100% - 80rpx);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    .left {
      position: relative;
      width: calc(100% / 3 + 30rpx);
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .right {
      width: calc(100% / 3 * 2 - 30rpx);
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
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
}
</style>
