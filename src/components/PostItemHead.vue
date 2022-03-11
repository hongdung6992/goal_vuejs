<template>
    <div class="ass1-section__head">
        <router-link v-bind:to="getUserLink" class="ass1-section__avatar ass1-avatar">
            <img v-bind:src="getAvatar" v-bind:alt="post.name">
        </router-link>
        <div>
           
            <router-link 
                v-if="querySearch"
                v-bind:to="getUserLink" class="ass1-section__name" v-html="formatFullname"></router-link>
            <router-link 
                v-else 
                v-bind:to="getUserLink" class="ass1-section__name">{{ formatFullname }}</router-link>
            <span class="ass1-section__passed">{{ formatTimeAdded }}</span>
        </div>
        <router-link v-bind:to="getUserLink"  class="ass1-section__link ass1-btn-icon"><i class="icon-Link"></i></router-link>
    </div>
</template>

<script>
import moment from 'moment';
import { replaceAll } from '../helpers';

export default {
    name: 'post-item-head',
    props: {
        post: { type: Object, default: null }
    },
    data() {
        return {
            querySearch: this.$route.query.query,
        }
    },
    watch: {
        '$route' (to, from) {
            this.querySearch = to.query.query;
        }
    },
    computed: {
        getAvatar() {
            if(this.post.avatar) return this.post.avatar;
            return '/dist/images/avatar-02.png';
        },
        getUserLink() {
            let user_id = this.post.user_id || 1;
            return { name: 'user-page', params: { id: user_id } }
        },
        formatTimeAdded() {
            moment.locale('vi');
            return moment(this.post.created_at).fromNow()
        },
        formatFullname() {
            if(this.querySearch) {
                return replaceAll(this.post.name, this.querySearch, `<mark>${this.querySearch}</mark>`)
            } else {
                return this.post.name;
            }
        }
    }
}
</script>

<style>
    .ass1-section__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .ass1-section__name {
        text-transform: capitalize;
    }
</style>