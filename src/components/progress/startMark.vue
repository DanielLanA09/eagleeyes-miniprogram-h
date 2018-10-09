<template>
    <div class="start-box">
        <div class="start-back">
            <div class="flex">
                <i class="iconfont icon-xingxing" :class="{starflash:first,unlightstar:!first}"></i>
                <i class="iconfont icon-xingxing" :class="{starflash:second,unlightstar:!second}"></i>
                <i class="iconfont icon-xingxing" :class="{starflash:third,unlightstar:!third}"></i>
                <i class="iconfont icon-xingxing" :class="{starflash:four,unlightstar:!four}"></i>
                <i class="iconfont icon-xingxing" :class="{starflash:five,unlightstar:!five}"></i>
                <div class="mark">{{(value*5)/100}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 40
    }
  },
  computed:{
      first(){
          if(this.value>=20){
              return true;
          }
          else{
              return false;
          }
      },
      second(){
          if(this.value>=40){
              return true;
          }
          else{
              return false;
          }
      },
      third(){
          if(this.value>=60){
              return true;
          }
          else{
              return false;
          }
      },
      four(){
          if(this.value>=80){
              return true;
          }
          else{
              return false;
          }
      },
      five(){
          if(this.value>90){
              return true;
          }
          else{
              return false;
          }
      },
  },
  methods:{
      
  },
  data() {
    return {
      
      starMount:[
          {

          }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.start-back {
  overflow: visible;
  background:white;
}
.starflash{
    color:#fdb700;
    font-size: 26rpx;
}
.unlightstar{
    color: #d9d9dd;
    font-size: 26rpx;
}
.fill-back {
  overflow: visible;
  background: #fdb700;
}
.mark{
    font-size: 20rpx;
    color: black;
}
</style>
