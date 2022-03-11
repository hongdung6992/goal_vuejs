<template>
    <div class="ass1-section__list">
        <post-item 
            v-for="item in getListPost" 
            v-bind:key="item.id" 
            v-bind:post="item"
        />

        <button 
            v-on:click="handleLoadMore"
            v-if="getListPost && getListPost.length" 
            class="load-more ass1-btn"><span>Xem thêm</span>
        </button>
        <h3 v-else>Danh sách rỗng</h3>
    </div>
</template>

<script>
import { PAGE_SIZE, CURRENT_PAGE } from '../constants';
import { mapGetters, mapActions } from 'vuex';
import PostItem from './PostItem';
export default {
    name: 'post-list',
    data() {
        return {
            per_page: PAGE_SIZE,
            page: CURRENT_PAGE,
            category_id: parseInt(this.$route.query.category_id)
        }
    },
    components: {
        PostItem
    },
    computed: {
        ...mapGetters([
            'getListPost'
        ])
    },
    watch: {
        '$route' (to, from) {
            this.category_id = to.query.category_id;
            this.page = 1;
        }
    },
    methods: {
        ...mapActions([
            'getListPostHasPaging', 'getListCategories'
        ]),
        handleLoadMore() {
            this.page = this.page + 1;
            let obj = {
                per_page: this.per_page,
                page: this.page,
                category_id: this.category_id
            }
            this.getListPostHasPaging( obj )
        }
    }
}
</script>

<style>

</style>