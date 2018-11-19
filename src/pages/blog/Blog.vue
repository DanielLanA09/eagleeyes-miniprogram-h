<template>
  <div>
    <web-view :src="url"></web-view>
  </div>
</template>

<script>
export default {
  data:()=>({
    url:""
  }),
  onLoad(query){
    this.url = query.url;
  },
  onShareAppMessage: function(option) {
    let me = this;
    return {
      title: "基于大数据的二手房小区测评",
      path: "/pages/blog/main?url="+this.url,
      imageUrl: require("../../../static/imgs/小程序封面.png")
    };
  }
}
</script>

<style lang="less" scoped>

</style>
