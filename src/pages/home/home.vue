<template>
    <div>
        <div class="h-padding-34 search-title">
            <s-select @onSelect="onDistrictSelect" @onAbort="onAbort"></s-select>
            <div class="search-input">
              <m-search @onFocus="onFocus"></m-search>
            </div>
        </div>
        <div class="h-padding-34 cover-img">
            <img class="eagle-box-shadow-down" :src="coverImg" >
        </div>
        <div class="h-padding-34">
            <card-scroll :currentCard="currentCard" @onSelect="onNavSelect"></card-scroll>
        </div>
        <div class="h-padding-34"> 
          <div class="standar-text">
            <div class="title">
              测评指标数
              <span>{{modulesMap[requestCondition.devision].Standards}}</span> 项
            </div>
            <div class="content">
              {{modulesMap[requestCondition.devision].des}}
            </div>
          </div>
        </div>
        <div class="h-padding-34 nav-hr h-between">
          <div>
            {{modulesMap[requestCondition.devision].recommend}}
          </div>
          <div>
            <!-- <s-select :list="sortOption" @onSelect="onSortChoose"></s-select> -->
            <!-- <div class="recommend">推荐</div> -->
          </div>
        </div>
        <div class="h-padding-34 index-block" :animation="rotateAnima">
          <div v-for="(card,cardKey) in cardInfoList" :key="cardKey">
            <g-card :width="90" :info="card" :houseType="requestCondition.devision" @onClick="goView"></g-card>
          </div>
        </div>
        <div class="none-show-footer" v-if="ifShowFooter">
          {{requestCondition.devision}} 优质小区就这些啦！
        </div>
        <div class="change" @click="fresh">
            <div class="e-center content">
                <i class="iconfont icon-dingbu-"></i>
            </div>
        </div>
    </div>
</template>

<script>
var mta = require("../../../static/js/mta_analysis.js");
import mSearch from "@/components/search/simpleSearch";
import cardScroll from "@/components/scroll/cardScroll";
import sSelect from "@/components/select/simSelect";
import gCard from "@/components/card/graphCard";
import api from "@/api";

