<template>
    <div class="box">
        <div class="title-box" >
            <div v-for="(t,tk) in dataInfo" :key="tk">
                <div class="title" :class="{active:selected==tk}" @click="onSelected(tk)" v-if="titleSet">
                    {{t.type}}
                </div>
                <div class="sim-title" v-if="!titleSet">
                  三秒概况
                </div>
            </div>
        </div>
        <div class="keyvalue-box" :style="{paddingTop:contentTop+'rpx'}">
            <div v-for="(t,tk) in dataInfo" :key="tk" v-if="selected==tk" style="display:flex;justify-content:flex-start;flex-wrap:wrap;">
                <div v-for="(tc,tck) in t.content" :key="tck" class="keyvalue">
                    <key-value :keyName="tc.name" :keyValue="tc.data" :width="'110'" :marginRight="'0'"></key-value>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import keyValue from "@/components/keyvalue";

export default {
  components: {
    keyValue
  },
  props: {
    dataInfo: {
      type: Array,
      default: [
        {
          id: 0,
          type: "小高层",
          content: [
            {
              id: 0,
              name: "",
              data: ""
            }
          ]
        }
      ]
    }
  },
  computed: {
    titleSet() {
      if (this.dataInfo.length > 0) {
        if (this.dataInfo[0].type == "") {
          // this.contentTop = 20;
          return false;
        } else {
          return true;
        }
      }
    }
  },
  data() {
    return {
      selected: 0,
      contentTop: 60
    };
  },
  methods: {
    onSelected(index) {
      this.selected = index;
    }
  },
  mounted() {
    //   console.log(this.dataInfo)
    //   this.selected = this.dataInfo[0].type;
  }
};
</script>

<style lang="less" scoped>
.title-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -30rpx;
  width: 100%;
}
.box {
  position: relative;
  border-radius: 15rpx;
  box-shadow: 0 0 8rpx 8rpx rgba(145, 161, 189, 0.2);
  border: solid 1px rgb(31, 207, 166);
}
.keyvalue-box {
  padding-bottom: 20rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
}
.title {
  border-radius: 10rpx;
  box-shadow: 0 0 4rpx 4rpx rgb(223, 224, 227);
  margin: 0 8rpx;
  font-size: 24rpx;
  color: rgb(83, 83, 83);
  padding: 14rpx 34rpx;
  background: white;
}
.sim-title {
  border-radius: 10rpx;
  box-shadow: 0 0 4rpx 4rpx rgb(223, 224, 227);
  border: solid 1px rgb(31, 207, 166);
  margin: 0 8rpx;
  font-size: 32rpx;
  color: rgb(31, 207, 166);
  padding: 14rpx 34rpx;
  background: white;
}
.title.active {
  font-size: 32rpx;
  color: rgb(31, 207, 166);
  box-shadow: 0 0 4rpx 4rpx #4bceaf;
}
.keyvalue {
  min-width: 100rpx;
  // max-width: 216rpx;
  height: 80rpx;
  overflow: hidden;
  margin: 20rpx 0;
}
</style>
