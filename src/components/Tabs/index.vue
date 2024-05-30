<script setup>
import { ref, defineEmits } from '@vue/composition-api'

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  current: {
    type: Number,
    default: 0
  },
  direction: {
    type: String,
    default: 'row'
  },
  scroll: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change'])

const active = ref(props.current)

const handleClick = (i) => {
  active.value = i
  emit('change', active.value)
}

</script>

<template>
  <view :class="['tabs', 'tabs-' + direction]">
    <view
      v-for="(item, index) in list"
      :key="item.name"
      :class="['tab-item', active === index ? 'active' : '']"
      @click="handleClick(index)"
    >
      <view class="name">{{ item.name }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  &.tabs-row {
    flex-direction: row;
  }
  &.tabs-column {
    flex-direction: column;
  }
  .tab-item {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0;
    flex: 1;
    margin: 0 6rpx;
    background: #ececec;
    border-radius: 7rpx;
    color: #313131;
    font-size: 17px;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    &.active {
      background: linear-gradient(to bottom right, #FF6325, #FE2C2B);
      color: #fff !important;
      font-weight: 600 !important;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 100%);
        width: 0;
        height: 0;
        border: 8rpx solid transparent;
        border-left-width: 4rpx;
        border-right-width: 4rpx;
        border-top-color: #FE2C2B;
      }
    }
  }
}
</style>
