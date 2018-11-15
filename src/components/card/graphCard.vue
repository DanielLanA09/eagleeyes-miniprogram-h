<template>
    <div class="card-box">
        <div class="card-content">
            <div class="card-cover" @click="onClick()">
                <img :src="setImg">
            </div>
            <div class="content">
                <div class="title" @click="onClick()">
                    <div class="title">{{info.title}}</div>
                </div>
                <div class="h-between" v-if="houseType!=''">
                    <div class="houstype">{{houseType}}<span class="mark"> {{setMark}}</span></div>
                    <div class="price">￥{{info.price}}</div>
                </div>
                <div @click="onClick()" :class="{'e-margin-top-20':houseType!=''?false:true}">
                    <!-- <start-mark :value="info.mark"></start-mark> -->
                    <div class="notation" >
                        <!-- <notation :list="info.tags" :marginRight="24" :acceptType="'1'" :fontsize="'20'" :backgroundColor="'#4ad9b7'" :fontColor="'white'" :clickable="false" :width="'128'" :height="'40'"></notation> -->
                        <word-tag :list="info.tags" :title="'优点'"></word-tag>
                    </div>
                    <div class="notation" >
                        <!-- <notation :list="info.tags" :marginRight="24" :acceptType="'2'" :fontsize="'20'" :backgroundColor="'#ff8097'" :fontColor="'white'" :clickable="false" :width="'128'" :height="'40'" ></notation> -->
                        <word-tag :list="info.tags" availType="DISADVANTAGE" :title="'缺点'" :titleColor="'#ff8097'" :borderColor="'#ff8097'"></word-tag>
                    </div>
                </div>
                <div :class="{'e-margin-top-20':houseType!=''?false:true}" class="footer" >
                    <span @click="goMap"><i class="iconfont icon-dizhi place"></i> {{info.address}}</span>
                    <!-- <span>
                      <button :id="info.id" class="share-button" open-type="share" @click="goShare"><i class="iconfont icon-msnui-share forward"></i> {{info.forwardCount}}</button>
                    </span> -->
                    <span><i class="iconfont icon-liulan view-count"></i> {{info.viewC}}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import notation from "@/components/notation";
import startMark from "@/components/progress/startMark";
import wordTag from "@/components/tags/WordTag";
import api from "@/api";
export default {
  props: {
    info: {
      type: Object,
      default: {
        id: 0,
        title: "",
        address: "",
        viewC: 0,
        transmitC: 0,
        img: "",
        latitude: "",
        longitude: "",
        tags: [
          {
            name: "房型丰富",
            value: "房型丰富",
            active: false
          }
        ],
        mark: 80,
        price: 15000
      }
    },
    houseType: {
      type: String,
      default: ""
    }
  },
  computed: {
    setMark() {
      return (this.info.mark / 10).toFixed(1);
    },
    setImg() {
      if (this.info.img) {
        let imgs = this.info.img.split("|");
        return this.$store.state.BASE_HOST + imgs[0];
      } else {
        return "";
      }
    }
  },
  watch: {
    canvasId() {}
  },
  components: {
    notation,
    startMark,
    wordTag
  },
  data() {
    return {
      // canvasId: "mark1"
      host: this.$store.state.BASE_HOST
    };
  },
  methods: {
    goMap() {
      let me = this;
      wx.navigateTo({
        url:
          "/pages/map/main?latitude=" +
          me.info.latitude +
          "&longitude=" +
          me.info.longitude +
          "&name=" +
          me.info.address
      });
    },
    onClick() {
      this.$emit("onClick", this.info);
    }
  }
};
</script>

<style lang="less" scoped>
.card-box {
  position: relative;
  margin: 25rpx 0;
  height: 128px;
  width: 100%;
  .card-content {
    box-shadow: 0 0 5rpx 5rpx #e5e9ef;
    border-radius: 25rpx;
    display: flex;
    justify-content: space-between;
    .card-cover {
      margin: 14rpx 17rpx;
      height: 112px;
      width: 112px;
      img {
        height: inherit;
        width: inherit;
        background: gray;
        border-radius: 30rpx;
      }
    }
    .content {
      // width: 455rpx;
      float: right;
      margin-top: 20rpx;
      .title {
        font-size: 15px;
        color: #333333;
        font-weight: 500;
        width: 230px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .houstype {
        font-size: 12px;
        color: #656565;
        .mark {
          font-size: 16px;
          font-weight: 600;
          color: #fdb700;
        }
      }
      .price {
        font-size: 24rpx;
        color: #4d4d44;
        font-weight: 600;
        // margin-left: 10px;
        margin-right: 30rpx;
        font-weight: 500;
      }
      .footer {
        margin: 5px 0;
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        font-size: 20rpx;
        color: #999;
        padding-right: 30rpx;
        .place {
          display: inline-block;
          font-size: 20rpx;
          color: #b3b3b3;
        }
        .view-count {
          display: inline-block;
          font-size: 20rpx;
          color: #b3b3b3;
        }
        .forward {
          display: inline-block;
          height: 2rpx;
          font-size: 20rpx;
          color: #b3b3b3;
        }
      }
    }
  }
}
.notation {
  margin-top: 2px;
  // height: 54rpx;
  overflow: hidden;
  padding-right: 5px;
}

.echarts-wrap {
  width: 100%;
  height: 300px;
}

.share-button {
  padding: 0;
  border: none;
  background: rgba(0, 0, 0, 0);
  font-size: 20rpx;
  color: #808080;
  top: -12rpx;
}
button::after {
  border: none;
}
</style>
