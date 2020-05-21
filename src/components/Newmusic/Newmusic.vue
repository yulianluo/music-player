<template>
    <div class="main">
        <div class="typetab">
            <ul>
                <li v-for="(item,index) in typelist" :key="index" @click='typeHandle(index)'>
                    <a href="javascript:void(0)" :class='{active:index==currentIndex}'>{{item.name}}</a>
                </li>
            </ul>
        </div>
        <Music :musiclist='musiclist' />
        <!-- <div class="pbtn"></div> -->
        <el-backtop :bottom="100" :right="25"></el-backtop>
    </div>
</template>
<script>
export default {

    name: 'Newmusic',

    data() {
        return {
            typelist: [{
                    name: "全部",
                    id: 0
                },
                {
                    name: "华语",
                    id: 7
                },
                {
                    name: "欧美",
                    id: 96
                },
                {
                    name: "日本",
                    id: 8
                },
                {
                    name: "韩国",
                    id: 16
                },
            ],
            currentIndex: 0,
            musiclist: [],
            currentType: 0,

        }
    },
    methods: {
        typeHandle(index) {
            this.$router.push({name:'newmusic',params:{categoryId: index}});
            this.currentIndex = index;
            this.currentType = this.typelist[index].id
        },
        getList() {
            this.$axios.get('/top/song?type=' + this.currentType)
                .then(res => {
                    this.musiclist = res.data.data;
                    // console.log(res.data);

                }).catch(err => {
                    console.log("Newmusic获取歌曲失败")
                })
        },

    },
    watch: {
        currentType() {
            // console.log(this.currentType);
            this.getList();
        }
    },
    created() {
        this.getList()
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
    color: #5A5A5A;
}

.typetab {
    width: 100%;
    height: 50px;
    line-height: 50px;
}

.typetab ul {
    position: absolute;
    right: 50px;
}

.typetab ul li {
    display: inline-block;
    margin: 0 10px;
    text-align: center;
}

.typetab ul li a {
    color: #9F9F9F;
}

.typetab ul li a.active {
    color: #5A5A5A;
    font-size: 18px;
}

</style>
