<template>
    <div class="app-container">
        <!--顶部 Header区域-->
        <!--中间 路由 router-view区域-->
        <!--底部 Tabbar(router-link)区域-->
        
		<mt-header fixed title="黑马程序员 Vue项目" class="header-container">
			<span slot="left" @click="goBack()" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>
		<transition>
		    <router-view></router-view>
		</transition>
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-11b" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-11b" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-11b" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-11b" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
            </router-link>
		</nav>
    </div>
</template>

<script>
    export default {
		name: 'app',
		data() {
			return {
				flag: false
			}
		},
		created() {
			this.flag = this.$route.path === '/home' ? false : true;
		},
		methods: {
			goBack(){
				//点击后退
				this.$router.go(-1);
			}
		},
		watch: {
			'$route.path': function(newVal){
				if(newVal == '/home'){
					this.flag = false;
				}
				else{
					this.flag = true;
				}
			}
		},
    }
</script>

<style lang="scss" scoped>
.app-container{
    padding-top: 40px;
	overflow-x: hidden;
	padding-bottom: 50px;
}
.mint-header{
	z-index: 99;
}
.v-enter{
	opacity: 0;
	transform: translateX(100%);
}

.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-leave-active{
	opacity: 1;
	transition: all 0.5s ease;
}
.mui-bar-tab .mui-tab-item-11b.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-11b {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-11b .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-11b .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>