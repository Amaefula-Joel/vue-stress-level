<template>
    <div class="container my-5 text-center">
        <h1>Stress Prediction</h1>

        <p>you are {{ userStressLevel }}</p>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "stressPresdiction",
        data() {
            return{
                userStressLevel: null
            }
        },
        methods: {
            check() {
                const token = localStorage.getItem('token');

                axios.get('http://localhost:3000/api/user-data', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    const data = response.data;

                    this.userStressLevel = data.stressPrediction;
                })
                .catch((err) => { 
                    console.log(err);
                });
            }
        },
        mounted() {
            this.check()
        }
    }
</script>

<style>
    .result-container{
        padding: 30px 20px;
        text-align: center;
    }
</style>