export default {
  components: {
    mSearch,
    cardScroll,
    sSelect,
    gCard
  },
  data() {
    return {
      currentCard: "nav7",
      cpage: 0,
      cardInfoList: [],
      cityDistrict: "520115",
      modulesMap: {
        楼房布局: {
          icon: "icon-xiaotubiao_fuzhi-",
          Standards: "308",
          recommend: "楼房布局 优质小区推荐",
          des: "楼房外观、采光通风、楼栋朝向、电梯数量、一层几户。"
        },
        小区绿化: {
          icon: "icon-xiaotubiao_fuzhi-6",
          Standards: "149",
          recommend: "绿化环境 优质小区推荐",
          des: "道路保洁、绿化规划、植被种类、绿化修剪、晾晒衣物。"
        },
        小区配套: {
          icon: "icon-xiaotubiao_fuzhi-14",
          Standards: "218",
          recommend: "小区配套 优质小区推荐",
          des: "安防监控、路灯照明、休闲器械、人车进出、儿童乐园/运动场地。"
        },
        周边环境: {
          icon: "icon-zhoubianhuanjing",
          Standards: "87",
          recommend: "周边环境 优质小区推荐",
          des: "道路宽窄、绿化景观、街道污染、占道情况、公园湖泊。"
        },
        交通: {
          icon: "icon-xiaotubiao_fuzhi-9",
          Standards: "162",
          recommend: "交通便捷 小区推荐",
          des: "主次干道、公交线路、地铁站点、小区外乱停车、周边路况。"
        },
        车位配套: {
          icon: "icon-xiaotubiao_fuzhi-4",
          Standards: "72",
          recommend: "车位配套 优质小区推荐",
          des: "分流情况、车位月租、车位是否充足、非机动车充电、小区内乱停车。"
        },
        菜场: {
          icon: "icon-xiaotubiao_fuzhi-7",
          Standards: "176",
          recommend: "买菜便利 小区推荐",
          des: "蔬菜、水果、猪肉、水鲜鱼虾、牛羊畜类。"
        },
        学校: {
          icon: "icon-xiaotubiao_fuzhi-5",
          Standards: "162",
          recommend: "教育配套 优质小区推荐",
          des: "幼儿园、小学、初中、高中、培训机构。"
        },
        生活娱乐: {
          icon: "icon-xiaotubiao_fuzhi-8",
          Standards: "693",
          recommend: "生活购物便捷 小区推荐",
          des: "餐饮店铺、娱乐消费、出行配套、生活服务、购物中心。"
        },
        文化体育: {
          icon: "icon-xiaotubiao_fuzhi-13",
          Standards: "149",
          recommend: "文体配套 优质小区推荐",
          des: "图书馆、科技馆、博物馆、健身房、体育场所。"
        },
        医疗: {
          icon: "icon-xiaotubiao_fuzhi-11",
          Standards: "117",
          recommend: "医疗配套 优质小区推荐",
          des: "药店、诊所、大型医院、卫生服务中心、宠物医院。"
        },
        污染: {
          icon: "icon-xiaotubiao_fuzhi-29",
          Standards: "196",
          recommend: "无污染 小区推荐",
          des: "噪音污染、光线污染、气体污染。"
        },
        商务办公: {
          icon: "icon-xiaotubiao_fuzhi-10",
          Standards: "213",
          recommend: "商务配套 优质小区推荐",
          des: "开户银行、酒店宾馆、图文印刷、文具店、办公楼。"
        },
        政府机构: {
          icon: "icon-xiaotubiao_fuzhi-18",
          Standards: "136",
          recommend: "政务便捷 小区推荐",
          des: "居委会、警务室、派出所、社区服务中心、消防机关。"
        }
      },
      sortOption: [
        {
          name: "随机排序",
          value: "1",
          active: true
        },
        {
          name: "高分排序",
          value: "2",
          active: true
        }
      ],
      mark: 70,
      coverImg: require("../../../static/imgs/banner-02.png"),
      leftDispearAnima: {},
      rightInAnima: {},
      rotate: 0,
      rotateAnima: {},
      shareInfo: {
        id: 0
      },
      sortType: "random",
      cpage: 0,
      requestCondition: {
        devision: "学校",
        mark: 70,
        district: "520115",
        size: 5,
        page: 0
      }
    };
  },
  onLoad(query) {
    mta.Page.init();
    this.randomRequest();
  },
  onReachBottom() {
    this.requestCondition.page++;
    this.randomRequest();
  },
  computed: {
    ifShowFooter() {
      if (this.cpage == -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    goView(e){
      this.$store.commit('SET_CURRENT_COVER',e);
      wx.navigateTo({
        url: '/pages/preface/main'
      });
    },
    onSortChoose(e) {
      this.cpage = 0;
      this.cardInfoList = [];
      if (e.value == "2") {
        this.sortType = "mark";
      } else {
        this.sortType = "random";
      }
      this.randomRequest();
    },
    onAbort(i) {
      wx.showModal({
        title: "提示",
        content:
          "Sorry，目前暂时只有观山湖区的楼盘信息，其他区域正在加紧采集中。您还想看哪些楼盘？快到“鹰眼分析”微信公众号留言告诉我们吧！",
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      });
    },
    onDistrictSelect(i) {
      this.requestCondition.district = i.value;
      this.requestCondition.page = 0;
      this.randomRequest();
    },
    onNavSelect(card) {
      this.requestCondition.page = 0;
      this.currentCard = card.value;
      this.requestCondition.devision = card.title
      this.cardInfoList = [];
      this.randomRequest();
      api.saveAccessHistory({
        nickName:this.$store.state.USER_INFO.nickName,
        gender:this.$store.state.USER_INFO.gender,
        language:this.$store.state.USER_INFO.language,
        city:this.$store.state.USER_INFO.city,
        province:this.$store.state.USER_INFO.province,
        country:this.$store.state.USER_INFO.country,
        avataUrl:this.$store.state.USER_INFO.avataUrl,
        functionName:"首页导航",
        functionCode:1,
        project:card.title
      })
    },
    onFocus() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    },
    randomRequest() {
      let me = this;
      if(this.requestCondition.page==-2){
        //last page, no request.
        return;
      }
      wx.showLoading({
        title: "加载中",
        mask: false
      });
      if (me.requestCondition.devision == "污染") {
        this.requestCondition.mark = 50;
      } else {
        this.requestCondition.mark = 70;
      }
      api.homeList(this.requestCondition, res => {
        if (res.success) {
          if(res.data.length==0){
            this.requestCondition.page = -2
            console.log('NO MORE DATA REQUESTED!')
          }
          this.cardInfoList = this.cardInfoList.concat(res.data);
          wx.hideLoading();
        }else{
          wx.hideLoading();
          wx.showLoading({
            title: "网络延迟过高",
            mask: true
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 3000);
        }
      });
    },
    fresh() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 1000
      });
    },
    onShare(card) {
      this.shareInfo.id = card.id;
    }
  },
  mounted() {
    wx.setStorage({
      key: "angle",
      data: 0
    });
  },
  onShareAppMessage: function(option) {
    if (option.from === "button") {
      return {
        title: "",
        path: "/pages/preface/main?id=" + option.target.id,
        imageUrl: require("../../../static/imgs/小程序封面.png"),
        success: function(res) {
          wx.request({
            url: api.getURL("posts/forwardcount"),
            header: {
              "content-type": "application/json"
            },
            data: { id: option.target.id },
            success: function(res) {

            }
          });
        }
      };
    } else {
      return {
        title: "基于大数据的二手房小区测评",
        path: "/pages/home/main",
        imageUrl: require("../../../static/imgs/小程序封面.png"),
        success: function(res) {
          wx.request({
            url: api.getURL("posts/forwardcount"),
            header: {
              "content-type": "application/json"
            },
            data: { id: option.target.id },
            success: function(res) {

            }
          });
        }
      };
    }
  }
};
</script>

