<template>
    <div class="progress-box">
        <div style="font-size:32rpx;margin:32rpx 0;font-weight:700;" :style="{color:color}">
            {{title}}
        </div>
        <div style="display:flex;justify-content:center;">
            <div class="outer">
                <div class="inner" :style="{background:color,width:value+'%'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:"优点"
        },
        color:{
            type:String,
            default:"#4bceaf"
        },
        value:{
            type:Number,
            default:50
        }
    }
}
</script>

<style lang="less" scoped>
.progress-box{
    width: 100%;
    border-radius: 5rpx;
}
.outer{
    width: 100%;
    height: 8rpx;
    background: #e6e6e6;
    border-radius: 5rpx;
}
.inner{
    // width: 50%;
    height: 100%;
    // background: #4bceaf;
    border-radius: 5rpx;
}
</style>
