<template>
    <div class="scroll-back">
        <scroll-view class="sroll" :scroll-x="true" :scroll-with-animation="false">
            <div v-for="(card,key) in list" :key="key" :id="card.value" @click="onSelect(card)" style="display: inline-block;">
              <div class="card" :class="{active:currentCard==card.value}">
                  <div class="e-center" style="height:100%;width:100%;">
                      <!-- <span style=""></span> -->
                      <div class="content">
                        {{card.title}}
                      </div>
                  </div>
              </div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: [
        {
          title: "学校",
          value: "nav7"
        },
        {
          title: "交通",
          value: "nav4"
        },
        {
          title: "小区绿化",
          value: "nav1"
        },
        {
          title: "生活娱乐",
          value: "nav8"
        },
        {
          title: "车位配套",
          value: "nav5"
        },
        {
          title: "菜场",
          value: "nav6"
        },
        {
          title: "医疗",
          value: "nav10"
        },
        {
          title: "小区配套",
          value: "nav2"
        },
        {
          title: "文化体育",
          value: "nav9"
        },
        {
          title: "商务办公",
          value: "nav12"
        },
        {
          title: "楼房布局",
          value: "nav0"
        },
        {
          title: "污染",
          value: "nav11"
        },
        {
          title: "周边环境",
          value: "nav3"
        },
        {
          title: "政府机构",
          value: "nav13"
        }
      ]
    },
    currentCard: {
      type: String,
      default: "nav0"
    }
  },
  data() {
    return {};
  },
  methods: {
    onSelect(card) {
      this.$emit("onSelect", card);
    }
  }
};
</script>

<style lang="less" scoped>
.scroll-back {
  .sroll {
    display: flex;
    justify-content: space-between;
    padding: 10rpx 0;
    white-space: nowrap;
  }
  .card {
    display: inline-block;
    height: 120rpx;
    width: 120rpx;
    border-radius: 25rpx;
    border: solid 1px #4bceaf;
    // box-shadow: 0 0 5rpx 5rpx #e5e9ef;
    margin: 16rpx 8rpx;
    font-size: 24rpx;
    color: #4bceaf;
  }
}
.card.active {
  display: inline-block;
  height: 140rpx;
  width: 140rpx;
  border-radius: 25rpx;
  box-shadow: 0 0 5rpx 5rpx #e5e9ef;
  margin: 8px;
  font-size: 30rpx;
  color: white;
  background: #4bceaf;
}
.content {
  // width: 60rpx;
  // white-space: normal;
}
</style>
