<template>
    <div class="m-down-container" >
        <div class="m-search-input">
            <div class="select" @click="openDrop">
                <span >{{district}}</span>
                <icon class="iconfont icon-xiaotubiao_fuzhi-27" ></icon>
            </div>
            <div class="input">
                <input type="search" v-model="search.title" confirm-type="search" placeholder="请输入小区名称、楼盘" @confirm="afterInput">
                <!-- <icon class="iconfont icon-sousuo"></icon> -->
                <icon class="iconfont icon-quxiao input-clean" v-show="search.title!=''" @click="inputClean"></icon>
            </div>
        </div>
        <div class="m-down-list" v-show="dropdownShown" >
            <h2 class="list-item" :class="{disactive:d.active!=true}"  @click="itemChoose(d)" v-for="(d,dk) in dList" :key="dk" v-show="d.name!=district">{{d.name}}</h2>
        </div>
        <div class="eagle-mask" style="top:72rpx;" v-show="dropdownShown" @click="onMaskClick">

        </div>
    </div>
</template>

<script>
export default {
  name: "mselect",
  data: () => ({
    dropdownShown: false,
    district: "观山湖",
    dList: [
      {
        name: "观山湖",
        value: "520115",
        active:true
      },
      {
        name: "南明区",
        value: "520102",
        active:false
      },
      {
        name: "云岩区",
        value: "520103",
        active:false
      },
      {
        name: "白云区",
        value: "520113",
        active:false
      },
      {
        name: "花溪区",
        value: "520111",
        active:false
      },
      {
        name: "乌当区",
        value: "520112",
        active:false
      }
    ],
    search:{
      district:"520115",
      title:""
    }
  }),
  methods: {
    openDrop() {
      this.dropdownShown = !this.dropdownShown;
    },
    itemChoose(d) {
      this.dropdownShown = false;
      if(!d.active){
        return;
      }
      this.district = d.name;
      this.search.district = d.value;
      this.$emit("inputChange",this.search);
    },
    afterInput(e){
      this.search.title = e.target.value;
      this.$emit("inputChange",this.search);
    },
    onMaskClick(){
      this.openDrop();
      
    },
    inputClean(){
      this.search.title = "";
      this.$emit("reSet",this.search);
    }
  }
};
</script>

<style scoped lang="less">

.m-search-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .select {
    position: relative;
    top: -8rpx;
    flex-basis: 22%;
    font-weight: bold;
    span{
      font-size: 26rpx;
    }
    icon{
      position: relative;
      top: 10rpx;
      font-size: 48rpx;
    }
  }
  .input {
    position: relative;
    border: solid 1px black;
    margin-left: 2%;
    padding: 1px 10px;
    border-radius: 25px;
    font-size: 24rpx;
    flex-grow: 1;
    background: rgb(244, 244, 244);
    border: 0;
    .input-clean{
      position: absolute;
      right: 20rpx;
      top: -8rpx;
      color: rgb(203, 203, 203);
      font-size: 32rpx;
      z-index: 10;
    }
  }
}

.m-down-container {
  position: relative;
  width: 100%;
  padding: 0 32rpx;
  
  .m-down-list {
    position: absolute;
    background:rgba(255, 255, 255, 0.92);
    width: 160rpx;
    z-index: 100;
    top: 59rpx;
    left: 0rpx;
    box-shadow:10rpx 10rpx 10rpx 10rpx rgba(0, 0, 0, 0.07);
    .list-item{
      padding: 23rpx 34rpx;
      border-top: solid 1px rgb(230, 230, 230);
      font-size: 26rpx;
    }
    .list-item.disactive{
      color: rgb(102, 102, 102)
    }
  }
}
</style>
