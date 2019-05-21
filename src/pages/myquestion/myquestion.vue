<template>
  <div>
    <div>
      <div class="question-block">
        <div class="card" v-for="(q,k) in questions" :key="k">
          <div class="block-item top">
            <div class="tangent red">问</div>
            <div class="content">{{q.question}}</div>
          </div>
          <div class="h-between">
            <div class="asker" v-if="q.hidden">{{q.asker}}</div>
            <div class="asker" v-else>****</div>
            <!-- <div class="asker">{{q.createdAt}}</div> -->
          </div>
          <div class="block-item" v-if="q.answers.length>0">
            <div class="tangent green">答</div>
            <div class="content black">
              {{q.answers[0].reply}}
              <div class="footer-user">
                <div class="user-icon">
                  <img :src="userAvatar">
                  <span>{{q.answers[0].replier}}</span>
                </div>
                <div
                  @click="onPointClick(q.answers[0])"
                  class="point-block"
                  :class="{active:q.answers[0].praised}"
                >
                  <span class="iconfont icon-like active"></span>
                  <span class="points">{{q.answers[0].praise}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="e-center">
      <div class="e-center margin-bottom-32">
        <div class="input-block">
          <textarea
            maxlength="-1"
            class="reply-text"
            v-model="question.question"
            placeholder="请输入您的问题..."
          ></textarea>
          <div class="input-footer">
            <div class="user-option">
              <div class="h-center check" @click="setHidden">
                <div class="font-style1">匿名</div>
                <span class="iconfont icon-duigou" :class="{active:question.isHidden}"></span>
              </div>
              <div class="h-center check more contact-me" @click="setContactMe">
                <div class="font-style1">可联系我</div>
                <span class="iconfont icon-duigou" :class="{active:question.canContactMe}"></span>
              </div>
            </div>
            <!-- <div class="button-green"  @click="ask">我要咨询</div> -->
            <button
              v-if="question.canContactMe"
              class="ask-btn"
              size="mini"
              ref="askbtn"
              open-type="getPhoneNumber"
              type="primary"
              @getphonenumber="ask"
            >我要咨询</button>
            <button v-else class="ask-btn" size="mini" ref="askbtn" type="primary" @click="ask">我要咨询</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var WXBizDataCrypt = require("@/utils/WXBizDataCrypt");
export default {
  data() {
    return {
      USER: {},
      question: {
        type: "COMMIT",
        question: "",
        isHidden: true,
        canContactMe: true
      },
      questions: []
    };
  },
  onLoad() {
    this.USER = this.$store.state.USER_INFO;
    if (this.USER && this.USER.userId !== null) {
      this.$http.findMyQuestions(this.USER.userId, res => {
        if (res.success) {
          this.questions = res.data;
        }
      });
    }
  },
  methods: {
    setHidden() {
      this.question.isHidden = !this.question.isHidden;
    },
    setContactMe() {
      this.question.canContactMe = !this.question.canContactMe;
    },
    ask(e) {
      let data = "";
      if (this.question.question.length < 5) {
        wx.showModal({
          title: "提示",
          content:
            "您的问题过短，请详细描述您的问题，保证字数大于10个，谢谢您的支持",
          showCancel: false
        });
        return;
      }
      if (this.USER == null || this.USER.userId == 0) {
        // doesen't login
        this.login(
          success => {
            // login success
          },
          fail => {
            wx.showModal({
              title: "提示",
              content: "您必须登陆才可以咨询",
              showCancel: false
            });
          }
        );
      } else {
        // logined
        if (this.question.canContactMe) {
          if (e.target.errMsg === "getPhoneNumber:ok") {
            let appId = "wx3994889fc2a4b078";
            let sessionKey = this.USER.session_key;
            let encryptedData = e.target.encryptedData;
            let iv = e.target.iv;
            let pc = new WXBizDataCrypt(appId, sessionKey);
            data = pc.decryptData(encryptedData, iv);
            console.log("THE USER PHONE INFO IS: ", data);
          } else {
            //   TODO: remind 
            wx.showModal({
              title: "提示",
              content:
                "",
              showCancel: false
            });
          }
        }
        this.commitQuestion(data);
      }
    },
    login(success, fail) {
      this.$http.simLogin(res => {
        if (res.success) {
          this.USER = res.data;
          success({ data: res.data });
        } else {
          fail({ data: res.data });
        }
      });
    },
    commitQuestion(data) {
      this.question.userId = this.USER.userId;
      if (data !== null) {
        this.question.phoneNumber = data.phoneNumber;
      }
      this.$http.commitQuestion(this.question, res => {
        if (res.success) {
          wx.showModal({
            title: "提示",
            content:
              "我们已经收到您的提问，分析师会尽快为您解答，稍后请查看自己的提问。",
            showCancel: false
          });
          this.question.question = "";
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.margin-bottom-32 {
  margin-bottom: 32rpx;
}
.margin-top-32 {
  margin-top: 32rpx;
}

.swiper {
  height: 310rpx;
  .swiper-item {
    display: flex;
    justify-content: center;
  }
}
.cover-img {
  width: 714rpx;
  height: 304rpx;
  // background: rgba(0, 0, 0, 0);
  // box-shadow: 0px 4rpx 20rpx rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 30rpx;
  margin-left: auto;
  margin-right: auto;
}
.input-block {
  width: 714rpx;
  height: 352rpx;
  background: rgba(240, 240, 240, 1);
  box-shadow: 0rpx 4rpx 20rpx rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 30rpx;
}
.reply-text {
  width: 666rpx;
  height: 222rpx;
  padding: 24rpx 24rpx;
  font-size: 28prx;
  font-weight: 400;
  line-height: 40rpx;
  color: rgba(155, 155, 155, 1);
  opacity: 1;
}
.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 82rpx;
  padding: 0 20rpx;
  .user-option {
    display: flex;
    .contact-me {
      margin-left: 10rpx;
    }
  }
}
.check {
  width: 124rpx;
  height: 56rpx;
  background: rgba(227, 227, 227, 1);
  opacity: 1;
  border-radius: 12rpx;
}
.check.more {
  width: 160rpx;
}
.font-style1 {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 40rpx;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
}
.icon-duigou {
  width: 32rpx;
  height: 32rpx;
  background: rgba(242, 242, 242, 1);
  opacity: 1;
  border-radius: 6rpx;
  margin-left: 8rpx;
  color: rgba(227, 227, 227, 1);
}
.icon-duigou.active {
  background: rgba(106, 223, 195, 1);
  color: white;
}
.ask-btn {
  margin: 0;
}
.button-green {
  width: 180rpx;
  height: 56rpx;
  background: rgba(106, 223, 195, 1);
  opacity: 1;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 56rpx;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
.hot {
  padding: 48rpx 0 32rpx 32rpx;
  // width: 72rpx;
  height: 50rpx;
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 50rpx;
  color: rgba(23, 51, 44, 1);
  opacity: 1;
}
.question-block {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.card {
  width: 720rpx;
  background: rgba(252, 252, 252, 1);
  box-shadow: 0rpx 4rpx 20rpx rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 30rpx;
  margin-top: 32rpx;
  .block-item {
    position: relative;
    display: flex;
    align-items: flex-start;
    padding: 36rpx 16rpx 42rpx 16rpx;
    .tangent {
      width: 48rpx;
      height: 48rpx;
      display: inline-block;
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 48rpx;
      text-align: center;
      color: rgba(242, 242, 242, 1);
      opacity: 1;
      border-radius: 12rpx;
    }
    .tangent.red {
      background: rgba(255, 128, 151, 1);
    }
    .tangent.green {
      background: rgba(106, 223, 195, 1);
    }
    .content {
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 34rpx;
      color: rgba(51, 51, 51, 1);
      opacity: 1;
      width: 624rpx;
      margin-left: 16rpx;
    }
    .content.black {
      background: rgba(242, 242, 242, 1);
      border-radius: 16rpx;
      padding: 16rpx 16rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      opacity: 1;
      .footer-user {
        display: flex;
        justify-content: space-between;
        margin-top: 16rpx;
        color: rgba(205, 205, 205, 1);
        .user-icon {
          display: flex;
          img {
            width: 36rpx;
            height: 36rpx;
            background: rgba(0, 0, 0, 0);
            border-radius: 50%;
            opacity: 1;
            margin-right: 2rpx;
          }
        }
        .iconfont {
          margin: 0 12rpx;
          height: 34rpx;
          line-height: 34rpx;
        }
        .points {
          height: 34rpx;
          line-height: 34rpx;
        }

        .point-block.active {
          color: rgba(106, 223, 195, 1);
        }
      }
    }
  }
  .block-item.top {
    padding-bottom: 16rpx;
  }
  .h-between {
    padding-left: 96rpx;
    padding-right: 46rpx;
  }
  .asker {
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 300;
    color: rgba(154, 154, 154, 1);
    opacity: 1;
  }
}
.card:first-child {
  margin-top: 0;
}
.card:last-child {
  margin-bottom: 32rpx;
}
</style>
