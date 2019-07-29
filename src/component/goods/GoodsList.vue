<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodsList" ::key="item.id">
            <img :src="item.img_url" alt="" srcset="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>                    
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pageIndex: 1, //分页的页数
            goodsList: [],  // 存放商品列表的数组
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            //获取商品列表数据
            this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result => {
                if(result.body.status === 0){
                    
                    this.goodsList = this.goodsList.slice(0,(this.pageIndex-1)*10);
                    this.goodsList = this.goodsList.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getGoodsList();
        }
    },
}
</script>
<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        justify-content: flex-end;
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee; 
            p{
                margin: 0;
                padding: 4px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px; 
            }
        }
    }
}
</style>