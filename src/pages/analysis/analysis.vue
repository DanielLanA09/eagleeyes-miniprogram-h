<template>
    <div class="a-container">
       <div class="a-body">
          <div class="s-container">
            <div class="s-hidden-nav" v-if="blockNavShow" @click="blockNavShow=false">
                <div class="s-hidden-title">
                    <span >全部介绍</span>
                    <span @click="blockNavShow=!blockNavShow"><icon class="iconfont icon-xiaotubiao_fuzhi-28" style="font-size:50rpx;"></icon></span>
                </div>
                <div class="s-nav-hidden-container" >
                    <div class="s-nav-hidden-border" v-for="(i,k) in devisions" :key="k" @click="onNavClick(i,k)" v-if="i.devType!=0">
                        <div class="s-nav-hidden-item" :class="{active:i.id==current_devision.id?true:false}">
                            <icon class="iconfont nav-icon" :class=[i.icon1]></icon>
                            <span class="nav-name">{{i.devName}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="s-scroll">
                <div class="s-container-nav">
                    <scroll-view :scroll-x="true" class="s-nav" :scroll-into-view="'nav'+current_devision.id">
                        <div v-for="(i,k) in devisions" :id="'nav'+i.id" v-if="i.devType!=0" :key="k" class="s-nav-item" :class="{active:current_devision.id == i.id?true:false}"  @click="onNavClick(i,k)">
                            {{i.devName}}
                        </div>
                    </scroll-view>
                    <div class="s-nav-b" @click="showBlockNav">
                        <icon class="iconfont icon-xiaotubiao_fuzhi-27 down-nav"></icon>

                    </div>
                </div>
            </div>
            <div class="s-swiper" @touchstart="touchStartEvent" @touchend="touchEndEvent" @touchmove="touchMoveEvent">
              <div class="s-swiper-container" style="overflow:visible;">
                <!-- v-for="(tab,k) in navs.tabs" -->
                <div class="swiper-item" >
                  <div class="tab-content">
                    <!-- TITLE AND IMGS -->
                    <div class="analysis-title" >
                      <!-- <a-title :imgUrl="host+iconMap[current_devision.devName]" :des="current_devision.devName"></a-title> -->
                      <a-title :imgUrl="current_devision.icon2" :des="current_devision.devDes"></a-title>
                      <div class="imgCover">
                        <img :src="markUrl[current_devision.devName]">
                      </div>
                    </div>
                    <!-- ADVANTAGE -->
                    <div class='progress'>
                      <div>
                        <m-progress :value="current_devision.mark"></m-progress>
                      </div>
                      <div class="list" >
                        <div v-for="(gi,gk) in cAdvantages" class="good-text" :key="gk" >
                          <div class="icon">
                              <icon class="iconfont icon-quan-2"></icon>
                          </div>
                          <div class="content">
                              <span>{{gi.content}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- DISADVANTAGE -->
                    <div class='progress'>
                      <div >
                        <m-progress :value="100-current_devision.mark" :title="'缺点'" :color="'#ff8097'"></m-progress>
                      </div>
                      <div class="list">
                        <div v-for="(gi,gk) in cDisadvantages" class="good-text" :key="gk" >
                          <div class="icon">
                              <icon class="iconfont icon-quan-2" style="color:#ff8097"></icon>
                          </div>
                          <div class="content">
                              <span>{{gi.content}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- PARAMS -->
                    <div class="tab-info">
                      <s-tab :dataInfo="cParams" ></s-tab>
                    </div>
                    <!-- MODULES -->
                    <div class="swiper-item-post" v-for="(m,key) in cModules" :key="key" >
                      <div v-if="m.branch=='1'">
                        <div class="e-center e-margin-bottom-30 eagle-border-top-hr subtab-title">
                          <div class="title-position">
                            <mtitle1 :title="m.mName"></mtitle1>
                          </div>
                        </div>
                        <div class="subtab-post" v-for="(c,ck) in m.content" :key="ck">
                            <p><span v-for="(sc,sck) in c.content" :key="sck" :class="{'text-explain': sc.type === 'explain', 'text-bold': sc.type === 'bold','text-transport':sc.type === 'transport'}"
                                @click="showMessage(sc)">{{sc.content}}</span></p>

                            <div class="subtab-img-desc" v-if="img" v-for="(img,img_key) in c.img" :key="img_key">
                              <!-- FIXME: CHANGE THIS ABSOLUTE ROUTE. -->
                                <img :src="host+img">
                                <span>{{c.imgNames[img_key]}}</span>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="announce" v-if="k==14">
                      免责声明:本文所有模块的数据和结论均由我司工作人员实地采集及后台大数据分析所得出，仅供参考，不作为投资决策依据。若数据与实际有出入，以实际情况为准。
                    </div>
                    <div class="nav-des">
                      <div class="hr"></div>
                      <div class="content">{{current_devision.footerDes}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
       </div>
       <div>
           <transportbox :shown="transportBox.show" :title="transportBox.title" :list="transportBox.list" :num="transportBox.num" @close="transportBox.show = false"></transportbox>
       </div>
    </div>
</template>

<script>
var mta = require("../../../static/js/mta_analysis.js");
import api from "@/api";
import preserveHelper from "@/utils/preserve";
import transportbox from "@/components/transportbox";

import mtitle1 from "@/components/title/solidTitle";
import aTitle from "@/components/title/AnalysisTitle";
import sTab from "@/components/tab/SimTab";
import mProgress from "@/components/progress/mprogress";
const HOST_URL = api.BASE_HOST;
export default {
  components: {
    transportbox,
    mtitle1,
    aTitle,
    sTab,
    mProgress
  },
  data: () => ({
    host:api.BASE_HOST,
    blockNavShow: false,
    messageBox: {
      mShow: false,
      title: "",
      body: ""
    },
    transportBox: {
      show: false,
      title: "",
      list: [],
      num: 0
    },
    iconMap: {
      楼房布局: `${HOST_URL}/icon/ic_details_structure1@2x.png`,
      交通: `${HOST_URL}/icon/ic_details_bus@2x.png`,
      小区绿化: `${HOST_URL}/icon/ic_details_green1@2x.png`,
      学校: `${HOST_URL}/icon/ic_details_school@2x.png`,
      车位配套: `${HOST_URL}/icon/ic_details_parking@2x.png`,
      生活娱乐: `${HOST_URL}/icon/ic_details_shopping@2x.png`,
      医疗: `${HOST_URL}/icon/ic_details_hospital@2x.png`,
      文化体育: `${HOST_URL}/icon/ic_details_culture@2x.png`,
      菜场: `${HOST_URL}/icon/ic_details_food@2x.png`,
      商务办公: `${HOST_URL}/icon/ic_details_cbd@2x.png`,
      综合: `${HOST_URL}/icon/ic_details_colligate@2x.png`,
      政府机构: `${HOST_URL}/icon/ic_details_adm@2x.png`,
      小区配套: `${HOST_URL}/icon/ic_details_mating1@2x.png`,
      污染: `${HOST_URL}/icon/ic_details_population@2x.png`,
      周边环境: `${HOST_URL}/icon/ic_details_env@2x.png`
    },
    markUrl: {
      楼房布局: `${HOST_URL}楼房信息.png`,
      交通: `${HOST_URL}交通.png`,
      小区绿化: `${HOST_URL}绿化保洁.png`,
      学校: `${HOST_URL}学校.png`,
      车位配套: `${HOST_URL}车位情况.png`,
      生活娱乐: `${HOST_URL}生活娱乐.png`,
      医疗: `${HOST_URL}医疗.png`,
      文化体育: `${HOST_URL}文化体育.png`,
      菜场: `${HOST_URL}蔬菜.png`,
      商务办公: `${HOST_URL}商务办公.png`,
      政府机构: `${HOST_URL}政府机构.png`,
      小区配套: `${HOST_URL}内部配套.png`,
      污染: `${HOST_URL}污染.png`,
      周边环境: `${HOST_URL}周边环境.png`
    },
    NavDes: {
      楼房布局: "快去看看小区里面的环境吧~左滑进入“小区绿化”",
      小区绿化: "小区里都有些什么配套，你不好奇吗？左滑进入“小区配套”",
      小区配套: "平时散步、晨练方不方便就看它了！左滑进入“周边环境”",
      周边环境: `日常出行便捷与否由此决定，很重要的啦~左滑进入“交通”`,
      交通: "若您是驾车一族，车位配套很关键哦~左滑进入“车位配套”",
      车位配套: "柴米油盐酱醋茶，这就是生活的气息~左滑进入“菜场”",
      菜场: "看看是不是传说中的“学区房”左滑进入“学校”",
      学校: "吃、购、玩、行、生活服务，全都在这里！左滑进入“生活娱乐”",
      生活娱乐: `爱文艺、享运动的你，一定要看！左滑进入“文化体育”`,
      文化体育: `就诊买药是否方便可是个大问题~左滑进入“医疗”`,
      医疗: `小区的污染情况决定了我们的身心健康，必须重视！左滑进入“无污染”`,
      污染: `距离商务区域的远近，关乎每日的通勤时间，不是小问题~左滑进入“商务办公”`,
      商务办公: `看看小区平时办证、盖章、打证明是否方便左滑进入“政府机构”`,
      政府机构: "测评共14个模块，快去看看有没有漏掉的吧~"
    },
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,

    devisions: [],
    cAdvantages: [],
    cDisadvantages: [],
    cParams: [],
    cModules: [],

    current_devision: {},
    current_cover: {}
  }),
  onShareAppMessage: function(option) {
    let me = this;
    return {
      title: "基于大数据的二手房小区测评",
      path: "/pages/preface/main?id=" + me.id,
      imageUrl: require("../../../static/imgs/小程序封面.png"),
      success: function(res) {
        wx.request({
          url: api.getURL("posts/forwardcount"),
          header: {
            "content-type": "application/json"
          },
          data: { id: me.pid },
          success: function(res) {}
        });
      }
    };
  },
  onLoad() {
    mta.Page.init();
    //FIXME:FETCH USER INFOR

    this.devisions = this.$store.state.DEVISIONS;
    let cover = this.$store.state.CURRENT_COVER;
    if (this.$store.state.CURRENT_DEVISION) {
      this.current_devision = this.$store.state.CURRENT_DEVISION;
    } else {
      this.current_devision = this.devisions[0];
    }
    this.current_cover = this.$store.state.CURRENT_COVER;
    wx.setNavigationBarTitle({
      title: cover.title
    });
  },
  mounted() {
    this.requestDev();
  },
  methods: {
    showMessage(m) {
      let me = this;
      if (m.type == "explain") {
        api.getVacabulary(m.content, res => {
          if (res.success) {
            wx.showModal({
              title: res.data.title,
              content: res.data.content,
              showCancel: false,
              confirmText: "知道了",
              confirmColor: "#32bb8f"
            });
          }
        });
      } else if (m.type == "transport") {
        // wx.request({
        //   url: api.getURL("posts/bus"),
        //   data: { name: m.content },
        //   header: { "content-type": "application/json" },
        //   success: function(r) {
        //     let data = r.data.data[0];
        //     if (data) {
        //       me.transportBox.title = data.stationName;
        //       me.transportBox.list = data.busLst;
        //       me.transportBox.num = data.busLst.length;
        //       me.transportBox.show = true;
        //     } else {
        //       wx.showModal({
        //         title: m.content,
        //         content:
        //           "数据正在采集中，敬请期待。您也可以在公众号中提供相关信息，感谢你的支持。",
        //         showCancel: false,
        //         confirmText: "知道了",
        //         confirmColor: "#32bb8f"
        //       });
        //     }
        //   }
        // });
        api.getBus(m.content, res => {
          if (res.success) {
            console.log(res.data);
            me.transportBox.title = res.data.stationName;
            me.transportBox.list = res.data.bus;
            me.transportBox.num = res.data.bus.length;
            me.transportBox.show = true;
          }
        });
      }
    },
    requestDev() {
      this.requestParamsAndModules(this.current_cover, this.current_devision);
    },
    requestParamsAndModules(cover, dev) {
      //:FETCH CURRENT DEVISION'S PARAMS
      api.findParams(dev.id, res => {
        if (res.success) {
          let temParams = [];
          res.data = res.data.filter(i => i.data != null);
          res.data.map(i => {
            if (i.type == "" || i.type == null) {
              i.type = "";
            }
          });
          console.log("THE PARAMS LIST IS:", res.data);
          res.data.map((i, k) => {
            let ti = temParams.find(t => t.type == i.type);
            if (ti) {
              ti.content.push(i);
            } else {
              temParams.push({ type: i.type, content: [i] });
            }
          });
          this.cParams = temParams;
        }
      });

      //FETCH CURRENT DEVISION'S MODULEs
      api.findDevisionModules(cover.coverId, dev.devName, res => {
        if (res.success) {
          res.data.map((i, k) => {
            i.content = preserveHelper.formatModule(i);
          });

          //SET TITLE-LIST CONTENT
          let temTitleList = res.data.filter(i => i.branch == "2");
          if (temTitleList) {
            this.cAdvantages = temTitleList[0].content.filter(
              i => i.type == "ADVANTAGE"
            );
            this.cDisadvantages = temTitleList[0].content.filter(
              i => i.type == "DISADVANTAGE"
            );
          }
          //SET OTHER CONTENT
          let temModules = res.data
            .filter(i => i.branch != "2")
            .sort((a, b) => a.mId - b.mId);

          this.cModules = temModules;

          wx.pageScrollTo({
            scrollTop: 0,
            duration: 500
          });
        }
      });
    },
    clean() {
      this.startX = 0;
      this.startY = 0;
      this.endX = 0;
      this.endY = 0;
    },
    touchMoveEvent(e) {
      this.endX = e.clientX;
      this.endY = e.clientY;
    },
    touchStartEvent(e) {
      this.startX = e.clientX;
      this.startY = e.clientY;
    },
    touchEndEvent(e) {
      if ((this.endX == 0) & (this.endY == 0)) {
        return;
      }
      let xOff = this.endX - this.startX;
      let yOff = Math.abs(this.endY - this.startY);
      if (yOff > 50) {
        return;
      }
      this.clean();
      if (Math.abs(xOff) > 90) {
        this.startSwipe(xOff);
      }
    },
    startSwipe(xOff) {
      let abs = Math.abs(xOff);
      if (abs < 10) {
        //小于10表示是标题头控制的翻转
        return;
      }
      // wx.showLoading({
      //   title: "玩命加载中",
      //   mask: true
      // });

      let nextDev = 0;
      let cDevIndex = 0;
      this.devisions.find((el, i) => {
        if (el.devName == this.current_devision.devName) {
          cDevIndex = i;
          return;
        }
      });
      if (xOff < 0) {
        //swiper to right
        console.log("---SWIPER TO RIGHT---");

        if (cDevIndex != this.devisions.length - 1) {
          nextDev = cDevIndex + 1;
        } else {
          nextDev = 0;
        }
      } else {
        //swiper to left
        console.log("---SWIPER TO LEFT---");

        if (cDevIndex != 0) {
          nextDev = cDevIndex - 1;
        } else {
          nextDev = this.devisions.length - 1;
        }
      }
      let temDev = this.devisions[nextDev];
      console.log("THE TEM DEV IS:", temDev);
      console.log(
        "CURRENT DEV INDEX IS:",
        cDevIndex,
        "NEXT DEV INDEX IS:",
        nextDev
      );
      if (!temDev) {
        return;
      }
      this.onNavClick(temDev, nextDev);
    },
    onNavClick(dev, key) {
      this.blockNavShow = false;
      this.current_devision = dev;
      this.requestParamsAndModules(this.current_cover, this.current_devision);
    },
    showBlockNav(e) {
      this.blockNavShow = !this.blockNavShow;
    }
  }
};
</script>

<style scoped lang="less">
.s-container {
  position: relative;
}
.s-scroll {
  width: 100%;
  position: fixed;
  top: 0px;
  background: #ffffff;
  z-index: 4;
  .s-container-nav {
    box-shadow: 0 5px 5px -5px gray;
    display: flex;
    width: 100%;
    z-index: 500;
    .s-nav {
      display: flex;
      white-space: nowrap;
      width: 92%;
      .s-nav-item {
        display: inline-block;
        padding: 26rpx 24rpx;
        font-size: 32rpx;
        color: rgb(128, 128, 128);
      }
      .s-nav-item.active {
        border-bottom: solid 3px rgb(50, 187, 143);
        color: rgb(50, 187, 143);
      }
    }
    .s-nav-b {
      width: 8%;
      display: flex;
      justify-content: center;
      align-items: center;
      .down-nav {
        font-size: 50rpx;
      }
    }
  }
}
.analysis {
  border-radius: 25rpx;
  box-shadow: 0 0 5rpx 5rpx rgb(231, 235, 241);
  position: relative;
  margin: 32rpx 32rpx 16rpx 32rpx;
  padding-top: 46rpx;
}
.s-swiper {
  position: relative;
  top: 120rpx;
  // backface-visibility: hidden;
  .s-swiper-container {
    .swiper-item {
      background: #f5f6f8;
      // padding-top: 56rpx;
      .tab-content {
        background: white;
        padding-top: 35rpx;
      }
      .analysis-title {
        box-shadow: 0 0 8rpx 8rpx rgba(145, 161, 189, 0.2);
        border-radius: 15rpx;
        margin: 0rpx 32rpx 16rpx 32rpx;
        .imgCover {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 20rpx;
          padding-bottom: 20rpx;
          border-top: solid 1px #d9d9d9;
          img {
            width: 268px;
            height: 283px;
          }
        }
      }
      .progress {
        margin: 32rpx 32rpx 16rpx 32rpx;
        border-radius: 15rpx;
        box-shadow: 0 0 8rpx 8rpx rgba(145, 161, 189, 0.2);
        padding: 1rpx 32rpx;
        .list {
          margin-top: 38rpx;
          padding-bottom: 26rpx;
          .icon {
            display: inline-block;
            color: #4bceaf;
          }
          .content {
            display: inline-block;
            font-size: 28rpx;
            color: #4c4c4c;
          }
        }
      }
      .tab-info {
        margin: 64rpx 32rpx 16rpx 32rpx;
      }
      .swiper-item-img-cover {
        display: flex;
        justify-content: center;
        margin: 42rpx 0;
        img {
          width: 470rpx;
          height: 127rpx;
        }
      }
      .analysis {
        border-radius: 25rpx;
        box-shadow: 0 0 5rpx 5rpx rgb(231, 235, 241);
        position: relative;
        margin: 32rpx 32rpx 16rpx 32rpx;
        padding-top: 46rpx;
      }
      .nav-des {
        margin-top: 80rpx;
        position: relative;
        height: 1rpx;
        padding: 56rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f5f6f8;
        .hr {
          height: 0px;
          width: 100%;
          border: solid 1px #dadbdc;
        }
        .content {
          width: 300rpx;
          position: absolute;
          padding: 0 40rpx;
          // top: -5rpx;
          font-size: 20rpx;
          color: #808080;
          background: #f5f6f8;
          text-align: center;
        }
      }
    }
    .swiper-item-post {
      .subtab-title {
        padding-top: 100rpx;
        margin-top: 50rpx;
        .title-position {
          border-bottom: solid 2px rgb(231, 235, 241);
        }
      }
      .subtab-post {
        font-size: 28rpx;
        color: rgb(76, 76, 76);
        padding: 0 34rpx;
        line-height: 60rpx;
        margin-top: 20rpx;
        .subtab-img-desc {
          display: flex;
          position: relative;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          font-size: 22rpx;
          color: rgb(153, 153, 153);
          padding: 17rpx;
          margin: 50rpx 0;
          box-shadow: 0 0 8rpx 8rpx rgba(145, 161, 189, 0.2);
          img {
            width: 654rpx;
            height: 444rpx;
          }
          span {
            position: relative;
            top: 8rpx;
          }
        }
      }
    }
  }
}
.announce {
  font-size: 20rpx;
  color: rgb(177, 177, 177);
  margin: 40rpx 35rpx;
}

.s-hidden-nav {
  position: fixed;
  top: -1rpx;
  z-index: 5;
  height: 100vh;
  background: rgba(204, 204, 204, 0.8);
  .s-hidden-title {
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    color: rgb(0, 0, 0);
    font-size: 28rpx;
    padding: 0 36rpx;
    height: 94rpx;
    line-height: 94rpx;
  }
  .s-nav-hidden-container {
    background: #ffffff;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .s-nav-hidden-border {
      border: solid 1px rgb(245, 245, 245);
      width: 24vw;
      height: 200rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      .s-nav-hidden-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .s-nav-hidden-item.active {
        color: rgb(50, 187, 143);
      }
      .nav-icon {
        font-size: 80rpx;
      }
      .nav-name {
        font-size: 20rpx;
      }
    }
  }
}

.good-text {
  font-size: 28rpx;
  color: rgb(76, 76, 76);
  line-height: 50rpx;
  display: flex;
  padding: 16rpx 0;
  icon {
    position: relative;
    top: -7rpx;
    // color: rgb(50, 187, 143);
    margin-right: 15rpx;
  }
}

.text-explain {
  color: rgb(34, 78, 130);
  font-weight: 800;
  text-decoration: underline;
}
.text-bold {
  font-weight: 800;
}
.text-transport {
  font-weight: 800;
  color: cornflowerblue;
}
</style>
