<template>
    <div class="rec-list">
        <ul>
            <li v-for="(item,index) in rlist" :key='index'>
                <div class="mask">
                    <i :class="iconClass" @click='toPlaylistDetail(item.id)'></i>
                    <div title='item.description'>
                        <p>{{item.description}}</p>
                    </div>
                    <h5>播放量 {{item.playCount | kNum}}</h5>
                </div>
                <img :src="item.coverImgUrl">
                <p @click='toPlaylistDetail(item.id)'>{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {

    name: 'Playlist',
    props: ['rlist'],
    data() {
        return {
            iconClass: "iconfont icon-bofang",
        }
    },
    methods:{
        //跳转至详情页
        toPlaylistDetail(id){
            this.$router.push(`/playlist/detail?id=${id}`)
        }
    }
};

</script>
<style lang="css" scoped>
/* 歌单列表*/
.rec-list ul {
    height: 420px;
    margin-top: 10px;
}

.rec-list ul li {
    width: 180px;
    height: 230px;
    position: relative;

    overflow: hidden;
    float: left;
    margin-left: 25px;
    margin-bottom: 10px;
}

.rec-list ul li .mask {
    position: absolute;
    width: 100%;
    height: 180px;
    background-color: rgba(100, 100, 100, .5);
    color: #fff;
    border-radius: 5px;
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
    bottom: 2px;
    width: 170px;
    padding: 0 5px;
    height: 32px;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
}

.rec-list ul li .mask p:hvover {
    overflow: visible;
}

.rec-list ul li .mask h5 {
    position: absolute;
    top: 5px;
    right: 10px;
    font-weight: normal;
}

.rec-list ul li img {
    width: 100%;
    border-radius: 5px;
}

.rec-list ul li>p {
    font-size: 14px;
    color: #5A5A5A;
    cursor: pointer;
}

</style>
