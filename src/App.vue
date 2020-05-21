<template>
    <div id="app">
        <!-- 顶部栏 -->
        <div class="header">
            <div class="tpLeft">btn</div>
            <div class="input">
            <el-input placeholder="搜索" v-model="input" clearable prefix-icon='iconfont icon-sousuo1' size='small' @keyup.enter.native='toResult'>
            </el-input>
            </div>
            <div class="info"> </div>
        </div>
        <!-- 侧边栏 -->
        <div class="aside">
            <ul>
                <li v-for='(tab,index) in tabs' :key='tab.id'>
                    <!-- <router-link :to="tab.routerName" exact @click.native='changeHash(index)' :class='{"link-active":index == currentIndex}'> -->
                    <router-link :to="tab.routerName">
                        <i :class='tab.iconClass'></i>
                        <p>{{tab.title}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <router-view />
        <div class="audio">
            <audio :src="musicUrl" controls autoplay loop class="myaudio"></audio>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

let tabs = [
    { id: 1, title: '发现音乐', iconClass: 'iconfont icon-yinlebofangxuanlv', routerName: { name: 'discover' } },
    { id: 2, title: '推荐歌单', iconClass: 'iconfont icon-xiaogedan_huaban', routerName: { name: 'playlists',params:{categoryId:0, page:1} } },
    { id: 3, title: '最新音乐', iconClass: 'iconfont icon-yinyue', routerName: { name: 'newmusic',params:{categoryId:0} } },
    { id: 4, title: '最新MV', iconClass: 'iconfont icon-mv', routerName: { name: 'newmv',params:{ areaId:0, typeId:0, orderId:0, page:1} } },
]


export default {
    name: 'App',
    data() {
        return {
            input: '',
            tabs,
            currentIndex: 0,
        }
    },
    methods: {
        changeHash(index) {
            this.currentIndex = index;
        },
        toResult(){
            this.input = this.input.trim();
            // console.log(this.input);
            if(this.input == ''){
                this.$message.warning('请输入内容')
            }else{
                //跳转至搜索页 
                this.$router.push('/result?keyword='+this.input).catch(err=>{console.log(err)})
            }
        }
    },
    computed:{
        ...mapState(['musicUrl'])
    }
};

</script>
<style>
.header {
    position: fixed;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #F3F3F3;
    z-index: 11;
    overflow: hidden;
}

.header .tpLeft {
    background-color: #E8E8E8;
    width: 200px;
}
.header .input{
    position: absolute;
    left: 360px;
    top: 0;
}
/*.header .info{
    position: absolute;
    top: 14px;
    left: 1000px;
    width: 200px;
    height: 32px;
    background-color: #fff;
}*/

.aside {
    position: fixed;
    top: 60px;
    width: 200px;
    height: 600px;
    background-color: #E8E8E8;
    z-index: 5
}

.aside ul {
    width: 100%;
    overflow: hidden;
}

.aside ul li {
    width: 100%;
    height: 50px;
    line-height: 50px;
}

.aside ul li:hover {
    background-color: #DEDEDE;
}

.aside ul li a {
    display: inline-block;
    width: 180px;
    height: 100%;
    padding-left: 30px;
}

.aside ul li a.link-active {
    background-color: rgba(0, 0, 0, .1);
}

.aside ul li a.link-active p {
    color: #F7F7F7;
}

.aside ul li a.link-active i {
    color: #F7F7F7;
}

.aside ul li p {
    font-size: 16px;
    color: #2E2E2E;
    float: left;
}

.aside ul li i {
    font-size: 20px;
    margin-right: 10px;
    float: left;
    color: #2E2E2E;
}

.audio {
    position: fixed;
    bottom: 0;
    z-index: 5;
    width: 1280px;
    height: 50px;
    background-color: #F7F7F7;

}

.myaudio {
    margin: 0 auto;
    width: 1300px;
    height: 50px;
}

</style>
