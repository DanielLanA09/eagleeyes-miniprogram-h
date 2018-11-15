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
  }
}
</script>

<style lang="less" scoped>

</style>
