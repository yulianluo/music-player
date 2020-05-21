import Vue from 'vue'
import Router from 'vue-router'
import Discover from '@/components/Discover/Discover'
import PlaylistRec from '@/components/PlaylistRec/PlaylistRec'
import Newmusic from '@/components/Newmusic/Newmusic'
import NewMV from '@/components/NewMV/NewMV'
import Result from '@/components/Result'
import PlayListDetail from '@/components/PlaylistRec/PlaylistDetail'
import MVDetail from '@/components/NewMV/MVDetail'
Vue.use(Router)

export default new Router({
    linkActiveClass: 'link-active',
    routes: [{
            path: '/',
            redirect: '/discover'
        },
        {
            path: '/discover',
            name: 'discover',
            component: Discover
        },
        {
            path: '/playlists/:categoryId/page/:page',
            name: 'playlists',
            component: PlaylistRec
        }, {
            path: '/newmusic/:categoryId',
            name: 'newmusic',
            component: Newmusic
        },
        {
            path: '/newmv/area/:areaId/type/:typeId/order/:orderId/page/:page',
            name: 'newmv',
            component: NewMV
        },
        {
            path: '/result',
            name: 'result',
            component: Result
        },
        {
            path: '/playlist/detail',
            name: 'playlist.detail',
            component: PlayListDetail
        },
        {
            path: '/mv/detail',
            name: 'mv.detail',
            component: MVDetail
        },

    ]
})
