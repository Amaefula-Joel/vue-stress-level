<template>

    <div class="py-3">
        
        <div class="container" style="max-width: 500px;">
            <h1>Register to Questionaire</h1>

            <form @submit="registerUser">
                <div class="form-group">
                    <label for="">Full Name</label>
                    <input type="text" class="form-control" autocomplete="username" placeholder="Your Name" v-model="userDetails.name">
                </div>

                <div class="form-group">
                    <label for="">Email Address</label>
                    <input type="email" class="form-control" autocomplete="email-address" placeholder="Email Address" v-model="userDetails.email">
                </div>

                <div class="form-group">
                    <label for="">Password</label>
                    <input type="password" class="form-control" autocomplete="current-password" placeholder="Password" v-model="userDetails.password">
                </div>

                <div>
                    <button type="submit" class="btn btn-primary w-100">Register</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "registerPage",
        data() {
            return{
                userDetails: {
                    name: '',
                    password: '',
                    email: ''
                }
            }
        },
        methods: {
            registerUser(event) {
                event.preventDefault();
                if (this.userDetails.name === '' && this.userDetails.email === '' && this.userDetails.password === '') {
                    console.log('empty');
                } else {
                    axios.post('http://localhost:3000/api/register', this.userDetails)
                    .then((response) => {
                        if (response.data.success) {
                            axios.post('http://localhost:3000/api/login', {email: this.userDetails.email, password: this.userDetails.password})
                            .then((response) => {
                                const token = response.data.token;

                                localStorage.setItem('token', token);

                                this.$router.push('/userwelcome');
                                // console.log(token);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        } else{
                            console.log("error registering user");
                        }
                    })
                    .catch((err => {
                        console.log(err);
                    }));
                }
            }
        }
    }
</script>

<style scoped>
</style>