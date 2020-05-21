<template>
    <div class="main">
        <!-- 轮播图 -->
        <div class="carousel">
            <el-carousel :interval="3000" type="card" height="220px">
                <el-carousel-item v-for="(item,index) in imgs" :key="index">
                    <img :src="item.imageUrl" style="width: 100%; height:220px">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 推荐歌单 -->
        <div class="rec-list">
            <p class="topic">推荐歌单</p>
            <ul>
                <li v-for="(item,index) in rlist" :key='index'>
                    <div class="mask">
                        <i :class="iconClass" @click='toPlaylistDetail(item.id)'></i>
                        <p>{{item.name}}</p>
                    </div>
                    <img :src="item.picUrl">
                </li>
            </ul>
        </div>
        <!-- 最新音乐 -->
        <div class="newsong-list">
            <p class="topic">最新音乐</p>
            <ul>
                <li v-for="(item,index) in songlist" :key='index'>
                    <div class="picbox">
                        <div class="mask2">
                            <i :class="iconClass" @click='playMusic(item.id)'></i>
                        </div>
                        <img :src="item.picUrl">
                    </div>
                    <h4>{{item.name}}</h4>
                    <p>{{item.song.artists[0].name}}</p>
                </li>
            </ul>
        </div>
        <!-- 最新MV -->
        <div class="newmv-list">
            <p class="topic">最新MV</p>
            <ul>
                <li v-for="(item,index) in mvlist" :key='index'>
                    <div class="box">
                        <div class="mask3" @click="toMVDetail(item.id)">
                            <i class="icon1" :class="iconClass"></i>
                        </div>
                        <div class="mask4">
                            <p>{{item.artists[0].name}}</p>
                            <span>{{item.duration | covertTime}}</span>
                        </div>
                        <div class="count">
                            <p>{{item.playCount | kNum}}</p>
                            <i :class="iconClass2"></i>
                        </div>
                        <img :src="item.picUrl">
                    </div>
                    <div class="des">{{item.name}}</div>
                </li>
            </ul>
        </div>
    </div>
    </div>
</template>
<script>
export default {

    name: 'Discover',

    data() {
        return {
            imgs: [],
            rlist: [],
            songlist: [],
            mvlist: [],
            iconClass: "iconfont icon-bofang",
            iconClass2: "iconfont icon-mv"
        }
    },

    created() {
        //轮播图获取
        this.$axios.get('/banner')
            .then(res => {
                // console.log(res.data.banners);
                this.imgs = res.data.banners;
            }).catch(err => {
                console.log('Discover轮播图get失败')
            })
        //获取推荐歌单
        this.$axios.get('/personalized?limit=10')
            .then(res => {
                // console.log(res.data.result);
                this.rlist = res.data.result;
            }).catch(err => {
                console.log('Discover获取推荐歌单失败')
            })
        this.$axios.get('/personalized/newsong')
            .then(res => {
                // console.log(res.data.result);
                this.songlist = res.data.result;
            }).catch(err => {
                console.log('Discover获取最新音乐失败')
            })
        this.$axios.get('/personalized/mv')
            .then(res => {
                console.log(res.data.result);
                this.mvlist = res.data.result;
            }).catch(err => {
                console.log('Discover获取最新MV失败')
            })
    },
    methods: {
        playMusic(id) {
            // console.log(id);
            this.$axios.get('/song/url?id=' + id)
                .then(res => {
                    let url = res.data.data[0].url;
                    //将播放地址传给父组件
                    this.$parent.musicUrl = url;
                })

        },
        //跳转至歌单详情页
        toPlaylistDetail(id) {
            this.$router.push(`/playlist/detail?id=${id}`)
        },
         //跳转至MV详情页
        toMVDetail(id) {
            this.$router.push(`/mv/detail?id=${id}`)
        }

    }
};

</script>
<style lang="css" scoped>
.main {
    position: absolute;
    left: 200px;
    padding-left: 10px;
    top: 60px;
    width: 1055px;
    overflow: hidden;
    background-color: #FAFAFA;
}

/* 轮播图 */
.carousel {
    margin: 30px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;

}


/* 通用 */
.topic {
    margin-left: 20px;
    font-size: 20px;
    color: #2E2E2E;
    margin-bottom: 10px;
}


