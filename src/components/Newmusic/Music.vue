<template>
    <div class="mlist">
        <tr class="tableheader">
            <th width="40">#</th>
            <th width="90"></th>
            <th width="265">音乐</th>
            <th width="165">歌手</th>
            <th width="255">专辑</th>
            <th width="80">时长</th>
        </tr>
        <tr v-for="(item,index) in musiclist" :key='index'>
            <td>{{index+1}}</td>
            <td>
                <div class="maskwrap">
                    <img :src="item.album.picUrl">
                    <div class="mask">
                        <i :class="iconClass" @click='playMusic(item.id)'></i>
                    </div>
                </div>
            </td>
            <td>{{item.name}}<i :class="iconClassMV" v-if='item.mvid!=0' @click='toMVDetail(item.mvid)'></i></td>
            <td>{{item.artists[0].name}}</td>
            <td>{{item.album.name}}</td>
            <td>{{item.duration | covertTime}}</td>
        </tr>
    </div>
</template>
<script>
export default {

    name: 'Music',
    props: ['musiclist'],
    data() {
        return {
            iconClass: "iconfont icon-bofang",
            iconClassMV: 'iconfont icon-mv',
        }
    },
    methods: {
        playMusic(id) {
            // console.log(id);
            this.$axios.get('/song/url?id=' + id).
            then(res => {
                let url = res.data.data[0].url;
                //将播放地址传给父组件
                // this.$parent.$parent.musicUrl = url;
                this.$store.commit('getMusicUrl', url);
            })
        },
        toMVDetail(id) {
            this.$router.push(`/mv/detail?id=${id}`)
        }
    },
    computed: {
        musicUrl() {
            return this.$store.state.musicUrl
        }
    }

};

</script>
<style lang="css" scoped>
.mlist {
    margin: 20px;
}

.mlist tr:nth-child(2n) {
    background-color: #F7F7F7;
}

.mlist tr:nth-child(2n+1) {
    /*background-color: #F3F3F3;*/
}

.mlist tr:hover {
    background-color: #E8E8E8;
}

.mlist th {
    height: 40px;
    text-align: left;
    background-color: #FAFAFA;
    color: #9F9F9F;
    font-size: 16px;
    font-weight: normal;
    padding-left: 20px;
}

.mlist td {
    height: 90px;
    text-align: left;
    position: relative;
    padding-left: 15px;
    font-size: 14px;
    vertical-align: middle;

}

.mlist .maskwrap img {
    position: absolute;
    width: 70px;
    top: 10px;
    left: 0;
    border-radius: 5px;
}

.mlist .maskwrap .mask {
    background-color: rgba(100, 100, 100, .5);
    position: absolute;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    top: 10px;
    left: 0;
    border-radius: 5px;
    display: none;
}

.mlist .maskwrap:hover .mask {
    display: block;
}

.mlist .maskwrap .mask i {
    font-size: 28px;
    color: #F3F3F3
}

.mlist .maskwrap .mask i:hover {
    font-size: 32px;
    cursor: pointer;
}

.mlist td>i {
    font-size: 18px;
    margin-left: 5px;
    vertical-align: -2px;
    cursor: pointer;
}

</style>
