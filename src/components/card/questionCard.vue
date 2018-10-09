<template>
    <div class="border">
        <div class="title">
            {{current.title}}
        </div>
        <div class="body">
            <div class="option"  v-for="(e,k) in current.options" :key="k" @click="onSelect(e,current.multiple)">
                <span class="content" :class="{active:e.checked==true?true:false}">{{e.content}}</span>
                <checkbox class="check" :checked="e.checked"></checkbox>
            </div>
        </div>
        <div class="button" @click="onNext">{{next}}</div>
    </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true,
      default: []
    }
  },
  data: () => ({
    length: 0,
    index: 0,
    selectedNum: 0,
    current: {},
    next: "下一题",
    tags: new Set()
  }),
  computed: {
    setLength() {
      this.length = this.questions.length;
    },
    setComplete() {
      if (this.index == this.length - 1) {
        this.next = "完成";
      }
    },
    setCurrent(){
        if(this.questions.length>0){
            this.current = this.questions[this.index]
        }
    }
  },
  methods: {
    onSelect(e, multi) {
      if (!multi) {
        this.questions[this.index].options.map(i => (i.checked = false));
      } else {
        let optionCheckedArray = this.questions[this.index].options.filter(i=>i.checked==true);
        this.selectedNum = optionCheckedArray.length;
        if (this.selectedNum >= this.questions[this.index].max) {
          if(e.checked){
              e.checked = false;
          }
          return;
        }
      }
      e.checked = !e.checked;
    },
    onNext() {
      this.selectedNum = 0;
      let optionCheckedArray = this.questions[this.index].options.filter(i=>i.checked==true);
      optionCheckedArray.map(i => {
        let tagArray = i.tags.split(',');
        tagArray.map(i=>{
            this.tags.add(i)
        })
      });
      if (this.next == "完成") {
        this.$emit("onComplete", this.tags);
        return;
      }
      this.index++;
      if (this.questions[this.index]) {
        this.current = this.questions[this.index];
      } else {
        this.index--;
      }
    }
  },
  mounted() {

  }
};
</script>

<style scoped lang="less">
.border {
  border-radius: 10px;
  box-shadow: 0 0 6rpx 6rpx rgb(231, 235, 241);
  margin: 1px 8px;
  min-height: 300px;
  padding: 30px 17px;
  position: relative;
}
.body {
  margin-top: 24px;
}
.title {
  font-size: 16px;
  color: rgb(92, 92, 92);
}
.option {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid rgb(231, 235, 241);
  .content {
    font-size: 15px;
    color: rgb(102, 102, 102);
  }
  .content.active {
    color: rgb(74, 217, 183);
  }
}
.button {
  height: 38px;
  width: 197px;
  line-height: 38px;
  color: white;
  text-align: center;
  border-radius: 50px;
  background-color: rgb(74, 217, 183);
  position: absolute;
  bottom: -19px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
