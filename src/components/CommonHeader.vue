<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
            <!-- <h3 style=" color : #fff">首页</h3> -->
             <el-breadcrumb separator-class="el-icon-arrow-right">
                <!--很明显 首页 一定是存在的 所以这里直接写死-->
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!--第二级菜单名称 就要看左侧组件有没有点击指定菜单，没有那就只显示首页 点击就显示当前菜单名称-->
                <el-breadcrumb-item :to="current.path" v-if="current" >{{current.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span class="el-dropdown-link"><img :src="userImg" class="user"/></span>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
//js部分
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                userImg: require('../assets/images/user.png'),
                lable:[]
            }
        },
        methods: {
            //控制左侧菜单是否折叠
            collapseMenu() {
                this.$store.commit('collapseMenu')
            },
            //退出登陆
            logOut() {
                    //清除token
                this.$store.commit('clearToken')
                //清除菜单
                this.$store.commit('clearMenu')
                //重定向 一般是登陆页
                location.reload()
            }
        },
         computed: {
          //获取vuex数据的另一种写法
            ...mapState({
                current: state => state.tab.currentMenu
            })
        } 
    }
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
    }

    .l-content {
        display: flex;
        align-items: center;

        .el-button {
            margin-right: 20px;
        }
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
</style>

<style lang="scss">
    .el-breadcrumb__item {
        .el-breadcrumb__inner {
            color: #666666;
            font-weight: normal;
        }

        &:last-child {
            .el-breadcrumb__inner {
                color: #ffffff;
            }
        }
    }
</style>
