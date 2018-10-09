<template>
    <div class="search-back">
        <div class="search-block">
            <input type="text" placeholder="搜索您要找的小区、楼盘" @click="onFocus"  @confirm="afterInput" :value="value" @input="$emit('input',$event.target.value)">
            <span class="iconfont icon-sousuo"></span>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    afterInput() {
      this.$emit("onConfirm", this.value);
    },
    onFocus() {
      this.$emit("onFocus");
    }
  }
};
</script>

<style lang="less" scoped>
.search-block {
  position: relative;
  input {
    background: #f5f5f5;
    border-radius: 50rpx;
    font-size: 28rpx;
    padding-left: 82rpx;
    height: 64rpx;
  }
  span {
    position: absolute;
    top: 19rpx;
    left: 34rpx;
    color: rgb(153, 153, 153);
  }
}
</style>
