<template>
  <div>
    <div class="profile-back">
      <div class="back">
        <img :src="host+'profile-back.png'">
      </div>
      <div class="profile" @click="login">
        <img class="profile-icon" :src="user.icon">
        <div class="profile-name">{{user.name}}</div>
      </div>
    </div>
    <div>
      <div class="block" @click="navTo(0)">
        <i class="iconfont icon-geren_shoucang title-icon">
          <span class="title">我的收藏</span>
        </i>
        <i class="iconfont icon-next right"></i>
      </div>
      <div class="block" @click="navTo(1)">
        <i class="iconfont icon-geren_zuji title-icon">
          <span class="title">我的问答</span>
        </i>
        <i class="iconfont icon-next right"></i>
      </div>
      <div class="block" @click="navTo(2)">
        <i class="iconfont icon-geren_fankui title-icon">
          <span class="title">意见反馈</span>
        </i>
        <i class="iconfont icon-next right"></i>
      </div>
      <div class="block" @click="navTo(3)">
        <i class="iconfont icon-geren_anquan title-icon">
          <span class="title">免责声明</span>
        </i>
        <i class="iconfont icon-next right"></i>
      </div>
      <button class="share-button block" open-type="share">
        <i class="iconfont icon-geren_zhuanfa title-icon">
          <span class="title">分享鹰眼分析</span>
        </i>
        <i class="iconfont icon-next right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  onLoad() {
    api.simLogin(res => {
      if (res.success) {
        this.user.icon = res.data.avatarUrl;
        this.user.name = res.data.nickName;
      }
    });
  },
  onShareAppMessage: res => {
    return {
      title: "基于大数据的二手房小区测评",
      path: "/pages/home/main",
      imageUrl: require("../../../static/imgs/小程序封面.png")
    };
  },
  data: () => ({
    user: {
      icon: "",
      name: "点击登陆"
    },
    backImg: "../../../static/imgs/mine-back.png",
    host: api.BASE_HOST
  }),
  methods: {
    login() {
      let me = this;
      if (!this.$store.state.USER_INFO) {
        api.getUserInfo(userInfo => {
          if (userInfo.success) {
            this.user.icon = userInfo.data.avatarUrl;
            this.user.name = userInfo.data.nickName;
            this.$store.commit("SET_USER", userInfo.data);
            wx.login({
              success(res) {
                api.login(
                  {
                    nickName: userInfo.data.nickName,
                    avatarUrl: userInfo.data.avatarUrl,
                    gender: userInfo.data.gender,
                    city: userInfo.data.city,
                    province: userInfo.data.province,
                    language: userInfo.data.language,
                    code: res.code
                  },
                  loginRes => {
                    if (loginRes.success) {
                      me.$store.commit("SET_USER", loginRes.data);
                    }
                  }
                );
              }
            });
          }
        });
      }
    },
    navTo(index) {
      switch (index) {
        case 0: {
          wx.navigateTo({
            url: "/pages/favorite/main"
          });
          break;
        }
        case 1: {
          // wx.showModal({
          //   title: "提示",
          //   content: "功能开发中，敬请期待！",
          //   showCancel: false,
          //   confirmText: "关闭"
          // });
          wx.navigateTo({
            url: "/pages/myquestion/main"
          });
          break;
        }
        case 2: {
          wx.navigateTo({
            url: "/pages/advice/main"
          });
          break;
        }
        case 3: {
          wx.navigateTo({
            url: "/pages/notice/main"
          });
          break;
        }
        case 4: {
          wx.showShareMenu({
            withShareTicket: true
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.profile-back {
  height: 184px;
  border-radius: 15px;
  margin: 0 8px;
  background-size: cover;
}
.back {
  height: 100%;
  width: 100%;
  img {
    height: 100%;
    width: 100%;
  }
}
.profile {
  text-align: center;
  position: absolute;
  top: 29px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
}
.profile-icon {
  height: 86px;
  width: 86px;
  background: gray;
  border-radius: 100%;
}
.profile-name {
  font-size: 20px;
  font-weight: 600;
  color: white;
}
.block {
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 16px;
  border-radius: 5px;
  border: none;
  height: 48px;
  box-shadow: 0 0 6rpx 6rpx rgb(231, 235, 241);
  line-height: 48px;
  display: flex;
  justify-content: space-between;
  padding-left: 19px;
  padding-right: 16px;
  .title-icon {
    color: rgb(92, 222, 168);
    font-size: 20px;
  }
  .title {
    display: inline-block;
    margin-left: 11px;
    font-size: 16px;
    color: rgb(68, 68, 68);
  }
  .right {
    color: rgb(181, 181, 181);
  }
}
.share-button {
  border: none;
  background: rgba(0, 0, 0, 0);
  font-size: 20rpx;
  color: #808080;
}
</style>
