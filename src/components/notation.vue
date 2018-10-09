<template>
    <div class="n-container" :style="{justifyContent:align}">
        <div class="n-item" :class="{active:i.active,nonback:isNonBack}"  v-for="(i,k) in setList" :key="k" @click="choose(i)" :style="{borderColor:borderColor,width:width+'rpx',fontSize:fontsize+'rpx',height:height+'rpx',background:backgroundColor,marginRight:marginRight+'rpx',marginLeft:marginRight+'rpx',marginBottom:marginBottom+'rpx',marginTop:marginBottom+'rpx'}">
            <div class="item-content" :style="{color:fontColor}">{{i.tagName}}</div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [
      ]
    },
    clickable: {
      type: Boolean,
      default: true
    },
    numLimit: {
      type: Number,
      default: 20
    },
    width: {
      type: Number,
      default: 143
    },
    height: {
      type: Number,
      default: 54
    },
    fontsize: {
      type: Number,
      default: 24
    },
    fontColor: {
      type: "String",
      default: ""
    },
    isNonBack: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: "String",
      default: ""
    },
    marginRight: {
      type: Number,
      default: 9
    },
    marginBottom: {
      type: Number,
      default: 9
    },
    acceptType: {
      type: String,
      default: 'ADVANTAGE'
    },
    align:{
      type:String,
      default:"center"
    },
    borderColor:{
      type:String,
      default:""
    }
  },
  data: () => ({}),
  computed:{
    setList(){
      return this.list.filter(item=>item.tagType==this.acceptType)
    }
  },
  methods: {
    choose(i) {
      if (!this.clickable) {
        this.$emit("onClick", i);
        return;
      }
      let actived = this.list.filter(item => item.active == true);

      if (i.active) {
        i.active = false;
        actived = this.list.filter(item => item.active == true);
        this.$emit("onChange", actived);
        return;
      }
      if (this.numLimit > actived.length) {
        i.active = !i.active;
        actived = this.list.filter(item => item.active == true);
      }else{
        this.$emit("error")
      }
      this.$emit("onChange", actived);
    }
  }
};
</script>

<style scoped lang="less">
.n-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: center;
  text-align: center;
}
.n-item {
  width: 143rpx;
  height: 54rpx;
  // background: rgb(245, 245, 245);
  border:1px solid #a9a8a7;
  
  margin: 9rpx 9rpx 0rpx 0rpx;
  font-size: 24rpx;
  color: rgb(128, 128, 128);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
}
.n-item.active {
  background: #4bceaf;
  border:1px solid #4bceaf;
  color: #ffffff;
}
.nonback {
  background: white;
  box-shadow: 0 0 5rpx 5rpx rgb(239, 241, 245);
}
</style>
