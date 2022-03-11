export default {
    // test: state => {
    //     return state
    // }
    getListPost: state => {
        return state.listPosts;
    },
    getDataPostDetail(state, getters, rootState) {
        if(state.postDetail) {
            var user_id = state.postDetail.post.user_id;
            var user = rootState.user.users[user_id];
            var data = {
                post: {
                    ...state.postDetail.post,
                    name: user.name,
                    profilepicture: user.avatar
                },
                categories: state.postDetail.categories,
                comments: state.postDetail.comments
            }
            return data;
        }
        
    }
}