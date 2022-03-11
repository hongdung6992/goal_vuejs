<template>
    <div class="ass1-head-user" v-if="userInfor">
        <div class="ass1-head-user__content">
            <div class="ass1-head-user__image"><a href="#"><img v-bind:src="getAvatar" v-bind:alt="userInfor.name"></a></div>
            <div class="ass1-head-user__info">
                <div class="ass1-head-user__info-head">
                    <div class="ass1-head-user__name">
                        <span>{{ userInfor.name }}</span> 
                        <i><img src="/dist/fonts/emotion/svg/Verified.svg" alt="Verified"></i>
                    </div>
                    <div class="w-100"></div>
                    <a v-if="!isCurrentUser" href="#" class="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>

                    <template v-else>
                        <router-link  
                            v-bind:to="{ name: 'change-password', params: { id: userInfor.id } }"
                            class="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</router-link>
                        <router-link 
                            v-bind:to="{ name: 'user-profile', params: { id: userInfor.id } }" 
                            class="ass1-head-user__btn-follow ass1-btn">Profile</router-link>
                    </template>
                    
                </div>
                <div class="ass1-head-user__info-statistic">
                    <div class="ass1-btn-icon"><i class="icon-Post"></i><span>Bài viết: {{ countPost }}</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Followers"></i><span>Theo dõi: 0</span></div>
                    <div class="ass1-btn-icon"><i class="icon-Following"></i><span>Đang theo dõi: 0</span></div>
                </div>
                <p>{{ userInfor.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'user-page-info',
    props: {
        userInfor: { type: Object, default: null },
        countPost: { type: Number, default: 0 }
    },
    computed: {
        ...mapGetters([
            'currentUser'
        ]),
        isCurrentUser() {
            if(this.userInfor && this.currentUser) {
                if(this.userInfor.id == this.currentUser.id) return true;
            }
            return false;
        },
        getAvatar() {
            if(this.userInfor && this.userInfor.avatar) {
                return this.userInfor.avatar;
            }
            return '/dist/images/cat-1634369_1920.jpg';
        }
    }
}
</script>

<style>

</style>