<template>
    <div class="h-container" v-show="hshow">
        <div class="search-header">
            <mselect @inputChange="inputChange" @reSet="resetSelected" ></mselect>
        </div>
        <div class="cover">
            <img :src="homeCover" >
        </div>
        <div class="slogan-container">
           <div class="slogan">
               <div class="slogan-content">选择“爱人”——适合的才是最好的</div>
           </div>
           <div class="reset">
             <button class="eagle-font-mini" @click="resetSelected" v-if="moreThan4" >重置</button>
           </div>
        </div>
        <div class="notation" >
          <div class="n-content">
            <notation @onChange="notationOnChange" :list="notation.list"></notation>
          </div>
        </div>
        <div class="h-body">
          <div class="h-body-item" v-for="(i,k) in plist" :key="k" >
            <mcard :title="i.title"  :cUrl="coverUrl(i.coverImg)" :notations="i.tags" :position="i.place" :viewCount="i.viewCount" :forwardCount="i.forwardCount" :id="i.id"
            @showDetail="goView(i)" @shareInfo="shareInfo(i)"  @showLocation="showMap(i.latitude,i.longitude,place)"></mcard>
          </div>
        </div>
        <div class="h-footer">
          <div class="loading eagle-font-normal" v-show="loading.shown">
            {{loading.content}}
          </div>
        </div>
        <mmap :position="marker" @onKonwnClick="closeMap" v-if="marker.shown"></mmap>
        <img class="backtotop" :src="backToTopUrl" @click="goBackToTop" v-if="ifGoBackToTop">
    </div>
</template>

<script>
import mselect from "@/components/mselect";
import notation from "@/components/notation";
import mcard from "@/components/mcard";
import mmap from "@/components/mmap";
var mta = require('../../../static/js/mta_analysis.js');

