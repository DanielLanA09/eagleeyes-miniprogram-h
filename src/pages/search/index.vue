<template>
  <div class="search-back">
    <div class="h-padding-34">
      <div>
        <div class="search-block">
          <input type="text" placeholder="搜索您要找的小区、楼盘" @confirm="onConfirm" v-model="keyword">
          <div class="search-button" @click="onConfirm">
            <span>{{searchWord}}</span>
          </div>
          <span class="iconfont icon-sousuo"></span>
          <span class="iconfont icon-quxiao" @click="deleteKeyword" v-show="showDelete"></span>
        </div>
      </div>
    </div>
    <div class="switch">
      <div class="item" :class="{active:articleSwitch==1?true:false}" @click="articleSwitch=1">小区</div>
      <div class="item" :class="{active:articleSwitch==2?true:false}" @click="articleSwitch=2">文章</div>
    </div>
    <div class="h-padding-34 hot-key" v-if="articleSwitch==1&&showHotKey">
      <div class="hot-title">热门楼盘</div>
      <notation
        :width="150"
        :list="list"
        @onClick="onNotationClick"
        :marginRight="10"
        :backgroundColor="'rgba(245,245,245,1)'"
        :fontColor="'rgba(51,51,51,1)'"
        :clickable="false"
        :isNonBack="true"
        :borderColor="'rgba(245,245,245,1)'"
      ></notation>
    </div>
    <div class="h-padding-34 hot-key" v-if="articleSwitch==2">
      <div class="hot-title">热门文章</div>
      <div
        class="subtitle"
        v-for="(l,k) in blockArticle.links"
        :key="k"
        @click="onAritcleClick(l)"
      >{{l.title}}</div>
    </div>
    <div v-if="articleSwitch==1">
      <!-- 当没有结果时 -->
      <div v-if="!showResult" class="search-noresult">
        <div class="h-padding-34 info">
          <!-- <i class="iconfont icon-wu" ></i> -->
          <span class="no-data-tip">该小区数据暂未对外开放</span>
        </div>
        <div class="h-padding-34 recommend">
          <!-- <div style="font-size:36rpx;">推荐楼盘</div>
              <div v-for="(r,k) in recommenList" :key="k">
                <g-card :info="r" @onClick="goView"></g-card>
          </div>-->
          <div class="img-block">
            <img :src="host + 'search-analysis.png'" class="search-img">
            <img :src="host + 'search-ask2.png'" class="search-ask" @click="setClipboardData">
          </div>
        </div>
      </div>
      <!-- 当有结果时 -->
      <div class="h-padding-34 search-result" v-if="showResult">
        <div v-for="(r,k) in searchList" :key="k">
          <g-card :info="r" @onClick="goView"></g-card>
        </div>
      </div>
    </div>
    <div v-if="showResult" class="change" @click="fresh">
      <div class="e-center content">
        <i class="iconfont icon-dingbu-"></i>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import mSearch from "@/components/search/simpleSearch";
import notation from "@/components/notation";
import gCard from "@/components/card/resultCard";