<style scoped lang="less">
.h-padding-34 {
  padding: 0 8px;
}
.standar-text {
  border-bottom: 1px solid #f5f6f8;
  padding-bottom: 13px;
  .title {
    text-align: center;
    font-size: 15px;
    columns: #333333;
    font-weight: 500;
    span {
      color: #f27758;
    }
  }
  .content {
    font-size: 12px;
    color: #808080;
    // padding: 0 43px;
    text-align: center;
  }
}
.nav-hr {
  margin-top: 12px;
  font-size: 16px;
  color: #1f1f1f;
  font-weight: 600;
  .recommend {
    font-size: 14px;
    font-weight: 500;
  }
}
.share-button {
  padding: 0;
  border: none;
  background: #ffffff;
  font-size: 24rpx;
  color: rgb(179, 179, 179);
}
.title {
  margin-bottom: 7px;
  font-weight: 600;
  font-size: 48rpx;
}
.cover-img {
  margin-top: 16rpx;
  img {
    width: 100%;
    height: 240rpx;
    background: gray;
    border-radius: 25rpx;
  }
}
.mudle {
  border-radius: 15rpx;
  box-shadow: 0 0 5rpx 5rpx #e5e9ef;
  .icon-block {
    margin: 10rpx;
    border-right: solid 1px #e5e9ef;
    width: 120px;
    i {
      font-size: 150rpx;
      color: #4ad9b7;
    }
    .icon-title {
      font-size: 22rpx;
      color: #4ad9b7;
    }
  }
  .content {
    position: relative;
    .content-body {
      font-size: 24rpx;
      padding: 10rpx;
      color: #999999;
      border-bottom: solid 1px #e5e9ef;
      line-height: 36rpx;
      font-weight: 300;
    }
    .content-footer {
      font-size: 24rpx;
      color: rgb(51, 51, 51);
      padding: 10rpx;
      font-weight: 500;
      span {
        color: #f05a34;
        font-weight: 600;
        font-size: 26rpx;
      }
    }
  }
}
.select-block {
  margin-top: 30rpx;
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
.search-title {
  display: flex;
  align-items: center;
  .search-input {
    margin-left: 10px;
    flex-grow: 2;
  }
}
.nav-des {
  margin-top: 30rpx;
  position: relative;
  height: 1rpx;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: #fff;
  .hr {
    height: 0px;
    width: 80%;
    border: solid 0.5px #dadbdc;
  }
  .content {
    // width: 310rpx;
    position: absolute;
    // padding: 0 20rpx;
    // top: -5rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: #808080;
    background: #fff;
    text-align: center;
  }
}
.none-show-footer {
  height: 48px;
  background: #f5f6f8;
  font-size: 10px;
  color: #808080;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
