<template>

    <div>
        <public-navbar/>

        <div class="container" style="max-width: 600px;">
            <h2 class="mb-4">Register to Questionaire</h2>

            <!-- for errors that may occur in registering -->
            <div class="error-container mb-3">
                <!-- if the field are empty -->
                <div v-if="errorMessage.message === 'empty' && errorMessage.visible === true" class="alert alert-danger fade show">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <strong>Fill in the required fields</strong>
                </div>

                <!-- if the user inputs an email already in the database -->
                <div v-else-if="errorMessage.message === 'exists' && errorMessage.visible === true" class="alert alert-danger fade show">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <strong>User already exists</strong>
                </div>

                <!-- if their are other errors in the registration -->
                <div v-else-if="errorMessage.message === 'other' && errorMessage.visible === true" class="alert alert-danger fade show">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                    <strong>Error registering user.</strong> Try again.
                </div>

                
            </div>

            <form @submit.prevent="registerUser" class="pb-4">
                <div class="form-group">
                    <label for="">Full Name</label>
                    <input type="text" class="form-control" autocomplete="username" placeholder="Your Name" v-model="userDetails.name" required>
                </div>

                <div class="form-group">
                    <label for="">Email Address</label>
                    <input type="email" class="form-control" autocomplete="email-address" placeholder="Email Address" v-model="userDetails.email" required>
                </div>

                <div class="form-group">
                    <label for="">Password</label>
                    <input type="password" class="form-control" autocomplete="current-password" placeholder="Password" v-model="userDetails.password" required>
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
                },
                errorMessage: {
                    message: 'empty',
                    visible: false
                }
            }
        },
        methods: {
            printError(error) {
                // for printing out errors
                this.errorMessage.message = error;
                this.errorMessage.visible = true;
            },
            registerUser() {
                if (this.userDetails.name === '' || this.userDetails.email === '' || this.userDetails.password === '') {
                    // prints the empty error message
                    this.printError("empty")
                } else {
                    axios.post('http://localhost:3000/api/register', this.userDetails)
                    .then((response) => {

                        if (response.data.userExists === true) {
                            // prints the empty error message
                            this.printError("exists");
                        } else if (response.data.success) {
                            // log the user in if registration is successful
                            axios.post('http://localhost:3000/api/login', {email: this.userDetails.email, password: this.userDetails.password})
                            .then((response) => {
                                const token = response.data.token;

                                localStorage.setItem('token', token);
                                // redirect to user dashboard
                                this.$router.push('/userwelcome');
                            })
                            .catch((err) => {
                                // error logging in to app 
                                console.log(err);
                            });
                        } else {
                            this.printError("other");
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