<template>
  <div class="p-container">
    <div>
      <mcover
        :coverurl="coverurl"
        @onBack="onBack"
        @onCollectChange="onCollectChange"
        :collected="favorite"
      ></mcover>
    </div>
    <div class="p-body e-center">
      <div class="p-general">
        <div class="title-price">
          <div class="title">{{title}}</div>
          <div class="price">￥{{price}}</div>
        </div>
        <div class="notations">
          <div class="notation">
            <notation
              :marginRight="15"
              :align="'flex-start'"
              :acceptType="'ADVANTAGE'"
              :borderColor="'#4AD9B7'"
              :backgroundColor="'#4AD9B7'"
              :fontColor="'white'"
              :numLimit="4"
              :list="notations"
              :width="130"
              :clickable="false"
            ></notation>
          </div>
          <div class="notation">
            <notation
              :marginRight="15"
              :align="'flex-start'"
              :acceptType="'DISADVANTAGE'"
              :borderColor="'#ff8097'"
              :backgroundColor="'#ff8097'"
              :fontColor="'white'"
              :numLimit="4"
              :list="notations"
              :width="130"
              :clickable="false"
            ></notation>
          </div>
        </div>
        <div class="content1">
          <div v-for="(i,k) in contentlst1" :key="k">
            <key-value :keyName="i.paramName" :keyValue="i.paramData"></key-value>
          </div>
        </div>
        <div class="content2">
          <div>
            <div style="display:inline-block;width:150rpx;">
              <span class="key-name">采集时间:</span>
            </div>
            <span class="key-value">{{contentlst2["采集时间"]}}</span>
          </div>
          <div>
            <div style="display:inline-block;width:150rpx;">
              <span class="key-name">开发商名:</span>
            </div>
            <span class="key-value">{{contentlst2["开发商"]}}</span>
          </div>
          <div>
            <div style="display:inline-block;width:150rpx;">
              <span class="key-name">小区地址:</span>
            </div>
            <span class="key-value" style="color:#4ad9b7" @click="goMap">{{contentlst2["小区地址"]}}</span>
          </div>
          <div class="location" @click="goMap">
            <icon class="iconfont icon-zuobiao"></icon>
          </div>
        </div>
        <div class="content3">
          <span>注：文中部分实地考察信息为我司工作人员于采集日期考察采集，如有变化，以实际情况为准。文中所有距离均以小区中心为起点计算。</span>
        </div>
      </div>
      <div class="p-graph1">
        <div class="title e-center">
          <title :title="'视频简介'"></title>
        </div>
        <div class="body e-center" style="margin-bottom: 50rpx;">
          <button
            type="primary"
            v-if="!unlock"
            size="mini"
            class="video-play"
            @click="unlockVideo"
          >播放视频</button>
          <video id="myVideo" v-if="unlock" :src="videoSrc" controls></video>
        </div>
      </div>
      <div class="p-graph1" style="margin-top:30rpx;">
        <div class="title e-center">
          <title :title="'周边配套'"></title>
        </div>
        <div class="body e-center">
          <div>
            <div class="g-container" :style="{height:mstyle1.mH+'px',width:mstyle1.mW+'px'}">
              <canvas
                class="g-canvas"
                canvas-id="radar1"
                :style="{height:mstyle1.mH+'px',width:mstyle1.mW+'px'}"
                @click="goDetail"
              ></canvas>
              <div
                v-for="(i,k) in outerList"
                :key="k"
                class="params"
                style="position:absolute;"
                :style="{top:i.top+'px',left:i.left+'px',color:i.color}"
                @click="goNav(i)"
              >
                <span>
                  {{i.devName}}
                  <icon
                    class="iconfont"
                    :class="[i.mark>=75?'icon-biaoqing_haoping':i.mark<50?'icon-biaoqing_chaping':'icon-biaoqing_yiban']"
                    style="font-size:12px;"
                  ></icon>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="tips-text e-center">
          <span>
            <span>点击上方标签，查看模块详情</span>
          </span>
        </div>
      </div>
      <div class="p-graph2">
        <div class="title e-center">
          <title :title="'小区内部'"></title>
        </div>
        <div class="body e-center">
          <div>
            <div class="g-container" :style="{height:mstyle2.mH+'px',width:mstyle2.mW+'px'}">
              <canvas
                class="g-canvas"
                canvas-id="radar2"
                :style="{height:mstyle2.mH+'px',width:mstyle2.mW+'px'}"
                @click="goDetail"
              ></canvas>
              <div
                v-for="(i,k) in innerList"
                :key="k"
                class="params"
                style="position:absolute;"
                :style="{top:i.top+'px',left:i.left+'px',color:i.color}"
                @click="goNav(i)"
              >
                <span>
                  {{i.devName}}
                  <icon
                    class="iconfont"
                    :class="[i.mark>=75?'icon-biaoqing_haoping':i.mark<50?'icon-biaoqing_chaping':'icon-biaoqing_yiban']"
                    style="font-size:12px;"
                  ></icon>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="tips-text eagle-border-top-hr e-center">
          <span>
            <span>点击上方标签，查看模块详情</span>
          </span>
        </div>
      </div>
    </div>
    <div class="p-prewords">
      <div class="swiper-item-post" v-for="(m,key) in modules" :key="key">
        <div class="e-center e-margin-bottom-30" style="padding-top:50rpx;margin-top:50rpx;">
          <div style="border-bottom:solid 2px rgb(231,235,241);">
            <title :title="m.mName"></title>
          </div>
        </div>
        <div class="subtab-post" v-if="m.branch==0">
          <p v-for="(c,ck) in m.content" :key="ck">
            <span
              @click="showMessage(c)"
              v-for="(cc,cck) in c"
              :key="cck"
              :class="{'text-explain': cc.type === 'explain', 'text-bold': cc.type === 'bold','text-transport':cc.type === 'transport'}"
            >{{cc.content}}</span>
          </p>
        </div>
        <div class="tips e-center">
          <span>
            <button @click="goDetail">点击查看详情 ></button>
          </span>
        </div>
        <div
          style="font-size:20rpx;color:rgb(177,177,177);margin:40rpx 35rpx;"
        >版权声明：除了特别声明以外，小程序里的所有的数据、图片和文章都是我们日晒雨淋的采集小哥哥和爆肝敲字的文案小姐姐辛辛苦苦的劳动成果，所有版权归鹰眼分析大家庭所有。如果需转载我们的文章，请一定要先联系我们，否则的话，小心法院传票丢你胸口哦。本司保留追究非法转载者法律责任的权利。</div>
      </div>
    </div>
    <share-modal :shown="remindUser" @afterShare="afterShare" @close="remindUser = false"></share-modal>
    <div class="a-round">
      <houseround :list="aroundList" @onClick="goView"></houseround>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import mcover from "@/components/mcover";
