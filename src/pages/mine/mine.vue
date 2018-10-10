<template>
    <div>
        <div class="profile-back e-center" style="background-image:url('../../../static/imgs/mine-back.png')">
            <div class="profile" @click="login">
                <img class="profile-icon" :src="user.icon">
                <div class="profile-name">{{user.name}}</div>
            </div>
        </div>
        <div>
            <div class="block" @click="navTo(0)">
                <i class="iconfont icon-geren_shoucang title-icon"><span class="title">我的收藏</span></i>
                <i class="iconfont icon-next right"></i>
            </div>
            <div class="block" @click="navTo(1)">
                <i class="iconfont icon-geren_zuji title-icon"><span class="title">我的足迹</span></i>
                <i class="iconfont icon-next right"></i>
            </div>
            <div class="block" @click="navTo(2)">
                <i class="iconfont icon-geren_fankui title-icon"><span class="title">意见反馈</span></i>
                <i class="iconfont icon-next right"></i>
            </div>
            <div class="block" @click="navTo(3)">
                <i class="iconfont icon-geren_anquan title-icon"><span class="title">免责声明</span></i>
                <i class="iconfont icon-next right"></i>
            </div>
            <button class="share-button block" open-type="share">
              <i class="iconfont icon-geren_zhuanfa title-icon"><span class="title">分享鹰眼分析</span></i>
              <i class="iconfont icon-next right"></i>
            </button>
        </div>
    </div>
</template>

<script>
import api from "@/api";
export default {
  onLoad() {
    if (this.$store.state.USER_INFO.nickName == undefined) {
      this.login();
    } else {
      this.user.icon = this.$store.state.USER_INFO.avatarUrl;
      this.user.name = this.$store.state.USER_INFO.nickName;
    }
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
    }
  }),
  methods: {
    login() {
      // api.getUserInfo(userInfo => {
      //   if (userInfo.success) {
      //     this.user.icon = userInfo.data.avatarUrl;
      //     this.user.name = userInfo.data.nickName;
      //     this.$store.commit("SET_USER", userInfo.data);
      //   }
      // });
      wx.login({
        success(res){
          console.log("success:",res)
        },
        fail(error){
          console.log("error:",error)
        }
      })
    },
    navTo(index) {
      switch (index) {
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
  background-image: url("../../../static/imgs/mine-back.png");
}
.profile {
  text-align: center;
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
