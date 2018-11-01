<template>
    <div>
        <div class="tip1">您的建议与反馈是我们前进的动力！</div>
        <textarea v-model="advice" class="advice-text" placeholder-style="font-size:14px;color: rgb(178, 178, 178);" placeholder="建议/咨询/反馈/投诉（最多500个字）"></textarea>
        <div class="upload" v-if="false">
            <div>
                <i class="iconfont icon-tubiao_zengjiazhaopian add" @click="chooseImg"></i>
            </div>
            <div class="tip-block">
                <div class="tip2">上传图片</div>
                <div class="tip3">截图说明更有助于解决问题哟</div>
            </div>
        </div>
        <div class="button" :class="{active:advice!=''?true:false}" @click="onSubmit">提交反馈意见</div>
    </div>
</template>

<script>
import api from "@/api";
export default {
  onLoad() {
    api.simLogin(res => {
      if (res.success) {
        this.user = res.data;
      }
    });
  },
  data: () => ({
    advice: "",
    user: null
  }),
  methods: {
    chooseImg() {
      api.chooseImg(res => {
        if (res.success) {
          let path = res.data.tempFilePaths;
          console.log("path is:", path);
          api.upload(path[0], res => {
            if (res.success) {
              const data = res.data.data;
              console.log("upload success!", data);
            } else {
              console.log("upload failed!", res.data);
            }
          });
        }
      });
    },
    onSubmit() {
      if (this.advice != "") {
        api.saveAdvice({ userId: this.user.id, content: this.advice }, res => {
          if (res.success) {
            wx.showModal({
              title: "反馈提示",
              content: "谢谢您提出的宝贵意见！",
              showCancel: false,
              confirmText: "关闭"
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.tip1 {
  font-size: 16px;
  color: rgb(77, 77, 77);
  margin-top: 14px;
  margin-bottom: 14px;
  margin-left: 26px;
  margin-right: 26px;
}
.tip2 {
  font-size: 18px;
  color: rgb(51, 51, 51);
  font-weight: 600;
}
.tip3 {
  font-size: 14px;
  color: rgb(152, 152, 152);
}
.tip-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 18px;
}
.advice-text {
  margin-left: 26px;
  margin-right: 26px;
  border: 1px solid rgb(75, 206, 175);
  box-shadow: 0 0 1px 1px rgba(75, 206, 175, 0.5);
  border-radius: 10px;
  height: 210px;
  padding: 10px 13px;
  font-size: 14px;
}
.placeholder {
  font-size: 8px;
  color: rgb(178, 178, 178);
}
.upload {
  display: flex;
  margin: 32px 20px;
  height: 64px;
}
.add {
  font-size: 65px;
  color: rgb(74, 217, 183);
}
.button {
  border: 1px solid rgb(75, 206, 175);
  border-radius: 25px;
  text-align: center;
  font-size: 22px;
  color: rgb(128, 128, 128);
  padding: 5px 0;
  margin: 13px 26px;
}
.button.active {
  background: rgb(75, 206, 175);
  color: white;
}
</style>
