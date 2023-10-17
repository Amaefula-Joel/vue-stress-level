<template>

    <div>
        <public-navbar/>
        
        <div class="container" style="max-width: 600px;">
            <h2 class="mb-4">Login to your account</h2>

            <div class="error-container mb-3">
                <!-- if the email isn't attached to any account in the database -->
                <div v-if="errorMessage.message === 'noAccountMatch' && errorMessage.visible === true" class="alert alert-danger fade show">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <strong>No account matched email</strong>
                </div>

                <!-- if the password is wrong -->
                <div v-else-if="errorMessage.message === 'wrongPassword' && errorMessage.visible === true" class="alert alert-danger fade show">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <strong>Wrong Password</strong>
                </div>
            </div>
    
            <form @submit.prevent="Login">
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
                password: '',
                errorMessage: {
                    message: '',
                    visible: false
                }
            }
        },
        methods: {
            printError(error) {
                this.errorMessage.message = error;
                this.errorMessage.visible = true;
            },
            Login() {
                if (this.email === '' && this.password === '') {
                    console.log("wrong email and password");
                } else {
                    axios.post('http://localhost:3000/api/login', {email: this.email, password: this.password})
                    .then((response) => {

                        if (response.data.noAccountMatch === true) {
                            // if the email doesn't match any account in the database 
                            this.printError("noAccountMatch");
                        } else if(response.data.wrongPassword === true) {
                            // if the password is wrong 
                            this.printError("wrongPassword");
                        } else{
                            const token = response.data.token;
    
                            localStorage.setItem('token', token);
    
                            this.$router.push('/userwelcome');
                        }
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