<template>
    <div class="comCon">
        <div class="hotComments" v-if='commentList.hotComments'>
            <h4>热门评论（{{commentList.hotComments.length | threeNum}}条）</h4>
            <ul>
                <li v-for='(item,index) in commentList.hotComments' :key='index'>
                    <img :src="item.user.avatarUrl">
                    <div class="info">
                        <h5>{{item.user.nickname}}</h5>
                        <p>{{item.content}}</p>
                        <div class="reply" v-if='item.beReplied[0]'>
                            <img :src="item.beReplied[0].user.avatarUrl">
                            <div class="reply-info">
                                <h5>{{item.beReplied[0].user.nickname}}</h5>
                                <p>{{item.beReplied[0].content}}</p>
                                <p v-if='item.beReplied[0].content == null'>[该评论已删除]</p>
                            </div>
                        </div>
                        <span>{{item.time | relativeTime}}</span>
                        <i :class="iconLike"></i>
                        <span>{{item.likedCount}}</span>
                    </div>
                </li>
            </ul>
            <el-divider></el-divider>
        </div>
        <div class="comments">
            <h4>最新评论（{{commentList.total | threeNum}}条）</h4>
            <ul>
                <li v-for='(item,index) in commentList.comments' :key='index'>
                    <img :src="item.user.avatarUrl">
                    <div class="info">
                        <h5>{{item.user.nickname}}</h5>
                        <p>{{item.content}}</p>
                        <div class="reply" v-if='item.beReplied[0]'>
                            <img :src="item.beReplied[0].user.avatarUrl">
                            <div class="reply-info">
                                <h5>{{item.beReplied[0].user.nickname}}</h5>
                                <p>{{item.beReplied[0].content}}</p>
                                <p v-if='item.beReplied[0].content == null'>[该评论已删除]</p>
                            </div>
                        </div>
                        <span>{{item.time | relativeTime}}</span>
                        <i :class="iconLike"></i>
                        <span>{{item.likedCount}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {

    name: 'Comment',
    props: ['commentList'],
    data() {
        return {
            iconLike: "iconfont icon-zan2",
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};

</script>
<style lang="css" scoped>
.comCon {
    /*position: absolute;*/
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #2E2E2E;
    /*background-color: #D1F2EB*/
}
.comCon h4{
	margin-bottom: 10px;
}
ul li {
    width: 100%;
    margin-bottom: 10px;
    /* background-color: #D6EAF8;*/
    position: relative;
}

ul li>img {
    position: absolute;
    top: 10px;
    width: 50px;
    border-radius: 50px;
}

ul li .info {
    margin-left: 60px;
    padding-top: 15px;
    top: 20px;
    left: 60px;

}

ul li .info h5 {
    font-size: 14px;
}

ul li .info p {
    font-size: 15px;
    margin: 5px 0;
}

ul li .info i {
    color: #A5A5A5;
   
}

ul li .info span {
    display: inline-block;
    margin-right: 10px;
    font-size: 13px;
    color: #7C7C7C;
}

ul li .reply {
    background-color: #F3F3F3;
    padding: 8px 0 5px 5px;
    position: relative;
    border-radius: 10px;
    margin-bottom: 5px;
}

ul li .reply img {
    position: absolute;
    width: 35px;
    border-radius: 35px;
}

ul li .reply .reply-info {
    margin-left: 45px;

}

.comments {
    padding: 10px 0 50px 0;
}


</style>
