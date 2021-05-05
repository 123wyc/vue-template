import Cookie from 'js-cookie'
export default {

  //存储数据
  state: {
    isCollapse: false,
    currentMenu: null,
    
  },
  //调用方法
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
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      //如果点击应该是首页的话 要把这份数据清空 因为头部组件已经把首页写死了 只有点击不是首页菜单才存储当前菜单
       val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
      },
        //获取标签
     getMenu(state) {
       if (Cookie.get('tagList')) {
         let tagList = JSON.parse(Cookie.get('tagList'))
         state.tabsList = tagList
      }
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
    },
    
  },
  actions: {}
}
