<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
            <!-- 将来，谁使用此 轮播图组件 ，谁为我们传递 lunbotuList -->
            <!-- 此时，lunbotuList 应该是父组件向子组件传值 -->
            <mt-swipe-item v-for="(item,i) in lunbotuList" :key="i">
                <img :src="item.img" :class="{ full:isfull }" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    props: ["lunbotuList","isfull"]
}

</script>
<style lang="scss" scoped>
.mint-swipe {
    height: 200px;
    text-align: center;
   .mint-swipe-item{
        background-color: white; 
    }

    img {
        margin: 2px 0;
        height: 85%;
    }
}
.full{
    margin: 0 !important;
    width: 100%;
    height: 100% !important;
}
</style>