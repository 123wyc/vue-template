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
    selectMenu(state, val) {
      //如果点击应该是首页的话 要把这份数据清空 因为头部组件已经把首页写死了 只有点击不是首页菜单才存储当前菜单
       val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
      }
  },
  actions: {}
}
