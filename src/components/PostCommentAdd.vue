<template>
    <div class="ass1-add-comment">
        <form action="#" v-on:submit.prevent="handleAddComment">
            <textarea 
                v-model="comment"
                class="form-control ttg-border-none" placeholder="Thêm một bình luận"></textarea>
                 <button v-on:click.prevent="handleAddComment" type="submit" class="mt-2 ass1-btn">Bình luận</button>
        </form>
        <div class="ass1-add-comment__content">
            <a href="#" 
                v-on:click.prevent="handleAddComment"
                class="ass1-add-comment__btn-save ass1-btn-icon"><span>{{ renderMaxLength }}</span><i class="icon-Submit_Tick"></i></a>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'post-comment-add',
    data() {
        return {
            comment: '',
            maxLength: 180,
            post_id: this.$route.params.id
        }
    },
    watch: {
        '$route' (to, from) {
            this.post_id = to.params.id;
        }
    },
    computed: {
        renderMaxLength() {
            return this.maxLength - this.comment.length
        }
    },
    methods: {
        ...mapActions([ 'addNewComment' ]),
        handleAddComment() {
            if(this.comment.length && this.comment.length <= this.maxLength) {
                // Call API
                let data = {
                    comment: this.comment,
                    post_id: this.post_id
                }
                this.addNewComment(data).then(res => {
                    if(res.ok) {
                        this.comment = '';
                    } else {
                        alert(res.error);
                    }
                })
            } else {
                alert('Dữ liệu nhập vào không đúng quy tắc');
            }
        }
    }
}
</script>

<style>

</style>