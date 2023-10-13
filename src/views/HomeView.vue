<template>
    <div>
        <public-navbar/>

        <div class="jumbotron jumbotron-fluid">
            <div class="container text-center">
                <h1>Predict Your Stress</h1>
    
                <p class="para">We predict your <b>Stress</b> level</p>
    
                <div>
                    <a href="/login" class="btn btn-dark mr-2">Login</a>
                    <a href="/register" class="btn btn-primary">Register</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "HomeView",
        data() {
            return{

            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .para{
        font-size: 18px;
    }
</style>