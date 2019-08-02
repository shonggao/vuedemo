<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodsList" :key="item.id" tag="div" :to="'/home/goodsinfo/'+item.id">
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
        </router-link > -->

        <!-- 在网页中有两种跳转方式 -->
        <!-- 方式1：使用 a 标签的形式 叫做 标签跳转 -->
        <!-- 方式2：使用 window.location.href 的形式，叫做 编程式跳转 -->

        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="getDetail(item.id)">
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
            //加载下一页商品数据
            this.pageIndex++;
            this.getGoodsList();
        },
        getDetail(id){
            // 跳转到商品详情页面
            //注意： 一定要区分 this.$route 和 this.$router 两个对象
            // this.$route 是路由参数对象，所有路由中的参数，param,query 都属于它
            // this.$router 是路由导航对象，用它可以使用 js 代码实现路由的前进后退，跳转到新的 url 地址

            // 1. 第一种方法：传递路径
            // this.$router.push("/home/goodsinfo/"+id);
            // 2. 第二种方法：传递对象
            // this.$router.push({path: "/home/goodsinfo/"+id});
            // 3. 第三者方法：传递一个命名的路由
            this.$router.push ({ name: "goodsinfo", params: { id }})
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