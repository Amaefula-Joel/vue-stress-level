<template>

    <div>
        <public-navbar/>
        
        <div class="container my-4" style="max-width: 600px;">
            <h2 class="mb-4">Login to your account</h2>
    
            <form @submit="Login">
                <div class="form-group">
                    <label>Email Adress</label>
                    <input type="email" placeholder="email" class="form-control" autocomplete="username" v-model="email" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Password" class="form-control" autocomplete="current-password" v-model="password" required>
                </div>
                
                <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "loginPage",
        data() {
            return{
                email: '',
                password: ''
            }
        },
        methods: {
            Login(event) {
                event.preventDefault();
                if (this.email === '' && this.password === '') {
                    console.log("wrong email and password");
                } else {
                    axios.post('http://localhost:3000/api/login', {email: this.email, password: this.password})
                    .then((response) => {
                        const token = response.data.token;

                        localStorage.setItem('token', token);

                        this.$router.push('/userwelcome');
                        // console.log(token);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            }
        }
    }
</script>

<style>

</style>