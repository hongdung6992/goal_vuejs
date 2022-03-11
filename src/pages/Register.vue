<template>
    <div class="ass1-login">
        <div class="ass1-login__logo">
            <router-link to="/" class="ass1-logo">Ivy garden</router-link>
        </div>
        <div class="ass1-login__content">
            <p>Đăng ký một tài khoản</p>
            <div class="ass1-login__form">
                <form action="#" v-on:submit.prevent="handleSubmitRegister">
                    <input v-model="name"
                        type="text" class="form-control" placeholder="Tên hiển thị" required="">
                    <input v-model="email" 
                        type="text" class="form-control" placeholder="Email" required="">
                    <input v-model="password" 
                        type="password" class="form-control" placeholder="Mật khẩu" required="">
                    <input v-model="password_confirmation" 
                        type="password" class="form-control" placeholder="Nhập lại mật khẩu" required="">
                    <div class="ass1-login__send">
                        <router-link to="/login">Đăng nhập</router-link>
                        <button type="submit" class="ass1-btn">Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name: 'register',
    data() {
        return {
            email: '',
            name: '',
            password: '',
            password_confirmation: ''
        }
    },
    methods: {
        ...mapActions(['register']),
        handleSubmitRegister(e) {
            let data = {
                email: this.email,
                name: this.name,
                password: this.password,
                password_confirmation: this.password_confirmation
            }
            if(data.email && data.name && data.password && data.password_confirmation) {
                this.register(data).then(res => {
                    if(!res.ok) {
                        alert(res.error); // Notification
                    } else {
                        this.$router.push('/');
                    }
                })
            } else {
                alert('Nhập đầy đủ thông tin');
            }
        }
    }
}
</script>

<style>

</style>