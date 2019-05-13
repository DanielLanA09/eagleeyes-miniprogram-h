<template>
  <div>
    <!-- COMPARE ITEMS -->
    <div class="fix">
      <div class="compare-item">
        <div class="item1 block">{{item1.title}}</div>
        <span class="vs">VS</span>
        <div class="item2 block">{{item2.title}}</div>
      </div>
    </div>

    <!-- COMPARE TAGS -->
    <div class="tag-block eagle-card">
      <!-- title -->
      <div class="title">优劣势对比</div>
      <div class="body">
        <!-- advantage -->
        <div class="block">
          <div class="content nolimit green-border">优势</div>
          <div class="block-body">
            <div class="block-item">
              <div class="content green-border bold">{{item1.title}}</div>
              <div
                class="content green-border"
                v-for="(t,i) in item1.tags"
                :key="i"
                v-if="t.tagType=='ADVANTAGE'"
              >{{t.tagName}}</div>
            </div>
            <div class="block-item">
              <div class="content green-border bold">{{item2.title}}</div>
              <div
                class="content green-border"
                v-for="(t,i) in item2.tags"
                :key="i"
                v-if="t.tagType=='ADVANTAGE'"
              >{{t.tagName}}</div>
            </div>
          </div>
        </div>
        <!-- disadvantage -->
        <div class="block">
          <div class="content nolimit red-border">劣势</div>
          <div class="block-body">
            <div class="block-item">
              <div class="content red-border bold">{{item1.title}}</div>
              <div
                class="content red-border"
                v-for="(t,i) in item1.tags"
                :key="i"
                v-if="t.tagType=='DISADVANTAGE'"
              >{{t.tagName}}</div>
            </div>
            <div class="block-item">
              <div class="content red-border bold">{{item2.title}}</div>
              <div
                class="content red-border"
                v-for="(t,i) in item2.tags"
                :key="i"
                v-if="t.tagType=='DISADVANTAGE'"
              >{{t.tagName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- COMPARE DEVISIONS -->
    <div class="compare-devs eagle-card">
      <div class="title">小区评分对比</div>
      <div class="subtitle margin15">
        <div class="inline">
          <div>{{item1.title}}</div>
          <div class="rectan red"></div>
        </div>
        <div class="inline">
          <div>{{item2.title}}</div>
          <div class="rectan green"></div>
        </div>
      </div>
      <div>
        <div
          v-for="(d,dk) in devs"
          :key="dk"
          class="compare-block margin15"
          :class="{card:d.showDetail,harf:d.showDetail}"
        >
          <div class="title-block">
            <div class="title left">{{(dk+1)+'.'+ d.devName}}</div>
            <div class="title right" @click="goShowDetail(d)" v-if="!d.showDetail">查看详情</div>
          </div>
          <div>
            <div class="progress-block">
              <div class="progress red" :style="{'width':d.mark1+'%'}"></div>
            </div>
            <div class="progress-block">
              <div class="progress green" :style="{'width':d.mark2+'%'}"></div>
            </div>
          </div>
          <div class="compare-detail-block" v-if="d.showDetail">
            <div class="border-bottom">
              <div class="block-title">优点</div>
              <div class="space-between">
                <div class="block-item left">
                  <div class="center red">{{item1.title}}</div>
                  <div v-for="(a,ak) in compareItem1.content" :key="ak" v-if="a.type=='ADVANTAGE'">
                    <span class="iconfont icon-quan-2 red"></span>
                    <span class="detail-content">{{a.content}}</span>
                  </div>
                </div>
                <div class="block-item right">
                  <div class="center green">{{item2.title}}</div>
                  <div v-for="(a,ak) in compareItem2.content" :key="ak" v-if="a.type=='ADVANTAGE'">
                    <span class="iconfont icon-quan-2 green"></span>
                    <span class="detail-content">{{a.content}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class>
              <div class="block-title">缺点</div>
              <div class="space-between">
                <div class="block-item left">
                  <div class="center red">{{item1.title}}</div>
                  <div
                    v-for="(a,ak) in compareItem2.content"
                    :key="ak"
                    v-if="a.type=='DISADVANTAGE'"
                  >
                    <span class="iconfont icon-quan-2 red"></span>
                    <span class="detail-content">{{a.content}}</span>
                  </div>
                </div>
                <div class="block-item right">
                  <div class="center green">{{item2.title}}</div>
                  <div
                    v-for="(a,ak) in compareItem2.content"
                    :key="ak"
                    v-if="a.type=='DISADVANTAGE'"
                  >
                    <span class="iconfont icon-quan-2 green"></span>
                    <span class="detail-content">{{a.content}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="block-footer">
              <span @click="d.showDetail = false">
                <span class="backoff">收起</span>
                <span class="iconfont icon-yincang"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- CHANGE -->
    <div class="button" @click="onback">
      <div @click="onback">更换小区</div>
    </div>
  </div>
</template>
<script>
import api from "@/api.js";
import preserve from "@/utils/preserve.js";
export default {
  onLoad() {
    let comparedItems = this.$store.state.COMPARE_ITEMS;
    if (!comparedItems) {
      console.log("DO NOT HAVE ANY COMAPRED ITEMS!");
      return;
    }
    this.item1 = comparedItems[0];
    this.item2 = comparedItems[1];

    api.findAllDev(comparedItems[0].coverId, res1 => {
      if (res1.success) {
        let devs1 = new Map();
        res1.data.map(i => {
          devs1.set(i.devName, i.mark);
          devs1.set(i.devName + "id", i.id);
        });
        api.findAllDev(comparedItems[1].coverId, res2 => {
          if (res2.success) {
            this.devs = [];
            res2.data = res2.data.sort((a, b) => a.id - b.id);
            res2.data.map(i => {
              this.devs.push({
                id1: devs1.get(i.devName + "id"),
                id2: i.id,
                devName: i.devName,
                mark1: devs1.get(i.devName),
                mark2: i.mark,
                showDetail: false
              });
            });
          }
        });
      }
    });
  },
  data: () => ({
    item1: {},
    item2: {},
    devs: [],
    compareItem1: {
      content: [
        {
          type: "",
          content: ""
        }
      ]
    },
    compareItem2: {
      content: [
        {
          type: "",
          content: ""
        }
      ]
    }
  }),
  methods: {
    onback() {
      console.log("heeeee");
      wx.navigateTo({
        url: "/pages/compare/main"
      });
    },
    Change() {},
    goShowDetail(d) {
      this.devs.map(i => {
        i.showDetail = false;
      });
      api.findDevisionBy2Id(d.id1, d.id2, res => {
        res.data.map(i => {
          i.content = preserve.formatModule(i);
        });
        if (res.data[0].cId == this.item1.coverId) {
          this.compareItem1 = res.data[0];
          this.compareItem2 = res.data[1];
        } else {
          this.compareItem2 = res.data[0];
          this.compareItem1 = res.data[1];
        }
        d.showDetail = true;
      });
    }
  }
};
</script>

<style scoped lang="less">
.fix {
  position: fixed;
  width: 100vw;
  text-align: center;
  top: 0;
  background: white;
}
.compare-item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  .block {
    flex-grow: 1;
    text-align: center;
    height: 32px;
    line-height: 32px;
    color: rgb(93, 102, 118);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
  }
  .vs {
    width: 28px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    display: inline-block;
    font-size: 22px;
    margin: 0 8px;
  }
  .item1 {
    border: 1px solid rgb(255, 128, 151);
  }
  .item2 {
    border: 1px solid rgb(73, 217, 183);
  }
}
.tag-block {
  padding: 15px 15px;
  margin: 0 16px;
  margin-top: 50px;
  .body {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    width: 100%;
    .block {
      flex-grow: 1;
      margin: 0 4px;
      width: 50%;
      .block-body {
        display: flex;
        width: 100%;
        .block-item {
          width: 50%;
        }
      }
    }
  }
}
.content {
  height: 22px;
  flex-grow: 1;
  line-height: 22px;
  text-align: center;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content.nolimit {
}
.content.bold {
  font-weight: 600;
}
.title-block {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
}
.title {
  font-size: 15px;
  color: rgb(70, 70, 70);
  text-align: center;
  font-weight: 600;
}
.title.bold {
  font-weight: 600;
}
.title.left {
  text-align: left;
  height: 34rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 42rpx;
  color: #161f22;
  opacity: 1;
}
.title.right {
  text-align: right;
  width: 88rpx;
  height: 32rpx;
  font-size: 22rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
}
.subtitle {
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  font-weight: 600;
  color: rgb(22, 31, 34);
  margin-top: 8px;
}
.green-border {
  border: 1px solid rgb(73, 217, 183);
}
.red-border {
  border: 1px solid rgb(255, 128, 151);
}

.compare-devs {
  padding: 15px 0px;
  margin: 8px 15px;
}
.rectan {
  height: 10px;
  width: 10px;
  margin-left: 3px;
}
.rectan.red {
  background: rgb(255, 128, 151);
}
.rectan.green {
  background: rgb(73, 217, 183);
}

.inline {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
}

.compare-block {
  margin-top: 16px;
}
.compare-block.card {
  border: 1px solid rgba(230, 230, 230, 1);
  padding: 16rpx 26rpx;
  border-radius: 15rpx;
}
.progress-block {
  background: #e6e6e6;
}
.progress {
  height: 8rpx;
}
.progress.green {
  margin-top: 8rpx;
  background: rgb(73, 217, 183);
}
.progress.red {
  background: rgb(255, 128, 151);
}
.compare-detail-block {
  .block-title {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: rgba(70, 70, 70, 1);
    opacity: 1;
    margin-bottom: 24rpx;
    margin-top: 32rpx;
  }
  .border-bottom {
    padding-bottom: 36rpx;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .block-item {
    flex-grow: 1;
  }
  .block-item.left {
    padding-right: 14rpx;
    border-right: 1px solid rgba(230, 230, 230, 1);
  }
  .block-item.right {
    padding-left: 14rpx;
  }
  .iconfont.red {
    color: #ff8097;
    font-size: 10px;
  }
  .iconfont.green {
    color: #4bceaf;
    font-size: 10px;
  }
  .space-between {
    display: flex;
    justify-content: space-between;
  }
  .center {
    text-align: center;
    height: 40rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    opacity: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 24rpx;
  }
  .center.red {
    color: rgba(255, 128, 151, 1);
  }
  .center.green {
    color: #4bceaf;
  }
  .detail-content {
    width: 280rpx;
    height: 35rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 300;
    color: rgba(76, 76, 76, 1);
    opacity: 1;
  }
  .backoff {
    height: 36rpx;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 42rpx;
    color: rgba(75, 206, 175, 1);
  }
  .iconfont.icon-yincang {
    color: #4bceaf;
    font-size: 20rpx;
  }
  .block-footer {
    text-align: right;
  }
}

.button {
  position: fixed;
  right: 30rpx;
  bottom: 50px;
  border-radius: 100%;
  background: rgb(74, 217, 183);
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    font-size: 12px;
    color: white;
    width: 24px;
  }
}
.margin15 {
  margin-left: 15px;
  margin-right: 15px;
}
.margin15.harf {
  margin-left: 10rpx;
  margin-right: 10rpx;
}
</style>
