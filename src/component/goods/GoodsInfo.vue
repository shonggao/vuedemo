<template>
    <div class="goodsinfo-container">
        <!-- 商品轮播图区域 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
            </div>
        </div>

        <!-- 商品购买 区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        <span>
                            市场价：<del>￥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now-price">￥{{ goodsInfo.sell_price }}</span>
                        </span>
                    </p>
                    <p>购买数量：<numbox @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>                        
                    <!-- 分析：如何实现加入购物车时候，拿到选择的数量 -->
                    <!-- 1. 经过分析发现：按钮属于 goodsinfo 页面，数字属于 numbox 组件 -->
                    <!-- 2. 由于涉及到父子组件的嵌套了，所以无法直接在 goodsinfo 页面中获取到选中的商品数量值 -->
                    <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
                    <!-- 4. 事件调用的本质：父向子传递方法，子调用这个方法，同时把 数据当作参数传递给这个方法 -->

                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsInfo.goods_no }}</p>
                    <p>库存情况：{{ goodsInfo.stock_quantity }}</p>
                    <p>上架时间：{{ goodsInfo.add_time | dateFormat }}</p>                                        
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>                
            </div>
        </div>
    </div>
</template>
<script>
//导入轮播图组件
import swiper from '../subcomponent/Lunbotu.vue';
//导入数组选择框组件
import numbox from '../subcomponent/goodsinfo_numbox.vue';

export default {
    data() {
        return {
            id: this.$route.params.id, //将路由参数种的id挂载在data中，方便后续调用
            lunbotuList: [],  //轮播图数据
            goodsInfo: {}, //获取到的商品的信息
            ballFlag: false,  //控制小球的标识符 
            selectedCount: 1,  //保存用户选择商品的数量
        }
    },
    created() {
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods: {
        getLunbotu(){
            this.$http.get( "api/getthumimages/"+this.id).then(result => {
                if(result.body.status === 0){
                    result.body.message.forEach(item => {
                        item.img = item.src;
                    });
                    this.lunbotuList = result.body.message;
                }
            });
        },
        getGoodsInfo(){
            // 获取商品的信息
            this.$http.get('api/goods/getinfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.goodsInfo = result.body.message[0];
                }
            });
        },
        goDesc(id){
            //点击使用编程式导航，跳转到图文介绍页面
            this.$router.push({ name: "goodsdesc", params:{ id }})
        },
        goComment(id){
            //点击使用编程式导航，跳转到评论页面
            this.$router.push({ name: "goodscomment", params:{ id }})
        },
        addToShopCar(){
            this.ballFlag = !this.ballFlag;
            
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;


            // 小球动画优化思路：
            // 1. 先分析导致动画不准确的本质原因，我们把小球最终位移到的位置，已经局限在了某一分辨率下的滚动条未滚动的情况下
            // 2. 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离后，问题就出现了；
            // 3. 因此，我们经过分析，得到结论：不能把位置的横纵坐标直接写死了，而是应该根据不同情况，动态计算这个坐标值；
            // 4. 经过分析，得到解决思路，先得到徽标的横纵坐标，再得到小球的横纵坐标，然后横纵坐标求差，得到横纵坐标需要位移的距离
            // 5. 如何获取徽标和小球的横纵坐标     domObject.getBoundingClientRect()


            // 获取小球在页面中的位置

            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosiiton = document.getElementById("badge").getBoundingClientRect();
            const xDist = badgePosiiton.left - ballPosition.left;
            const yDist = badgePosiiton.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done(); 
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;

        },
        getSelectedCount(count){
            //当子组件把选中的数量传递给父组件时，把数量保存在 data 中。
            this.selectedCount = count;
        }
    },
    components: {
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    box-shadow: 0 0 8px #999;
    overflow: hidden;
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top: 359px;
        left: 148px;
        /* transform: translate(83px,230px); */
    }
    .now-price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 13px 0;
        }
    }
}

</style>