.rec-list,
.newsong-list,
.newmv-list {
    margin: 10px 10px;
    height: 100%;
    overflow: hidden;
}

/* 歌曲推荐 */
.rec-list ul {
    height: 420px;
}

.rec-list ul li {
    width: 180px;
    height: 180px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    float: left;
    margin-left: 20px;
    margin-bottom: 30px;
}

.rec-list ul li .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(100, 100, 100, .5);
    color: #fff;
    text-align: center;
    display: none;
}

.rec-list ul li:hover .mask {
    display: block;
}

.rec-list ul li .mask i {
    font-size: 40px;
    line-height: 176px;
    cursor: pointer;
}

.rec-list ul li .mask i:hover {
    font-size: 46px;
}

.rec-list ul li .mask p {
    position: absolute;
    bottom: 3px;
    font-size: 14px;
    margin: 0 5px;
    text-align: left;
}

.rec-list ul li img {
    width: 100%;
}

/* 最新音乐 */
.newsong-list ul {
    margin-left: 20px;
}

.newsong-list ul li {
    width: 490px;
    height: 80px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    float: left;
    padding: 10px 0;
}

.newsong-list ul li:hover {
    background-color: #F3F3F3;
}

.newsong-list ul li .picbox {
    width: 80px;
    height: 80px;
    margin-left: 10px;
}

.newsong-list ul li .mask2 {
    text-align: center;
    width: 80px;
    position: absolute;
    display: none;
}

.newsong-list ul li .picbox:hover .mask2 {
    display: block;
    background-color: rgba(100, 100, 100, .2);
}

.newsong-list ul li .picbox:hover .mask2 i {
    cursor: pointer;
}

.newsong-list ul li .picbox .mask2 i:hover {
    font-size: 34px;
    vertical-align: -2px;
}

.newsong-list ul li img {
    width: 100%;
}

.newsong-list ul li i {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    line-height: 80px;
    color: #fff
}

.newsong-list ul li h4 {
    position: absolute;
    top: 15px;
    left: 100px;
    font-size: 16px;
    color: #2E2E2E;
    font-weight: normal;
}

.newsong-list ul li p {
    position: absolute;
    bottom: 15px;
    left: 100px;
    font-size: 14px;
    color: #B8B8B8;
}

/* 最新MV */
.newmv-list ul {
    margin-left: 20px;
}

.newmv-list ul li {
    width: 240px;
    height: 100%;
    position: relative;
    overflow: hidden;
    float: left;
    margin-right: 10px;
}

.newmv-list ul li .box {
    width: 100%;
    height: 135px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.newmv-list ul li img {
    width: 100%;
}

.newmv-list ul li .mask3 {
    position: absolute;
    width: 240px;
    height: 135px;
    color: #fff;
    display: none;
}

.newmv-list ul li .mask3 i {
    position: absolute;
    left: 15px;
    bottom: -15px;
}

.newmv-list ul li:hover .mask3 {
    background-color: rgba(100, 100, 100, .3);
    display: block;
    cursor: pointer;
}

.newmv-list ul li:hover .mask4 {
    display: none;
}

.newmv-list ul li:hover .count {
    display: none;
}

.newmv-list ul li i.icon1 {
    font-size: 30px;
    line-height: 80px;
    color: #fff
}

.newmv-list ul li .box .mask4 {
    position: absolute;
    width: 220px;
    height: 28px;
    bottom: 0;
    line-height: 28px;
    background-color: rgba(0, 0, 0, .3);
    color: #fff;
    font-size: 14px;
    padding: 0 10px;
}

.newmv-list ul li .box .mask4 p {
    float: left;
}

.newmv-list ul li .box .mask4 span {
    float: right;
}

.newmv-list ul li .count {
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
    color: #fff;
    width: 68px;
    height: 20px;
    padding: 5px 5px 0 0;
}

.newmv-list ul li .count i {
    float: right;
}

.newmv-list ul li .count p {
    float: right;
    font-size: 14px;
}

.newmv-list ul li .des {
    font-weight: normal;
    height: 40px;
    margin: 5px 0;
}

.newmv-list {
    margin-bottom: 80px;
}

</style>
