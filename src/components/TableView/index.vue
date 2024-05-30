<script setup>
defineProps({
  data: {
    type: Array,
    default: []
  }
})
</script>

<template>
  <view class="table-view">
    <view class="column-1" v-for="level1 in data" :key="level1.label">
      <view class="label">{{ level1.label }}</view>
      <view class="child" v-if="level1.child && level1.child.length > 0">
        <view class="column-2" v-for="level2 in level1.child" :key="level2.label">
          <view class="label">{{ level2.label }}</view>
          <view class="child" v-if="level2.child && level2.child.length > 0">
            <view class="column-3" v-for="level3 in level2.child" :key="level3.label">
              <view class="label">{{ level3.label }}</view>
              <view class="value">
                <view class="value-item" v-for="item in level3.value" :key="item.name">{{ item.name }}</view>
              </view>
            </view>
          </view>
          <view class="value" v-else>
            <view class="value-item" v-for="item in level2.value" :key="item.name">{{ item.name }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.table-view {
  width: calc(100% - 30rpx);
  height: calc(100% - 40rpx);
  margin: 20rpx 15rpx;
  display: flex;
  flex-direction: column;
  border-radius: 8rpx;
  background-color: #fff;
  border: 1px solid #ddd;
  .column-1, .column-2, .column-3, .column-4 {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  .column-1 > .label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: #ff0000;
    background-color: #FFDBDB;
    text-align: center;
    border-right: 1px solid #fff;
  }
  .column-2 {
    &:not(:last-child) {
      > .label {
        border-bottom: 1px solid #fff;
      }
      > .child {
        border-bottom: 1px solid #ddd;
      }
    }
  }
  .column-2 > .label {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 110rpx;
    font-size: 14px;
    font-weight: 700;
    color: #000;
    background-color: #FFDBDB;
    text-align: center;
  }
  .column-3 {
    &:not(:last-child) {
      > .label {
        border-bottom: 1px solid #ddd;
      }
      > .value {
        border-bottom: 1px solid #ddd;
      }
    }
  }
  .column-3 > .label {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 140rpx;
    font-size: 13px;
    color: #000;
    text-align: center;
    border-right: 1px solid #ddd;
  }
  .value {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    .value-item {
      height: 55rpx;
      line-height: 55rpx;
      font-size: 13px;
      color: #000;
      margin: 0 6rpx;
    }
  }
  .child {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