import api from "@/utils/api";
export default {
  components: {
    mselect,
    notation,
    mcard,
    mmap
  },
  data: () => ({
    plist: [],
    cpage: 0,
    hshow: false,
    homeCover: require("../../../static/imgs/homecover.png"),
    search: {
      district: "520115",
      title: "",
      tagStr: ""
    },
    marker: {
      shown: false,
      latitude: 23.099994,
      longitude: 113.32452,
      markers: [
        {
          id: 1,
          latitude: 23.099994,
          longitude: 113.32452,
          name: "T.I.T 创意园"
        }
      ]
    },
    loading: {
      shown: false,
      content: ""
    },
    notation: {
      list: [
        {
          name: "房型丰富",
          value: "房型丰富",
          active: false
        },
        {
          name: "低密度",
          value: "低密度",
          active: false
        },
        {
          name: "配套齐全",
          value: "配套齐全",
          active: false
        },
        {
          name: "交通便利",
          value: "交通便利",
          active: false
        },
        {
          name: "车位充足",
          value: "车位充足",
          active: false
        },
        {
          name: "生活便利",
          value: "生活便利",
          active: false
        },
        {
          name: "学校旁",
          value: "学校旁",
          active: false
        },
        {
          name: "公园旁",
          value: "公园旁",
          active: false
        },
        {
          name: "安静舒适",
          value: "安静舒适",
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
      ],
      activeLength: 0
    },
    backToTopUrl: require("../../../static/imgs/backtotop.png"),
    pageState: {
      scrollTop: 0
    },
    shoreInfo: {
      id: 0
    },
    reSet: false
  }),
  computed: {
    moreThan4() {
      if (this.notation.activeLength > 0) {
        return true;
      } else {
        return false;
      }
    },
    ifGoBackToTop() {
      if (this.pageState.scrollTop > 300) {
        return true;
      } else {
        return false;
      }
    }
  },
  onPageScroll(e) {
    this.pageState.scrollTop = e.scrollTop;
  },
  onLoad() {
    this.cpage = 0;
    this.requestPage();
    this.hshow = true;
    mta.Page.init();
  },
  onShareAppMessage: function(option) {
    if (option.from === "button") {
      return {
        title: "",
        path: "/pages/analysis/main?id=" + option.target.id,
        success: function(res) {
          wx.request({
            url: api.getURL("posts/forwardcount"),
            header: {
              "content-type": "application/json"
            },
            data: { id: option.target.id },
            success: function(res) {
              console.log(res);
            }
          });
        }
      };
    } else {
      return {
        title: "",
        path: "/pages/home/main",
        success: function() {},
        fail: function() {}
      };
    }
  },
  onPullDownRefresh() {
    this.plist = [];
    this.cpage = 0;
    this.requestPage();
  },
  onReachBottom() {
    if (this.cpage == -2) {
      return;
    }
    if (this.cpage == -1) {
      this.loading.shown = true;
      this.loading.content = "敬请期待更多数据，谢谢您的支持和厚爱！";
      return;
    }
    this.cpage++;
    this.requestPage();
  },
  methods: {
    goBackToTop() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 500
      });
    },
    resetSelected() {
      this.notation.list.map(i => {
        i.active = false;
      });
      this.notation.activeLength = 0;
      this.plist = [];
      this.cpage = 0;
      this.requestPage();
    },
    closeMap() {
      this.marker.shown = false;
    },
    showMap(lat, long, name) {
      this.marker = {
        latitude: lat,
        longitude: long,
        markers: [
          {
            id: 1,
            latitude: lat,
            longitude: long,
            name: name
          }
        ],
        shown: true
      };
    },
    shareInfo(cover) {
      this.shoreInfo.id = cover.id;
    },
    goView(i) {
      wx.navigateTo({
        url: "/pages/analysis/main?id=" + i.id
      });
    },
    requestPage() {
      let me = this;
      if (me.cpage == -1) {
        return;
      }
      me.loading.shown = false;

      wx.showLoading({
        title: "加载中",
        mask: true
      });

      wx.request({
        url: api.getURL("posts/list"),
        data: {
          page: me.cpage,
          size: 3,
          sort: "updatedAt,desc"
        },
        header: { "content-type": "application/json" },
        success: function(r) {
          if (r.data.status != 200) {
          }
          if (r.data.data.last) {
            me.cpage = -1;
          }
          me.plist = me.plist.concat(r.data.data.content);
          wx.hideLoading();
        }
      });
    },
    coverUrl(uri) {
      let hurl = api.serverHost + uri;
      return hurl;
    },
    inputChange(e) {
      this.search.title = e.title;
      this.search.district = e.district;
      this.tagFilter();
      this.notation.activeLength = 4;
    },
    notationOnChange(e) {
      if (e) {
        this.notation.activeLength = e.length;
        let tagStr = "";
        e.forEach(i => {
          tagStr += i.value + ",";
        });
        let length = tagStr.length;
        tagStr = tagStr.slice(0, length - 1);
        this.search.tagStr = tagStr;
        this.tagFilter();
      }
    },
    tagFilter() {
      let me = this;
      me.cpage = -2;
      if (me.search.title == "" && me.search.tagStr == "") {
        me.resetSelected();
        return;
      }
      wx.request({
        url: api.getURL("posts/tagFilter"),
        data: {
          district: me.search.district,
          title: me.search.title,
          tagStr: me.search.tagStr
        },
        header: {
          "content-type": "application/json" // 默认值
        },
        success: function(r) {
          if (r.data.data.length == 0) {
            me.loading.shown = true;
            me.loading.content =
              "未找到相关数据...敬请期待,谢谢你的期待与厚爱！";
          } else {
            me.loading.shown = true;
            me.loading.content = "以上是为您找到的所有内容，希望你喜欢";
          }
          me.plist = r.data.data;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.h-footer {
  display: flex;
  justify-content: center;
  .loading {
    margin: 20px;
  }
}
.h-body {
  margin-top: 20rpx;
  background: rgb(240, 241, 242);
  .h-body-item {
  }
}
.notation {
  display: flex;
  justify-content: center;
  padding-bottom: 32rpx;
  border-bottom: solid 1px rgb(232, 233, 235);
  .n-content {
    width: 95%;
  }
}
.slogan-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 23rpx;
  margin-bottom: 33rpx;
  .slogan {
    position: relative;
    width: 455rpx;
    height: 67rpx;
    background-image: url("../../../static/imgs/slogan.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 24rpx;
    color: rgb(50, 187, 143);
    .slogan-content {
      position: absolute;
      left: 34rpx;
      top: 20rpx;
    }
  }
  .reset {
    position: absolute;
    font-size: 11;
    right: 55rpx;
    top: 11rpx;
    button {
      padding: 0 10rpx;
      color: white;
      background: rgb(50, 187, 143);
    }
  }
}

.search-header {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80rpx;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  z-index: 50;
  background: white;
  border-bottom: solid 1px rgb(240, 241, 242);
}
.cover {
  margin-top: 80rpx;
  width: 100%;
  height: 270rpx;
  border-bottom: solid 9rpx rgb(240, 241, 242);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  img {
    width: inherit;
    height: inherit;
  }
}
.h-container {
}
.backtotop {
  position: fixed;
  right: 18rpx;
  bottom: 128rpx;
  height: 50px;
  width: 50px;
}
</style>
