<template>
    <div class="card-box" >
        <div v-if="edit" class="check" @click="onClick"><i class="iconfont" :class="{'icon-shanchushoucang_weixuanzhong':!info.checked,'icon-shanchushoucang_xuanzhong':info.checked,'active':info.checked}"></i></div>
        <div class="card-content" :class="{'active':info.checked}">
          <div class="card-cover" @click="onClick">
              <img :src="setImg">
          </div>
          <div class="content">
              <div class="title-block h-between" :class="{'edit':edit}" @click="onClick">
                  <div>{{info.title}}</div>
                  <div class="price">￥{{info.price}}</div>
              </div>
              <div @click="onClick" class="notation-blcok">
                  <div class="notation" >
                      <word-tag :list="info.tags" :title="'优点'"></word-tag>
                  </div>
                  <div class="notation" >
                      <word-tag :list="info.tags" availType="DISADVANTAGE" :title="'缺点'" :titleColor="'#ff8097'" :borderColor="'#ff8097'"></word-tag>
                  </div>
              </div>
              <div class="footer">
                  <span @click="goMap"><i class="iconfont icon-dizhi place"></i> {{info.address}}</span>
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
        title: "",
        place: "",
        viewCount: 0,
        forwardCount: 0,
        img: "",
        latitude: "",
        longitude: "",
        notations: [
          {
            name: "",
            value: "",
            active: false
          }
        ],
        mark: 80,
        price: 15000,
        checked:false
      }
    },
    edit:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    setMark() {
      return (this.info.mark / 10).toFixed(1);
    },
    setImg(){
      let imgs=null;
      if(this.info.img){
        imgs = this.info.img.split("|");
        return this.$store.state.BASE_HOST+imgs[0]
      }else{
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
      host: this.$store.state.BASE_HOST,
      
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
          me.info.place
      });
    },
    onClick() {
      this.info.checked = !this.info.checked;
      this.$emit("onClick",this.info);
    }
  }
};
</script>

<style lang="less" scoped>
.check{
  margin:0 5px;
}
.icon-shanchushoucang_xuanzhong.active{
  color: rgb(74, 217, 183);
}
.card-box {
  position: relative;
  margin: 25rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .card-content {
    box-shadow: 0 0 5rpx 5rpx #e5e9ef;
    border-radius: 25rpx;
    display: flex;
    justify-content: space-between;
    .card-cover {
      margin: 14rpx 17rpx;
      img {
        // height: 112px;
        height: 100%;
        width: 112px;
        background: gray;
        border-radius: 30rpx;
      }
    }
    .content {
      // width: 455rpx;
      // margin-top: 20rpx;
      .title-block {
        margin-top: 20rpx;
        font-size: 15px;
        color: #333333;
        font-weight: 500;
        width: 230px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .title-block.edit{
        width: 210px;
      }
      .notation-blcok {
        margin-top: 10px;
        .notation {
          margin-top: 5px;
          // height: 54rpx;
          overflow: hidden;
          padding-right: 5px;
        }
      }
      .footer {
        margin:10px 0;
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
    }
  }
  .card-content.active{
    box-shadow: 0 0 5rpx 5rpx rgb(74, 217, 183);
  }
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
