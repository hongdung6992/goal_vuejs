<template>
    <div class="row">
        <div class="col-lg-8">
            <!--section-->
            <div class="ass1-section ass1-section__edit-post">
                <div class="ass1-section__content">
                    <form action="#">

                        <div class="form-group">
                            <textarea 
                                v-model="content"
                                type="text" class="form-control ttg-border-none"
                                placeholder="Mô tả ..."></textarea>
                        </div>
                    </form>
                    <div class="ass1-section__image" v-on:click="uploadImage">
                        <img v-bind:src="renderImage" alt="default">
                    </div>
                    <button 
                        v-on:click="uploadImage"
                        class="ass1-btn ass1-btn-meme">Đăng ảnh từ máy tính</button>
                    <!-- ref -->
                    <input 
                        v-on:change="handleUploadImage"
                        style="display: none;"
                        ref="imageUpload"
                        type="file" name="images" class="form-control">
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <aside class="ass1-aside ass1-aside__edit-post">
                <div>
                    <button v-on:click="handleUploadPost" class="ass1-btn">Đăng bài</button>
                </div>
                <div class="ass1-aside__edit-post-head">
                    <span style="display: block; width: 100%; margin-bottom: 10px;">Chọn danh mục</span>
                    
                    <label class="ass1-checkbox" v-for="item in allCategories" v-bind:key="item.id"> 
                        <input 
                            v-bind:value="item.id"
                            v-model="categories"
                            type="checkbox" name="state-post">
                        <span></span>
                        <p>{{ item.title }}</p>
                    </label>
                </div>
                <div class="ass1-aside__get-code">
                    <p>Share Link</p>
                </div>
                <div class="ass1-aside__social">
                    <a href="" class="ass1-btn-social__facebook ass1-btn-social"><i class="fa fa-facebook"
                            aria-hidden="true"></i></a>
                    <a href="" class="ass1-btn-social__twitter ass1-btn-social"><i class="fa fa-twitter"
                            aria-hidden="true"></i></a>
                    <a href="" class="ass1-btn-social__google ass1-btn-social"><i class="fa fa-google-plus"
                            aria-hidden="true"></i></a>
                </div>

            </aside>
        </div>
    </div>
</template>

<script>
import { checkImageURL, checkImageFile } from '../helpers';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'post-upload',
    data() {
        return {
            content: '',
            url_image: {
                objFile: null,
                base64URL: ''
            },
            categories: []
        }
    },
    computed: {
        allCategories() {
            return this.getListCategory();
        },
        renderImage() {
            
            if (this.url_image.base64URL) return this.url_image.base64URL;

            return '/dist/images/no_image_available.jpg';
        }
    },
    created() {
        this.getListCategories();
    },
    methods: {
        ...mapActions([
            'createNewPost', 'getListCategories'
        ]),
         ...mapGetters([
            'getListCategory'
        ]),
        uploadImage() {
            this.$refs.imageUpload.click();
        },
        handleUploadImage(e) {
            if(e.target.files && e.target.files.length) {
                const imageUpload = e.target.files[0];
                
                let check = checkImageFile(imageUpload);

                if(!check) {
                    alert('File tải lên không hợp lệ!');
                    return;
                }

                let reader  = new FileReader();

                reader.addEventListener("load", () => {
                    let previewSrc = reader.result;
                    this.url_image.base64URL = previewSrc;
                    this.url_image.objFile = imageUpload;
                }, false);

                if (imageUpload) {
                    reader.readAsDataURL(imageUpload);
                }
            }
        },
        resetData() {
            this.categories = [];
            this.content = '';
            this.url_image = {
                base64URL: '',
                objFile: null
            }
        },
        handleUploadPost() {
            let { content, categories, url_image } = this;

            if(content && categories.length) {
                if(url_image.objFile) {
                    
                    let data = {
                        content,
                        url_image,
                        category: categories
                    }

                    if(url_image.objFile) data.url_image = url_image.objFile;

                    this.createNewPost(data).then(res => {
                        if(res.ok) {
                            // Reset lại toàn bộ data cũ
                            this.resetData();
                            alert('Đăng bài viết thành công!');
                        } else {
                            alert(res.error);
                        }
                    });

                } else {
                    alert('Vui lòng upload hình ảnh bài viết');
                }
            } else {
                alert('Vui lòng nhập đầy đủ nội đụng');
            }
        }
    }
}
</script>

<style>

</style>