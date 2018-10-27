<template>
    <div class="title-box">
        <div class="img">
            <!-- <img :src="imgUrl"> -->
            <i class="iconfont" :class="[imgUrl]"></i>
        </div>
        <div class="description" >
            {{des}}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: "",
      required: true
    },
    des: {
      type: String,
      default: "",
      required: true
    }
  },
  computed: {
    setDes() {
      return this.desMap.get(this.des);
    }
  },
  data() {
    return {
      desMap: new Map([
        [
          "楼房布局",
          "包含楼房朝向、分布情况、楼间距等信息，可以让您了解小区的采光通风情况以及居住空间是否舒适等问题。"
        ],
        [
          "小区绿化",
          "此模块描写了小区的绿化规划情况及道路、楼道保洁情况，让您直观地了解小区内部的环境。"
        ],
        [
          "小区配套",
          "通过盘点小区的座椅、健身器材等配套设施，分析监控分布、门岗管理严格与否等情况，展示小区配套的齐全程度。"
        ],
        [
          "周边环境",
          "此模块分析了小区沿街人行道情况及周边景观、小区住户逛公园是否方便等维度。让您对小区周边环境是否优美，是否适合散步游玩有一个清晰的认知。"
        ],
        [
          "交通",
          "本模块根据分析小区附近的公交站点、拥堵路段等维度让您对小区乘坐公共交通是否便利、驾车出行是否会拥堵有一个了解。"
        ],
        [
          "车位配套",
          "本模块我们将对于小区车位数量是否充足、是否为人车分流、有无非机动车停车处等情况进行说明，便于您了解小区的车位情况。"
        ],
        [
          "菜场",
          "我们将对小区周围的果蔬门店、农贸市场、生鲜超市、大型超市等买菜点进行盘点，让您对周边买菜便利程度有一个清晰的认知。"
        ],
        [
          "学校",
          "本模块内容包含对小区附近的幼儿园、小学、初中、高中、培训机构情况的描写，让您一眼就能看出小区教育配套是否优越。"
        ],
        [
          "生活娱乐",
          "此模块将对小区周边吃、购、玩、行、生活服务配套情况进行分析说明，向您展现居住在此日常购物、娱乐、出行是否便捷。"
        ],
        [
          "文化体育",
          "我们将会说明小区周边图书馆、博物馆等文化场馆以及体育运动场所的具体情况，让您全面的了解小区周边的文化体育配套。"
        ],
        [
          "医疗",
          "此模块将对小区周边是否有大型医院，药店诊所的分布情况进行说明，让您对周边医疗配套的优劣有一个判断。"
        ],
        [
          "污染",
          "本模块将对小区周边的污染情况进行说明，分析小区住户是否会受噪音、废气、强光等污染元素的影响。"
        ],
        [
          "商务办公",
          "此模块针对小区周边办公写字楼、银行营业厅、酒店等情况，能够为您展示出该小区找工作、商务办公的便捷程度。"
        ],
        [
          "政府机构",
          "此模块将对小区距离居委会、派出所、社区服务中心等政府机构的情况进行描写，小区办理事务是否方便，一目了然。"
        ]
      ])
    };
  },
  methods: {},
  mounted() {
    //   this.setDes();
  }
};
</script>

<style lang="less" scoped>
.description {
  padding: 32rpx 32rpx;
  font-size: 24rpx;
  color: #666666;
  line-height: 20px;
  font-family: "PingFang SC";
}
.title-box{
  position:relative;
}
.img {
  display: flex;
  justify-content: center;
  padding-top: 26rpx;
  img {
    width: 510rpx;
    height: 134rpx;
  }
  i{
    font-size: 100px;
    color: rgb(50, 187, 143);
  }
}
</style>
