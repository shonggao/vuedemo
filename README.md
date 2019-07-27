#这是一个示例项目

##牛不牛比用心去感受，每一行代码中的诗情雅意

###我们是有灵魂的程序员，所以我们的代码富有诗意。

#### [开源协议之间的区别] (https://www.zhihu.com/question/19568896)

## 用传统方式命令行把修改后的代码上传到Github
1. git add
2. git commit -m "提交信息"
3. git push

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取呢，使用vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据要保存到data身上
4. 使用 v-for 循环渲染每个 item 项

## 改造九宫格区域的样式

## 改造新闻资讯路由链接

## 新闻资讯 页面制作
1. 绘制页面，使用 MUI 中的media-list.html
2. 使用vue-resource获取数据
3. 渲染真实数据

## 实现新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link ，同时在跳转的时候应该提供唯一的id标识符
2. 创建新闻详情的组件页面 NewsInfo.Vue
3. 在 路由模块 中，将新闻详情的 路由地址 和 组件页面 对应起来

## 实现 新闻详情 的 页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 Comment.vue 组件模板
2. 在需要使用 Comment 组件的页面中，先导入 comment 组件
 + 'import comment from './Comment.vue''
3. 在父组件中，使用'components'属性，将刚才导入的 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的，注册名称，以标签形式，在页面中引用即可

## 获取所有的评论数据，显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让pageIndex++ ，然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更到的时候，每当获取到新数据的时候，应该让老数据调用 数组的 concat 方法，拼接上新数据

