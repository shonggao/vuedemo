<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<script>
export default{
    data() {
        return {
            info: {}, //图文数据
            id: this.$route.params.id //获取路径中的id
        }
    },
    created() {
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc(){
            //获取图文介绍
            this.$http.get('api/goods/getdesc/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.info = result.body.message[0];
                }
            })
        }
    },
}
</script>
<style lang="scss">
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px;
    }
    .content{
        img{
            margin: 5px 0;
            width: 100%;
        }
    }
}
</style>