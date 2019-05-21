<template>
  <div>
      <div v-if="!planStarted">
        <img :src="host+'homeback.png'" class="background">
        <div class="profile">
          <div class="circle1">
            <div class="circle2">
              <img :src="userIcon" alt="">
            </div>
          </div>
        </div>
        <div class="title">
          <div class="subtitle1">您的专属房源</div>
          <div class="subtitle2">测一下你可以拥有多大面积的房吧！</div>
        </div>
        <div class="info">
          <div class="item">
            <label for="downpayment">首付：</label>
            <input type="number" id="downpayment"  placeholder-style="text-align:center;" class="input" v-model.number="downPayment">
            <span class="unit">万</span>
          </div>
          <div class="item">
            <label for="downpayment">月供：</label>
            <input type="number" id="monthpay"  placeholder-style="text-align:center;" class="input"  v-model.number="monthPay">
            <span class="unit">元</span>
          </div>
          <div class="item">
            <label for="downpayment">面积：</label>
            <input type="number" id="area"  placeholder-style="text-align:center;" class="input" v-model.number="area">
            <span class="unit">平米</span>
          </div>
          <div class="input-button" :class="{active:isActive}" @click="startPlan">开始规划</div>
        </div>
      </div>
      <div v-if="planStarted">
        <div class="level">
          <div class="name">
            <div class="subname1">{{level}}</div>
            <div class="subname2">专属房：{{couldOffer}}</div>
          </div>
          <div class="avatar">
            <img :src="userIcon" @click="planStarted=false">
          </div>
        </div>
        <div class="plan">
          <div class="left">
            <div class="flex-inline">
              <div class="input-title">首付：</div>
              <div class="pinkfont"><input class="cus-input" type="number" v-model="downPayment"></div>
              <div class="pinkfont">万</div>
            </div>
            <div class="margin23 flex-inline">
              <div class="input-title">月供：</div>
              <div class="grayfont"><input class="cus-input" type="number" v-model="monthPay"></div>
              <div class="grayfont">元</div>
            </div>
          </div>
          <div class="right">
            <div class="flex-inline">
              <div class="input-title">总价：</div>
              <div class="pinkfont"><input class="cus-input disabled" type="number" v-model="totalPrice" disabled></div>
              <div class="pinkfont">万元</div>
            </div>
            <div class="margin23 flex-inline">
              <div class="input-title">面积：</div>
              <div class="grayfont"><input class="cus-input" type="number" v-model="area"></div>
              <div class="grayfont">平米</div>
            </div>
          </div>
        </div>
        <div class="params">
          <div class="item">
            <span class="key">单价</span>
            <span class="value">{{price}}元</span>
          </div>
          <div class="item">
            <span class="key">还款方式</span>
            <span class="value">等额本息</span>
          </div>
          <div class="item">
            <span class="key">首付比例</span>
            <picker @change="onDownpayChange" :range="downPaymentRange" range-key="name" :value="downPaymentIndex">
              <span class="value">{{downPaymentRange[downPaymentIndex].value}}成<i class="iconfont icon-next"></i></span>
            </picker>
          </div>
          <div class="item">
            <span class="key">贷款比例</span>
            <picker @change="onLoanChange" :range="loanRange" range-key="name" :value="loanIndex">
              <span class="value">{{loanRange[loanIndex].value}}成<i class="iconfont icon-next"></i></span>
            </picker>
          </div>
          <div class="item">
            <span class="key">贷款方式</span>
            <picker @change="onLoanWayChange" :range="loanWayRange" range-key="name" :value="loanWayIndex">
              <span class="value">{{loanWayRange[loanWayIndex].value}}<i class="iconfont icon-next"></i></span>
            </picker>
          </div>
          <div class="item">
            <span class="key">贷款年限</span>
            <picker @change="onLoanYearChange" :range="loanYearRange" range-key="name" :value="loanYearIndex">
              <span class="value">{{loanYearRange[loanYearIndex].value}}年<i class="iconfont icon-next"></i></span>
            </picker>
          </div>
          <div class="item">
            <span class="key">商业利率</span>
            <picker @change="onDiscountChange" :range="tradeDiscountRange" range-key="name" :value="loanDiscountIndex">
              <span class="value">{{tradeDiscountRange[loanDiscountIndex].name}}<i class="iconfont icon-next"></i></span>
            </picker>
          </div>
          <div class="e-center">
            <div class="input-button active" @click="planStarted=false">返回</div>
          </div>
        </div>
        <div class="cover-card">
          <div class="cover-title">
            <span class="subtitle1">符合您的楼盘</span>
          </div>
          <card v-for="(c,k) in cards" :key="k" :info="c" @onClick="onCardClick(c)"></card>
        </div>
      </div>
      <div class="change" @click="backToTop" v-if="planStarted&&cards.length>0">
        <div class="e-center content">
            <i class="iconfont icon-dingbu-"></i>
        </div>
      </div>
  </div>
