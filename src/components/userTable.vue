<template>

    <div>
        <h2 class="text-center">Registered Users </h2>
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Stress Level</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in userData" :key="user._id">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.stressPrediction}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        name: "userTable",
        props:{
            userData: Array
        },
        data() {
            return{

            }
        },

    }
</script>