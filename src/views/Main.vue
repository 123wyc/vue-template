<template>
    <el-container style="height: 100%">
        <!--header部分-->
        <el-header>
            <!--header部分控件-->
            <common-header></common-header>
        </el-header>
        <!--底部-->
        <el-container>
            <!--左侧栏-->
            <el-aside width="auto">
                <!--左侧栏控件-->
                <common-aside></common-aside>
            </el-aside>
            <!-- 右侧主要内容部分 -->
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

<style lang="scss" scoped>
    .el-header {
        background-color: #333;
    }

    .el-main {
        padding-top: 0;
    }
</style>
