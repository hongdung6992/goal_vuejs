import Vue from 'vue';
import { CONFIG_ACCESS_TOKEN } from '../../constants';
export default {
    SET_USER_INFO(state, user) {
        Vue.set(state.users, user.id, user);
    },
    SET_USER_POSTS(state, { posts, user_id }) {
        Vue.set(state.posts, user_id, posts);
    },
    SET_LOGOUT(state) {
        state[CONFIG_ACCESS_TOKEN] = '';
        state.currentUser = null;
        localStorage.removeItem(CONFIG_ACCESS_TOKEN);
    },
    SET_LOGIN_INFO(state, { user = null, token = '' }) {
        localStorage.setItem(CONFIG_ACCESS_TOKEN, token);
        state[CONFIG_ACCESS_TOKEN] = token;
        var gender = user.gender ? 1 : 0;
        user.gender = gender;
        state.currentUser = user;
    },
    SET_CURRENT_USER(state, user) {
        state.currentUser = user;
    }
}