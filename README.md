
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
# 左侧栏部分(CommonAside.vue)
 ```
 <template>
  <!--collapse 是否水平折叠收起菜单-->
  <el-menu
    :collapse="isCollapse"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!--是否水平折叠收起菜单 会影响这里字段的显示 -->
    <h3 v-show="isCollapse">偶囧</h3>
    <h3 v-show="!isCollapse">偶囧后台管理系统</h3>
    <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          <i :class="'el-icon-' + subItem.icon"></i>
          <span slot="title">{{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  //计算属性
  computed: {
    //没有子菜单
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    //有子菜单 (这样设置会有一个问题 就是有子菜单的 永远会在没有子菜单的下面）
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      // 这里的数据就是从vuex取得
      return this.$store.state.tab.isCollapse
    }
  },
  data() {
    return {
      menu: [
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    }
  },
  methods: {
    //跳转路由 根据名称跳转
    clickMenu(item) {
      this.$router.push({ name: item.name })
    }
  }
}
</script>

采用的布局是 element-ui的 NavMenu 导航菜单
 ```    

# header部分(CommonHeader.vue)
```
<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
            <h3 style=" color : #fff">首页</h3>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span class="el-dropdown-link"><img :src="userImg" class="user"/></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                userImg: require('../assets/images/user.png')
            }
        },
        methods: {
            //控制左侧菜单是否折叠
            collapseMenu() {
                this.$store.commit('collapseMenu')
            },
            //退出登陆
            logOut() {
                location.reload()
            }
        }
    }
</script>


通过点击那个图标来控制：左侧栏是否水平折叠收起菜单
它采用的布局是 element-ui的 Dropdown 下拉菜单
```

## 面包屑加tag标签切换功能
```
  面包屑是在head部分组件里,Tag标签虽然不再head部分组件里,但是它在整个管理后台系统中是会一直存在的，所以需要在Main.vue中.
  这两块功能的实现,主要依赖Element-ui两个样式 Breadcrumb 面包屑 + Tag 标签

  1.CommonAside侧边栏
    侧边栏需要做的就是当click当前菜单 就要把这个数据存储到vuex中，为了头部组件来获取展示这份数据。
     methods: {
    //跳转路由 根据名称跳转
    clickMenu(item) {
      //调用vuex的selectMenu方法存储数据
      this.$store.commit('selectMenu', item)
      //跳转路由
      this.$router.push({ name: item.name })
    }
  }
  2.CommonHeader头部组件
  面包屑写在CommonHeader中
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <!--很明显 首页 一定是存在的 所以这里直接写死-->
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <!--第二级菜单名称 就要看左侧组件有没有点击指定菜单，没有那就只显示首页 点击就显示当前菜单名称-->
      <el-breadcrumb-item :to="current.path" v-if="current" >{{current.label}}</el-breadcrumb-item>
  </el-breadcrumb>
  代替原先的：
     <!-- <h3 style=" color : #fff">首页</h3> -->

  3.vuex配置


export default {

  //存储数据
  state: {
    isCollapse: false,
    currentMenu: null,
 
  },
  //调用方法
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    //选择标签 选择面包屑
    selectMenu(state, val) {
      if (val.name === 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = val
        //如果等于-1说明tabsList不存在那么插入，否则什么都不做
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ''

      }
      // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
    },
  },
  actions: {}
}
用了一个属性为 currentMenu 的来存储当前菜单信息
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
```
  在开发过程中，有很多的ajax请求，前后端分离开发你肯定遇到这样的问题，后台给你的接口文档，你需要在本地模拟数据返回。
  学会使用mock.js拦截ajax请求，更加方便的构造你需要的假数据。

  1.安装mock.js
  npm install mockjs --save
  2.在项目中创建mock.js
   在src下创建mock文件夹，为不同的组件创建mock js文件，例如home.js,并引入mockjs：import Mock from 'mockjs'。
   在mock下创建index.js,使用mock的js文件
    import Mock from 'mockjs'
    import homeApi from './home'

      // 设置200-2000毫秒延时请求数据
      // Mock.setup({
      //   timeout: '200-2000'
      // })

      // 首页相关
      // 拦截的是 /home/getData
      Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)
   在main.js中引入创建好的mockjs文件：import './mock'   // mockjs
```


## permission.js

## 前后分离：跨域和关于代理

## 安装依赖的版本一致性问题
```
使用scss需要安装：node-sass  sass-loader 需要注意版本问题

```
## Vuex介绍