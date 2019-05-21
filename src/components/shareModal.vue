<template>
    <div class="m-container" v-if="shown">
        
        <div class="m-content">
          <span class="iconfont icon-quxiao" @click="onClick"></span>
          <img :src="host + 'share-img.png'" class="img">
          <div class="text">
            <div>免费查看已用完</div>
            <div>分享微信群可获取免费查看哦</div>
          </div>
          <div>
            <button class="btn" size="mini" open-type="share">立即分享</button>
          </div>
        </div>
    </div>
</template>

<script>
import api from "@/api";
let self = null;
export default {
  props: {
    shown: {
      type: Boolean,
      default: false
    }
  },
  onShareAppMessage: res => {
    self.$emit("afterShare")
    return {
      title: "基于大数据的二手房小区测评",
      path: "/pages/home/main",
      imageUrl: require("../../static/imgs/小程序封面.png")
    };
  },
  data: () => ({
    host: api.BASE_HOST
  }),
  onLoad() {
    self = this
  },
  methods: {
    onClick() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="less">
.m-container {
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 60rpx 60rpx 16rpx 60rpx;
  .m-content{
    border-radius: 10rpx;
    background: white;
    width: 592rpx;
    height: 654rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .icon-quxiao{
      color: #CCCCCC;
      position: absolute;
      right: -10rpx;
      top: -10rpx;
      size: 24rpx;
    }
    .img{
      width: 446rpx;
      height: 368rpx;
    }
    .text{
      text-align: center;
      font-size:13px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:19px;
      color:rgba(55,55,55,1);
      margin: 24rpx 0;
    }
    .btn{
      width: 446rpx;
      background:linear-gradient(90deg,rgba(86,197,233,1) 0%,rgba(85,237,181,1) 100%);
      box-shadow:8px 11px 17px rgba(85,237,181,0.16);
      opacity:1;
      border-radius:21px;
      color: white;
    }
  }
}
</style>
