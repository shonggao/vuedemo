<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" ref="numbox" type="number" :value="initcount" @change="countChanged" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";

export default{
    data() {
        return {
            
        }
    },
    mounted() {
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChanged(){
            //每当数量值改变，立即把最新的数量同步到购物车的 store 中，覆盖之前的数量值 
            this.$store.commit("updateGoodsInfo",{
                id: this.goodsid,
                count: this.$refs.numbox.value
            })
        }
    },
    props: ["initcount","goodsid"]
}
</script>
<style lang="scss" scoped>

</style>