<template>
  <div>
    <div class="e-center">
      <img class="cover-img" src="" alt="" srcset="">
    </div>


    <div class="e-center margin-top-32">
      <div class="input-block">
        <textarea maxlength="-1" class="reply-text"></textarea>
        <div class="input-footer">
          <div class="h-center check">
            <div class="font-style1">匿名</div>
            <span class="iconfont icon-duigou"></span>
          </div>
          <div class="button-green">我要咨询</div>
        </div>
      </div>
    </div>
    <div class="hot">热门 <span class="iconfont icon-arrow-left"></span></div>
    <div class="question-block">
      <div class="card">
        <div class="block-item">
          <div class="tangent red">问</div>
          <div class="content">你们觉得世纪城的龙会员的房子怎么样？有人了解嘛？想在哪里入手一套二手房，这个小程序准吗？</div>
        </div>
        <div class="h-between">
          <div class="asker">Linda</div>
          <div class="asker">2018-07-15 14:30</div>
        </div>
        <div class="block-item">
          <div class="tangent green">答</div>
          <div class="content black">小程序写得蛮真实的，最大的问题就是小学困难，距离真心远，孩子上学要来回接送，仔细看看小程序，还是不错的，不过世纪城整体有点乱，还是好好。阿斯顿发顺丰asdfas 大撒发射点发。</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data: () => ({}),
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="less">
.margin-top-32 {
  margin-top: 32rpx;
}
.cover-img {
  width: 714rpx;
  height: 304rpx;
  background: rgba(0, 0, 0, 0);
  box-shadow: 0px 4rpx 20rpx rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 30rpx;
  margin-left: auto;
  margin-right: auto;
}
.input-block {
  width: 714rpx;
  height: 352rpx;
  background: rgba(240, 240, 240, 1);
  box-shadow: 0rpx 4rpx 20rpx rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 30rpx;
}
.reply-text {
  width: 666rpx;
  height: 222rpx;
  padding: 24rpx 24rpx;
  font-size: 28prx;
  font-weight: 400;
  line-height: 40rpx;
  color: rgba(155, 155, 155, 1);
  opacity: 1;
}
.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 82rpx;
  padding: 0 20rpx;
}
.check {
  width: 124rpx;
  height: 56rpx;
  background: rgba(227, 227, 227, 1);
  opacity: 1;
  border-radius: 12rpx;
}
.font-style1 {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 40rpx;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
}
.icon-duigou {
  width: 32rpx;
  height: 32rpx;
  background: rgba(242, 242, 242, 1);
  opacity: 1;
  border-radius: 6rpx;
  margin-left: 8rpx;
  color: rgba(227, 227, 227, 1);
}
.icon-duigou.active {
  background: rgba(106, 223, 195, 1);
  color: white;
}
.button-green {
  width: 180rpx;
  height: 56rpx;
  background: rgba(106, 223, 195, 1);
  opacity: 1;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 56rpx;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
.hot {
  padding: 48rpx 0 32rpx 32rpx;
  // width: 72rpx;
  height: 50rpx;
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 50rpx;
  color: rgba(23, 51, 44, 1);
  opacity: 1;
}
.question-block {
  display: flex;
  justify-content: center;
}
.card {
  width: 720rpx;
  height: 392rpx;
  background: rgba(252, 252, 252, 1);
  box-shadow: 0rpx 4rpx 20rpx rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 30rpx;
  .block-item {
    display: flex;
    align-items: flex-start;
    padding: 36rpx 16rpx 0 16rpx;
    .tangent {
      width: 48rpx;
      height: 48rpx;
      display: inline-block;
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 48rpx;
      text-align: center;
      color: rgba(242, 242, 242, 1);
      opacity: 1;
      border-radius: 12rpx;
    }
    .tangent.red {
      background: rgba(255, 128, 151, 1);
    }
    .tangent.green {
      background: rgba(106, 223, 195, 1);
    }
    .content {
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 36rpx;
      color: rgba(51, 51, 51, 1);
      opacity: 1;
      width: 624rpx;
      height: 101rpx;
      margin-left: 16rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .content.black {
      background: rgba(242, 242, 242, 1);
      opacity: 1;
      border-radius: 16rpx;
      padding: 16rpx 16rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      opacity: 1;
    }
  }
  .h-between{
    padding-left: 96rpx;
    padding-right: 46rpx;
  }
  .asker {
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 300;
    color: rgba(154, 154, 154, 1);
    opacity: 1;
  }
}
</style>
