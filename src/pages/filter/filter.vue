<template>
    <div class="explore-back">
        <div class="title gap">
            <m-select @onSelect="onDistrictSelect" @onAbort="onAbort"></m-select>
            <switch-tab @onSelect="tabChange"></switch-tab>
            <m-select :list="priceAvailList" @onSelect="onPriceSelect" :left="'-40px'"></m-select>
        </div>
        <div v-if="!personalVisisble">
          <div class="tags gap">
            <div class="tag-list" v-if="tagOpen">
                <notation :numLimit="3" :list="notations" :marginBottom="10" :marginRight="15" @onChange="onTagChange" @error="onError"></notation>
            </div>
            <div class="footer" v-if="!tagOpen" @click="tagOpen=!tagOpen">展开选项 <i class="iconfont icon-xiaotubiao_fuzhi-27"></i></div>
            <div class="footer open" v-if="tagOpen">
                <span>最多可选3个哦~</span>
                <span class="click-hide" @click="tagOpen=!tagOpen">点击隐藏<i class="iconfont icon-xiaotubiao_fuzhi-28"></i></span>
            </div>
          </div>
          <div class="concern" v-if="showNull">
            <img :src="searchNull" alt="">
          </div>
          <div class="result gap">
              <div v-for="(i,k) in cardList" :key="k">
                  <card :info=i @onClick="goView"></card>
              </div>
          </div>
          <div class="change" @click="fresh">
              <div class="e-center content">
                  <i class="iconfont icon-dingbu-"></i>
              </div>
          </div>
        </div>
        <div v-if="personalVisisble">
          <div class="tips" v-if="questionVisible">
            如果您还不知道自己适合居住什么样的小区，那就开始个性化测评吧~
          </div>
          <question-card :questions="questions" @onComplete="onQuetionComplete" v-if="questionVisible"></question-card>
          <div v-if="!questionVisible">
            <div class="title1 h-between">
              <div>根据测试为您推荐</div>
              <div class="eagle-button" @click="onResetQuestion">重置问题</div>
            </div>
            <div class="recommenList">
              <card :info=i v-for="(i,k) in recommendList" :key="k" @onClick="goView"></card>
            </div>
          </div>
        </div>

    </div>
</template>

