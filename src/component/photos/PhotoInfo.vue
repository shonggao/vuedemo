<template>
    <div class="photoinfo-container">
        <h3>{{ photoInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
            <span>点击： {{ photoInfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <div class="thumbs">
            <vue-preview class="preimg" :slides="list" @close="handleClose"></vue-preview>
            <!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src" height="100" @click="$preview.open(index,list)" :key="index">              -->
        </div>
        <!-- 图片区域 -->

        <div class="content" v-html="photoInfo.content"></div>
        <cmt-box :id="id"></cmt-box>
        <!-- 评论子组件 -->
    </div>
</template>
<script>
//导入评论子组件
import comment from '../subcomponent/Comment.vue';

export default {
    data() {
        return {
            id: this.$route.params.id,    //从路由中获取图片ID
            photoInfo: {},  //图片详细信息
            list: []  //缩略图数组
        }
    },
    created() {
        this.getPhotpInfo();
        this.getThumbs();
    },
    components:{
        'cmt-box': comment
    },
    methods: {
        getPhotpInfo(){
            //获取图片详细信息
            this.$http.get('api/getimageInfo/'+this.id).then(result => {
                if(result.body.status === 0){
                    this.photoInfo = result.body.message[0];
                }
            })
        },
        getThumbs(){
            //获取缩略图
            this.$http.get('api/getthumimages/'+this.id).then(result => {
                if(result.body.status === 0){
                    result.body.message.forEach((item,index) => {
                        item.msrc = item.src;
                        item.alt= 'picture'+index;
                        item.title = 'Image Caption'+index;
                        item.w = 600;
                        item.h = 400;
                    });
                    this.list = result.body.message;
                }
                console.log(this.preview);
            })
        },
        handleClose () {
            console.log('close event')
        }
    },

}
</script>
<style lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{
        /* img{
            margin: 10px;
            box-shadow: 0 0 8px #999;
        } */
        /* .previewimg{
            margin: 10px;
            box-shadow: 0 0 8px #999;
        } */
        .preimg{
            /deep/ .my-gallery{   
                margin: 0;
                padding: 0;
                flex-wrap:wrap;
                display: flex;
                figure{
                    width: 30%;
                    margin: 5px;
                    img{
                        width: 100%;
                        box-shadow: 0 0 8px #999;
                    }
                }
            }
        }
        
    }
}

</style>