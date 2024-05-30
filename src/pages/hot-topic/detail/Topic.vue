<script setup>
import { ref, computed, watch } from '@vue/composition-api'
import TableView from '../../../components/TableView/index.vue'

const props = defineProps({
  detail: {
    type: Object,
    required: true
  }
})

const tableView = ref([])

const exceptionClause = ref([
  '本公司力求但不保证提供的任何信息的真实性、准确性、完整性及原创性等，投资者使用前请自行予以核实，如有错漏请以中国证监会指定上市公司信息披露媒体为准，本公司不对因上述信息全部或部分内容而引致的盈亏承担任何责任。',
  '本公司无法保证该项服务能满足用户的要求，也不担保服务不会受中断，对服务的及时性、安全性以及出错发生都不作担保。',
  '本公司提供的任何信息仅供投资者参考，不作为投资决策的依据，本公司不对投资者依据上述信息进行投资决策所产生的收益和损失承担任何责任。投资有风险，应谨慎至上。'
])

watch(
  () => props.detail,
  (data) => {
    if (data.children) {
      tableView.value = [
        {
          label: data.name,
          child: data.children.map((item) => {
            if (item.children) {
              const obj = {
                label: item.name,
                child: []
              }
              obj.child = item.children.map(subItem => {
                return {
                  label: subItem.name,
                  value: subItem.stocks
                }
              })
              return obj
            }
            if (item.stocks) {
              return {
                label: item.name,
                value: item.stocks
              }
            }
          })
        }
      ]
    } else {
      tableView.value = [
        {
          label: data.name,
          child: []
        }
      ]
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <view class="topic-section">
    <view class="tips">
      <u-icon name="volume" color="#333" size="30"></u-icon>
      {{ detail.outline }}
    </view>
    <view class="table-view-container">
      <TableView :data="tableView" />
    </view>
    <view class="exception-clause">
      <view class="title">【免责条款】</view>
      <view class="item" v-for="(item, index) in exceptionClause" :key="item">{{ `${index + 1}、${item}` }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.topic-section {
  width: 100%;
  height: 100%;

  .tips {
    position: relative;
    width: calc(100% - 60rpx);
    height: fit-content;
    line-height: 1.5;
    font-size: 12px;
    color: #1f1f1f;
    background-color: #FFECEC;
    padding: 30rpx 30rpx 30rpx 30rpx;

    image {
      position: absolute;
      top: 30rpx;
      left: 30rpx;
      width: 30rpx;
      height: 24rpx;
    }
  }

  .exception-clause {
    padding: 0 40rpx;
    font-size: 11px;
    color: #444;
    line-height: 1.5;
  }
}</style>