<script>
import switchTab from "@/components/tab/SwitchTab.vue";
import mSelect from "@/components/select/simSelect.vue";
import notation from "@/components/notation";
import card from "@/components/card/resultCard";
import questionCard from "@/components/card/questionCard";
import api from "@/api";
export default {
  components: {
    switchTab,
    mSelect,
    notation,
    card,
    questionCard
  },
  data: () => ({
    searchNull: require("../../../static/imgs/search-null.png"),
    showNull: false,
    priceAvailList: [
      {
        name: "价格",
        value: "0,100000",
        active: true
      },
      {
        name: "6千~9千",
        value: "6000,9000",
        active: true
      },
      {
        name: "9千~1.2万",
        value: "9000,12000",
        active: true
      },
      {
        name: "1.2万~1.4万",
        value: "12000,14000",
        active: true
      },
      {
        name: "1.4万~1.6万",
        value: "14000,16000",
        active: true
      },
      {
        name: "1.6万~1.8万",
        value: "16000,18000",
        active: true
      },
      {
        name: "1.8万~2万",
        value: "18000,20000",
        active: true
      },
      {
        name: "2万以上",
        value: "20000,100000",
        active: true
      }
    ],
    tagOpen: true,
    notations: [
      {
        tagName: "房型丰富",
        value: "房型丰富",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "低密度",
        value: "低密度",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "配套齐全",
        value: "配套齐全",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "交通便捷",
        value: "交通便捷",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "车位充足",
        value: "车位充足",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "生活方便",
        value: "生活方便",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "学校旁",
        value: "学校旁",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "公园旁",
        value: "公园旁",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "安静舒适",
        value: "安静舒适",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "医院旁",
        value: "医院旁",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "高绿化率",
        value: "高绿化率",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "地铁房",
        value: "地铁房",
        active: false,
        tagType: "ADVANTAGE"
      }
    ],
    cardList: [],
    recommendList: [],
    district: "520115",
    price: ["0", "20000"],
    tagStr: "",
    cpage: -1,
    pageEnd: false,
    questions: [],
    personalVisisble: false,
    questionVisible: true
  }),
  onLoad() {},
  methods: {
    goView(e){
      this.$store.commit('SET_CURRENT_COVER',e);
      wx.navigateTo({
        url: '/pages/preface/main'
      });
    },
    tabChange(e) {
      this.personalVisisble = e;
      if (this.personalVisisble) {
        this.questionVisible = true;
      }
    },
    onResetQuestion() {
      this.questionVisible = true;
    },
    fresh() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 1000
      });
    },
    onAbort() {
      wx.showModal({
        title: "提示",
        content:
          "Sorry，目前暂时只有观山湖区的楼盘信息，其他区域正在加紧采集中。您还想看哪些楼盘？快到“鹰眼分析”微信公众号留言告诉我们吧！",
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#32bb8f"
      });
    },
    onError() {
      wx.showModal({
        title: "提示",
        content: "最多只能选择3个噢",
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#32bb8f"
      });
    },
    onTagChange(e) {
      let tagStr = "";
      e.forEach(i => {
        tagStr += i.value + ",";
      });
      let length = tagStr.length;
      tagStr = tagStr.slice(0, length - 1);
      this.tagStr = tagStr;
      this.pageEnd = false;
      this.cpage = -1;
      this.cardList = [];
      this.queyResult();
    },
    queyResult() {
      if (this.pageEnd) {
        return;
      }
      this.cpage++;
      api.findByDistrictAndPriceAndTag(
        {
          district: this.district,
          minprice: this.price[0],
          maxprice: this.price[1],
          tags: this.tagStr,
          page: this.cpage * 5,
          size: 5,
          title: ""
        },
        res => {
          if (res.success) {
            if (res.data.length == 0) {
              this.pageEnd = true;
            }
            this.cardList = this.cardList.concat(res.data);
            if (this.cardList.length > 0) {
              this.showNull = false;
            } else {
              this.showNull = true;
            }
          }
        }
      );
    },
    onDistrictSelect(e) {
      this.district = e.value;
      this.cardList = [];
      this.pageEnd = false;
      this.cpage = -1;
      this.queyResult();
    },
    onPriceSelect(e) {
      this.price = e.value.split(",");
      this.pageEnd = false;
      this.cpage = -1;
      this.cardList = [];
      this.queyResult();
    },
    onQuetionComplete(tags) {
      this.tagStr = Array.from(tags).join(",");
      this.questionVisible = false;
      this.cpage = 0;
      this.recommendRequest();
    },
    recommendRequest() {
      if (this.pageEnd) {
        return;
      }
      this.cpage++;
      api.findByDistrictAndPriceAndTag(
        {
          district: this.district,
          minprice: this.price[0],
          maxprice: this.price[1],
          tags: this.tagStr,
          mark: 70,
          page: this.cpage,
          size: 30
        },
        res => {
          if (res.success) {
            if (res.data.length == 0) {
              this.pageEnd = true;
            }
            this.recommendList = res.data;
          }
        }
      );
    }
  },
  mounted() {
    this.queyResult();
    api.findQuestions(res => {
      if (res.success) {
        res.data.sort((a, b) => a.id - b.id);
        res.data.map(q=>{
          q.options.sort((a,b)=>a.optionId-b.optionId)
        });
        res.data.sort((a,b)=>a.id-b.id);
        this.questions = res.data;
      }
    });
  },
  onReachBottom() {
    if (this.personalVisisble) {
      this.recommendRequest();
    } else {
      this.queyResult();
    }
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
              console.log(res);
            }
          });
        }
      };
    } else {
      return {
        title: "基于大数据的二手房小区测评",
        path: "/pages/home/main",
        imageUrl: require("../../../static/imgs/小程序封面.png"),
        success: function() {},
        fail: function() {}
      };
    }
  }
};
</script>

<style scoped lang="less">
.concern {
  margin-top: 50px;
  text-align: center;
  font-size: 13px;
  color: #b3b3b3;
  img {
    width: 191px;
    height: 147px;
  }
}
.explore-back {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid #fafafa;
  }
  .tags {
    border-radius: 5px;
    border: 1px solid #fafafa;
    box-shadow: 0 1px 2px 2px rgba(145, 161, 189, 0.2);
    .tag-list {
      // padding: 15px 0;
      padding-top: 15px;
    }
    .footer {
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      color: #7c7c7c;
      display: flex;
      justify-content: center;
    }
    .footer.open {
      justify-content: space-between;
      padding: 0 11px;
      margin-bottom: 2px;
      .click-hide {
        display: flex;
      }
    }
  }
}
.gap {
  margin: 0 8px;
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
.tips {
  font-size: 17px;
  color: rgb(102, 102, 102);
  padding: 10px 16px;
}
.title1 {
  padding: 0 9px;
  font-size: 16px;
  color: rgb(31, 31, 31);
  font-weight: 600;
}
.recommenList {
  padding: 0 9px;
}
</style>
