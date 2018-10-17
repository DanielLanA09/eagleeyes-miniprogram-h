<script>
var mta = require("../static/js/mta_analysis");
import api from "@/api";
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    console.log("app created and cache logs by setStorageSync");
  },
  onLaunch: function() {
    let that = this;
    mta.App.init({
      appID: "500625991"
    });
    that.$store.commit("SET_BASE_HOST",api.BASE_HOST);
    api.simLogin();
  }
};
</script>

<style>
@import "../static/icons/iconfont.css";
@import "../static/style/eagleeyes.css";
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