import pgraph1 from "@/components/graph/radar1";
import pgraph2 from "@/components/graph/radar2";
import notation from "@/components/notation";
import keyValue from "@/components/keyvalue";
import title from "@/components/title/solidTitle";
import preserveHelper from "@/utils/preserve";
import houseround from "@/components/houseround";
import shareModal from "@/components/shareModal.vue";
export default {
  components: {
    mcover,
    pgraph1,
    pgraph2,
    notation,
    keyValue,
    title,
    houseround,
    shareModal
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    gStyle: {
      mH: 250,
      mW: 250
    },
    remindUser: false,
    unlock: false,
    videoContext: null,
    coverurl: "",
    favorite: false,
    notations: [],
    contentlst1: [
      {
        paramName: "建成时间",
        paramData: "2006"
      },
      {
        paramName: "建成面积",
        paramData: "11.7万平米"
      },
      {
        paramName: "容积率",
        paramData: "1.42"
      },
      {
        paramName: "绿化覆盖率",
        paramData: "45%"
      },
      {
        paramName: "建筑类型",
        paramData: "多层"
      }
    ],
    contentlst2: {
      采集时间: "",
      开发商: "",
      小区地址: ""
    },
    videoSrc: "",
    gStart: false,
    postContent: [],
    modules: [],
    latitude: "",
    longitude: "",
    positionName: "",
    aroundList: [],
    pid: 0,
    coverId: 0,

    graph1: {
      mW: 0,
      mH: 0,
      mCtx: null,
      mCount: 0, //边数
      mCenter: 0, //中心点
      mRadius: 0, //半径(减去的值用于给绘制的文本留空间)
      mAngle: 0, //角度
      mr: 0, //平均半径差
      mColorPolygon: "",
      coverId: 0
    },
    mstyle1: {
      mW: 260, //宽
      mH: 260 //高
    },
    outerList: [],

    graph2: {
      mW: 0,
      mH: 0,
      mCtx: null,
      mCount: 0, //边数
      mCenter: 0, //中心点
      mRadius: 0, //半径(减去的值用于给绘制的文本留空间)
      mAngle: 0, //角度
      mr: 0, //平均半径差
      mColorPolygon: "#B8B8B8"
    },
    mstyle2: {
      mW: 260, //宽
      mH: 260 //高
    },
    innerList: [],
    USER: null
  }),
  onLoad(query) {
    let me = this;
    let cover = {};
    this.USER = this.$store.state.USER_INFO;
    this.unlock = false;
    this.videoContext = wx.createVideoContext("myVideo");
    api.findCover(
      query.id,
      res => {
        me.$store.commit("SET_CURRENT_COVER", res.data);
        cover = me.$store.state.CURRENT_COVER;
        if (res.data.videoSrc) {
          this.videoSrc = res.data.videoSrc;
        }
      },
      () => {
        me.pid = cover.coverId;
        if (cover.img && cover.img.split("|").length >= 2) {
          me.coverurl = api.BASE_HOST + cover.img.split("|")[1];
        }
        me.favorite = false;
        if (this.$store.state.USER_INFO != null) {
          api.simLogin(logRes => {
            if (logRes.success) {
              this.$store.commit("SET_USER", logRes.data);
              api.isFavorite(
                { userId: logRes.data.userId, coverId: me.coverId },
                isFavoriteRes => {
                  if (isFavoriteRes.success) {
                    me.favorite = isFavoriteRes.data;
                  }
                }
              );
            }
          });
        }
        if (cover) {
          wx.setNavigationBarTitle({
            title: cover.title
          });

          me.coverId = Number(cover.coverId);
          me.title = cover.title;
          me.price = cover.price;
          me.notations = cover.tags;
          me.latitude = cover.latitude;
          me.longitude = cover.longitude;

          me.requestDevs(cover.coverId);
        }
      }
    );
  },
  onShareAppMessage: function(option) {
    let me = this;
    if (option.from === "menu") {
      return {
        title: "基于大数据的二手房小区测评",
        path: "/pages/preface/main?id=" + me.pid,
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
    } else {
      return {
        title: "",
        price: "",
        path: "/pages/home/main",
        success: function() {},
        fail: function() {}
      };
    }
  },
  methods: {
    onBack() {
      wx.switchTab({
        url: "/pages/home/main"
      });
    },
    afterShare() {
      this.remindUser = false;
      this.$http.post(
        "/post/addOneUnlockPoint",
        { userId: this.$store.state.USER_INFO.userId },
        res => {
          if (res.success) {
            wx.navigateTo({
              url: "/pages/analysis/main?cId=" + this.coverId
            });
          }
        }
      );
    },
    unlockVideo() {
      let self = this;
      this.unlockProject(res => {
        self.unlock = res;
        if (res) {
          this.videoContext.play();
        } else {
          self.showShareMenu()
        }
      });
    },
    showShareMenu(){
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 1000
      });
      this.remindUser = true;
    },
    unlockProject(callback) {
      let self = this;
      if (this.USER.userId === null) {
        this.$http.simLogin(res => {
          if (res.success) {
            self.USER = res.data;
            // LOGIN SUCCESS
            self.unlockProject();
          } else {
            // LOGIN FAILED
            wx.showModal({
              title: "提示",
              content: "您需要登录才能授权！",
              showCancel: false,
              confirmText: "关闭"
            });
          }
        });
      } else {
        this.$http.post(
          "/post/unlockProject",
          {
            projectId: this.coverId,
            userId: this.$store.state.USER_INFO.userId
          },
          res => {
            if (res.success) {
              if (callback) {
                callback(res.data);
              }
            }
          }
        );
      }
    },
    onCollectChange(e) {
      if (!e) {
        api.addFavorite(
          {
            userId: this.$store.state.USER_INFO.userId,
            coverId: this.coverId,
            openId: this.$store.state.USER_INFO.openId
          },
          res => {
            if (res.success) {
              this.favorite = res.data;
            }
          }
        );
      } else {
        api.removeFavorite(
          {
            userId: this.$store.state.USER_INFO.userId,
            coverId: this.coverId,
            openId: this.$store.state.USER_INFO.openId
          },
          res => {
            if (res.success) {
              this.favorite = res.data;
            }
          }
        );
      }
    },
    goDetail() {
      this.unlockProject(res => {
        if (res) {
          wx.navigateTo({
            url: "/pages/analysis/main?cId=" + this.coverId
          });
        } else {
          this.showShareMenu()
        }
      });
    },
    requestDevs(id) {
      let me = this;
      //FindArround
      api.findArround(me.latitude, me.longitude, res => {
        if (res.success) {
          res.data.map(i => {
            if (i.img) {
              let imgs = i.img.split("|");
              i.img = this.$store.state.BASE_HOST + imgs[0];
            }
          });
          res.data.sort((a, b) => a.distance - b.distance);
          me.aroundList = res.data;
        }
      });
      //find preface dev and it's params
      api.findDevisionAndParams(me.coverId, 0, res => {
        if (res.success) {
          if (res.data.length == 0) {
            console.log(
              "------------THIS PREFACE DEVISION DO NOT HAS ANY PARAMS---------------"
            );
            return;
          }
          let params = res.data[0].params;
          me.contentlst1 = [];
          let builtTime = params.find(i => i.paramName == "建成时间");
          if (builtTime) {
            me.contentlst1.push(builtTime);
          }

          let builtArea = params.find(i => i.paramName == "建筑面积");
          if (builtArea) {
            me.contentlst1.push(builtArea);
          }

          let param1 = params.find(i => i.paramName == "容积率");
          if (param1) {
            me.contentlst1.push(param1);
          }

          let param2 = params.find(i => i.paramName == "绿化覆盖率");
          if (param2) {
            me.contentlst1.push(param2);
          }

          let param3 = params.find(i => i.paramName == "建筑类型");
          if (param3) {
            me.contentlst1.push(param3);
          }

          let collectTime = params.find(i => i.paramName == "采集时间");
          if (collectTime) {
            me.contentlst2.采集时间 = collectTime.paramData;
          }

          let param4 = params.find(i => i.paramName == "开发商");
          if (param4 == null) {
            param4 = params.find(i => i.paramName == "开发商名");
          }
          if (param4) {
            me.contentlst2.开发商 = param4.paramData;
          }

          let address = params.find(i => i.paramName == "小区地址");
          if (address) {
            me.contentlst2.小区地址 = address.paramData;
          }
        }
      });

      //FIND ALL DEVIDIONS AND SET THE GRAPHS.
      api.findAllDev(me.coverId, res => {
        if (res.success) {
          res.data.map(i => {
            // i.icon=this.iconMap[i.devName];
            i.color = me.setColor(i.mark);
          });
          let sortDevs = res.data.sort((a, b) => a.devSort - b.devSort);
          this.$store.commit("SET_DEVISIONS", sortDevs);
          me.outerList = res.data.filter(i => i.devType == 1);
          me.innerList = res.data.filter(i => i.devType == 2);

          me.initialize1();
          me.initialize2();
        }
      });

      //FIND PREFACE MODULES.
      //FIXME:FIND DEVISION NAME OF TYPE 0
      api.findDevisionModules(me.coverId, "综合", res => {
        if (res.success) {
          res.data.map((i, key) => {
            res.data[key].content = preserveHelper.formatModule(res.data[key]);
          });
          me.modules = res.data;
          console.log("------------->小区干货：", me.modules);
          me.gStart = !me.gStart;
        }
      });
    },
    setColor(goodValue) {
      if (goodValue >= 75) {
        return "#4ad9b7";
      } else if ((goodValue >= 50) & (goodValue < 75)) {
        return "#9c9c9c";
      } else if (goodValue < 50) {
        return "#FF8097";
      }
    },
    goNav(dev) {
      api.saveAccessHistory({
        nickName: this.$store.state.USER_INFO.nickName,
        gender: this.$store.state.USER_INFO.gender,
        language: this.$store.state.USER_INFO.language,
        city: this.$store.state.USER_INFO.city,
        province: this.$store.state.USER_INFO.province,
        country: this.$store.state.USER_INFO.country,
        avataUrl: this.$store.state.USER_INFO.avataUrl,
        functionName: "综合页面导航",
        functionCode: 4,
        project: this.title
      });
      this.$store.commit("SET_CURRENT_DEVISION", dev);
      wx.navigateTo({
        url: "/pages/analysis/main"
      });
    },
    goMap() {
      let me = this;
      api.saveAccessHistory({
        nickName: this.$store.state.USER_INFO.nickName,
        gender: this.$store.state.USER_INFO.gender,
        language: this.$store.state.USER_INFO.language,
        city: this.$store.state.USER_INFO.city,
        province: this.$store.state.USER_INFO.province,
        country: this.$store.state.USER_INFO.country,
        avataUrl: this.$store.state.USER_INFO.avataUrl,
        functionName: "综合页面地图",
        functionCode: 3,
        project: this.title
      });
      wx.navigateTo({
        url:
          "/pages/map/main?latitude=" +
          me.latitude +
          "&longitude=" +
          me.longitude +
          "&name=" +
          me.positionName
      });
    },
    goView(i) {
      api.findCover(i.coverId, res => {
        if (res.success) {
          this.$store.commit("SET_CURRENT_COVER", res.data);
          wx.redirectTo({
            url: "/pages/preface/main?id=" + i.coverId
          });
        }
      });
    },
    requestRound(detail) {
      let me = this;
      wx.request({
        url: api.getURL("posts/projectAround"),
        data: {
          coverId: detail.coverId,
          district: detail.cityDistrict,
          lat: detail.latitude,
          longi: detail.longitude
        },
        header: { "content-type": "application/json" },
        success: function(r) {
          r.data.data.map(i => {
            // i.name = i.name.slice(0, 8) + "...";
            i.coverImg = api.serverHost + i.coverImg;
            i.distance = Number(i.distance).toFixed(1);
          });

          r.data.data.sort(function(a, b) {
            return a.distance - b.distance;
          });
          if (r.data.data.length > 5) {
            r.data.data.length = 5;
          }
          me.aroundList = r.data.data;
          wx.hideLoading();
        }
      });
    },
    initialize1() {
      let me = this.graph1;
      me.mW = this.mstyle1.mW;
      me.mH = this.mstyle1.mH;
      me.mCount = this.outerList.length;
      me.mCenter = me.mW / 2;
      me.mRadius = me.mCenter - 30;
      me.mAngle = Math.PI * 2 / me.mCount;
      me.mr = me.mRadius / 5;
      let ctx = wx.createCanvasContext("radar1");
      this.drawPolygon(ctx, me);
      this.drawLines(ctx, me);
      this.drawRegion(ctx, me, this.outerList);
      this.setText(ctx, me, this.outerList, this.mstyle1);
    },
    initialize2() {
      let me = this.graph2;
      me.mW = this.mstyle2.mW;
      me.mH = this.mstyle2.mH;
      me.mCount = this.innerList.length;
      me.mCenter = me.mW / 2;
      me.mRadius = me.mCenter - 30;
      me.mAngle = Math.PI * 2 / me.mCount;
      me.mr = me.mRadius / 5;
      let ctx = wx.createCanvasContext("radar2");
      this.drawPolygon(ctx, me);
      this.drawLines(ctx, me);
      this.drawRegion(ctx, me, this.innerList);
      this.setText(ctx, me, this.innerList, this.mstyle2);
    },
    drawPolygon(ctx, graph) {
      ctx.save();
      ctx.setStrokeStyle("#4ad9b7");
      let r = graph.mr; //单位半径
      //画6个圈
      for (var i = 0; i < 5; i++) {
        let currR = r * (i + 1); //当前半径
        ctx.beginPath();
        //画6个边
        for (var j = 0; j < graph.mCount; j++) {
          let x = graph.mCenter + currR * Math.cos(graph.mAngle * j);
          let y = graph.mCenter + currR * Math.sin(graph.mAngle * j);
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.draw(true);
      }
    },
    drawLines(ctx, graph) {
      ctx.save();
      ctx.beginPath();
      for (var i = 0; i < graph.mCount; i++) {
        let x = graph.mCenter + graph.mRadius * Math.cos(graph.mAngle * i);
        let y = graph.mCenter + graph.mRadius * Math.sin(graph.mAngle * i);
        ctx.moveTo(graph.mCenter, graph.mCenter);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.draw(true);
    },
    drawRegion(ctx, graph, mData) {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "rgba(74,217,183,0.3)";
      for (var i = 0; i < graph.mCount; i++) {
        let x =
          graph.mCenter +
          graph.mRadius * Math.cos(graph.mAngle * i) * mData[i].mark / 100;
        let y =
          graph.mCenter +
          graph.mRadius * Math.sin(graph.mAngle * i) * mData[i].mark / 100;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.draw(true);
    },
    setText(ctx, graph, mData, mstyle) {
      let style = mstyle;
      for (var i = 0; i < graph.mCount; i++) {
        let currAng = graph.mAngle * i; //current angle
        let mr = Math.PI * 2 / 4; //meta region of coordinate
        let x = graph.mCenter + graph.mRadius * Math.cos(currAng);
        let y = graph.mCenter + graph.mRadius * Math.sin(currAng);
        let textLength = ctx.measureText(mData[i].devName).width + 25;
        let textHeight = 25;
        if (currAng <= mr) {
          mData[i].left = x;
          mData[i].top = y - 10;
        } else if ((currAng > mr) & (currAng <= 2 * mr)) {
          mData[i].left = x - textLength;
          mData[i].top = y - 10;
        } else if ((currAng > 2 * mr) & (currAng <= 3 * mr)) {
          mData[i].left = x - textLength;
          mData[i].top = y - textHeight;
        } else if ((currAng > 3 * mr) & (currAng <= 4 * mr)) {
          mData[i].left = x;
          mData[i].top = y - 25;
        }
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.p-container {
  position: relative;
  .p-body {
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.07) 0rpx 0rpx 3rpx 3rpx;
    .p-general {
      -webkit-appearance: none;
      width: 700rpx;
      min-height: 450rpx;
      background: white;
      position: relative;
      top: -36rpx;
      box-shadow: rgba(0, 0, 0, 0.07) 0rpx 0rpx 3rpx 3rpx;
      border-radius: 15rpx;
      padding-bottom: 15rpx;
      .title-price {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 32rpx;
          font-weight: 600;
          margin-top: 32rpx;
          margin-left: 40rpx;
        }
        .price {
          font-size: 32rpx;
          font-weight: 600;
          margin-top: 32rpx;
          margin-left: 40rpx;
          margin-right: 40rpx;
          color: #ff6f0b;
        }
      }

      .notations {
        margin-top: 23rpx;
        margin-left: 31rpx;
        margin-right: 15rpx;
        padding-bottom: 15rpx;
        border-bottom: solid 1px rgb(247, 247, 247);
      }
      .content1 {
        margin-left: 31rpx;
        margin-right: 15rpx;
        padding-bottom: 15rpx;
        border-bottom: solid 1px rgb(247, 247, 247);
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .content2 {
        position: relative;
        margin-left: 31rpx;
        margin-right: 15rpx;
        .key-name {
          min-width: 130rpx;
          font-size: 26rpx;
          color: rgb(179, 179, 179);
        }
        .key-value {
          font-size: 26rpx;
          color: rgb(0, 0, 0);
        }
        .location {
          position: absolute;
          right: 68rpx;
          bottom: 5rpx;
          color: #4ad9b7;
        }
      }
      .content3 {
        font-size: 20rpx;
        color: #b3b3b3;
        display: flex;
        justify-content: center;
        margin-top: 12rpx;
        margin-left: 31rpx;
        margin-right: 15rpx;
        border-top: solid 1px #f7f7f7;
        span {
          margin-top: 12rpx;
        }
      }
    }
    .p-graph1 {
      width: 700rpx;
      // height: 730rpx;
      background: white;
      // margin-top: 15rpx;
      box-shadow: rgba(0, 0, 0, 0.07) 0rpx 0rpx 3rpx 3rpx;
      border-radius: 15rpx;
      .title {
        margin-top: 30rpx;
      }
      .body {
        position: relative;
        margin-top: 20px;
      }
    }
    .p-graph2 {
      width: 700rpx;
      background: white;
      margin-top: 45rpx;
      margin-bottom: 35rpx;
      box-shadow: rgba(0, 0, 0, 0.07) 0rpx 0rpx 3rpx 3rpx;
      border-radius: 15rpx;
      .title {
        margin-top: 30rpx;
      }
      .body {
        position: relative;
        margin-top: 20px;
      }
    }
  }
  .p-prewords {
    border-top: solid 25rpx rgb(245, 246, 248);
    min-height: 300rpx;
    width: 100%;
  }
}
.tips-text {
  font-size: 12px;
  color: #a5a4a6;
  height: 80rpx;
  border-top: solid 1px rgb(245, 246, 248);
}
.tips {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12rpx;
  margin-left: 15rpx;
  margin-right: 15rpx;
  padding: 15rpx 0;
  // border-top: solid 1px #f7f7f7;
  span {
    button {
      background: #4ad9b7;
      width: 346px;
      height: 35px;
      color: white;
      border-radius: 35rpx;
      font-size: 28rpx;
      padding: 0;
      border: none;
    }
  }
}
.swiper-item-post {
  margin-bottom: 50rpx;
  .subtab-title {
    display: flex;
    justify-content: center;
    padding: 30rpx 0;
    .subtab-title-solid {
      border: solid 2px rgb(50, 187, 143);
      padding: 8px;
      .subtab-title-dash {
        padding: 9rpx 45rpx;
        border: dashed 1px rgb(50, 187, 143);
        font-size: 30rpx;
      }
    }
  }
  .subtab-post {
    font-size: 28rpx;
    color: rgb(76, 76, 76);
    padding: 0 34rpx;
    line-height: 60rpx;
    margin-top: 20rpx;

    .subtab-img-desc {
      margin-top: 15px;
    }
  }

  .all-compare-box {
    margin: 74rpx 0;
    border-top: solid 14rpx rgb(245, 246, 248);
    padding-top: 74rpx;
    .mcompare-block {
      margin: 30rpx 34rpx;
    }
  }
}

.g-container {
  position: relative;
}
.params {
  font-size: 12px;
  width: 65px;
  color: rgb(50, 187, 143);
}
.g-canvas {
  position: relative;
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
.notation {
  height: 70rpx;
  overflow: hidden;
}
.video-play {
  width: 80%;
}
</style>
