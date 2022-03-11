<template>
    <div class="row">
        <div class="col-lg-8">
            <post-list/>
        </div>
        <div class="col-lg-4">
            <sidebar />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';
export default {
    name: 'home-page',
    components: {
        PostList,
        Sidebar
    },
    // watch $route chỉ chạy khi có sự thay đổi router 
    // Nếu như lần load đầu tiên -> Không có chạy
    watch: {
        '$route' (to, from) {
            var category_id = to.query.category_id;
            this.getListPostHasPaging({ category_id })
        }
    },
    created() {
        var category_id = this.$route.query.category_id;
        this.getListPostHasPaging({ category_id })
        this.getListCategories();
    },
    methods: {
        ...mapActions([
            'getListPostHasPaging', 'getListCategories'
        ])
    }
}
</script>

<style>

</style>