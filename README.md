
# vue-template 
 ```
  简单的管理后台模板--vue
当前版本为v1
 ```
# 一、环境搭建

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
# 二、首页
## 1.关于路由配置
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

## 2.Main.vue
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
## 3.左侧栏部分(CommonAside.vue)
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

## 4.header部分(CommonHeader.vue)
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

# 三、面包屑功能
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
# 四、封装echarts 组件
    1.简单封装常用echarts图标
       对于折线图、柱状图、饼状图等等做一个封装，首先需要找到哪些数据是需要我们传入组件中的。
    2.主要参数和需要传入的参数
        主要参数：
            title : 标题
            
            tooltip : 提示框组件
            
            legend : 图例组件
            
            xAxis : 直角坐标轴中的 x 轴
            
            yAxis : 直角坐标轴中的 y 轴
            
            series : 系列列表。每个系列通过 type 决定自己的图表类型
        需要传入的参数：
            series 和 xAxis 是肯定需要外部传来的数据，y轴 的数据跟series中data相关不需要单独再传
            x轴对于柱状图、折线图相关图是一定要有的，但对于饼状图来讲它又不是必须的，所以这里封装一个ECharts组件时,需要考虑这一点。
            
        3.封装
            <template>
              <!--图表展示在这个div中-->
              <div style="height: 100%" ref="echart">
                echart
              </div>
            </template>
            
            <script>
            import echarts from 'echarts'
            export default {
              //接收父类两个数据 1、chartData (series数据 + x坐标系数据）2、isAxisChart （是否有x坐标系，如果false，那么上面的xData就为空）
              props: {
                chartData: {
                  type: Object,
                  default() {
                    return {
                      xData: [],
                      series: []
                    }
                  }
                },
                isAxisChart: {
                //默认type为true 就代表默认是有x轴的
                  type: Boolean,
                  default: true
                }
              },
              computed: {
                //计算 选择是有x轴 还是没有x轴的数据
                options() {
                  return this.isAxisChart ? this.axisOption : this.normalOption
                },
                //用于下面的resize 改变图表尺寸，在容器大小发生改变时需要手动调用
                isCollapse() {
                  return this.$store.state.tab.isCollapse
                }
              },
              watch: {
                //监听chartData数据
                chartData: {
                  handler: function() {
                    this.initChart()
                  },
                  deep: true
                },
                //监听isCollapse 因为头部水平扩展是一个动画需要时间，所以这里延迟300毫秒
                isCollapse() {
                  setTimeout(() => {
                    this.resizeChart()
                  }, 300)
                }
              },
              data() {
                //在数据中有些数据在数据件中是写死的
                return {
                  echart: null,
                  axisOption: {
                    legend: {
                      textStyle: {
                        color: '#333'
                      }
                    },
                    grid: {
                      left: '20%'
                    },
                    tooltip: {
                      trigger: 'axis'
                    },
                    xAxis: {
                      type: 'category',
                      data: [],
                      axisLine: {
                        lineStyle: {
                          color: '#17b3a3'
                        }
                      },
                      axisLabel: {
                        color: '#333'
                      }
                    },
                    yAxis: [
                      {
                        type: 'value',
                        axisLine: {
                          lineStyle: {
                            color: '#17b3a3'
                          }
                        }
                      }
                    ],
                    color: [
                      '#2ec7c9',
                      '#b6a2de',
                      '#5ab1ef',
                      '#ffb980',
                      '#d87a80',
                      '#8d98b3',
                      '#e5cf0d',
                      '#97b552',
                      '#95706d',
                      '#dc69aa',
                      '#07a2a4',
                      '#9a7fd1',
                      '#588dd5'
                    ],
                    series: []
                  },
                  normalOption: {
                    tooltip: {
                      trigger: 'item'
                    },
                    color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
                    series: []
                  }
                }
              },
              methods: {
                initChart() {
                  //获取处理好的数据
                  this.initChartData()
                  //获取echart对象
                  if (this.echart) {
                    this.echart.setOption(this.options)
                  } else {
                    //通过refs获取
                    this.echart = echarts.init(this.$refs.echart)
                    this.echart.setOption(this.options)
                  }
                },
                //处理好数据
                initChartData() {
                  if (this.isAxisChart) {
                    this.axisOption.xAxis.data = this.chartData.xData
                    this.axisOption.series = this.chartData.series
                  } else {
                    this.normalOption.series = this.chartData.series
                  }
                },
                resizeChart() {
                  this.echart ? this.echart.resize() : ''
                }
              },
              mounted() {
                //resize 改变图表尺寸，在容器大小发生改变时需要手动调用（因为侧边栏是可以收缩的，所以这里图表根据是否收缩来改变图表尺寸）
                window.addEventListener('resize', this.resizeChart)
              },
              //销毁 防止内存泄漏
              destroyed() {
                window.removeEventListener('resize', this.resizeChart)
              }
            }
            </script>
            
            <style lang="scss" scoped></style>
        4.核心：
              //处理好数据
                initChartData() {
                  if (this.isAxisChart) {
                    this.axisOption.xAxis.data = this.chartData.xData
                    this.axisOption.series = this.chartData.series
                  } else {
                    this.normalOption.series = this.chartData.series
                  }
                },
                   
