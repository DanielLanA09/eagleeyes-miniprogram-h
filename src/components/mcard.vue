<template>
    <div class="c-container">
        <div class="c-cover" @click="showDetail">
            <img :src="cUrl" class="cover-img">
            <img class="cover-bottom-mask" :src="bottomMaskUrl">
            <span class="c-title">{{title}}</span>
        </div>
        <div class="c-notation">
            <div class="c-notation-container">
                <notation :list="notations" :clickable="false" :numLimit="4"></notation>
            </div>
        </div>
        <div class="hr"></div>
        <div class="c-footer">
            <div class="c-footer-item" @click="showPosition" style="width:75px;">
                <icon class="iconfont icon-dizhi"></icon>
                <span>{{position}}</span>
            </div>
            <div class="c-footer-item" style="width:32rpx;">
                <icon class="iconfont icon-liulan"></icon>
                <span>{{viewCount}}</span>
            </div>
            <div class="c-footer-item" shared  open-type="shre">
                <button class="share-button" open-type="share" :id="id" @click="shareInfo"><icon class="iconfont icon-msnui-share" style="top:0"></icon>{{forwardCount}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import notation from "@/components/notation";
export default {
  props: {
    title: {
      type: String,
      default: "碧桂园 茶马古镇"
    },
    cUrl: {
      type: String,
      default: ""
    },
    notations: {
      type: Array,
      default: [
        {
          name: "安静典雅",
          value: "安静典雅",
          active: false
        },
        {
          name: "医院旁",
          value: "医院旁",
          active: false
        },
        {
          name: "高绿化率",
          value: "高绿化率",
          active: false
        },
        {
          name: "地铁房",
          value: "地铁房",
          active: false
        }
      ]
    },
    position: {
      type: String,
      default: "观山湖区"
    },
    id:{
      type:Number,
      default:2
    },
    viewCount: {
      type: String,
      default: "100"
    },
    forwardCount: {
      type: String,
      default: "100"
    }
  },
  data: () => ({
    bottomMaskUrl: require("../../static/imgs/bottommask.png")
  }),
  components: {
    notation
  },
  methods: {
    showPosition() {
      this.$emit("showLocation");
    },
    showDetail() {
      this.$emit("showDetail");
    },
    shareInfo() {
      this.$emit("shareInfo");
    }
  }
};
</script>

<style scoped lang="less">
.share-button{
  padding: 0;
  border: none;
  background: #ffffff;
  font-size: 24rpx;
  color: rgb(179, 179, 179);
}
button::after{
  border: none;
}
.c-footer {
  display: flex;
  align-items: stretch;
  margin-bottom: 20rpx;
  justify-content: space-around;
  .c-footer-item {
    color: rgb(179, 179, 179);
    font-size: 24rpx;
    display: flex;
    align-items: center;
    flex-grow: 1;
    margin: 3px 20px;
    icon {
      position: relative;
      top: -3px;
      margin-right: 5px;
    }
  }
}
.hr {
  position: relative;
  margin: 0 32rpx;
  height: 1px;
  border-bottom: dashed 1px rgb(217, 217, 217);
}
.c-notation {
  display: flex;
  justify-content: center;
  .c-notation-container {
    margin-bottom: 17rpx;
  }
}
.c-cover {
  position: relative;
  height: 400rpx;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 20rpx 32rpx;
  .cover-img {
    height: inherit;
    width: 100%;
  }
  .cover-bottom-mask {
    height: 71rpx;
    width: 690rpx;
    position: absolute;
    bottom: 20rpx;
    left: 32rpx;
    right: 32rpx;
  }
  .c-title {
    position: absolute;
    bottom: 32rpx;
    left: 52rpx;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: 600;

  }
}
.c-container {
  background: #ffffff;
}
</style>
