<template>
    <div class="back">
      <div class="card-list">
        <card v-for="(favo,fk) in favoriteList" :key="fk" :info="favo" @onClick="onSelect" :checked="favo.checked" :edit="edit"></card>
      </div>
      <div class="recommend" v-if="!favoriteList">
        <div class="title"><img :src="favoriteTitle"></div>
        <div class="button" @click="goHome">现在去瞅瞅</div>
      </div>
      <div class="change" @click="onEdit" v-if="!edit">
        <div class="e-center content">
            <i class="iconfont icon-shanchu-"></i>
        </div>
      </div>
      <div class="footer" v-if="edit">
        <div @click="selectAll" class="select-all">
          <i class="iconfont name-icon" :class="{'icon-shanchushoucang_weixuanzhong':!checked,'icon-shanchushoucang_xuanzhong':checked,'active':checked}"></i>
          <div class="name">全选</div>
        </div>
        <div class="operation">
          <div class="delete" @click="onDelete">删除</div>
          <div class="complete" @click="edit=false">完成</div>
        </div>
      </div>
    </div>
</template>

<script>
import api from "@/api";
import store from "@/store";
import card from "@/components/card/favoriteCard";
export default {
  components: {
    card
  },
  data: () => {
    return {
      favoriteList: null,
      selectedList: new Set(),
      checked: false,
      edit: false,
      favoriteTitle: require("../../../static/imgs/favorite-null.png")
    };
  },
  onLoad() {
    let that = this;
    api.simLogin(res => {
      if (res.success) {
        api.findFavorite(res.data.openId, favoRes => {
          if (favoRes.success) {
            if (favoRes.data.covers) {
              favoRes.data.covers.map(i => {
                i.checked = false;
              });
            }
            if (!that.favoriteList) {
              that.favoriteList = [];
            }
            that.favoriteList = favoRes.data.covers;
          }
        });
      }
    });
  },
  methods: {
    onSelect(e) {
      if (!this.edit) {
        this.$store.commit("SET_CURRENT_COVER", e);
        wx.navigateTo({
          url: "/pages/preface/main"
        });
      } else {
        if (e.checked) {
          this.selectedList.add(e);
        } else {
          this.selectedList.delete(e);
        }
        if (this.selectedList.size == this.favoriteList.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
    },
    goHome(){
      console.log('sdfdf');
      
      wx.navigateTo({
        url:"/pages/home/main"
      });
    },
    onDelete() {
      let that = this;
      wx.showModal({
        title: "警告",
        content: "你确定要删除你的收藏吗？",
        success: function(res) {
          let request = { collections: [] };
          that.selectedList.forEach(i => {
            request.collections.push({
              userId: that.$store.state.USER_INFO.userId,
              coverId: i.coverId,
              openId: that.$store.state.USER_INFO.openId
            });
          });
          api.removeFavorites(request, res => {
            if (res.success) {
              that.favoriteList = res.data.covers;
            }
          });
        }
      });
    },
    onEdit() {
      this.edit = !this.edit;
    },
    selectAll() {
      this.checked = !this.checked;
      if (this.checked) {
        this.favoriteList.map(i => {
          i.checked = true;
          this.selectedList.add(i);
        });
      } else {
        this.favoriteList.map(i => {
          i.checked = false;
        });
        this.selectedList.clear();
      }
    }
  }
};
</script>

<style scoped lang="less">
.back {
  position: relative;
  height: 100%;
}
.card-list {
  height: 90%;
}
.recommend {
  height: 100vh;
  margin-top: 100px;

  .title {
    text-align: center;
    margin-bottom: 20px;
    img {
      width: 148px;
      height: 121px;
    }
  }
  .button {
    width: 174px;
    height: 36px;
    line-height: 36px;
    border-radius: 50px;
    text-align: center;
    font-size: 16px;
    color: rgb(74, 217, 183);
    box-shadow: 0 0 1px 1px rgb(74, 217, 183);
    margin-left: auto;
    margin-right: auto;
  }
}
.footer {
  position: fixed;
  height: 48px;
  line-height: 48px;
  background: rgb(244, 244, 244);
  bottom: 0px;
  left: 0px;
  right: 0px;
  .select-all {
    float: left;
    display: flex;
    align-items: center;
    margin-left: 12px;
    .name {
      margin-left: 10px;
      font-size: 14px;
      color: rgb(102, 102, 102);
    }
  }
  .operation {
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 12px;
    .delete {
      border-radius: 50px;
      width: 78px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgb(255, 128, 151);
      font-size: 16px;
      color: white;
    }
    .complete {
      border-radius: 50px;
      margin-left: 8px;
      width: 78px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgb(74, 217, 183);
      font-size: 16px;
      color: white;
    }
  }
}
.icon-shanchushoucang_xuanzhong.active {
  color: rgb(255, 128, 151);
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
      font-size: 35px;
      color: #808080;
    }
  }
}
</style>
