<template>
  <div>
    <div class="search">
      <input type="text" class="width-full input" placeholder="搜索小区、楼盘、地区" @focus="onSearchFocus">
    </div>
    <div class="swiper">
      <swiper indicator-dots="true" autoplay="true">
        <swiper-item class="swiper-item" v-for="(L,K) in swiperItems[0].links" :key="K" @click="onSwiperClick(L)">
          <img :src="host+L.linkImg">
        </swiper-item>
      </swiper>
    </div>
    <div class="func">
      <div class="button">
        <img :src="testUrl">
        <div class="button-name" >小区测评</div>
      </div>
      <div class="button" @click="onCompare">
        <img :src="compareUrl">
        <div class="button-name">小区对比</div>
      </div>
      <div class="button" @click="onRecommend">
        <img :src="recommendUrl">
        <div class="button-name">定制推荐</div>
      </div>
      <div class="button" @click="onAsk">
        <img :src="askUrl">
        <div class="button-name">您问我答</div>
      </div>
    </div>
    <div class="body">
      <div class="left-block" @click="onMainBodyClick(bodyBlocks1)">
        <img :src="host+bodyBlocks1.blockImg" >
        <div class="title">{{bodyBlocks1.name}}</div>
      </div>
      <div class="right-block">
        <div class="right-top" @click="onMainBodyClick(bodyBlocks2)">
          <img :src="host+bodyBlocks2.blockImg">
          <div class="title">{{bodyBlocks2.name}}</div>
        </div>
        <div class="right-bottom" @click="onMainBodyClick(bodyBlocks3)">
          <img :src="host+bodyBlocks3.blockImg">
          <div class="title">{{bodyBlocks3.name}}</div>
        </div>
      </div>
    </div>
    <div class="hot">
      <div class="">
          <div class="title">
            <div class="subtitle1">热门资讯</div>
            <div class="subtitle2" @click="hotMore">更多>></div>
          </div>
          <scroll-view class="scroll-box" :scroll-x="true" >
              <div class="card" v-for="(h,k) in hots[0].links" :key="k">
                  <img :src="host+h.linkImg" alt="">
                  <div class="info">
                      <div class="name">{{h.title}}</div>
                  </div>
              </div>
          </scroll-view>
      </div>
    </div>
    <div class="test">
      <div class="title">
        <span class="subtitle1">小区测评</span>
        <span class="subtitle2">更多>></span>
      </div>
      <div class="cards">
        <card v-for="(c,k) in coverList" :key="k" :info="c" @onClick="onCardClick"></card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import card from "@/components/card/graphCard";

