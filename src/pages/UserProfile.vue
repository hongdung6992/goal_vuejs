<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <p>Profile</p>

            <div class="ass1-login__form">
                <div class="avatar">
                    <img v-bind:src="getAvatar" alt="">
                </div>
                <form action="#" v-if="currentUser" v-on:submit.prevent="handleEditProfile">
                    <input 
                        v-bind:value="currentUser.name"
                        v-on:input="name = $event.target.value"
                        type="text" class="form-control" placeholder="Tên ..." required="">
                    
                    <select  
                        v-bind:value="currentUser.gender"
                        v-on:change="gender = $event.target.value"
                        class="form-control">
                        <option value="" disabled>Giới tính</option>
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                    </select>

                    <input 
                        v-on:change="uploadAvatar"
                        type="file" name="avatar"  placeholder="Ảnh đại diện" class="form-control">
                    

                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn">Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'user-profile',
    data() {
        return {
            name: '',
            gender: '',
            avatar: {
                objFile: null,
                base64URL: ''
            },
            userid: this.$route.params.id
        }
    },
    watch: {
        '$route' (to, from) {
            this.userid = to.params.id;
            this.checkIsCurrentUser();
        }
    },
    created() {
        this.checkIsCurrentUser();
    },
    computed: {
        ...mapGetters([
            'currentUser'
        ]),
        getAvatar() {
            if(this.avatar.base64URL === '' && this.currentUser) {
                if(this.currentUser.avatar) return this.currentUser.avatar;
			    return '/dist/images/default-avatar.png'
            } else {
                return this.avatar.base64URL;
            }
        }
    },
    methods: {
        ...mapActions(['updateProfile']),
        checkIsCurrentUser() {
            if(this.userid && this.currentUser) {
                if(this.userid != this.currentUser.id) {
                    this.$router.push('/')
                }
            }
        },
        handleEditProfile() {
            if(!this.gender) this.gender = this.currentUser.gender;
            if(!this.name) this.name = this.currentUser.name;

            if(this.name && this.gender) {
                let data = {
                    name: this.name,
                    gender: this.gender
                }

                if(this.avatar.objFile) {
                    data.objFile = this.avatar.objFile;
                }
                
                this.updateProfile(data).then(res => {
                    if(res.ok) {
                        alert('Update thông tin Profile thành công!');
                    } else {
                        alert(res.error);
                    }
                })
            }
        },
        uploadAvatar(e) {
            if(e.target.files && e.target.files.length) {
                const fileAvatar = e.target.files[0];
                let reader  = new FileReader();

                reader.addEventListener("load", () => {
                    let previewSrc = reader.result;
                    this.avatar.base64URL = previewSrc;
                    this.avatar.objFile = fileAvatar;
                }, false);

                if (fileAvatar) {
                    reader.readAsDataURL(fileAvatar);
                }
            }
        }
    }
}
</script>

<style scoped>
    .avatar {
        border-radius: 50%;
        overflow: hidden;
    }
</style>