<template>
    <div>
        <!-- SEARCH TITLE -->
        <div class="input-block">
            <input type="text" placeholder="搜索您想找的小区、楼盘、地点" placeholder-style="font-size:14px;" class="input">
        </div>
        <!-- FILTER TITLE -->
        <div class="title">
            <div>
                <m-select></m-select>
            </div>
            <div class="center">
                <m-select :list="priceList"></m-select>
            </div>
            <div>
                <m-select></m-select>
            </div>
        </div>
        <!-- COMPARE CARDS -->
        <div>
            <div class="selected">
                <!-- CHOOSED CARDS -->
                <m-card v-for="(i,k) in selectedList" :key="k" :info="i" :edit="true" @onClick="onCancel(k)" :checked="i.checked"></m-card>
            </div>
            <div>
                <!-- FILTERED CARDS -->
                <m-card v-for="(i,k) in availList" :key="k" :info="i" :edit="true" @onClick="onSelect(k)" :checked="i.checked"></m-card>
            </div>
        </div>
        <!-- TODO: FLOAT BUTTON -->
        <div class="button" @click="onCompare">
          <div>开始对比</div>
        </div>
    </div>
</template>

<script>
import api from "@/api.js";
import mSelect from "@/components/select/simSelect.vue";
import mCard from "@/components/card/favoriteCard.vue";
export default {
  components: {
    mSelect,
    mCard
  },
  data: () => ({
    priceList: [
      {
        name: "价格",
        value: "0,100000",
        active: true
      },
      {
        name: "6千~9千",
        value: "6000,9000",
        active: true
      },
      {
        name: "9千~1.2万",
        value: "9000,12000",
        active: true
      },
      {
        name: "1.2万~1.4万",
        value: "12000,14000",
        active: true
      },
      {
        name: "1.4万~1.6万",
        value: "14000,16000",
        active: true
      },
      {
        name: "1.6万~1.8万",
        value: "16000,18000",
        active: true
      },
      {
        name: "1.8万~2万",
        value: "18000,20000",
        active: true
      },
      {
        name: "2万以上",
        value: "20000,100000",
        active: true
      }
    ],
    price: [0, 100000],
    tagStr: "房型丰富",
    district: "520115",
    title: "",
    size: 20,
    page: 0,
    selectedList: [],
    availList: []
  }),
  onLoad() {
    this.request();
  },
  methods: {
    request() {
      api.findByDistrictAndPriceAndTag(
        {
          minprice: this.price[0],
          maxprice: this.price[1],
          district: this.district,
          tags: this.tagStr,
          page: this.page,
          size: this.size,
          title: this.title
        },
        res => {
          if (res.success) {
            this.availList = res.data;
          }
        }
      );
    },
    onSelect(k) {
      if (this.selectedList.length >= 2) {
        this.availList[k].checked = false;
        wx.showModal({
          title: "提示",
          content: "最多只能选择2个噢",
          showCancel: false,
          confirmText: "知道了",
          confirmColor: "#32bb8f"
        });
        return;
      }
      let item = this.availList[k];
      this.selectedList.push(item);
      this.availList.splice(k, 1);
    },
    onCancel(k) {
      let item = this.selectedList[k];
      this.availList.push(item);
      this.selectedList.splice(k, 1);
    },
    onCompare(){
      
    }
  }
};
</script>

<style scoped lang="less">
.title {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid rgb(209, 209, 209);
  border-bottom: 1px solid rgb(209, 209, 209);
  padding: 10px 0;
  div {
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }
}
.input-block {
  padding: 10px;
}
.input {
  background: rgb(245, 245, 245);
  border-radius: 50px;
  height: 32px;
  padding-left: 40px;
  font-size: 14px;
}
.center {
  border-right: 1px solid rgb(209, 209, 209);
  border-left: 1px solid rgb(209, 209, 209);
}
.selected{
  
}
.button{
  position:fixed;
  right:18px;
  bottom: 10px;
  border-radius: 100%;
  background: rgb(74, 217, 183);
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  div{
    font-size: 12px;
    color: white;
    width: 24px;
  }
}
</style>
