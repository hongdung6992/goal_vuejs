import axiosInstance from '../../plugins/axios';

import { parseJwt } from '../../helpers';
import { PAGE_SIZE, CURRENT_PAGE, CONFIG_ACCESS_TOKEN } from '../../constants';

export default {
    async getUserById({ commit }, user_id) {
        try {
            var result = await axiosInstance.get('user/' + user_id);
            if(result.status === 200) {
                commit('SET_USER_INFO', result.data);
                return {
                    ok: true,
                    data: result.data,
                    error: null
                }
            }
            return {
                ok: false,
                error: result
            }
        } catch(error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async login({ commit, dispatch }, { email = '', password = '' }) {
        commit('SET_LOADING', true);
        try {
            let data = {
                email: email,
                password: password
            }
            var result = await axiosInstance.post('login', data);
            
            commit('SET_LOADING', false);
            if(result.status === 200) {

                commit('SET_USER_INFO', result.data.user);
                commit('SET_LOGIN_INFO', result.data);
                dispatch('getListPostsByUserId', {user_id: result.data.user.id, per_page: 4});

                return {
                    ok: true,
                    error: null,
                    data: result.data
                }
                
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
            
        } catch(error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.response.data.errors['email']
            }
        }
    },
    async logout({ commit }) {
        commit('SET_LOGOUT');
        return null
    },
    async checkLogin({ commit, dispatch }) {
        try {
            let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN);

            if(tokenLocal) {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + tokenLocal
                    }
                }
                let response = await axiosInstance.get("me", config);
                let promiseUser     = dispatch('getUserById', response.data.id);
                let promisePostUser     = dispatch('getListPostsByUserId', {user_id: response.data.id, per_page: 4});

                let [
                    resultUser, 
                    resultPostUser
                ] = await Promise.all([ 
                    promiseUser, 
                    promisePostUser 
                ]);
            
                if(resultUser.ok
                    && resultPostUser.ok
                    ) {
                    let data = {
                        user: resultUser.data,
                        token: tokenLocal
                    }
                    commit('SET_LOGIN_INFO', data);
                    return {
                        ok: true,
                        error: null
                    }
                }
            }
            return {
                ok: false
            }
            
        } catch(error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async getListPostsByUserId({ commit }, {per_page = PAGE_SIZE, page = CURRENT_PAGE, user_id}) {
        try {
            let config = {
                params: {
                    user_id,
                    per_page,
                    page
                },
            }
            var result = await axiosInstance.get('posts', config);
            if(result.status === 200) {
                let objData = {
                    posts: result.data,
                    user_id: user_id
                }
                commit('SET_USER_POSTS', objData);
                return {
                    ok: true,
                    posts: result.data || [],
                    error: null
                }
            }
            return {
                ok: false,
                error: null
            }
        } catch(error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async register({ commit, dispatch }, data) {
        commit('SET_LOADING', true);
        try {
            let result = await axiosInstance.post('register', data);
            commit('SET_LOADING', false);
            if(result.status === 200) {
                let objLoginInfo = {
                    user: result.data.user,
                    token: result.data.token
                }
                commit('SET_USER_INFO', result.data.user);
                commit('SET_LOGIN_INFO', objLoginInfo);
                
                dispatch('getListPostsByUserId', {user_id: result.data.user.id, per_page: 4});
                
                return {
                    ok: true,
                    data: result.data,
                    error: null
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async updateProfile({ commit }, { name = '', gender = '', objFile = null }) {
        commit('SET_LOADING', true);
        try {
            let bodyFormData = new FormData();

            bodyFormData.append('gender', gender);
            bodyFormData.append('name', name);

            // For avatar
            if(objFile) {
                bodyFormData.append('avatar', objFile); 
            }

            let config = { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }

            
            let result = await axiosInstance.post('user/update_profile', bodyFormData, config);
            commit('SET_LOADING', false);
            if(result.status === 200) {
                commit('SET_CURRENT_USER', result.data.user);
                return {
                    ok: true,
                    user: result.data.user
                }
            } else {
                return {
                    ok: false,
                }
            }

        } catch(error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error
            }
        }
    },
    async changePassword({ commit }, data) {
        commit('SET_LOADING', true);
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }

            let result = await axiosInstance.post('/member/password.php', data, config);
            commit('SET_LOADING', false);
            if(result.data.status === 200) {
                return {
                    ok: true,
                    message: result.data.message
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch(error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    }
}