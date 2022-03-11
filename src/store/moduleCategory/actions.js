import axiosInstance from '../../plugins/axios';

export default {
    async getListCategories({ commit }) {
        commit('SET_LOADING', true);
        try {

            var result = await axiosInstance.get('categories');
            
            commit('SET_LOADING', false);
            if(result.status === 200) {
                commit('SET_LIST_CATEGORIES', result.data);
            }
        } catch(error) {
            commit('SET_LOADING', false);
        }
    },
}