<template>
    <div class="h-container">
        <div class="title">周边楼盘</div>
        <scroll-view class="scroll-box" :scroll-x="true" >
            <div class="card" v-for="(i,k) in list" :key="k" @click="onClick(i)">
                <img :src="i.img" alt="">
                <div class="info">
                    <div class="name">{{i.title}}</div>
                    <div class="distance">{{i.distance}}米</div>                    
                </div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Array,
            default:[
                {
                    id:1,
                    img:"",
                    distance:0,
                    title:"金华苑"
                },
                {
                    id:1,
                    img:"",
                    distance:0,
                    title:"金华苑"
                },
                {
                    id:1,
                    img:"",
                    distance:0,
                    title:"金华苑"
                },
                {
                    id:1,
                    img:"",
                    distance:0,
                    title:"金华苑"
                }
            ]
        }
    },
    computed:{
        
    },
    methods:{
        onClick(i){
            this.$emit("onClick",i);
        }
    }
};
</script>

<style scoped lang="less">
.h-container{
    margin-bottom: 40rpx;
    border-top: solid 5px rgb(245, 246, 248);
    .title{
        font-size: 34rpx;
        color: rgb(18, 18, 18);
        // padding: 40rpx 21rpx;
        padding-top: 20rpx;
        padding-bottom: 10rpx;
        padding-left: 21rpx;
    }
}
.scroll-box {
  display: flex;
  white-space: nowrap;
  .card {
    display: inline-block;
    margin: 10rpx 20rpx;
    height: 295rpx;
    width: 300rpx;
    border-radius: 10rpx;
    padding: 0;
    box-shadow: 1px 0 3px 3px rgba(145, 161, 189, 0.15);
    img {
      height: 190rpx;
      width: inherit;
      background: gray;
      border-top-left-radius: 10rpx;
      border-top-right-radius: 10rpx;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 16rpx;
      .name {
        font-size: 30rpx;
        width: 260rpx;
        overflow: hidden;
      }
      .distance {
          font-size: 28rpx;
        //   font-weight: 600;
          color:#ff6f0b;
      }
    }
  }
}
</style>
