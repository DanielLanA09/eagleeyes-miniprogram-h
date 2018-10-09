<template>
    <div class="select-back" >
        <div class="select-name h-left select-input" :style="{justifyContent:align}" @click="selectShow = !selectShow">
            <span class="select-content">{{selected}}</span>
            <span class="select-icon"><i class="iconfont icon-arrow-left"></i></span>
        </div>
        <div class="select-item" :style="{left:left}" v-if="selectShow">
            <div v-for="(i,k) in list" :key="k" @click="onSelect(i)" class="item-block">{{i.name}}</div>
            
        </div>
        <div class="mask" v-if="selectShow" @click="onCancel"></div>
    </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [
        {
          name: "观山湖",
          value: "520115",
          active: true
        },
        {
          name: "南明区",
          value: "520102",
          active: false
        },
        {
          name: "云岩区",
          value: "520103",
          active: false
        },
        {
          name: "白云区",
          value: "520113",
          active: false
        },
        {
          name: "花溪区",
          value: "520111",
          active: false
        },
        {
          name: "乌当区",
          value: "520112",
          active: false
        }
      ]
    },
    align: {
      type: String,
      default: "flex-start"
    },
    left: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      selected: this.list[0].name,
      selectShow: false
    };
  },
  methods: {
    onSelect(i) {
      if (!i.active) {
        this.selectShow = !this.selectShow;
        this.$emit("onAbort", i);
        return;
      }
      this.selected = i.name;
      this.selectShow = !this.selectShow;
      this.$emit("onSelect", i);
    },
    onCancel(){
      this.selectShow=false;
    }
  }
};
</script>

<style lang="less" scoped>
.select-back {
  position: relative;
  height: 100%;
  .select-name {
    position: relative;
  }
  .select-input {
    min-width: 140rpx;
    display: flex;
    .select-content {
      font-size: 28rpx;
      color: #4d4d4d;
      font-weight: 500;
    }
    .select-icon {
      margin-top: 8rpx;
      margin-left: 15rpx;
      i {
        font-size: 24rpx;
        color: #4d4d4d;
      }
    }
  }
  .select-item {
    position: absolute;
    margin-top: 20rpx;
    display: inline-block;
    box-shadow: 0rpx 3rpx 5rpx rgba(9, 48, 114, 0.1);
    z-index: 200;
    background: white;
    .item-block {
      font-size: 32rpx;
      color: #333333;
      padding: 17rpx 30rpx;
      border-bottom: solid 1px #e5e9ef;
      white-space: nowrap;
    }
  }
  .mask{
    position: fixed;
    margin-top: 20rpx;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }
}
</style>
