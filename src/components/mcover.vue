<template>
    <div class="a-container">
        <div class="a-cover">
           <div class="back-home" @click="$emit('onBack')">返回首页</div>
           <div class="favorite"><i class="iconfont collection" @click="onCollect" :class="{'icon-tubiao_shoucang':!collected,'icon-tubiao_yishoucang':collected,'active':collected}"></i></div>
           <img :src="coverurl" class="cover-img">
           <img class="bottom-mask" :src="bottomMaskUrl">
           <div class="a-title" v-show="title!=''">
               <!-- <icon class="iconfont icon-dizhi a-title-icon"></icon> -->
               <span>{{title}}</span>
           </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    coverurl: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    collected:{
      type:Boolean,
      default:false
    }
  },
  data: () => ({
    bottomMaskUrl: require("../../static/imgs/bottommask.png")
  }),
  methods:{
    onCollect(){
      
      this.$emit("onCollectChange",this.collected)
    }
  }
};
</script>

<style scoped lang="less">
.icon-tubiao_yishoucang.active{
  color: rgb(255, 128, 151);  
}
.collection{
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  right: 25rpx;
  top: 25rpx;
  font-size: 25px;
}
.a-cover {
  position: relative;
  width: 100%;
  height: 400rpx;
  background: gray;
  .back-home{
    position: absolute;
    background: rgba(255,255,255,0.8);
    border-radius: 35rpx;
    font-size: 28rpx;
    padding: 6rpx 18rpx;
    left: 25rpx;
    top: 25rpx;
  }
  .cover-img {
    width: inherit;
    height: inherit;
  }
  .bottom-mask {
    height: 71rpx;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .a-title {
    z-index: 2;
    position: absolute;
    bottom: 20rpx;
    left: 33rpx;
    color: #ffffff;
    font-weight: bold;
    .a-title-icon {
      margin-right: 15rpx;
    }
  }
}

.a-container {
}
</style>