export default {
  components: {
    card
  },
  data: () => ({
    host: api.BASE_HOST,
    testUrl: require("@/assets/icons/test.png"),
    compareUrl: require("@/assets/icons/compare.png"),
    recommendUrl: require("@/assets/icons/recommend.png"),
    askUrl: require("@/assets/icons/ask.png"),
    swiperItems: {},
    bodyBlocks1: {},
    bodyBlocks2: {},
    bodyBlocks3: {},
    hots: [],
    coverList: [],
    pageable: {
      page: 0,
      size: 5,
      end: false
    }
  }),
  onLoad() {
    this.pageable.end = false;
    this.pageable.page = 0;
    api.getHomeBlocks(res => {
      this.swiperItems = res.data.filter(i => i.blockType == "SWIPER");
      let bodys = res.data.filter(i => i.blockType == "BODY");
      for (let i = 0; i < bodys.length; i++) {
        if (i == 0) {
          this.bodyBlocks1 = bodys[i];
        } else if (i == 1) {
          this.bodyBlocks2 = bodys[i];
        } else if (i == 2) {
          this.bodyBlocks3 = bodys[i];
        }
      }
      this.hots = res.data.filter(i => i.blockType == "HOT");
    });
    this.getHomeCovers();
  },
  onReachBottom() {
    this.pageable.page++;
    this.getHomeCovers();
  },
  methods: {
    getHomeCovers() {
      if (this.pageable.end) {
        return;
      }
      api.getHomeCovers(this.pageable.page, this.pageable.size, res => {
        if (res.data.length == 0) {
          this.pageable.end = true;
          return;
        }
        this.coverList = this.coverList.concat(res.data);
      });
    },
    onMainBodyClick(bodyBlock){
      this.$store.commit("SET_ARTICLE_TABLE",bodyBlock);
      this.navigateTo("/pages/articleTable/main")
    },
    hotMore() {
      this.$store.commit("SET_ARTICLE_TABLE", this.hots[0]);
      this.navigateTo("/pages/articleTable/main");
    },
    navigateTo(path) {
      wx.navigateTo({
        url: path
      });
    },
    onSearchFocus() {
      this.navigateTo("/pages/search/main");
    },
    onRecommend() {
      this.navigateTo("/pages/recommend/main");
    },
    onCompare() {
      this.navigateTo("/pages/compare/main");
    },
    onAsk() {
      wx.showModal({
        title: "提示",
        content: "功能开发中，敬请期待！"
      });
    },
    onSwiperClick(el) {
      if (el.linkType == "PUBLIC_ARTICLE") {
        this.navigateTo("/pages/blog/main?url=" + el.link);
      } else {
        api.findCoversByTitle(el.title, res => {
          if (!res.success || res.data.length == 0) {
            console.log("DID NOT FOUND THIS ARTICLE");
            return;
          }
          this.$store.commit("SET_CURRENT_COVER", res.data[0]);
          api.addViewPoint(res.data[0].coverId);
          this.navigateTo("/pages/preface/main?id=" + res.data[0].coverId);
        });
      }
    },
    onCardClick(e) {
      this.navigateTo("/pages/preface/main?id=" + e.coverId);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="less">
.search {
  padding: 4px 8px;
  .input {
    border-radius: 10px;
    background: rgb(245, 245, 245);
    font-size: 14px;
    color: rgb(153, 153, 153);
    text-align: center;
  }
}
.swiper {
  padding: 4px 8px;
  .swiper-item {
    height: 131px;
    width: 100%;
    img {
      width: inherit;
      height: inherit;
      border-radius: 5px;
    }
  }
}
.func {
  padding: 4px 0px;
  display: flex;
  justify-content: space-around;
  .button {
    img {
      height: 90rpx;
      width: 90rpx;
      border-radius: 100%;
    }
    .button-name {
      font-size: 11px;
      color: rgb(23, 51, 44);
    }
  }
}
.body {
  display: flex;
  padding: 16px 8px;
  .title {
    font-size: 17px;
    font-weight: 600;
    color: rgb(51, 51, 51);
    position: absolute;
    top: 7px;
    left: 7px;
  }
  img {
    width: inherit;
    height: inherit;
    border-radius: 5px;
  }
  .left-block {
    position: relative;
    width: 392rpx;
    height: 308rpx;
    border-radius: 5px;
  }
  .right-block {
    width: 100%;
    height: 100%;
    margin-left: 14rpx;
    .right-top {
      position: relative;
      width: 100%;
      height: 148rpx;
      border-radius: 5px;
    }
    .right-bottom {
      position: relative;
      width: 100%;
      height: 148rpx;
      margin-top: 14rpx;
      border-radius: 5px;
    }
  }
}
.hot {
  padding: 20px 8px;
  border-top: solid 5px rgb(245, 245, 245);
  .title {
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    .subtitle1 {
      font-size: 36rpx;
      color: rgb(23, 51, 44);
      font-weight: 600;
    }
    .subtitle2 {
      font-size: 28rpx;
      color: rgb(23, 51, 44);
      font-weight: 600;
    }
  }
  .scroll-box {
    display: flex;
    white-space: nowrap;
    .card {
      display: inline-block;
      margin: 10rpx 20rpx;
      height: 352rpx;
      width: 400rpx;
      border-radius: 10rpx;
      padding: 0;
      box-shadow: 1px 0 3px 3px rgba(145, 161, 189, 0.15);
      img {
        height: 224rpx;
        width: inherit;
        background: gray;
        border-top-left-radius: 10rpx;
        border-top-right-radius: 10rpx;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 28rpx 18rpx;
        .name {
          font-size: 28rpx;
          font-weight: 600;
        }
      }
    }
    .card:first-child {
      margin-left: 0;
    }
  }
}
.test {
  padding: 8px 8px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .subtitle1 {
      font-size: 36rpx;
      color: rgb(23, 51, 44);
      font-weight: 600;
    }
    .subtitle2 {
      font-size: 28rpx;
      color: rgb(23, 51, 44);
      font-weight: 600;
    }
  }
  .cards {
    margin-top: 20px;
    // height: 500px;
  }
}
</style>
