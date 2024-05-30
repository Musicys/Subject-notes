<script setup>
defineProps({
  src: {
    type: String,
    default: '../../static/image/bg.png'
  },
  titleColor: {
    type: String,
    default: '#000'
  }
})

</script>

<template>
  <view class="page-top-bg">
    <image class="bg-image" :src="src"></image>
  </view>
</template>

<style lang="less">
.page-top-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;

  .bg-image {
    width: 100%;
  }
}
</style>