</template>

<script>
import api from "@/api";
import card from "@/components/card/graphCard"
export default {
  components:{
    card
  },
  data: () => ({
    host: api.BASE_HOST,
    userIcon: "",
    couldStart: false,
    planStarted: false,
    downPayment: null,
    monthPay: null,
    area: 100,
    CIR: 1,
    unitPriceIndex: 0,
    downPaymentIndex: 0,
    loanIndex: 0,
    loanWayIndex: 0,
    loanYearIndex: 0,
    loanDiscountIndex: 6,
    totalPrice: 0,
    price: 0,
    level:"STANDARD",
    couldOffer:"HOUSE",
    cards:[],
    pageable:{
      page:0,
      size:5,
      end:false
    },
    priceRange: [
      {
        name: "6000元",
        value: "6000"
      },
      {
        name: "7000元",
        value: "7000"
      },
      {
        name: "8000元",
        value: "8000"
      },
      {
        name: "9000元",
        value: "9000"
      },
      {
        name: "10000元",
        value: "10000"
      },
      {
        name: "11000元",
        value: "11000"
      },
      {
        name: "12000元",
        value: "12000"
      }
    ],
    downPaymentRange: [
      {
        name: "2成",
        value: 2
      },
      {
        name: "2.5成",
        value: 2.5
      },
      {
        name: "3成",
        value: 3
      },
      {
        name: "3.5成",
        value: 3.5
      },
      {
        name: "4成",
        value: 4
      },
      {
        name: "4.5成",
        value: 4.5
      },
      {
        name: "5成",
        value: 5
      },
      {
        name: "5.5成",
        value: 5.5
      },
      {
        name: "6成",
        value: 6
      },
      {
        name: "6.5成",
        value: 6.5
      },
      {
        name: "7成",
        value: 7
      },
      {
        name: "7.5成",
        value: 7.5
      },
      {
        name: "8成",
        value: 8
      }
    ],
    loanRange: [
      {
        name: "8成",
        value: 8
      },
      {
        name: "7.5成",
        value: 7.5
      },
      {
        name: "7成",
        value: 7
      },
      {
        name: "6.5成",
        value: 6.5
      },
      {
        name: "6成",
        value: 6
      },
      {
        name: "5.5成",
        value: 5.5
      },
      {
        name: "5成",
        value: 5
      },
      {
        name: "4.5成",
        value: 4.5
      },
      {
        name: "4成",
        value: 4
      },
      {
        name: "3.5成",
        value: 3.5
      },
      {
        name: "3成",
        value: 3
      },
      {
        name: "2.5成",
        value: 2.5
      },
      {
        name: "2成",
        value: 2
      }
    ],
    loanWayRange: [
      {
        name: "商业贷款",
        value: "商业贷款"
      },
      {
        name: "公积金贷款",
        value: "公积金贷款"
      }
    ],
    loanYearRange: [
      {
        name: "30年(360期)",
        value: 30
      },
      {
        name: "29年(348期)",
        value: 29
      },
      {
        name: "28年(336期)",
        value: 28
      },
      {
        name: "27年(324期)",
        value: 27
      },
      {
        name: "26年(312期)",
        value: 26
      },
      {
        name: "25年(300期)",
        value: 25
      },
      {
        name: "24年(288期)",
        value: 24
      },
      {
        name: "23年(276期)",
        value: 23
      },
      {
        name: "22年(264期)",
        value: 22
      },
      {
        name: "21年(252期)",
        value: 21
      },
      {
        name: "20年(240期)",
        value: 20
      },
      {
        name: "19年(228期)",
        value: 19
      },
      {
        name: "18年(216期)",
        value: 18
      },
      {
        name: "17年(204期)",
        value: 17
      },
      {
        name: "16年(192期)",
        value: 16
      },
      {
        name: "15年(180期)",
        value: 15
      },
      {
        name: "14年(168期)",
        value: 14
      },
      {
        name: "13年(360期)",
        value: 13
      },
      {
        name: "12年(144期)",
        value: 12
      },
      {
        name: "11年(132期)",
        value: 11
      },
      {
        name: "10年(120期)",
        value: 10
      },
      {
        name: "9年(108期)",
        value: 9
      },
      {
        name: "8年(96期)",
        value: 8
      },
      {
        name: "7年(84期)",
        value: 7
      },
      {
        name: "6年(72期)",
        value: 6
      },
      {
        name: "5年(60期)",
        value: 5
      },
      {
        name: "4年(48期)",
        value: 4
      },
      {
        name: "3年(36期)",
        value: 3
      },
      {
        name: "2年(24期)",
        value: 2
      },
      {
        name: "1年(12期)",
        value: 1
      }
    ],
    tradeDiscountRange: [
      {
        name: "7折",
        value: 0.7
      },
      {
        name: "7.5折",
        value: 0.75
      },
      {
        name: "8折",
        value: 0.8
      },
      {
        name: "8.5折",
        value: 0.85
      },
      {
        name: "9折",
        value: 0.9
      },
      {
        name: "9.5折",
        value: 0.95
      },
      {
        name: "无折扣",
        value: 1
      },
      {
        name: "1.05倍",
        value: 1.05
      },
      {
        name: "1.1倍",
        value: 1.1
      },
      {
        name: "1.15倍",
        value: 1.15
      },
      {
        name: "1.2倍",
        value: 1.2
      }
    ]
  }),

  onLoad() {
    api.simLogin(logRes => {
      if (logRes.success) {
        this.$store.commit("SET_USER", logRes.data);
        this.userIcon = this.$store.state.USER_INFO.avatarUrl;
      }
    });
  },
  computed: {
    isActive() {
      if (this.downPayment > 0 && this.monthPay > 0 && this.area > 0) {
        return (this.couldStart = true);
      } else {
        return (this.couldStart = false);
      }
    }
  },
  watch:{
    downPayment(nv,ol){
      this.loanCalculate();
    },
    monthPay(nv,ol){
      this.loanCalculate();
    },
    area(nv,ol){
      this.loanCalculate();
    }
  },
  onReachBottom(){
    this.pageable.page++;
    this.requestTestArticle();
  },
  methods: {
    startPlan() {
      if (this.couldStart) {
        this.loanCalculate();
        this.planStarted = true;
      }
    },
    backToTop(){
      wx.pageScrollTo({
        scrollTop:0
      })
    },
    onCardClick(e) {
      this.$store.commit("SET_CURRENT_COVER", e);
      api.addViewPoint(e.coverId);
      wx.navigateTo({
        url: "/pages/preface/main?id=" + e.coverId
      });
    },
    setTitle() {
      let price = this.totalPrice;
      if ((price > 0) & (price <= 10)) {
        this.couldOffer = "一块砖";
        this.level = "搬砖司令";
      } else if ((price > 10) & (price <= 30)) {
        this.couldOffer = "厕所";
        this.level = "梅有钱";
      } else if ((price > 30) & (price <= 60)) {
        this.couldOffer = "公寓";
        this.level = "朱孤生";
      } else if ((price > 60) & (price <= 90)) {
        this.couldOffer = "二居室";
        this.level = "麦得奇·本·小康";
      } else if ((price > 90) & (price <= 120)) {
        this.couldOffer = "三居室";
        this.level = "小幸运";
      } else if ((price > 120) & (price <= 200)) {
        this.couldOffer = "花园洋房";
        this.level = "玩不怕小姐";
      } else if ((price > 200) & (price <= 500)) {
        this.couldOffer = "小别墅";
        this.level = "小土豪";
      } else if ((price > 500) & (price <= 1000)) {
        this.couldOffer = "豪华别墅";
        this.level = "霸道总裁";
      } else if ((price > 1000) & (price <= 5000)) {
        this.couldOffer = "海景别墅";
        this.level = "壕哥";
      } else if ((price > 5000) & (price <= 10000)) {
        this.couldOffer = "城堡";
        this.level = "赵得柱";
      } else if (price > 10000) {
        this.couldOffer = "月球";
        this.level = "尚天浪";
      }
    },
    loanCalculate() {
      let monthMount = 12 * this.loanYearRange[this.loanYearIndex].value;
      let monthlyInterest = this.rateCalculate();
      let loans = this.monthPay *(Math.pow(1 + monthlyInterest, monthMount) - 1) /(monthlyInterest * Math.pow(1 + monthlyInterest, monthMount)); // loans
      let totalPrice = (this.downPayment * 10000 + loans); //Total price

      this.totalPrice = (totalPrice / 10000).toFixed(2);
      this.price = (totalPrice / this.area).toFixed(1); //Price
      let percent = Math.round(Number(this.downPayment * 10000 / totalPrice * 10));
      console.log("THE LOAN PERCENT IS:",percent)

      if(percent>8||percent<2){

        return;
      }
      this.downPaymentIndex = this.downPaymentRange.findIndex(
        i => i.value == percent
      );
      this.loanIndex = this.loanRange.findIndex(
        i => i.value == 10 - percent
      );
      this.setTitle();
      this.initPage();
      this.requestTestArticle();
    },
    calculateLoan(){
      let monthMount = 12 * this.loanYearRange[this.loanYearIndex].value;
      let monthlyInterest = this.rateCalculate();
      return this.monthPay *(Math.pow(1 + monthlyInterest, monthMount) - 1) /(monthlyInterest * Math.pow(1 + monthlyInterest, monthMount)); // loans
    },
    initPage(){
      this.pageable.page=0,
      this.pageable.size=5,
      this.pageable.end=false
      this.cards = [];
    },
    requestTestArticle(){
      if(this.pageable.end){
        return;
      }
      api.findCoverByPrice(this.price,this.pageable.page*this.pageable.size,this.pageable.size,res=>{
        if(res.data.length==0){
          this.pageable.end = true;
          return;
        }
        this.cards = this.cards.concat(res.data);
      })
    },
    rateIndex(downpayPercent) {
      let index = this.downPaymentRange.findIndex(
        i => i.value == downpayPercent
      );
    },
    rateCalculate() {
      let monthlyInterest = 0;
      if (this.loanWayIndex == 0) {
        //商业贷款
        if (this.loanYearRange[this.loanYearIndex].value <= 1) {
          monthlyInterest = 0.0435;
        } else if (
          this.loanYearRange[this.loanYearIndex].value <= 5 &&
          this.loanYearRange[this.loanYearIndex].value > 1
        ) {
          monthlyInterest = 0.0475;
        } else if (this.loanYearRange[this.loanYearIndex].value > 5) {
          monthlyInterest = 0.049;
        }
      } else {
        if (this.loanYearRange[this.loanYearIndex].value <= 5) {
          monthlyInterest = 0.0275;
        } else {
          monthlyInterest = 0.0325;
        }
      }
      monthlyInterest = monthlyInterest * this.CIR / 12;
      return monthlyInterest;
    },
    onParamChange(){
      let loan = this.calculateLoan();
      this.totalPrice = (this.downPayment*10000+loan)/10000
      this.price = (this.totalPrice*10000/this.area).toFixed(2);
      this.initPage();
      this.requestTestArticle();
    },
    onDownpayChange(i) {
      this.downPaymentIndex = i.mp.detail.value;
      let downPercent = this.downPaymentRange[this.downPaymentIndex].value;
      let loanPercent = 10 - downPercent;
      this.loanIndex = this.loanRange.findIndex(i => i.value == loanPercent);

      this.onParamChange()
    },
    onLoanChange(i) {
      this.loanIndex = i.mp.detail.value;
      let loanPercent = this.loanRange[this.loanIndex].value;
      let downPercent = 10 - loanPercent;
      this.downPaymentIndex = this.downPaymentRange.findIndex(
        i => i.value == downPercent
      );

      this.onParamChange()
    },
    onLoanWayChange(i) {
      this.loanWayIndex = i.mp.detail.value;
      this.onParamChange()
    },
    onLoanYearChange(i) {
      this.loanYearIndex = i.mp.detail.value;
      this.onParamChange()
    },
    onDiscountChange(i) {
      this.loanDiscountIndex = i.mp.detail.value;
      this.CIR = this.tradeDiscountRange[this.loanDiscountIndex].value;
      this.onParamChange()
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.background {
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: 100%;
}
.profile {
  position: relative;
  display: flex;
  justify-content: center;
  // margin-top: 43rpx;
  .circle1 {
    width: 349rpx;
    height: 349rpx;
    background: rgba(50, 187, 143, 0.15);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .circle2 {
    width: 265rpx;
    height: 265rpx;
    background: rgba(50, 187, 143, 0.29);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 188rpx;
    height: 188rpx;
    border-radius: 50%;
    opacity: 1;
  }
}
.title {
  width: 100%;
  .subtitle1 {
    height: 59rpx;
    font-size: 62rpx;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 59rpx;
    text-align: center;
    margin-top: 27rpx;
  }
  .subtitle2 {
    height: 31rpx;
    font-size: 32rpx;
    font-family: PingFang-SC-Regular;
    font-weight: 400;
    color: rgba(127, 127, 127, 1);
    line-height: 31rpx;
    text-align: center;
    margin-top: 27rpx;
  }
}
.info {
  width: 100%;
  margin-top: 38rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .item {
    display: flex;
    position: relative;
    margin-top: 46rpx;
    label {
      font-size: 34rpx;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      position: absolute;
      top: 17rpx;
      left: 40rpx;
    }
    .unit{
      position: absolute;
      top: 17rpx;
      right: 40rpx;
      font-size: 34rpx;
    }
  }
  .input {
    width: 225rpx;
    height: 84rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 0px 2px 0px rgba(50, 187, 143, 0.1),
      -1px 0px 5px 0px rgba(50, 187, 143, 0.1),
      0px 7px 101px 10px rgba(50, 187, 143, 0.1),
      0px -3px 27px 0px rgba(50, 187, 143, 0.1);
    border-radius: 42rpx;
    font-size: 32rpx;
    padding: 0 150rpx;
  }

}
.input-button {
    width: 525rpx;
    height: 84rpx;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(50, 187, 143, 1);
    box-shadow: 3px 0px 2px 0px rgba(50, 187, 143, 0.1),
      -1px 0px 5px 0px rgba(50, 187, 143, 0.1),
      0px 7px 101px 10px rgba(50, 187, 143, 0.1),
      0px -3px 27px 0px rgba(50, 187, 143, 0.1);
    border-radius: 42px;
    margin-top: 46rpx;
    font-size: 40rpx;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(128, 128, 128, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input-button.active {
    background: RGBA(50, 187, 143, 1);
    color: white;
  }
.level {
  display: flex;
  width: 100%;
  .name {
    width: 80%;
    padding: 45rpx 50rpx;
    .subname1 {
      height: 45rpx;
      font-size: 48rpx;
      font-family: PingFang-SC-Heavy;
      font-weight: 800;
      color: rgba(51, 51, 51, 1);
      line-height: 44prx;
    }
    .subname2 {
      height: 29rpx;
      font-size: 30rpx;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 44rpx;
      margin-top: 23rpx;
    }
  }
  .avatar {
    width: 20%;
    padding: 45rpx 50rpx;
    text-align: right;
    img {
      width: 116rpx;
      height: 116rpx;
      background: rgba(255, 255, 255, 1);
      border: 2px solid rgba(50, 187, 143, 1);
      box-shadow: 0px 8px 21px 3px rgba(51, 187, 144, 0.22),
        0px -8px 21px 3px rgba(51, 187, 144, 0.22);
      border-radius: 58px;
    }
  }
}
.margin23 {
  margin-top: 23rpx;
}
.plan {
  padding: 45rpx 50rpx;
  border-top: solid 8rpx rgb(232, 234, 238);
  display: flex;
  .flex-inline{
    display: flex;
    justify-items: baseline;
  }
  .pinkfont {
    font-size: 30rpx;
    font-family: PingFang-SC-Heavy;
    font-weight: 800;
    color: rgba(255, 73, 138, 1);
  }
  .grayfont {
    font-size: 30rpx;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(101, 101, 101, 1);
  }
  .input-title {
    font-size: 30rpx;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(101, 101, 101, 1);
  }
  .cus-input{
    display: inline-block;
    min-width: 35rpx;
    max-width: 100rpx;
    border-bottom: solid 1px rgb(232, 234, 238);
  }
  .cus-input.disabled{
    border-bottom: none;
  }
  .left {
    width: 50%;
  }
  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
.params {
  border-top: solid 8rpx rgb(232, 234, 238);
  padding: 45rpx 50rpx;
  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid rgba(234, 234, 240, 1);
    padding: 23rpx 0;
    .key {
      font-size: 32rpx;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(64, 64, 64, 1);
      line-height: 44rpx;
    }
    .value {
      font-size: 29rpx;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(77, 77, 77, 1);
      line-height: 44rpx;
    }
    i {
      display: inline-block;
      margin-left: 18rpx;
      font-size: 29rpx;
    }
  }
}
.cover-card{
  padding: 8px 8px;
  .cover-title {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .subtitle1 {
      font-size: 36rpx;
      color: rgb(23, 51, 44);
      font-weight: 600;
    }
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
