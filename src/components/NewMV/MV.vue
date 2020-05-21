<template>
    <div class="mvlist">
        <ul>
            <li v-for="(item,index) in mvlist" :key='index'>
                <div class="box">
                    <div class="mask3" @click='toMVDetail(item.id)'>
                        <i class="icon1" :class="iconClass"></i>
                        <div class="count">
                            <p>{{item.playCount | kNum}}</p>
                            <i :class="iconClass2"></i>
                        </div>
                    </div>
                    <div class="mask4">
                        <p>{{item.artistName}}</p>
                        <span>{{item.duration | covertTime}}</span>
                    </div>
                    <img :src="item.cover">
                </div>
                <div class="des">{{item.name}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {

    name: 'MV',
    props: ['mvlist'],
    data() {
        return {

            iconClass: "iconfont icon-bofang",
            iconClass2: "iconfont icon-mv",

        }
    },
    methods:{
        toMVDetail(id){
            this.$router.push(`/mv/detail?id=${id}`)
        }
    }
};

</script>
<style lang="css" scoped>
.mvlist {
    /* 185 * 5 */
    height: 925px;
    width: 1055px;
    margin: 20px 0;
}

.mvlist ul {
    margin-left: 20px;
}

.mvlist ul li {
    width: 240px;
    height: 180px;
    position: relative;
    overflow: hidden;
    float: left;
    margin-right: 15px;
    margin-bottom: 10px;
}

.mvlist ul li .box {
    width: 100%;
    height: 135px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}

.mvlist ul li img {
    width: 100%;
}

.mvlist ul li .mask3 {
    position: absolute;
    width: 240px;
    height: 135px;
    color: #fff;
    display: none;
}

.mvlist ul li .mask3 i.icon1 {
    position: absolute;
    left: 15px;
    bottom: -15px;
    font-size: 30px;
    line-height: 80px;
    color: #fff
}

.mvlist ul li:hover .mask3 {
    background-color: rgba(0, 0, 0, .3);
    display: block;
    cursor: pointer;
}

.mvlist ul li .count {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #fff;
    width: 68px;
}

.mvlist ul li .count i {
    float: right;
    font-size: 16px;
    margin-right: 2px;
}

.mvlist ul li .count p {
    float: right;
    font-size: 14px;
}

.mvlist ul li:hover .mask4 {
    display: none;
}

.mvlist ul li .box .mask4 {
    position: absolute;
    width: 220px;
    height: 28x;
    bottom: 0;
    line-height: 28px;
    background-color: rgba(0, 0, 0, .4);
    color: #fff;
    font-size: 14px;
    padding: 0 10px;
}

.mvlist ul li .box .mask4 p {
    float: left;
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mvlist ul li .box .mask4 span {
    float: right;
}

.mvlist ul li .des {
    font-weight: normal;
    height: 40px;
    margin: 5px 0;
    font-size: 14px;
}


</style>
