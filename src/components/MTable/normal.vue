<script>
export default {
  options: {
    multiSlots: true
  }
}
</script>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  column: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div
    class="mobile-table"
    :style="{
      width: width,
      height: height
    }"
  >
    <div class="table-container">
      <div class="table-header">
        <div
          v-for="item in column"
          :class="['header-cell', item.fixed ? 'sticky-left' : '']"
          :key="'header-' + item.label"
          :style="{ width: item.width }"
        >
          <div class="cell-txt">
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="table-body">
        <div class="table-body-normal">
          <div
            class="table-row"
            v-for="(row, index) in data"
            :key="'row-' + index"
          >
            <div
              v-for="item in column"
              :key="item.prop"
              :class="['row-cell', item.fixed ? 'sticky-left' : '']"
              :style="{ width: item.width }"
            >
              <div class="cell-txt">
                {{ row[item.prop] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-table {
  overflow: hidden;
  .table-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    overflow-y: scroll;
    .table-header {
      position: sticky;
      top: 0;
      width: fit-content;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      line-height: 1.5;
      border-bottom: 1rpx solid #FF5427;
    }
    .table-body {
      width: fit-content;
      height: calc(100% - 60rpx);
      .table-row {
        width: fit-content;
        line-height: 1.5;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        border-bottom: 1rpx solid #FF5427;
        transform: rotateZ(360deg)
      }
    }
  }
  .header-cell {
    min-height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFECEC;
    font-size: 12px;
    color: #000;
    &:not(:last-child) {
      border-right: 1rpx solid #FF5427;
    }
    &.sticky-left {
      position: sticky;
      left: 0;
      z-index: 2;
    }
  }
  .row-cell {
    min-height: 60rpx;
    padding: 10rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    font-size: 12px;
    color: #000;
    &:not(:last-child) {
      border-right: 1rpx solid #FF5427;
      transform: rotateZ(360deg)
    }
    &.sticky-left {
      position: sticky;
      left: 0;
      z-index: 2;
    }
  }
  .cell-txt {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .value {
      color: #FF5427;
    }
    .index {
      font-size: 18px;
      color: #FF6325;
    }
  }
}
</style>
