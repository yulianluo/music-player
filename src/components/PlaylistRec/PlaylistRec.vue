<template>
    <div class="main">
        <!-- 顶部精品歌单 -->
        <div class="top">
            <div class="carousel">
                <el-carousel :interval="4000" indicator-position='none' trigger="click" height="200px">
                    <!-- :autoplay='false' -->
                    <el-carousel-item v-for="(item,index) in reclist" :key="index">
                        <div class="carousel-item">
                            <div class="content">
                                <img :src="item.coverImgUrl" @click='toPlaylistDetail(item.id)'>
                                <p>精品歌单</p>
                                <div class="description">
                                    <h4 @click='toPlaylistDetail(item.id)'>{{item.name}}</h4>
                                    <p>{{item.description}}</p>
                                </div>
                            </div>
                            <img :src="item.coverImgUrl">
                            <div class="mask">
                            </div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 歌单分类 -->
        <div class="playlist-cat">
            <ul>
                <li v-for="(item,index) in catlist" :key="index" @click='catHandle(index)'>
                    <a href="javascript:void(0)" :class='{active:index==currentIndex}'>{{item}}</a>
                </li>
            </ul>
        </div>
        <!-- 歌单列表 -->
        <Playlist :rlist='rlist' />
        <!-- 页数 -->
        <!-- 分页器 total 总条数 current-page当前页 page-size 每页数量 current-change改名页数事件-->
        <div class="nbtns">
            <el-pagination background layout="prev, pager, next" :total="total" :current-page='page' @current-change='pageHandle' :page-size='pagesize'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {

    name: 'PlaylistRec',

    data() {
        return {
            reclist: [],
            catlist: ["全部歌单", "华语", "欧美", "韩语", "日语", "流行", "摇滚", "民谣", "电子", "舞曲", "说唱", "ACG", "轻音乐", "爵士", "乡村", "古典", "金属", "朋克", "蓝调", "雷鬼", "拉丁", "New Age", "古风", "后摇"],
            currentIndex: 0,
            rlist: [],
            cat: "全部歌单",
            total: 0,
            pagesize: 15,
            page: 1,
            offset: 0,
        }
    },
    methods: {
        catHandle(index) {
            this.$router.push({name:'playlists',params:{categoryId: index, page:1}});
            this.currentIndex = index;
            this.cat = this.catlist[index];
        },
        getLists() {
            this.$axios.get('/top/playlist?limit=15&cat=' + this.cat + '&offset=' + this.offset)
                .then(res => {
                    console.log(res.data);
                    this.rlist = res.data.playlists;
                    this.total = res.data.total
                })
        },
        pageHandle(val) {
            this.$router.push({name:'playlists',params:{page:val}});
            this.page = val;
            this.offset = (this.page - 1) * 15;
            this.getLists()
        },
        //跳转至详情页
        toPlaylistDetail(id) {
            this.$router.push(`/playlist/detail?id=${id}`)
        }
    },
    //侦听器 侦听分类变化
    watch: {
        cat() {
            // console.log(this.cat);
            this.page = 1;
            this.offset = 0;
            this.getLists();

        }
    },

    created() {
        // 推荐歌单
        this.$axios.get('/top/playlist/highquality?limit=15')
            .then(res => {
                // console.log(res.data.playlists);
                this.reclist = res.data.playlists
            }).catch(err => {
                console.log("Playlist中获取精品歌单失败")
            })
        // this.$axios.get('/playlist/catlist')
        //     .then(res => {
        //         console.log(res.data);                
        //     }).catch(err => {
        //         console.log("Playlist中获取失败")
        //     })
        this.getLists()
    }

};

</script>
<style lang="css" scoped>
.main {
    position: absolute;
    left: 200px;
    padding-left: 5px;
    top: 60px;
    width: 1060px;
    overflow: hidden;
    background-color: #FAFAFA;
    padding-bottom: 100px;
}

.carousel {
    margin: 20px;
    border-radius: 5px;
    overflow: hidden;

}

.carousel-item .content {
    position: relative;
    z-index: 10;

}

.carousel-item .content img {
    width: 150px;
    position: absolute;
    left: 20px;
    top: 25px;
    cursor: pointer;
}

.carousel-item .content>p {
    position: absolute;
    left: 190px;
    top: 25px;
    border: 2px solid #DCAE21;
    color: #DCAE21;
    padding: 2px 15px;
    border-radius: 5px;
}

.carousel-item .content .description {
    position: absolute;
    left: 190px;
    top: 60px;
    height: 112px;
    width: 810px;
    overflow: hidden;
}

.carousel-item .content .description h4 {
    color: #E7E7E7;
    cursor: pointer;
}

.carousel-item .content .description p {
    margin-top: 5px;
    color: #BBBBBB;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    /*省略号*/
}

.carousel-item>img {
    position: absolute;
    width: 100%;
    filter: blur(20px);
}

.carousel-item .mask {
    position: absolute;
    width: 1020px;
    height: 200px;
    background-color: rgba(0, 0, 0, .5);
}

/* 歌单种类 */
.playlist-cat {
    width: 1015px;
    height: 40px;
    margin-left: 20px;
    overflow: hidden;
}

.playlist-cat ul {
    width: 100%;
    height: 60px;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
}

.playlist-cat ul li {
    display: inline-block;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}

.playlist-cat ul li a {
    font-size: 16px;
    color: #9F9F9F;
}

.playlist-cat ul li a.active {
    color: #5A5A5A;
    font-size: 18px;
}

/* pagetation */
.nbtns {
    position: absolute;
    width: 100%;
    bottom: 50px;

    height: 50px;

}

.el-pagination {
    display: flex;
    align-items: center;
    justify-content: center;

}

</style>
