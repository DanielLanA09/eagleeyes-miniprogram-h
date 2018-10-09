<template>
    <div class="t-outer">
      <div class="title" v-if="addition.typeName!=''">
        <div class="innerborder">
          <span >{{addition.typeName}}</span>
        </div>
      </div>
      <div class="t-border">
        <!-- :class="{backgray:(k%2)==0}" -->
        <div class="t-box" v-for="(i,k) in addition.additionInfo" :key="k" >
            <div class="t-key">{{i.keyName}}</div>
            <div class="t-value">{{i.keyValue}}</div>
        </div>
      </div>
    </div>
    
</template>

<script>
export default {
  props: {
    addition: {
      type: Object,
      default: {
        typeName:"洋房",
        additionInfo:[
        {
          keyName: "楼房外观",
          keyValue: "一般"
        },
        {
          keyName: "楼房外观",
          keyValue: "一般"
        },
        {
          keyName: "楼房外观",
          keyValue: "一般"
        },
        {
          keyName: "楼房外观",
          keyValue: "一般"
        },
        {
          keyName: "楼房外观",
          keyValue: "一般"
        },
        {
          keyName: "楼房外观",
          keyValue: "一般"
        }
      ]
      }
    }
  }
};
</script>

<style scoped lang="less">
.t-border {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .t-box {
    flex-grow: 1;
    width: 180rpx;
    height: 90rpx;
    padding: 24rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: solid 1px rgb(245, 245, 245);
    .t-key {
      font-size: 22rpx;
      color: rgb(92, 92, 92);
      display: inline-block;
      margin-bottom: 15rpx;
    }
    .t-value {
      font-size: 26rpx;
      color: rgb(50, 187, 143);
    }
  }
}
.backgray {
  background: rgb(245, 245, 245);
}
.title {
  background: rgb(50, 187, 143);
  width: 218rpx;
  height: 64rpx;
  font-size: 30rpx;
  color: rgb(255, 255, 255);
  padding: 10rpx;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 14rpx;
  margin-bottom: 14rpx;
  .innerborder {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: dotted 1px white;
  }
}
</style>
