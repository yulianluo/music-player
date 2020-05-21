<template>
    <div class="main">
        <div class="paralists">
            <div class="area">
                <ul>
                    <p>地区</p>
                    <span>|</span>
                    <li v-for="(item,index) in areaList" :key='index' @click='areaHandle(index)'>
                        <a href="javascript:void(0)" :class='{active:index==areaIndex}'>{{item}}</a>
                        <span>|</span>
                    </li>
                </ul>
            </div>
            <div class="type">
                <ul>
                    <p>类型</p>
                    <span>|</span>
                    <li v-for="(item,index) in typeList" :key='index' @click='typeHandle(index)'>
                        <a href="javascript:void(0)" :class='{active:index==typeIndex}'>{{item}}</a>
                        <span>|</span>
                    </li>
                </ul>
            </div>
            <div class="order">
                <ul>
                    <p>排序</p>
                    <span>|</span>
                    <li v-for="(item,index) in orderList" :key='index' @click='orderHandle(index)'>
                        <a href="javascript:void(0)" :class='{active:index==orderIndex}'>{{item}}</a>
                        <span>|</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- mv列表 -->
        <MV :mvlist='mvlist' />
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

    name: 'NewMV',

    data() {
        return {
            areaList: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
            typeList: ["全部", "官方版", "原生", "现场版", "网易出品"],
            orderList: ["上升最快", "最热", "最新"],
            mvlist: [],
            iconClass: "iconfont icon-bofang",
            iconClass2: "iconfont icon-mv",
            areaIndex: 0,
            typeIndex: 0,
            orderIndex: 0,
            area: '全部',
            type: '全部',
            order: '上升最快',
            total: 0,
            pagesize: 20,
            page: 1,
            offset: 0,

        }
    },
    methods: {
        getOffset(val) {
            this.offset = val;
        },
        getList() {
            this.$axios.get('/mv/all?limit=20&offset=' + this.offset + '&area=' + this.area + '&type=' + this.type + '&order=' + this.order)
                .then(res => {
                    this.mvlist = res.data.data;
                    //接口第二页不直接显示count
                    if (res.data.count) {
                        this.total = res.data.count;
                    }
                    // console.log(res.data);
                })
        },
        areaHandle(index) {
            this.$router.push({name:'newmv',params:{areaId: index, page:1}});
            this.areaIndex = index;
            this.area = this.areaList[index];
            this.filterHandle()
        },
        typeHandle(index) {
            this.$router.push({name:'newmv',params:{typeId: index, page:1}});
            this.typeIndex = index;
            this.type = this.typeList[index];
            this.filterHandle()
        },
        orderHandle(index) {
            this.$router.push({name:'newmv',params:{orderId: index, page:1}});
            this.orderIndex = index;
            this.order = this.orderList[index];
            this.filterHandle()
        },
        filterHandle() {
            this.page = 1;
            this.offset = 0;
            this.getList();
        },
        pageHandle(val) {
            this.$router.push({name:'newmv',params:{page:val}});
            this.page = val;
            this.offset = (this.page - 1) * 20;
            this.getList()
        },

    },
    created() {
        this.getList();
    }

};

</script>
<style lang="css" scoped>
.main {
    position: absolute;
    left: 200px;
    padding-left: 10px;
    top: 50px;
    width: 1055px;
    overflow: hidden;
    background-color: #FAFAFA;
    padding-bottom: 100px;
    color: #5A5A5A;
    font-size: 15px;

}

.paralists {
    width: 1000px;
    margin-left: 30px;
    margin-top: 20px;

}

.paralists ul {
    height: 50px;
    line-height: 50px;

}

.paralists ul>p {
    float: left;
    color: #5A5A5A;
}

.paralists ul li {
    display: inline-block;
    text-align: center;
    position: relative;

}

.paralists ul li a {
    color: #9F9F9F;
    padding: 5px 15px;
    margin-left: 20px;
    border-radius: 10px;
}

.paralists ul span {
    margin-left: 20px;
    float: left;
    color: #E8E8E8;
}

.paralists ul li span {
    margin-left: 20px;
    float: right;
    color: #E8E8E8;
}

.paralists ul li a:hover {
    color: #5A5A5A;
}

.paralists ul li a.active {
    color: #5A5A5A;
    background-color: #DEDEDE;
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
