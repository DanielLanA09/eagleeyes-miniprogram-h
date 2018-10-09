<template>
    <div class="m-container" v-if="shown">
        <div class="m-box">
            <div class="m-title">
                <strong class="eagle-font-underline">{{title}}</strong>
                <span class="eagle-font-mini">本站共{{num}}趟公交车</span>
            </div>
            <div class="m-body">
                <div class="station-block" v-for="(item,index) in list" :key="index">
                  <div class="station-detail">
                    <div class="station-stop">
                      <span class="eagle-font-mini" style="padding:0">首班：{{item.startTime}}</span>
                      <span class="eagle-font-normal">{{item.startStation}}</span>
                    </div>
                    <div class="station-detail-arrow">
                      <span class="eagle-font-title-green">{{item.busNum}}</span>
                      <img :src="arrowUrl" alt="">
                    </div>
                    <div class="station-stop">
                      <span class="eagle-font-mini" style="padding:0">末班：{{item.endTime}}</span>
                      <span class="eagle-font-normal">{{item.endStation}}</span>
                    </div>
                  </div>
              </div>
            </div>
            <div class="m-footer" @click="onClick">
                <span>知道了</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "信息提示"
    },
    list: {
      type: Array,
      default: [
        {
          busNum: "官山东鲁",
          startTime: "6:00",
          endTime: "22:00",
          startStation: "大营坡",
          endStation: "火车站"
        },
        {
          busNum: "官山东鲁",
          startTime: "6:00",
          endTime: "22:00",
          startStation: "大营坡",
          endStation: "火车站"
        },
        {
          busNum: "官山东鲁",
          startTime: "6:00",
          endTime: "22:00",
          startStation: "大营坡",
          endStation: "火车站"
        },
        {
          busNum: "官山东鲁",
          startTime: "6:00",
          endTime: "22:00",
          startStation: "大营坡",
          endStation: "火车站"
        }
      ]
    },
    shown: {
      type: Boolean,
      default: false
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    arrowUrl: require("../../static/imgs/arrow.png")
  }),
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
  .m-box {
    border-radius: 10rpx;
    background: white;
    width: 592rpx;
    .m-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 36rpx;
      color: rgb(39, 39, 39);
      font-weight: bold;
      padding-top: 48rpx;
      padding-bottom: 10rpx;
    }
    .m-body {
      padding-bottom: 40rpx;
      padding-left: 56rpx;
      padding-right: 56rpx;
      border-bottom: solid 1px rgb(231, 231, 231);
      font-size: 28rpx;
      line-height: 48rpx;
      height: 550rpx;
      overflow: scroll;
      .station-block {
        position: relative;
        top: 10rpx;
        margin-top: 10rpx;
        min-height: 50rpx;
        border-radius: 10rpx;
        box-shadow: rgba(0, 0, 0, 0.07) 0rpx 0rpx 2rpx 2rpx;
        padding: 30rpx 14rpx;
        .station-header {
          /* position: relative; */
          display: flex;
          justify-content: space-between;
        }
        .station-name {
          position: relative;
          font-family: PingFangSC-Medium;
          font-size: 36rpx;
          /* line-height: 50rpx; */
          color: #367ccf;
          height: 50rpx;
          margin-top: 25rpx;
        }
        .station-time {
        }
        .station-time span {
          display: block;
          position: relative;
          font-family: PingFangSC-Medium;
          font-size: 20rpx;
          line-height: 50rpx;
          color: #4b4b4b;
        }
        .station-detail {
          position: relative;
          display: flex;
          justify-content: space-between;
        }
        .station-stop {
          position: relative;
          max-width: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .station-detail-arrow {
          img {
            position: relative;
            width: 132rpx;
            height: 15rpx;
          }
          span {
            display: block;
            position: relative;
            font-family: PingFangSC-Medium;
            font-size: 32rpx;
            color: rgb(50, 187, 143);
          }
        }
      }
    }
    .m-footer {
      padding: 37rpx 0;
      display: flex;
      justify-content: center;
      color: rgb(92, 197, 161);
      font-size: 32rpx;
    }
  }
}
</style>
