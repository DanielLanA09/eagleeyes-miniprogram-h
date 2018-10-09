<template>
    <div v-if="loaded">
        <div style="display:flex;justify-content:center;position:relative">
            <canvas :canvasId="canvasId" :style="{height:height+'px',width:width+'px'}"></canvas>
            <div style="position:absolute;font-size:13px;color:#4ad9b7;" :style="{top:(adY-10)+'px',left:(adX-30)+'px'}" @click="onAdClick">
                优点
            </div>
            <div style="position:absolute;font-size:13px;color:rgb(255,128,151);" :style="{top:(disadY-10)+'px',left:(disadX+10)+'px'}" @click="onDisadClick">
                缺点
            </div>
        </div>
        <div class="subtab-compare-good" v-if="showAd">
            <div v-for="(i,k) in goodlist" :key="k" class="good-text">
                <div>
                    <icon class="iconfont icon-quan-2"></icon>
                </div>
                <div>
                    <span>{{i}}</span>
                </div>
            </div>
        </div>
        <div class="subtab-compare-bad" v-if="!showAd">
            <div v-for="(i,k) in badlist" :key="k" class="bad-text">
                <div>
                    <icon class="iconfont icon-quan-2"></icon>
                </div>
                <div>
                    <span>{{i}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 350
    },
    height: {
      type: Number,
      default: 200
    },
    goodlist: {
      type: Array,
      default: [""]
    },
    badlist: {
      type: Array,
      default: [""]
    },
    mark: {
      type: Number,
      default: 80
    },
    init: {
      type: Boolean,
      default: false
    },
    canvasId: {
      type: String,
      default: "circle-1"
    }
  },
  data() {
    return {
      adX: 20,
      adY: 20,
      disadX: 20,
      disadY: 20,
      showAd: true,
      loaded: true
    };
  },
  computed: {
    ifInit() {
      // let ctx = wx.createCanvasContext(this.canvasId);
      // this.drawCircle(ctx);
    }
  },
  methods: {
    drawCircle(ctx) {
      let xCenter = this.width / 2;
      let yCenter = this.height / 2;
      let r = yCenter - 30;

      let baundry = this.mark * Math.PI / 50;

      ctx.beginPath();
      ctx.arc(xCenter, yCenter, r, 0, baundry);
      ctx.lineWidth = 30;
      ctx.setStrokeStyle("#4ad9b7");
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(xCenter + 5, yCenter - 5, r, baundry, 0);
      ctx.lineWidth = 30;
      ctx.setStrokeStyle("rgb(255,128,151)");
      ctx.stroke();

      ctx.setFontSize(13);
      const length = ctx.measureText("数据项");
      let firstPosition = xCenter - Number(length.width) / 2;
      ctx.fillText("数据项", firstPosition, yCenter - 9);

      const length2 = ctx.measureText("368");
      let secondPosition = xCenter - Number(length2.width) / 2;
      ctx.setFillStyle("rgb(255,128,151)");
      ctx.fillText("368", secondPosition, yCenter + 9);

      ctx.setStrokeStyle("#4ad9b7");
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.lineTo(xCenter - r, yCenter);
      this.adX = xCenter - r - 40;
      this.adY = yCenter;
      ctx.lineTo(this.adX, this.adY);
      ctx.closePath();
      ctx.stroke();

      ctx.setStrokeStyle("rgb(255,128,151)");
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.lineTo(xCenter + r,yCenter-10);
      this.disadX = xCenter + r + 40;
      this.disadY = yCenter-10;
      ctx.lineTo(this.disadX, this.disadY);
      ctx.closePath();
      ctx.stroke();
      ctx.draw(true);
    },
    onAdClick() {
      this.showAd = true;
    },
    onDisadClick() {
      this.showAd = false;
    }
  },
  mounted() {
    let ctx = wx.createCanvasContext(this.canvasId);
    setTimeout(() => {
      this.loaded = true;
      this.drawCircle(ctx);
    }, 200);
  }
};
</script>

<style lang="less" scoped>
.subtab-compare-good {
  .good-text {
    font-size: 28rpx;
    color: rgb(76, 76, 76);
    line-height: 50rpx;
    margin: 0 34rpx;
    display: flex;
    padding: 16rpx 0;
    icon {
      position: relative;
      top: -7rpx;
      color: rgb(50, 187, 143);
      margin-right: 15rpx;
    }
  }
}
.subtab-compare-bad {
  .bad-text {
    font-size: 28rpx;
    color: rgb(76, 76, 76);
    line-height: 50rpx;
    margin: 0 34rpx;
    display: flex;
    padding: 16rpx 0;
    icon {
      position: relative;
      top: -7rpx;
      color: rgb(255, 93, 81);
      margin-right: 15rpx;
    }
  }
}
</style>
