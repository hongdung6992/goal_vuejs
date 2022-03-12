<template>
    <nav>
        <ul class="ass1-header__menu">
            <li>
                <a href="javascript:void(0)">Danh mục</a>
                <div class="ass1-header__nav" style="display: none;">
                    <div class="container">
                        <ul>
                            <li v-on:click.prevent="closeNavigation" v-for="item in categories" v-bind:key="item.id">
                                <router-link v-bind:to="getLinkCategory(item)" class="item">{{ item.title }}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="ass1-header__menu-transition"></div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
import $ from "jquery";
import { removeVietnameseFromString } from '../helpers';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'app-navigation',
    methods: {
        ...mapActions([
            'getListCategories',
        ]),
        ...mapGetters([
            'getListCategory'
        ]),
        getLinkCategory(category) {
            return {
                name: 'home-page',
                query: {
                    title: removeVietnameseFromString(category.title),
                    category_id: category.id
                }
            }
        },
        closeNavigation() {
            $('.ass1-header__nav').slideUp(300, 'swing');
        }
    },
    computed: {
        categories() {
            return this.getListCategory();
        }
    }
}
</script>

<style scoped>
    .ass1-header__nav > .container ul {
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
    }
    .ass1-header__nav > .container ul li {
        width: 25%;
    }
    .ass1-header__nav > .container ul li:first-child {
        margin-top: 8px;
    }
</style>