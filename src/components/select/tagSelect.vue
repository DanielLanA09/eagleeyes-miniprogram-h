<template>
    <div >
        <!-- NAME -->
        <div class="name" @click="showOption">
            <span>标签</span>
            <i class="iconfont icon-xiaotubiao_fuzhi-27"></i>
        </div>
        <!-- SELECT OPTIONS -->
        <div class="option" v-if="optionsVisible">
            <notation :list="tags" @onChange="onSelected"></notation>
        </div>
        <!-- MASK -->
        <div class="mask" v-if="optionsVisible" @click="showOption"></div>
    </div>
</template>

<script>
import notation from "@/components/notation.vue";
export default {
  components: {
    notation
  },
  props:{
    
  },
  data: () => ({
    tags: [
      {
        tagName: "房型丰富",
        value: "房型丰富",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "低密度",
        value: "低密度",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "配套齐全",
        value: "配套齐全",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "交通便捷",
        value: "交通便捷",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "车位充足",
        value: "车位充足",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "生活方便",
        value: "生活方便",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "学校旁",
        value: "学校旁",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "公园旁",
        value: "公园旁",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "安静舒适",
        value: "安静舒适",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "医院旁",
        value: "医院旁",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "高绿化率",
        value: "高绿化率",
        active: false,
        tagType: "ADVANTAGE"
      },
      {
        tagName: "地铁房",
        value: "地铁房",
        active: false,
        tagType: "ADVANTAGE"
      }
    ],
    optionsVisible:false
  }),
  methods:{
      showOption(){
          this.optionsVisible = !this.optionsVisible;
      },
      onSelected(e){
          this.$emit("onSelected",e);
      }
  }
};
</script>

<style scoped lang="less">
.name {
  font-size: 13px;
  color: rgb(22, 31, 34);
  display: flex;
  text-align: center;
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
    color: #4d4d4d;
  }
}
.option {
  position: fixed;
  left: 0;
  right: 0;
  background: white;
  z-index: 200;
  padding: 10px 0;
}
.mask {
  position: fixed;
  margin-top: 20rpx;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
}
</style>
