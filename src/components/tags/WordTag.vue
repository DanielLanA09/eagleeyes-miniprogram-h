<template>
    <div class="tag-back">
        <div class="title" :style="{color:titleColor,borderColor:titleColor}">{{title}}</div>
        <div class="content" v-if="k<availMount" v-for="(i,k) in setList" :key="k">
            {{i.tagName}}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "优点"
    },
    titleColor: {
      type: String,
      default: "#6adfc3"
    },
    availType: {
      type: String,
      default: "ADVANTAGE"
    },
    availMount:{
      type:Number,
      default:3
    },
    list: {
      type: Array,
      default: [
        {
          name: "",
          type: "ADVANTAGE"
        }
      ]
    }
  },
  computed: {
    setList() {
      let result = this.list.filter(i => i.tagType == this.availType);
      return result;
    }
  },
  data: () => ({
    filteredList: []
  }),
  mounted() {}
};
</script>

<style scoped lang="less">
.tag-back {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: nowrap;
  margin: 3px 0;
  .title {
    font-size: 11px;
    // color: #6adfc3;
    padding: 2px 5px;
    border: 1px solid #6adfc3;
    border-radius: 3px;
    margin-right: 5px;
    min-width: 26px;
    height: 12px;
    line-height: 12px;
    text-align: center;
  }
  .content {
    font-size: 12px;
    color: #8c8c8c;
    padding: 0 3px;
    white-space: nowrap;
    overflow: hidden;
    min-width: 30px;
  }
}
</style>