export default {
  components: {
    mSearch,
    notation,
    gCard
  },
  onLoad() {
    this.keyword = "";
    this.searchList = [];
    this.recommenList = [];
    api.getHomeBlockByType("HOT", res => {
      if (res.data[0]) {
        this.blockArticle = res.data[0];
      }
    });
  },
  data() {
    return {
      list: [
        {
          tagName: "世纪城",
          value: "世纪城",
          active: false,
          tagType: "ADVANTAGE"
        },
        {
          tagName: "碧海花园",
          value: "碧海花园",
          active: false,
          tagType: "ADVANTAGE"
        },
        {
          tagName: "会展城(A区)",
          value: "会展城",
          active: false,
          tagType: "ADVANTAGE"
        },
        {
          tagName: "会展城(B区)",
          value: "会展城",
          active: false,
          tagType: "ADVANTAGE"
        },
        {
          tagName: "金华园",
          value: "金华园",
          active: false,
          tagType: "ADVANTAGE"
        },
        {
          tagName: "美的林城",
          value: "林城时代",
          active: false,
          tagType: "ADVANTAGE"
        },
        {
          tagName: "新世界",
          value: "新世界",
          active: false,
          tagType: "ADVANTAGE"
        },
        {
          tagName: "中铁逸都",
          value: "中铁逸都",
          active: false,
          tagType: "ADVANTAGE"
        }
      ],
      showHotKey: true,
      showResult: true,
      keyword: "",
      searchList: [],
      recommenList: [],
      searchWord: "搜索",
      showDelete: false,
      cpage: -1,
      _cpage: -1,
      articleSwitch: 1,
      blockArticle: {
        links: []
      },
      host: api.BASE_HOST
    };
  },
  computed: {
    setKeyword() {
      if (this.keyword == "") {
        this.showHotKey = true;
        this.showResult = true;
        this.showDelete = false;
        this.searchList = [];
        this.recommenList = [];
      } else {
        this.showDelete = true;
      }
    }
  },
  onReachBottom() {},
  methods: {
    fresh() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 1000
      });
    },
    setClipboardData() {
      wx.setClipboardData({
        data: "Ivan_Ivan2",
        success(res) {
        }
      });
    },
    onAritcleClick(i) {
      console.log(i);
      if (i.linkType == "PUBLIC_ARTICLE") {
        wx.navigateTo({
          url: "/pages/blog/main?url=" + i.link
        });
      } else {
        api.findCoversByTitle(i.title, res => {
          if (!res.success || res.data.length == 0) {
            console.log("DID NOT FOUND THIS ARTICLE");
            return;
          }
          this.$store.commit("SET_CURRENT_COVER", res.data[0]);
          api.addViewPoint(res.data[0].coverId);
          wx.navigateTo({
            url: "/pages/preface/main?id=" + res.data[0].coverId
          });
        });
      }
    },
    goView(e) {
      this.$store.commit("SET_CURRENT_COVER", e);
      api.addViewPoint(e.coverId);
      wx.navigateTo({
        url: "/pages/preface/main?id=" + e.coverId
      });
    },
    deleteKeyword() {
      this.keyword = "";
    },
    goHome(value) {
      wx.navigateTo({
        url: "/pages/home/main?keyword=" + value
      });
    },
    searchResponse(info) {
      wx.setNavigationBarTitle({
        title: info //页面标题为路由参数
      });
      let me = this;
      if (me.cpage == -2) {
        return;
      }
      if (me.cpage == -1) {
        me.searchList = [];
      }
      me.cpage++;
      wx.showLoading({
        title: "加载中",
        mask: true
      });

      api.findCoversByTitle(info, res => {
        if (res.success) {
          wx.hideLoading();
          if (res.data.length == 0) {
            me.showResult = false;
            me.showHotKey = true;
            me.searchRecommend(me);
          } else {
            me.showResult = true;
            me.showHotKey = false;
          }
          this.searchList = res.data;
        }
      });
    },
    searchRecommend(me) {
      if (me._cpage == -2) {
        return;
      }
      if (me._cpage == -1) {
        me.recommenList = [];
      }
      me._cpage++;
      wx.showLoading({
        title: "加载中",
        mask: true
      });
      api.findCoversByTitle("世纪城", res => {
        if (res.success) {
          me.recommenList = res.data;
          wx.hideLoading();
        }
      });
    },
    onNotationClick(info) {
      this.cpage = -1;
      this.searchResponse(info.value);
      this.keyword = info.value;
      info.active = true;
    },
    onConfirm() {
      this.cpage = -1;
      this._cpage = -1;
      let type = "HOT";
      if (this.articleSwitch == 1) {
        this.searchResponse(this.keyword);
      } else {
        if (this.keyword.length > 0) {
          type = "ARTICLE";
        }
        api.getHomeBlockByTypeAndTitle(type, this.keyword, res => {
          this.blockArticle = res.data[0];
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.h-padding-34 {
  padding: 0 8px;
}
.expected {
  border-radius: 25rpx;
  box-shadow: 0 0 1rpx 1rpx rgb(75, 206, 175);
  border: solid 1px rgb(75, 206, 175);
  font-size: 28rpx;
  padding: 0 40rpx;
  -webkit-appearance: none;
}
.switch {
  padding: 25rpx 158rpx;
  display: flex;
  justify-content: space-between;
  border-top: solid 2px rgba(245, 245, 245, 1);
  border-bottom: solid 2px rgba(245, 245, 245, 1);
  margin-top: 20rpx;
  .item {
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .item.active {
    border-bottom: solid 2px rgba(51, 51, 51, 1);
  }
}
.search-block {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rpx;
  .search-button {
    margin-left: 16rpx;
    width: 100rpx;
    height: 64rpx;
    padding: 0;
    font-size: 26rpx;
    color: rgb(75, 206, 175);
    border-radius: 50rpx;
    box-shadow: 0 0 1rpx 1rpx #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    background: #f5f5f5;
    border-radius: 50rpx;
    font-size: 28rpx;
    padding-left: 82rpx;
    padding-right: 82rpx;
    height: 64rpx;
    width: 500rpx;
    -webkit-appearance: none;
  }
  .icon-sousuo {
    position: absolute;
    top: 19rpx;
    left: 34rpx;
    color: #cecece;
  }
  .icon-quxiao {
    position: absolute;
    top: 19rpx;
    right: 120rpx;
    color: #cecece;
    z-index: 20;
  }
}
.hot-key {
  .hot-title {
    font-size: 32rpx;
    color: rgb(68, 72, 78);
    margin-top: 48rpx;
    margin-bottom: 30rpx;
    margin-left: 32rpx;
    font-weight: 600;
  }
  .subtitle {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
    padding-left: 32rpx;
    margin-top: 50rpx;
  }
  .subtitle:first-child {
    margin-top: 0;
  }
}
.search-noresult {
  .no-data-tip {
    display: inline-block;
    margin-top: 26px;
    margin-bottom: 26px;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(153, 153, 153, 1);
    opacity: 1;
  }
  .img-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .search-img {
      width: 648rpx;
      height: 446rpx;
    }
    .search-ask {
      width: 100%;
      height: 106rpx;
      box-shadow: 8px 11px 17px rgba(85, 237, 181, 0.16);
      opacity: 1;
    }
  }

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 120rpx;
    }
    span {
      font-size: 28rpx;
      color: rgb(128, 128, 128);
    }
  }
  .recommend {
    padding-top: 30rpx;
    border-top: solid 10rpx rgb(245, 245, 245);
  }
}
.change {
  position: fixed;
  right: 30rpx;
  bottom: 100rpx;
  background: white;
  border-radius: 100%;
  box-shadow: 0 0 5rpx 5rpx rgba(9, 48, 114, 0.1);
  .content {
    width: 84rpx;
    height: 84rpx;
    border-radius: 100%;
    i {
      font-size: 30px;
      color: #808080;
    }
  }
}
</style>
