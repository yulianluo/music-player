<template>
    <div class="main">
        <div class="result">
            <h2>{{$route.query.keyword}}</h2>
            <p>{{total}}个结果</p>
        </div>
        <div class="type">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="歌曲" name="music">
                    <Music :musiclist='music' />
                </el-tab-pane>
                <el-tab-pane label="歌单" name="playlist">
                    <Playlist :rlist='playlist' />
                </el-tab-pane>
                <el-tab-pane label="MV" name="mv">
                    <MV :mvlist='mv' />
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 页数 -->
        <!-- 分页器 total 总条数 current-page当前页 page-size 每页数量 current-change改名页数事件-->
        <div class="page">
            <el-pagination background layout="prev, pager, next" :total="total" :current-page='page' @current-change='pageHandle' :page-size='pagesize'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {

    name: 'Search',

    data() {
        return {
            activeName: 'music',
            music: [],
            songCount: 0,
            playlist: [],
            playlistCount: 0,
            mv: [],
            mvCount: 0,
            total: 0,
            pagesize: 20,
            page: 1,
            offset: 0,
            songsIds: '',
        }
    },
    methods: {
        getLists(keyword) {
            this.$axios.get('/search?limit=20&keywords=' + keyword + '&offset=' + this.offset)
                .then(res => {
                    // console.log(res.data.result.songs);
                    this.songCount = res.data.result.songCount;
                    //因为搜索音乐借口无图片，用id得到具体歌曲信息
                    // this.music = res.data.result.songs;
                    this.getTrackIds(res.data.result.songs);
                    this.getSongsByIds();

                    if (this.total == 0) { this.total = this.songCount }

                });
            this.$axios.get('/search?limit=20&keywords=' + keyword + '&type=1000' + '&offset=' + this.offset)
                .then(res => {
                    // console.log(res.data.result.playlistCount);
                    this.playlistCount = res.data.result.playlistCount;
                    this.playlist = res.data.result.playlists;
                });
            this.$axios.get('/search?limit=20&keywords=' + keyword + '&type=1004' + '&offset=' + this.offset)
                .then(res => {
                    // console.log(res.data.result.mvCount);
                    this.mvCount = res.data.result.mvCount;
                    this.mv = res.data.result.mvs;
                });
        },
        handleClick(tab, event) {
            //更改tab，对应更改总数与种类
            if (this.activeName == 'music') {
                this.total = this.songCount;
                this.typeHandle()
            } else if (this.activeName == 'playlist') {
                this.total = this.playlistCount;
                this.typeHandle()
            } else if (this.activeName == 'mv') {
                this.total = this.mvCount;
                this.typeHandle()
            }

        },
        pageHandle(val) {
            //更改页数
            this.page = val;
            this.offset = (this.page - 1) * 20;
            this.getLists(this.$route.query.keyword)
        },
        typeHandle() {
            //更改tab种类
            this.offset = 0;
            this.page = 1;
            this.getLists(this.$route.query.keyword)
        },


        getTrackIds(trackIds) {
            //将歌单中的音乐id转为字符串用于查询

            let ids = "";
            for (let i = 0; i < trackIds.length; i++) {
                ids += trackIds[i].id + ',';
            }
            if (ids.length > 0) {
                //去掉最后一个逗号
                ids = ids.substr(0, ids.length - 1);
            }
            this.songsIds = ids;
        },
        getSongsByIds() {
            //通过id获得所有歌曲信息
            // console.log("ids=" + this.songsIds);
            this.$axios.get('song/detail?ids=' + this.songsIds).then(res => {
                this.music = res.data.songs.map(function(item) {
                    //将key变为与Music中的相同
                    return {
                        name: item.name,
                        id: item.id,
                        mvid: item.mv,
                        artists: item.ar,
                        album: item.al,
                        duration: item.dt
                    }
                });
            })

        },
    },
    beforeRouteUpdate(to, from, next) {
        console.log(to);
        this.getLists(to.query.keyword)
        next();
    },

    // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    created() {
        this.getLists(this.$route.query.keyword)
    }


};

</script>
<style lang="css" scoped>
.main {
    position: absolute;
    left: 200px;
    top: 60px;
    width: 1025px;
    overflow: hidden;
    background-color: #FAFAFA;
    padding: 20px;
}

.main .result {

    height: 50px;
}

.main .result h2 {
    display: inline-block;
    color: #2E2E2E;
    margin-right: 5px;
}

.main .result p {
    display: inline-block;
    color: #9F9F9F;
}

/* 中间结果区域*/
.main .type {
    margin-bottom: 80px;
}

/* 分页器 */
.page {
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
