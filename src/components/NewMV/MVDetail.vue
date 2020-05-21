<template>
    <div class="main">
        <div class="mv">
            <video :src='mvUrl' controls="controls" height="440px"></video>
        </div>
        <div class="left">
            <div class="info">
                <h2>{{item.name}}</h2>
                <p style="margin-right:10px">{{item.playCount | threeNum}}次观看</p>
                <p>{{item.publishTime}}</p>
                <ul>
                    <li>
                        <i :class="iconLike"></i>
                        <p>{{item.likeCount | threeNum}}</p>
                    </li>
                    <li>
                        <i :class="iconShare"></i>
                        <p>{{item.shareCount | threeNum}}</p>
                    </li>
                </ul>
                <div class="artist">
                    <div class="pic">
                        <img :src="artist.picUrl">
                    </div>
                    <div class="artistInfo">
                        <h4>{{artist.name}}</h4>
                        <div class="alias" v-if="artist.alias[0]">
                            <p>{{artist.alias[0]}}</p>
                            <p v-if="artist.alias[1]"> / {{artist.alias[1]}}</p>
                        </div>
                    </div>
                </div>
                <div class="artistDesc">
                    <el-collapse>
                        <el-collapse-item title="简介" name="1">
                            <p>{{artist.briefDesc}}</p>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <el-divider></el-divider>
            <!-- 评论 -->
            <div class="comment">
                <Comment :commentList='mvCommnets' />
                <!-- 页数 -->
                <!-- 分页器 total 总条数 current-page当前页 page-size 每页数量 current-change改名页数事件-->
                <div class="page" v-show='showPagi'>
                    <el-pagination background layout="prev, pager, next" :total="total" :current-page='page' @current-change='pageHandle' :page-size='pagesize'>
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- 相关推荐 -->
        <div class="right">
            <h3>相关推荐</h3>
            <ul>
                <li v-for='(item, index) in recMVList' :key='index'>
                    <div class="cover" @click='toMVDetail(item.id)'>
                        <img :src="item.cover">
                        <div class="mask">
                            <i :class="iconPlay"></i>
                        </div>
                        <p>{{item.duration | covertTime}}</p>
                    </div>
                    <div class="desc">
                        <h4>{{item.name}}</h4>
                        <p>{{item.artistName}}</p>
                        <div class="playCount">
                            <i :class="iconPlayCount"></i>
                            <p>{{item.playCount | threeNum}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <el-backtop :bottom="100" :right="25"></el-backtop>
    </div>
</template>
<script>
export default {

    name: 'MVDetail',

    data() {
        return {
            mvUrl: "",
            item: {},
            iconLike: "iconfont icon-zan2",
            iconShare: "iconfont icon-fenxiang1",
            iconPlay: "iconfont icon-bofang",
            iconPlayCount: "iconfont icon-mv",
            recMVList: [],
            artist: {},
            mvCommnets: {},
            // 评论翻页参数
            total: 0,
            pagesize: 15,
            page: 1,
            offset: 0,
            showPagi: true

        }
    },
    methods: {
        getMV(MVid) {
            this.$axios.get('/mv/detail?mvid=' + MVid)
                .then(res => {
                    // console.log(res.data.data);
                    this.item = res.data.data;
                    this.getArtistInfo(res.data.data.artistId)

                    if (res.data.data.brs[1080]) {
                        this.mvUrl = res.data.data.brs[1080];
                    } else if (res.data.data.brs[720]) {
                        this.mvUrl = res.data.data.brs[720];
                    } else if (res.data.data.brs[480]) {
                        this.mvUrl = res.data.data.brs[480];
                    }
                })
            //获取相关推荐MV
            this.$axios.get('/simi/mv?mvid=' + MVid)
                .then(res => {
                    // console.log(res);
                    //id  cover  name  playCount artistName  duration
                    this.recMVList = res.data.mvs;
                })
            //获取MV评论
            this.getCommentsList(MVid);

        },
        getArtistInfo(id) {
            this.$axios.get('/artists/?id=' + id)
                .then(res => {
                    // console.log(res);
                    //briefDesc picUrl alias[0]
                    this.artist = res.data.artist
                })
        },
        toMVDetail(id) {
            this.$router.push(`/mv/detail?id=${id}`);
            this.getMV(id)
        },
        //获取MV评论
        getCommentsList(id) {
            this.$axios.get('/comment/mv?limit=15&offset=' + this.offset + '&id=' + id)
                .then(res => {
                    console.log(res);
                    this.total = res.data.total;
                    this.mvCommnets = res.data;
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
        this.getMV(this.$route.query.id)
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
    color: #2E2E2E;
    padding: 20px;
}

.main .mv {
    height: 440px;
    background-color: #000;
    text-align: center;
    margin-bottom: 20px;
}

/* --------------------------- */
/* 右 推荐栏 */
.main .right {
    float: right;
    width: 350px;
    color: #2E2E2E;
}

.main .right ul li {
    margin: 10px 0;
    height: 96px;
    overflow: hidden;
}

.main .right ul li .cover {
    width: 170px;
    height: 96px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    float: left;
}

.main .right ul li .cover img {
    width: 100%;
}

.main .right ul li .cover .mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .4);
    display: none;
}

.main .right ul li .cover:hover .mask {
    display: block;
}

.main .right ul li .cover .mask i {
    color: #FAFAFA;
    font-size: 28px;
    position: absolute;
    left: 10px;
    bottom: 5px;
}

.main .right ul li .cover p {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 13px;
    color: #FAFAFA;
    cursor: pointer;
    padding: 0 3px;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, .7);
}

.main .right ul li .desc {
    float: left;
    margin-left: 10px;
    width: 170px;
    font-size: 14px;
}

.main .right ul li .desc h4 {
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-line-clamp: 3;
    display: -webkit-box;

}

.main .right ul li .desc>p {
    margin: 3px 0;
    color: #5A5A5A;
}

.main .right ul li .desc .playCount p {
    display: inline-block;
    color: #5A5A5A;
}

.main .right ul li .desc .playCount i {
    vertical-align: -1.5px;
    color: #5A5A5A;
}

/* 左 信息栏 */
.main .left {
    float: left;
    width: 650px;

}

.main .left .info {
    margin-bottom: 15px;
}

.main .left .info h2 {
    margin-bottom: 10px;
}

.main .left .info p {
    display: inline-block;
    color: #5A5A5A;
}

.main .left .info ul {
    float: right;
    margin-right: 20px;
    color: #5A5A5A;
}

.main .left .info ul li {
    float: left;
    margin-right: 10px;
}

.main .left .info .artist {
    margin: 10px 0;
    height: 100%;

    overflow: hidden;

}

.main .left .info .artist .pic {
    width: 70px;
    height: 70px;
    border-radius: 40px;
    overflow: hidden;
    position: relative;
    float: left;
}

.main .left .info .artist img {
    height: 70px;
    position: absolute;
    left: -8px;
}

.main .left .info .artist .artistInfo {
    display: block;
    float: right;
    width: 560px;
    margin-top: 25px;
    font-size: 14px;
}

.main .left .info .artist .artistInfo h4 {
    font-size: 18px;
    margin-bottom: 3px;
}

/* --------------------------- */
.main .left .comment {
    width: 100%;
    padding-bottom: 30px;
    position: relative;
}

/* --------------------------- */
/* 分页器 */
.page {
    position: absolute;
    width: 100%;
    bottom: 30px;
    height: 50px;
}

.el-pagination {
    display: flex;
    align-items: center;
    justify-content: center;

}

</style>
