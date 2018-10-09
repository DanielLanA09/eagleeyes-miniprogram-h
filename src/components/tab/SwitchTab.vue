<template>
    <div class="switch-back">
        <div class="item" @click="onChoose('精准')"   :class="{active:choosedItem=='精准'}">精准</div>
        <div class="item" @click="onChoose('个性化')" :class="{active:choosedItem=='个性化'}">个性化</div>
    </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    choosedItem: "精准"
  }),
  methods: {
    onChoose(type) {
      this.choosedItem = type;
      this.$emit("onSelect",this.choosedItem);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="less">
.switch-back {
  // width: 180px;
  height: 28px;
  border-radius: 25px;
  border: 1px solid #bbede1;
  display: flex;
  .item {
    width: 90px;
    border-radius: 25px;
    text-align: center;
    font-size: 16px;
    color: #4bceaf;
    line-height: 28px;
  }
  .item.active {
    background: #4bceaf;
    font-size: 16px;
    color: #fff;
  }
}
</style>
