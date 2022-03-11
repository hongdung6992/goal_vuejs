<template>
    <div class="ass1-comments__section" v-if="comment">
        <router-link v-bind:to="getUserLink" class="ass1-comments__avatar ass1-avatar">
            <img v-bind:src="renderAvatar" alt=""></router-link>
        <div class="ass1-comments__content">
            <router-link v-bind:to="getUserLink" class="ass1-comments__name">{{ comment.name }} </router-link>
            <span class="ass1-comments__passed">{{ formatTimeCmt }}</span>
            <p>{{ comment.comment }}</p>
            
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'post-comment-item',
    props: {
        comment: { type: Object, default: null }
    },
    computed: {
        renderAvatar() {
            if(this.comment && this.comment.avatar) {
                return this.comment.avatar;
            }
            return '/dist/images/avatar-11.png'
        },
        formatTimeCmt() {
            moment.locale('vi');
            return moment(this.comment.created_at).fromNow()
        },
        getUserLink() {
            return { name: 'user-page', params: { id: this.comment.id } }
        },
    }
}
</script>

<style>
    .ass1-comments__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>