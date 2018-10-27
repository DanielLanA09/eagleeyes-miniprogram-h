<template>
    <div>
      <div class="g-container" :style="{height:mstyle.mH+'px',width:mstyle.mW+'px'}">
        <canvas class="g-canvas" canvas-id="radar" :style="{height:mstyle.mH+'px',width:mstyle.mW+'px'}" @click="$emit('onCanvasClick')"></canvas>
        <div v-for="(i,k) in mData" :key="k" class="params" style="position:absolute;" :style="{top:i.top+'px',left:i.left+'px',color:i.color}" @click="onClick(i)">
          <!-- {{i.devName}} -->
          <span>{{i.devName}} <icon class="iconfont" :class="[i.mark>=75?'icon-biaoqing_haoping':i.mark<50?'icon-biaoqing_chaping':'icon-biaoqing_yiban']" style="font-size:12px;" ></icon></span>
        </div>
      </div>
    </div>
</template>

<script>
import api from "@/api";
export default {
  props: {
    canvasid: {
      type: String,
      default: "radar1"
    },
    mstyle: {
      type: Object,
      default: {
        mW: 400, //宽
        mH: 400 //高
      }
    },
    mData: {
      type: Array,
      default: [
        {
          devName: "速度",
          mark: 90,
          top: 0,
          left: 0,
          color: "#5ad2b5"
        },
        {
          devName: "力量",
          mark: 56,
          top: 0,
          left: 0,
          color: "#5ad2b5"
        },
        {
          devName: "防守",
          mark: 98,
          top: 0,
          left: 0,
          color: "#5ad2b5"
        },
        {
          devName: "耐力",
          mark: 72,
          top: 0,
          left: 0,
          color: "#5ad2b5"
        },
        {
          devName: "射门",
          mark: 40,
          top: 0,
          left: 0,
          color: "#5ad2b5"
        },
        {
          devName: "传球",
          mark: 80,
          top: 0,
          left: 0,
          color: "#5ad2b5"
        }
      ]
    },
    coverId:{
      type:Number,
      default:0
    }
  },
  data: () => ({
    graph: {
      mW: 0,
      mH: 0,
      mCtx: null,
      mCount: 0, //边数
      mCenter: 0, //中心点
      mRadius: 0, //半径(减去的值用于给绘制的文本留空间)
      mAngle: 0, //角度
      mr: 0, //平均半径差
      mColorPolygon: "",
      coverId: 0
    },
    ctx: {}
  }),
  watch: {
    start() {}
  },
  computed: {},
  methods: {
    onClick(i) {
      this.$emit("onParamClick", i);
    },
    initialize() {
      let me = this.graph;
      me.mW = this.mstyle.mW;
      me.mH = this.mstyle.mH;
      me.mCount = this.mData.length;
      me.mCenter = me.mW / 2;
      me.mRadius = me.mCenter - 30;
      me.mAngle = Math.PI * 2 / me.mCount;
      me.mr = me.mRadius / 5;

      let ctx = wx.createCanvasContext("radar");

      this.drawPolygon(ctx);
      this.drawLines(ctx);
      this.drawRegion(ctx);
      this.setText(ctx);
    },
    drawPolygon(ctx) {
      let me = this.graph;
      ctx.save();

      ctx.setStrokeStyle("#4ad9b7");
      let r = me.mr; //单位半径
      //画6个圈
      for (var i = 0; i < 5; i++) {
        let currR = r * (i + 1); //当前半径
        ctx.beginPath();
        //画6个边
        for (var j = 0; j < me.mCount; j++) {
          let x = me.mCenter + currR * Math.cos(me.mAngle * j);
          let y = me.mCenter + currR * Math.sin(me.mAngle * j);
          ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.draw(true);
      }
    },
    drawLines(ctx) {
      let me = this.graph;
      ctx.save();
      ctx.beginPath();
      for (var i = 0; i < me.mCount; i++) {
        let x = me.mCenter + me.mRadius * Math.cos(me.mAngle * i);
        let y = me.mCenter + me.mRadius * Math.sin(me.mAngle * i);
        ctx.moveTo(me.mCenter, me.mCenter);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.draw(true);
    },
    drawRegion(ctx) {
      let me = this.graph;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "rgba(74,217,183,0.3)";
      for (var i = 0; i < me.mCount; i++) {
        let x =
          me.mCenter +
          me.mRadius * Math.cos(me.mAngle * i) * this.mData[i].mark / 100;
        let y =
          me.mCenter +
          me.mRadius * Math.sin(me.mAngle * i) * this.mData[i].mark / 100;
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.draw(true);
    },
    setText(ctx) {
      let me = this.graph;
      let style = this.mstyle;
      for (var i = 0; i < me.mCount; i++) {
        let currAng = me.mAngle * i; //current angle
        let mr = Math.PI * 2 / 4; //meta region of coordinate
        let x = me.mCenter + me.mRadius * Math.cos(currAng);
        let y = me.mCenter + me.mRadius * Math.sin(currAng);
        let textLength = ctx.measureText(this.mData[i].devName).width + 25;
        let textHeight = 25;
        if (currAng <= mr) {
          this.mData[i].left = x;
          this.mData[i].top = y - 10;
        } else if ((currAng > mr) & (currAng <= 2 * mr)) {
          this.mData[i].left = x - textLength;
          this.mData[i].top = y - 10;
        } else if ((currAng > 2 * mr) & (currAng <= 3 * mr)) {
          this.mData[i].left = x - textLength;
          this.mData[i].top = y - textHeight;
        } else if ((currAng > 3 * mr) & (currAng <= 4 * mr)) {
          this.mData[i].left = x;
          this.mData[i].top = y - 25;
        }
      }
    },
    drawCircle(ctx) {
      ctx.save();
      let me = this.graph;
      let r = me.mCenter / 18;
      for (var i = 0; i < me.mCount; i++) {
        let x =
          me.mCenter +
          me.mRadius * Math.cos(me.mAngle * i) * this.mData[i][1] / 100;
        let y =
          me.mCenter +
          me.mRadius * Math.sin(me.mAngle * i) * this.mData[i][1] / 100;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.setFillStyle("rgba(255, 0, 0, 0.8)");
        ctx.fill();
        ctx.draw(true);
      }
      ctx.restore();
    }
  },
  created() {
    this.initialize();
  },
  mounted() {
    // this.ctx = wx.createCanvasContext("radar");
    this.initialize();
  }
};
</script>

<style lang="less" scoped>
.g-container {
  position: relative;
}
.params {
  font-size: 12px;
  width: 65px;
  color: rgb(50, 187, 143);
}
.g-canvas {
  position: relative;
}
</style>