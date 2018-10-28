<template>
    <div>
        <!-- SEARCH TITLE -->
        <div class="input-block">
            <input type="text" placeholder="搜索您想找的小区、楼盘、地点" placeholder-style="font-size:14px;" class="input" v-model="title" @bindconfirm="request" @confirm="onTitleConfirm">
        </div>
        <!-- FILTER TITLE -->
        <div class="title">
            <div>
                <!-- <m-select @onSelect="onDistrictSelected"></m-select> -->
                <picker @change="onDistrictSelected" :range="districtAvailList" range-key="name" :value="districtIndex">
                  <div class="selector">
                    {{districtAvailList[districtIndex].name}}
                  </div>
                </picker>
            </div>
            <div class="center">
                <t-select @onSelected="onTagSelected"></t-select>
            </div>
            <div>
                <!-- <m-select :list="priceList" @onSelect="onPriceSelected"></m-select> -->
                <picker @change="onPriceSelected" :range="priceAvailList" range-key="name" :value="priceIndex">
                  <div class="selector">
                    {{priceAvailList[priceIndex].name}}
                  </div>
                </picker>
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
        <div class="button" @click="onCompare">
          <div>开始对比</div>
        </div>
    </div>
</template>

<script>
import api from "@/api.js";
import mSelect from "@/components/select/simSelect.vue";
import mCard from "@/components/card/favoriteCard.vue";
import tSelect from "@/components/select/tagSelect.vue";
export default {
  components: {
    mSelect,
    mCard,
    tSelect
  },
  data: () => ({
    districtAvailList: [
      {
        name: "观山湖",
        value: "520115",
        active: true
      },
      {
        name: "南明区",
        value: "520102",
        active: false
      },
      {
        name: "云岩区",
        value: "520103",
        active: false
      },
      {
        name: "白云区",
        value: "520113",
        active: false
      },
      {
        name: "花溪区",
        value: "520111",
        active: false
      },
      {
        name: "乌当区",
        value: "520112",
        active: false
      }
    ],
    districtIndex: 0,
    priceAvailList: [
      {
        name: "不限价格",
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
    priceIndex: 0,
    price: [0, 100000],
    tagStr: "",
    district: "520115",
    title: "",
    size: 6,
    pageEnd: false,
    page: 0,
    selectedList: [],
    availList: []
  }),
  onLoad() {
    this.request();
  },
  onReachBottom() {
    this.request();
  },
  methods: {
    request() {
      if (this.pageEnd) {
        return;
      }
      this.page++;
      api.findByDistrictAndPriceAndTag(
        {
          minprice: this.price[0],
          maxprice: this.price[1],
          district: this.district,
          tags: this.tagStr,
          page: this.page * this.size,
          size: this.size,
          title: this.title
        },
        res => {
          if (res.success) {
            if (res.data.length == 0) {
              this.pageEnd = true;
            }
            this.availList = this.availList.concat(res.data);
          }
        }
      );
    },
    onTitleConfirm() {
      this.reSetPage();
      this.request();
    },
    reSetPage() {
      this.availList = [];
      this.pageEnd = false;
      this.page = -1;
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
    onCompare() {
      if (this.selectedList.length < 2) {
        wx.showModal({
          title: "提示",
          content: "请选择两个要比较的小区",
          showCancel: false,
          confirmText: "知道了",
          confirmColor: "#32bb8f"
        });
        return;
      }
      this.$store.commit("SET_COMPARE_ITEMS", this.selectedList);
      wx.navigateTo({
        url: "/pages/compareResult/main"
      });
    },
    onTagSelected(e) {
      // console.log(e);
      this.reSetPage();
      let tags = [];
      e.forEach(i => {
        tags.push(i.value);
      });
      this.tagStr = tags.join(",");
      this.request();
    },
    onDistrictSelected(e) {
      this.districtIndex = e.mp.detail.value;
      this.district = this.districtAvailList[this.districtIndex].value;
      this.reSetPage();
      this.request();
    },
    onPriceSelected(e) {
      this.priceIndex = e.mp.detail.value;
      this.price = this.priceAvailList[this.priceIndex].value.split(",");
      this.reSetPage();
      this.request();
    }
  }
};
</script>

<style scoped lang="less">
.selector {
  font-size: 26rpx;
  color: #4d4d4d;
  // font-weight: 600;
  height: 64rpx;
  line-height: 64rpx;
  margin: 0;
}
.selected {
  position: sticky;
  top: 2px;
  z-index: 19;
  background: white;
}
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
  display: flex;
  justify-content: center;
  align-items: center;
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
