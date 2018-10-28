<template>
    <div>
        <!-- COMPARE ITEMS -->
        <div class="compare-item">
            <div class="item1 block">{{item1.title}}</div>
            <span class="vs">VS</span>
            <div class="item2 block">{{item2.title}}</div>
        </div>
        <!-- COMPARE TAGS -->
        <div class="tag-block eagle-card">
            <!-- title -->
            <div class="title">优劣势对比</div>
            <div class="body">
                <!-- advantage -->
                <div class="block">
                    <div class="content nolimit grean-border">优势</div>
                    <div class="block-body">
                        <div class="block-item">
                            <div class="content grean-border bold">{{item1.title}}</div>
                            <div class="content grean-border" v-for="(t,i) in item1.tags" :key="i" v-if="t.tagType=='ADVANTAGE'">{{t.tagName}}</div>
                        </div>
                        <div class="block-item">
                            <div class="content grean-border bold">{{item2.title}}</div>
                            <div class="content grean-border" v-for="(t,i) in item2.tags" :key="i" v-if="t.tagType=='ADVANTAGE'">{{t.tagName}}</div>
                        </div>
                    </div>
                </div>
                <!-- disadvantage -->
                <div class="block">
                    <div class="content nolimit red-border">劣势</div>
                    <div class="block-body">
                        <div class="block-item">
                            <div class="content red-border bold">{{item1.title}}</div>
                            <div class="content red-border" v-for="(t,i) in item1.tags" :key="i" v-if="t.tagType=='DISADVANTAGE'">{{t.tagName}}</div>
                        </div>
                        <div class="block-item">
                            <div class="content red-border bold">{{item2.title}}</div>
                            <div class="content red-border" v-for="(t,i) in item2.tags" :key="i" v-if="t.tagType=='DISADVANTAGE'">{{t.tagName}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- COMPARE DEVISIONS -->
        <div class="compare-devs eagle-card">
            <div class="title">小区评分对比</div>
            <div class="subtitle">
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
                <div v-for="(d,dk) in devs" :key="dk" class="compare-block">
                    <div class="title left">{{(dk+1)+'.'+ d.devName}}</div>
                    <div>
                        <div ><div class="progress red" :style="{'width':d.mark1+'%'}"></div></div>
                        <div ><div class="progress green" :style="{'width':d.mark2+'%'}"></div></div>
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
        });
        api.findAllDev(comparedItems[1].coverId, res2 => {
          if (res2.success) {
            this.devs = [];
            res2.data = res2.data.sort((a,b)=>a.id-b.id);
            res2.data.map(i => {
              this.devs.push({
                devName: i.devName,
                mark1: devs1.get(i.devName),
                mark2: i.mark
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
    devs: []
  }),
  methods: {
    onback() {
      console.log("heeeee");
      wx.switchTab({
        url: "/pages/compare/main"
      });
    },
    Change(){

    }
  }
};
</script>

<style scoped lang="less">
.compare-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  .block {
    flex-grow: 1;
    text-align: center;
    height: 32px;
    line-height: 32px;
    color: rgb(93, 102, 118);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    border: 1px solid rgb(73, 217, 183);
  }
  .item2 {
    border: 1px solid rgb(255, 128, 151);
  }
}
.tag-block {
  padding: 15px 15px;
  margin: 0 16px;
  margin-top: 8px;
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
  padding: 15px 15px;
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
.progress {
  height: 16px;
}
.progress.green {
  background: rgb(73, 217, 183);
}
.progress.red {
  background: rgb(255, 128, 151);
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
</style>
