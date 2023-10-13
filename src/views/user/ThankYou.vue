<script>
    import axios from 'axios';

    export default{
        name: "thankYouView",
        data (){
            return{
                userName: null 
            }
        },
        mounted() {
            this.check();
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
                    this.userName = response.data.name;
                })
            }
        }
    }
</script>

<template>

    <div class="container py-4 text-center">
        <h2>Thank You {{ userName }}</h2>
        <p>Thank you for your answers</p>
    </div>
</template>