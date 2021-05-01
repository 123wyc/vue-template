
# vue-template 
 ```
  简单的管理后台模板--vue
当前版本为v1
 ```
# 环境搭建

## 1.项目创建方式
```
1.安装node js
2.安装vue手脚架
npm install vue-cli
3.使用命令快速创建
vue create vue-template
选择vue 2.0版本，选择npm方式（yarn的方式不熟悉）
4.创建完成
```
## 2.创建出来的项目骨架介绍
```
|--node_modules 项目需要使用的依赖文件
|--public 页面图标等
|--src
    |--asset 静态资源
    |--components 组件
    |--router 路由
    |--views  页面
    |--store  状态管理器
    |--styles 公共样式
    |--utils  工具js
|--App.vue  主组件
|--main.js 入口文件
|--tests 测试文件
|--.gitignore 上传忽略的配置  
|--.eslintrc.js  代码格式校验的配置
|--	cypress.json 测试的插件配置
|--	jest.config.js  测试模块的配置
|--	package.json 项目的描述文件 
```

## 3.关于路由配置
    1.安装vue-router : npm install vue-router
    2.在main.js中使用路由
        import Vue from 'vue'
        import App from './App.vue'
        import router from './router'

        Vue.config.productionTip = false

        new Vue({
        router,
        render: h => h(App),
        }).$mount('#app')

    3.在主组件APP.vue中
        <div id="app">
            <router-view />
        </div>
        </template>

        <script>
        export default {
        name: 'App',

        }
        </script>
    4.在route.js或者router/index.js中定义路由

        import Vue from 'vue'
        import Router from 'vue-router'
        Vue.use(Router)


        //定义路由
        const constantRoutes = [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/login/index'),
            hidden: true
        }

        ]
        //创建路由对象
        const createRouter = () => new Router({
        mode: 'history', // 去掉路径上的#
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
        })
        const router = createRouter()
        export default router  //抛出路由
    注意：定义路由一定一套在创建路由对象之前，否则路由无法生效。这个问题花费了2天的事件才解决。

# Main.vue
```
系统的主组件，它采用的布局是 element-ui的 Container 布局容器
    <template>
    <el-container style="height: 100%">
        <!--左侧栏-->
        <el-aside width="auto">
            <!--左侧栏控件-->
            <common-aside></common-aside>
        </el-aside>
        <!--右侧栏-->
        <el-container>
            <!--header部分-->
            <el-header>
                <!--header部分控件-->
                <common-header></common-header>
            </el-header>
            <el-main>
   <!--左侧栏 和 header部分对于整个后台部分都是不变的，唯一变的就是上面3的部分，这里就通过router-view来展示所需控件-->
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import CommonAside from '../components/CommonAside'
    import CommonHeader from "../components/CommonHeader";

    export default {
        components: {
            CommonAside,
            CommonHeader
        }
    }
</script>
这样整个后台管理系统的整个轮廓就定下来了，接下来通过路由的切换的组件展示在router-view的位置。
```
    

## 关于如何使用element-ui
    方式一：
        在main.js中整体引入 
        import Element from 'element-ui'
        Vue.use(Element)
    方式二：
        1. 选择指定组件引入，项目中的 src/utils/Element.js
        2.在main.js中进入   import './utils/Element.js'
    引入样式：
        import 'element-ui/lib/theme-chalk/index.css'
## Normalize.css
    Normalize.css 是一个可以定制的CSS文件，它让不同的浏览器在渲染网页元素的时候形式更统一
    安装npm install normalize.css

## 关于scss
    Sass是成熟、稳定、强大的CSS预处理器。
    npm install --save-dev node-sass sass-loader
## 关于mock.js

## permission.js

## 前后分离：跨域和关于代理

## 安装依赖的版本一致性问题
```
使用scss需要安装：node-sass  sass-loader 需要注意版本问题

```