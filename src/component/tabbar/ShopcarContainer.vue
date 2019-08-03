<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品内容区域 -->
            <div class="mui-card" v-for="(item,index) in shopCarList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="" srcset="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click="remove(item.id,index)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
            </div>
            <!-- 结算区域 -->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner accounts">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价 ￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import numbox from '../subcomponent/shopcar_numbox.vue';

export default{
    data() {
        return {
            shopCarList: [], //购物车中的所有数据
        }
    },
    created() {
        this.getShopCarList();
    },
    methods: {
        getShopCarList(){
            //1. 获取 store 中所有商品的 id，然后拼接处一个 用逗号分隔的字符串
            //获取购物车商品列表
            var idArr = [];
            this.$store.state.car.forEach(item => {
                idArr.push(item.id);
            });
            if(idArr.length <= 0){
                //如果购物车中没有数据，则直接返回
                return;
            }
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result => {
                if(result.body.status === 0){
                    this.shopCarList = result.body.message;
                }
            })
        },
        remove(id,index){
            // 点击删除，把商品从 store 中根据传递的 id 删除，同时把 当前组件中的 goodslist 中，对应要删除的商品，使用 index 来删除
            this.shopCarList.splice(index,1);
            this.$store.commit("removeFromCar",id);
        },
        selectedChanged(id,value){
            // 每当点击开关，把开关最新的状态，同步到 store 中
            this.$store.commit("updateGoodsSelected",{
                id: id,
                selected: value
            })
        }
    },
    components: {
        numbox
    }
}
</script>
<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }
    .accounts{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>