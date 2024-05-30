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
  },
  showValue: {
    type: Boolean,
    default: true
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
  <view class="tabs tabs-column">
    <view v-for="(item, index) in list" :key="item.name + index" :class="['tab-item', active === index ? 'active' : '']"
      @click="handleClick(index)">
      <view class="name">{{ item.name }}</view>
      <view class="value" v-if="showValue">{{ item.value }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.tabs {
  width: calc(100% - 12rpx);
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 12rpx;

  &.tabs-column {
    flex-direction: column;
  }

  .tab-item {
    position: relative;
    flex: 0 0 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(100% - 20rpx);
    padding: 10rpx;
    line-height: 40rpx;
    margin: 6rpx 0;
    background: #f6f6f6;
    border-radius: 7rpx;
    font-size: 13px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    .name {
      color: #363636;
    }

    .value {
      color: #FE2C2B;
    }

    &.active {
      background: #FE2C2B;
      color: #fff !important;

      .name {
        color: #fff;
      }

      .value {
        color: #fff;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(100%, -50%);
        width: 0;
        height: 0;
        border: 8rpx solid transparent;
        border-top-width: 4rpx;
        border-bottom-width: 4rpx;
        border-left-color: #FE2C2B;
      }
    }
  }
}
</style>
