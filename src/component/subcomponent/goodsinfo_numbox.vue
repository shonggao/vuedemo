<template>
    <!-- 问题：我们不知道什么时候能够拿到max值，但是，总归有一刻，会得到一个真正的max值 -->
    <!-- 我们可以使用 watch 属性监听；来监听 父组件传递过来的 max 值，不管 watch 会被触发几次，最后一次，肯定是一个合法的 max 数值 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" ref="numbox" type="number" value="1" @change="countChanged"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
    </div>
    <!-- 分析：子组件什么时候把值传给父组件 -->
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";

export default{
    data() {
        return {
            
        }
    },
    methods: {
        countChanged(){
            // 每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件；
            this.$emit("getCount",parseInt(this.$refs.numbox.value));
        }
    },
    props: ["max"],
    watch:{
        // 属性监听
        'max': function( newVal , oldVal){
            mui(".mui-numbox").numbox().setOption('max', newVal);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>