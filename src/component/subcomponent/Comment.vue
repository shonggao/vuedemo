<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入评论的内容" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
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
            pageIndex: 1,    //默认展示第一页的数据
            commentsList: [],  //所有的评论数据
            msg: ''  //评论输入的内容
        }
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments(){  //获取评论
            this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
                if(result.body.status === 0){
                    //每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据拼接上新数据
                    
                    //根据pageIndex截取出前n页的评论作为老数据
                    this.commentsList = this.commentsList.slice(0,(this.pageIndex-1)*10);

                    this.commentsList = this.commentsList.concat(result.body.message);
                }
                else{
                    Toast("获取评论失败！");
                }
            })
        },
        getMore(){  //显示更多
            this.pageIndex++;
            this.getComments();
        },
        postComment(){  //发表评论
            // 校验是否为空

            if(this.msg.trim().length === 0){
                return Toast("评论内容不能为空！");
            }

            // 参数1： 请求的URL地址
            // 参数2： 提交给服务器的数据对象 {content：this.msg}
            // 参数3： 定义提交的时候，表单中的数据格式 {emulateJSON：true}
            this.$http.post('api/postcomment/' + this.id, { 
                content: this.msg.trim() 
            })
            .then(result => {
                if (result.body.status === 0){
                    // 拼接出一个评论对象
                    var cmt = {
                        user_name: '匿名用户',
                        add_time: Date.now(),
                        content: this.msg.trim()
                    }
                    this.commentsList.unshift(cmt);
                    this.msg = '';
                }
                else{
                    Toast("评论出错！");
                }
            });
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