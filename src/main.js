// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store.js'

Vue.config.productionTip = false

//配置公共的url
axios.defaults.baseURL = 'https://autumnfish.cn'
Vue.prototype.$axios = axios;

//使用elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入全局的css
import '../static/css/global.css'
import './assets/fonts/iconfont.css'
import '../static/css/pagination.css'
import '../static/css/tabs.css'
import '../static/css/tooltip.css'
import '../static/css/collapse.css'
import '../static/css/backtop.css'
import moment from 'Moment'

//转换时间戳位分秒
Vue.filter('covertTime', function(num) {
    let minutes = Math.floor(num / (1000 * 60));
    let seconds = Math.floor(num % (1000 * 60) / 1000);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return minutes + ':' + seconds;
})
//超过一万写成“万”
Vue.filter('kNum', function(num) {
    let knum = num;
    if (num >= 1000000000) {
        knum = Math.round((num / 1000000000) * 10) / 10 + 'B';
    } else if (num >= 100000000) {
        knum = Math.round(num / 1000000) + 'M';
    } else if (num >= 1000000) {
        knum = Math.round((num / 1000000) * 10) / 10 + 'M';
    } else if (num >= 100000) {
        knum = Math.round(num / 1000) + 'K';
    } else if (num >= 10000) {
        knum = Math.round((num / 1000) * 10) / 10 + 'K';
    }
    return knum;
})
//自定义moment全局过滤器
Vue.filter('convertTime',function(data,formatStr){
	return moment(data).format(formatStr);
});
Vue.filter('relativeTime',function(data){
	return moment(moment(data).format("YYYYMMDD"),"YYYYMMDD").fromNow(); 	
});
//中文显示
moment.locale("zh-cn"); 

//三个数字一个，过滤器
Vue.filter('threeNum',function(num){
	return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
})

//注册全局组件
import MV from '@/components/NewMV/MV'
Vue.component(MV.name, MV);
import Music from '@/components/Newmusic/Music'
Vue.component(Music.name, Music);
import Playlist from '@/components/PlaylistRec/Playlist'
Vue.component(Playlist.name, Playlist);
import Comment from '@/components/Comment'
Vue.component(Comment.name, Comment);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
