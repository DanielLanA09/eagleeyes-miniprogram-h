<template>
    <div class="k-container">
        <span class="eagle-font-22-gray key" :style="{minWidth:width+'rpx',marginRight:marginRight+'rpx'}">{{keyName}}</span>
        <span class="eagle-font-22-black value" :style="{minWidth:width+'rpx',marginRight:marginRight+'rpx'}">{{keyValue}}</span>
    </div>
</template>

<script>
export default {
  props: {
    keyName: {
      type: String,
      default: "标题名字"
    },
    keyValue: {
      type: String,
      default: "标题内容"
    },
    width:{
      type:Number,
      default:50
    },
    marginRight:{
      type:Number,
      default:0
    }
  }
};
</script>

<style scoped lang="less">
.k-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 15rpx;
  span {
    margin: 7.5rpx 0;
  }
  .key{
    font-weight: 300;
  }
  .value{

  }
}
</style>
