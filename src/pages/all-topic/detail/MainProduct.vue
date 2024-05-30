<script setup>

</script>

<template>
  <view class="main-product">
    <view class="section-block">
      <view class="title">主营亮点</view>
      <view class="desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas animi aliquam inventore! Necessitatibus quisquam provident accusamus fugiat, velit architecto commodi, veniam, earum atque quaerat distinctio sed fuga. Voluptate, numquam eaque.
        <view class="desc-btn">详细介绍</view>
      </view>
    </view>
    <view class="section-block">
      <view class="title">题词啊图谱</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.main-product {
  width: calc(100% - 20rpx);
  margin: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .section-block {
    .title {
      position: relative;
      padding-left: 15rpx;
      font-size: 16px;
      color: #000;
      font-weight: 700;
      border-left: 4rpx solid #FE2C2B;
    }
  }
}
</style>