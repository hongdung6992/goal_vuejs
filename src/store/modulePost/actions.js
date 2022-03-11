import axiosInstance from '../../plugins/axios';
import { PAGE_SIZE, CURRENT_PAGE, CONFIG_ACCESS_TOKEN } from '../../constants';

export default {
    async getListPostHasPaging({ commit }, { per_page = PAGE_SIZE, page = CURRENT_PAGE, category_id = null}) {
        commit('SET_LOADING', true);
        try {
            var config = {
                params: {
                    per_page,
                    page
                }
            }
            if(category_id) {
                config.params.category_id = category_id;
                var result = await axiosInstance.get('posts', config);
            } else {
                result = await axiosInstance.get('posts', config);
            }
            commit('SET_LOADING', false);
            if(result.status === 200) {
                if(page === 1) commit('SET_LIST_POSTS', result.data);
                else if(page > 1) commit('PUSH_LIST_POSTS', result.data);
            }
        } catch(error) {
            commit('SET_LOADING', false);
        }
    },
    async getPostDetailById({ commit, dispatch }, post_id) {
        commit('SET_LOADING', true);
        try {
            var result = await axiosInstance.get('post/' + post_id);
            if(result.status === 200) {
                var promiseUser      = dispatch('getUserById', result.data.post.user_id);
                var promiseComments  = dispatch('getListCommentByPostid', post_id);
               
                let [resultUser, resultComments] = await Promise.all([ 
                    promiseUser, 
                    promiseComments 
                ]);
                let dataPostDetail = {
                    ...result.data,
                    comments: []
                }

                if(resultComments.ok) {
                    dataPostDetail.comments = resultComments.comments
                }

                commit('SET_LOADING', false);
                commit('SET_POST_DETAIL', dataPostDetail);

                return {
                    ok: true,
                    data: result.data,
                    error: null
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
    async getListPostSearch({ commit }, searchStr) {
        commit('SET_LOADING', true);
        try {
            var result = await axiosInstance.get('posts?content=' + searchStr);
            commit('SET_LOADING', false);
            if(result.status === 200) {
                return {
                    ok: true,
                    posts: result.data
                }
            } else {
                return {
                    ok: false
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
    async createNewPost({ commit }, { content = '', category = '', url_image = '', obj_image = null }) {
        commit('SET_LOADING', true);
        try {
            let bodyFormData = new FormData();
                
                bodyFormData.append('category', category)
                bodyFormData.append('url_image', url_image)
                bodyFormData.append('content', content)
            
            if(obj_image) {
                bodyFormData.append('obj_image', obj_image)
            }

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }


            var result = await axiosInstance.post('post/create', bodyFormData, config);
            commit('SET_LOADING', false);
            if(result.status === 200) {
                return {
                    ok: true,
                    data: result.data.post
                }
            } else {
                return {
                    ok: false,
                    error: result.error
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
    async getListCommentByPostid({ commit }, postid) {
        try {
            var result = await axiosInstance.get('comments?post_id=' + postid);
            if(result.status === 200) {
                return {
                    ok: true,
                    comments: result.data
                }
            }
        } catch(error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async addNewComment({ commit, rootState }, { comment = '', post_id = null }) {
        try {
            commit('SET_LOADING', true);
            let data = {
                post_id: post_id,
                comment: comment
            }
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            var result = await axiosInstance.post('comment/create', data, config);
            commit('SET_LOADING', false);
            if(result.status === 200) {
                let comment = {
                    ...result.data.comment,
                    name: rootState.user.currentUser.name,
                    avatar: rootState.user.currentUser.avatar,
                }
                commit('PUST_LIST_COMMENTS', comment);
                return {
                    ok: true,
                    comment: comment
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