# vue-template
简单的管理后台模板--vue
>当前版本为v1
##项目创建方式
```
1.安装node js
2.安装vue手脚架
npm install vue-cli
3.使用命令快速创建
vue create vue-template
选择vue 2.0版本，选择npm方式（yarn的方式不熟悉）
4.创建完成
```
## 创建出来的项目骨架介绍
```
|--node_modules 项目需要使用的依赖文件
|--public 页面图标等
|--src
    |--asset 静态资源
    |--components 组件
    |--router 路由
    |--views  页面
    |--store  状态管理器
|--App.vue  主组件
|--main.js 入口文件
|--tests 测试文件
|--.gitignore 上传忽略的配置  
|--.eslintrc.js  代码格式校验的配置
|--	cypress.json 测试的插件配置
|--	jest.config.js  测试模块的配置
|--	package.json 项目的描述文件 
```

## 关于路由配置
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
## 关于mock.js

## permission.js

## 前后分离：跨域和关于代理

## 安装依赖的版本一致性问题
```
使用scss需要安装：node-sass 
```