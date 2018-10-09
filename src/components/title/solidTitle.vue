<template>
    <div class="outer">
        <div class="inner e-center">
            <span>{{title}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:"周边配套"
        }
    },
    data:()=>({

    })
}
</script>

<style lang="less" scoped>
.outer{
    background: white;
    padding-top: 8rpx;
    padding-bottom: 12rpx;
    padding-left: 8rpx;
    padding-right: 12rpx;
    height: 64rpx;
    width: 218rpx;
    border: solid 1px #4ad9b7;
    .inner{
        border: dashed 1px #4ad9b7;
        width:100%;
        height: 100%;
        color: #4ad9b7;
        font-size: 30rpx;
    }
}
</style>
