<template>
  <div class="gutter">
    <div class="card" v-for="(l,k) in links" :key="k" @click="onClick(l)">
      <div class="imgbox">
        <img :src="host+l.linkImg">
        <span class="view"><i class="iconfont icon-liulan"></i> {{l.view}}人浏览过</span>
      </div>
      <div class="title">{{l.title}}</div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data: () => ({
    host: "",
    links: []
  }),
  onLoad() {
    this.links=[];
    this.host = api.BASE_HOST;
    let block = this.$store.state.ARTICLE_TABLE;
    if (block.links.length==0) {
      wx.showModal({
        title: "提示",
        content: "暂时没有内容，我们的文案伙伴们会尽快推送，敬请期待！",
        showCancel: false,
        success() {
          wx.navigateBack({
            delta: 1
          });
        }
      });
      return;
    }
    this.links = block.links;
    if (this.links.length == 0) {
    }
    console.log(this.$store.state.ARTICLE_TABLE);
    wx.setNavigationBarTitle({
      title: this.$store.state.ARTICLE_TABLE.name
    });
  },
  methods: {
    onClick(i) {
      api.addLinkView(i.linkId);
      if (i.linkType == "PUBLIC_ARTICLE") {
        wx.navigateTo({
          url: "/pages/blog/main?url=" + i.link
        });
      } else {
        api.findCoversByTitle(i.title, res => {
          if (!res.success || res.data.length == 0) {
            wx.showModal({
              title: "提示",
              content:
                "《" + i.title + "》" + " 这边文章文案正在准备中，敬请期待！"
            });
            return;
          }
          this.$store.commit("SET_CURRENT_COVER", res.data[0]);
          api.addViewPoint(res.data[0].coverId);
          wx.navigateTo({
            url: "/pages/preface/main?id=" + res.data[0].coverId
          });
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.gutter {
  padding: 24rpx 18rpx;
}
.card {
  width: 714rpx;
  height: 404rpx;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rpx 4rpx 20rpx rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 30rpx;
  margin-top: 32rpx;
  .imgbox {
    position: relative;
    img {
      width: 100%;
      height: 304rpx;
      border-radius: 30rpx 30rpx 0rpx 0rpx;
      background: antiquewhite;
    }
    .view {
      position: absolute;
      bottom: 18rpx;
      left: 40rpx;
      height: 28rpx;
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 28rpx;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      .iconfont {
        display: inline-block;
        font-size: 20rpx;
      }
    }
  }
  .title {
    height: 44rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 44rpx;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
    padding-left: 40rpx;
    padding-top: 10rpx;
  }
}
</style>
