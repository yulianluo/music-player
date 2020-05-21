<template>
    <div class="main">
        <div class="info">
            <div class="content">
                <img :src="playlist.coverImgUrl">
                <div class="description">
                    <h4>{{playlist.name}}</h4>
                    <!-- <p>{{playlist.description}}</p> -->
                    <el-tooltip :content="description" placement="bottom" width="200" effect="light">
                        <p>{{playlist.description}}</p>
                    </el-tooltip>
                    <div class="creator">
                        <img :src="playlist.creator.avatarUrl">
                        <h5>{{playlist.creator.nickname}}</h5>
                        <p>创建于 {{playlist.createTime | convertTime('YYYY-MM-DD')}}</p>
                        <ul>
                            <li>
                                <i :class="iconTrack"></i>
                                <p>{{playlist.trackCount}}</p>
                            </li>
                            <li>
                                <i :class="iconPlay"></i>
                                <p>{{playlist.playCount | kNum}}</p>
                            </li>
                            <li>
                                <i :class="iconSubscribed"></i>
                                <p>{{playlist.subscribedCount | kNum}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <p v-if="playlist.highQuality">精品歌单</p>
            </div>
            <img :src="playlist.coverImgUrl">
            <div class="mask">
            </div>
        </div>
        <div class="tabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="歌曲列表" name="list">
                    <Music :musiclist="musiclist" />
                </el-tab-pane>
                <el-tab-pane label="评论" name="comments">
                    <div class="comment">
                        <Comment :commentList='playlistCommnets' />
                        <!-- 页数 -->
                        <!-- 分页器 total 总条数 current-page当前页 page-size 每页数量 current-change改名页数事件-->
                        <div class="page" v-show='showPagi'>
                            <el-pagination background layout="prev, pager, next" :total="total" :current-page='page' @current-change='pageHandle' :page-size='pagesize'>
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-backtop :bottom="100" :right="25"></el-backtop>
    </div>
</template>
<script>
export default {

    name: 'PlaylistDetail',

    data() {
        return {
            activeName: "list",
            playlist: {},
            iconTrack: "iconfont icon-yinyue",
            iconPlay: "iconfont icon-bofangsanjiaoxing",
            iconSubscribed: "iconfont icon-dingyue",
            musiclist: [],
            description: "",
            songsIds: '',
            commentCount: '',
            playlistCommnets: {},

            total: 0,
            pagesize: 15,
            page: 1,
            offset: 0,
            showPagi: true

        }
    },
    methods: {
        handleClick() {},
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
                // console.log(res);

                this.musiclist = res.data.songs.map(function(item) {
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
        //获取歌单评论
        getCommentsList(id) {
            this.$axios.get('/comment/playlist?limit=15&offset=' + this.offset + '&id=' + id)
                .then(res => {
                    console.log(res);
                    this.total = res.data.total;
                    this.playlistCommnets = res.data;
                    if (this.total <= this.pagesize) {
                        this.showPagi = false
                    }
                })
        },
        //评论翻页
        pageHandle(val) {
            this.page = val;
            this.offset = (this.page - 1) * 15;
            this.getCommentsList(this.$route.query.id)
        },

    },
    created() {
        this.$axios.get('/playlist/detail?id=' + this.$route.query.id)
            .then(res => {
                this.playlist = res.data.playlist;
                this.description = res.data.playlist.description;

                // console.log(res.data.playlist);
                this.commentCount = res.data.playlist.commentCount;
                // console.log(res.data.playlist.commentCount);

                this.getTrackIds(res.data.playlist.trackIds);

                this.getSongsByIds();

            }).catch(err => {
                console.log("获取歌单详情失败")
            })
        // this.$axios.get('/comment/playlist?id=' + this.$route.query.id)
        //     .then(res => {
        //         // console.log(res);
        //         this.playlistCommnets = res.data
        //     })
        this.getCommentsList(this.$route.query.id)
    },

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

.main .info {
    width: 100%;
    height: 250px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.info .content {
    position: relative;
    z-index: 1;
}

.info .content>img {
    width: 200px;
    position: absolute;
    left: 20px;
    top: 25px;
}

.info .content .description {
    position: absolute;
    left: 240px;
    top: 25px;
    height: 200px;
    width: 760px;
    overflow: hidden;
}

.info .content .description h4 {
    color: #E7E7E7;
}

.info .content .description p {
    margin-top: 10px;
    color: #BBBBBB;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.info .content .description .creator {
    margin-top: 20px;
}

.info .content .description .creator img {
    display: inline-block;
    width: 50px;
    border-radius: 80px;
}

.info .content .description .creator h5 {
    display: inline-block;
    vertical-align: 5px;
    color: #E7E7E7;
    margin-right: 10px;
}

.info .content .description .creator p {
    display: inline-block;
}

.info .content .description .creator ul {
    margin-top: 10px;
}

.info .content .description .creator ul li {
    float: left;
    color: #BBBBBB;
    margin-right: 20px;
}

.info .content .description .creator ul li i {
    vertical-align: 2px;
}

.info .content .description .creator ul li i.iconPlay {
    vertical-align: 15px;
}

.info .content>p {
    position: absolute;
    left: 240px;
    top: 195px;
    border: 2px solid #DCAE21;
    color: #DCAE21;
    padding: 2px 15px;
    border-radius: 5px;

}

/* 背景 */
.info>img {
    width: 100%;
    filter: blur(20px);
}

.info .mask {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}

.tabs {
    margin: 30px 0;

}

.tabs .comment {
    margin-top: 10px;
    padding: 0 30px;
    position: relative;
}

/* --------------------------- */
/* 分页器 */
.page {
    position: absolute;
    width: 100%;
    bottom: 10px;
    height: 40px;
}

.el-pagination {
    display: flex;
    align-items: center;
    justify-content: center;

}

</style>
