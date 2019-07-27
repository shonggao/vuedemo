<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论的内容" maxlength="120"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in commentsList" :key="i">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ (item.content === '' || item.content === 'undefined') ? '此用户很懒，什么都没说': item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui';

export default{
    data() {
        return {
            pageIndex: 1,
            commentsList: []
        }
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result => {
                if(result.body.status === 0){
                    //每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据拼接上新数据
                    this.commentsList = this.commentsList.concat(result.body.message);
                }
                else{
                    Toast("获取评论失败！");
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        }
    },
    props: ["id"]
}
</script>
<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        .cmt-item{
            margin: 10px 0; 
            font-size: 13px;
            .cmt-title{
                line-height: 35px;
                background-color: #ccc;
            }
            .cmt-body{
                text-indent: 2em;
            }
        }
    }
}
</style>