# 五、封装一个表格

  CommonTable.vue 表格
  
  CommonForm.vue 表单

 # 六、权限管理
  1、不同的用户会根据权限不同，在后台管理系统渲染不同的菜单栏。
  2、用户登陆之后,会获取路由菜单和一个token,之后跳转的页面都需要带着token。
  3、用户退出登陆,清除动态路由,清除token。跳转到login页面。
  4、如果当前没有token，那么跳转到任何页面都应该重定向到login页面。

  登陆操作应该至少要做三件事情
  1、获取当前用户对应的菜单栏的菜单,并存储到vuex和cookies中。
  2、获取当前用户的Token，存储到vuex和cookie中
  3、获取当前的菜单生成动态路由。


  header.vue退出时：
      logOut() {
      //清除token
      this.$store.commit('clearToken')
      //清除菜单
      this.$store.commit('clearMenu')
      //重定向 一般是登陆页
      location.reload()
    }

  路由守卫：
    后台管理系统,所以在我们在每切换一个路由都需要判断当前token是否存在,这个时候就需要通过路由守卫来实现。

    router.beforeEach((to, from, next) => {
      // 防止刷新后vuex里丢失token
      store.commit('getToken')
      // 防止刷新后vuex里丢失标签列表tagList
      store.commit('getMenu')
      let token = store.state.user.token
      // 过滤登录页，因为去登陆页不需要token(防止死循环)
      if (!token && to.name !== 'login') {
        next({ name: 'login' })
      } else {
        next()
      }
    })  

  vuex存放token
  import Cookie from 'js-cookie'
      export default {
        state: {
          token: ''
        },
        mutations: {
          //存放token
          setToken(state, val) {
            state.token = val
            Cookie.set('token', val)
          },
          //清空token
          clearToken(state) {
            state.token = ''
            Cookie.remove('token')
          },
          //获取token
          getToken(state) {
            state.token = Cookie.get('token')
          }
        },
        actions: {}
      }

  vuex存放菜单相关方法：
    import Cookie from 'js-cookie'
export default {
  state: {
    menu: []
  },
  mutations: {
    setMenu(state, val) {
      //vuex添加
      state.menu = val
      //cookie也添加
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      //清除也一样 vuex和cookie都清除
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return
      }
      //取出cookie数据 给vuex
      let menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      //添加动态路由 主路由为Main.vue
      let currentMenu = [
        {
          path: '/',
          component: () => import(`@/views/Main`),
          children: []
        }
      ]
      //如果是一级菜单 那么菜单名称肯定有路由 如果是二级菜单那么一级没有 二级有路由
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      //添加动态路由
      router.addRoutes(currentMenu)
    }
  },
  actions: {}
}
# 需要注意的点
## 1.关于如何使用element-ui
    方式一：
        在main.js中整体引入 
        import Element from 'element-ui'
        Vue.use(Element)
    方式二：
        1. 选择指定组件引入，项目中的 src/utils/Element.js
        2.在main.js中进入   import './utils/Element.js'
    引入样式：
        import 'element-ui/lib/theme-chalk/index.css'
## 2.Normalize.css
    Normalize.css 是一个可以定制的CSS文件，它让不同的浏览器在渲染网页元素的时候形式更统一
    安装npm install normalize.css

## 3.关于scss
    Sass是成熟、稳定、强大的CSS预处理器。
    npm install --save-dev node-sass sass-loader
## 4.关于mock.js
```
  在开发过程中，有很多的ajax请求，前后端分离开发你肯定遇到这样的问题，后台给你的接口文档，你需要在本地模拟数据返回。
  学会使用mock.js拦截ajax请求，更加方便的构造你需要的假数据。
```
## 5.安装mock.js
  npm install mockjs --save
  ### 在项目中创建mock.js
  ```
   1.在src下创建mock文件夹，为不同的组件创建mock js文件，例如home.js,并引入mockjs：import Mock from 'mockjs'。
   2.在mock下创建index.js,使用mock的js文件
    import Mock from 'mockjs'
    import homeApi from './home'

      // 设置200-2000毫秒延时请求数据
      // Mock.setup({
      //   timeout: '200-2000'
      // })

      // 首页相关
      // 拦截的是 /home/getData
      Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)
   3.在main.js中引入创建好的mockjs文件：import './mock'   // mockjs
```


## 6.permission.js
    由前端控制的路由权限
    
## 7.前后分离：跨域和关于代理
    本地调试可以使用vue本身的config配置解决跨域，但正式环境推荐使用ngix
    
    vue.config中配置：
 ```       
use strict
const path = require('path')
module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: 'http://localhost:7001',//后端接口地址
                changeOrigin: true,//是否允许跨越
                pathRewrite: {
                    '^/api': '/api',//重写,
                }
            }
        },
        host: '192.168.0.104',
        port: 8081,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: 'eval-source-map',
        cacheBusting: true,
        cssSourceMap: false,
    },
 
}
```
## 8.安装依赖的版本一致性问题
```
使用scss需要安装：node-sass  sass-loader 需要注意版本问题

```
## 9.Vuex介绍
    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
    1.vuex用于做状态管理，主要是应用于vue.js中管理数据状态的一个库，即把项目中公用数据放到一个公用存储空间去存储，某一个组件改变这个公用数据，其他组件就能感知到。
    2.vuex由统一的方法修改数据，全局变量可以任意修改
    3.全局变量多了会造成命名污染，vuex不会，同时解决了父组件与孙组件，以及兄弟组件之间通信的问题。
    
    [中文介绍地址]（https://vuex.vuejs.org/zh/）
## 10.请自行了解vue的生命周期函数