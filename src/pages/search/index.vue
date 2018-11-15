<template>
    <div class="search-back">
        <div class="h-padding-34">
            <div>
              <div class="search-block">
                  <input type="text" placeholder="搜索您要找的小区、楼盘"  @confirm="onConfirm" v-model="keyword">
                  <div class="search-button" @click="onConfirm"><span>{{searchWord}}</span></div>
                  <span class="iconfont icon-sousuo"></span>
                  <span class="iconfont icon-quxiao" @click="deleteKeyword" v-show="showDelete"></span>
              </div>
            </div>
        </div>
        <div class="h-padding-34 hot-key" v-if="showHotKey">
            <div class="hot-title">热门搜索</div>
            <notation :width="150" :list="list" :marginRight="10" :fontColor="'rgb(75,206,175)'" :clickable=false :isNonBack=true @onClick="onNotationClick"></notation>
        </div>
        <div>
          <!-- 当没有结果时 -->
          <div v-if="!showResult" class="search-noresult">
            <div class="h-padding-34 info" >
              <i class="iconfont icon-wu" ></i>
              <span>暂未搜索到~</span>
            </div>
            <!-- <div class="h-padding-34" style="margin:32rpx 0;">
              <input class="expected" type="text" placeholder="请输入您想看的楼盘，我们会尽快为您采集">
            </div> -->
            <div class="h-padding-34 recommend">
              <div style="font-size:36rpx;">推荐楼盘</div>
              <div v-for="(r,k) in recommenList" :key="k">
                <g-card :info="r" @onClick="goView"></g-card>
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
        <div class="change" @click="fresh">
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
  onLoad(){
    this.keyword = "";
    this.searchList =[];
    this.recommenList=[];
  },
  data() {
    return {
      list: [
        {
          tagName: "世纪城",
          value: "世纪城",
          active: false,
          tagType: 'ADVANTAGE'
        },
        {
          tagName: "碧海花园",
          value: "碧海花园",
          active: false,
          tagType: 'ADVANTAGE'
        },
        {
          tagName: "会展城(A区)",
          value: "会展城",
          active: false,
          tagType: 'ADVANTAGE'
        },
        {
          tagName: "会展城(B区)",
          value: "会展城",
          active: false,
          tagType: 'ADVANTAGE'
        },
        {
          tagName: "金华园",
          value: "金华园",
          active: false,
          tagType: 'ADVANTAGE'
        },
        {
          tagName: "美的林城",
          value: "林城时代",
          active: false,
          tagType: 'ADVANTAGE'
        },
        {
          tagName: "新世界",
          value: "新世界",
          active: false,
          tagType: 'ADVANTAGE'
        },
        {
          tagName: "中铁逸都",
          value: "中铁逸都",
          active: false,
          tagType: 'ADVANTAGE'
        }
      ],
      showHotKey: true,
      showResult: true,
      keyword: "",
      searchList: [],
      recommenList: [],
      searchWord: "搜索",
      showDelete:false,
      cpage:-1,
      _cpage:-1
    };
  },
  computed:{
    setKeyword(){
      if(this.keyword==""){
        this.showHotKey = true;
        this.showResult = true;
        this.showDelete = false;
        this.searchList = [];
        this.recommenList = [];
      }else{
        this.showDelete = true;
      }
    }
  },
  onReachBottom() {
    // let me = this;
    // if(!this.showResult){
    //   this.searchRecommend(me)
    // }else{
    //   this.searchResponse(this.keyword);
    // }
  },
  methods: {
    fresh() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 1000
      });
    },
    goView(e){
      this.$store.commit('SET_CURRENT_COVER',e);
      api.addViewPoint(e.coverId);
      wx.navigateTo({
        url: '/pages/preface/main?id='+e.coverId
      });
    },
    deleteKeyword(){
      this.keyword ="";
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
      if(me.cpage==-2){
        return;
      }
      if(me.cpage==-1){
        me.searchList = [];
      }
      me.cpage++;
      wx.showLoading({
        title: "加载中",
        mask: true
      });

      api.findCoversByTitle(info,res=>{
        if(res.success){
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
      })
    },
    searchRecommend(me) {
      if(me._cpage==-2){
        return;
      }
      if(me._cpage==-1){
        me.recommenList = [];
      }
      me._cpage++;
      wx.showLoading({
        title: "加载中",
        mask: true
      });
      api.findCoversByTitle("世纪城",res=>{
        if(res.success){
          me.recommenList = res.data;
          wx.hideLoading();
        }
      })
      // wx.request({
      //   header: { "content-type": "application/json" },
      //   url: api.getURL("posts/search"),
      //   data: {
      //     keyword: "",
      //     page: me._cpage,
      //     size: 7
      //   },
      //   success: function(r) {
      //     let data = r.data.data;
      //     console.log(data)
      //     if(data.last){
      //       me._cpage=-2;
      //     }
      //     me.recommenList = me.recommenList.concat(data.content);
      //     setTimeout(() => {
      //         wx.hideLoading();
      //       }, 500);
      //   }
      // });
    },
    onNotationClick(info) {
      this.cpage=-1;
      this.searchResponse(info.value);
      this.keyword = info.value;
    },
    onConfirm() {
      this.cpage=-1;
      this._cpage=-1;
      this.searchResponse(this.keyword);
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
  .icon-quxiao{
    position: absolute;
    top: 19rpx;
    right: 120rpx;
    color: #cecece;
    z-index: 20;
  }
}
.hot-key {
  .hot-title {
    font-size: 24rpx;
    color: rgb(68, 72, 78);
    margin-top: 48rpx;
    margin-bottom: 30rpx;
    margin-left: 20rpx;
  }
}
.search-noresult {
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
