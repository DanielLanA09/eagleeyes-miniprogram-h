<template>
    <div class="swiper-box" :animation="swipe" @touchstart="touchStartEvent" @touchend="touchEndEvent" @touchmove="touchMoveEvent">
        
    </div>
</template>

<script>
export default {
  data: () => ({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    swipe:{},
    angle:0
  }),
  methods: {
    clean() {
      this.startX = 0;
      this.startY = 0;
      this.endX = 0;
      this.endY = 0;
    },
    touchMoveEvent(e) {
      this.endX = e.clientX;
      this.endY = e.clientY;
    },
    touchStartEvent(e) {
      this.startX = e.clientX;
      this.startY = e.clientY;
      console.log("起点坐标：", this.startX, this.startY);
    },
    touchEndEvent(e) {
      console.log("终点坐标：", this.endX, this.endY);
      if ((this.endX == 0) & (this.endY == 0)) {
        return;
      }
      let distance = Math.sqrt(
        Math.pow(this.endX - this.startX, 2) +
          Math.pow(this.endY - this.startX, 2)
      );
      this.clean();
      console.log(distance);
      if (distance > 200) {
          this.startSwipe();
      }
    },
    startSwipe() {
      let animation = wx.createAnimation({
        duration: 1000,
        timmingFunction: "ease"
      });
      this.angle+=180;
      animation
        .rotateY(this.angle)
        .step();
      this.swipe = animation.export();
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-box {
  width: 100%;
  height: 100%;
  background: red;
}
</style>
