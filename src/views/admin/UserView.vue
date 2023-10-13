<script>

    import axios from 'axios';
    import adminSideBar from '@/components/adminComponents/sideBar.vue'
    import adminNavbar from '@/components/adminComponents/navBar.vue'

    export default {
        name: "userView",
        components: {
            'admin-sidebar' : adminSideBar,
            'admin-navbar' : adminNavbar,
        },
        data() {
            return{
                usersData: null,
                singleUser: {},
                questionAnsweredLength: 0,
            }
        },
        computed: {
        },
        watch:{
            singleUser() {
                this.questionAnsweredLength = this.singleUser.answers.length; // saves the number of questions user has answered
            }
        },
        mounted() {
            axios.get('http://localhost:3000/api/all-users')
            .then((response) => {
                this.usersData = response.data;
                this.singleUser = response.data[0];
            })
            .catch((err) => {
                console.log(err);
            });
        },
        methods: {
            storeUser(user) {
                this.singleUser = user;
            },
            getStyleClass (value) {
                switch (value) {
                    case 'Highly Stressed':
                        return "high";
                        
                        case 'Averagely Stressed':
                        return 'average';

                        case 'Normally Stressed':
                        return 'normal';

                    default:
                        return '';
                }

            }
        }
    }

</script>

<template>
    <div class="main-container">

        <!-- navbar  -->
            <admin-navbar/>
    
        <!-- sidenav -->
        <admin-sidebar/>

        <div class="content p-4">
            <h2 class="text-center">Users </h2>
            <table class="table table-bordered table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Mental Level</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in usersData" :key="user._id">
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td :class="getStyleClass(user.stressPrediction)">{{user.stressPrediction}}</td>
                        <td><button type="button" class="btn btn-secondary rounded" data-toggle="modal" data-target="#myModal" @click="storeUser(user)">See More</button> </td>
                    </tr>
                </tbody>
            </table>

            <!-- The Modal -->
            <div class="modal fade" id="myModal">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title border-bottom">{{singleUser.name}}</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">

                        <div class="d-flex mb-4">
                            <div class="w-50">
                                <p>Stress Prediction: <b :class="getStyleClass(singleUser.stressPrediction)">{{ singleUser.stressPrediction }}</b></p>
                                
                            </div>
                            <div class="w-50">
                                <p>Email: <b>{{ singleUser.email }}</b></p>
                                
                            </div>
                        </div>

                        <div class="answers">
                            <h5>User Answers</h5>

                            <div v-if="questionAnsweredLength === 0">
                                User hasn't answered the questions
                            </div>

                            <div v-else>
                                <table class="table table-light">
                                    <thead>
                                        <tr>
                                            <th class="w-75 border-right border-bottom">Question</th>
                                            <th class="w-25 border-bottom">Answer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in singleUser.answers" :key="item">
                                            <td class="w-75 border-right">{{item.question}}</td>
                                            <td class="w-25">{{item.answer}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>
    .high{
        color: red;
    }

    .normal{
        color: green;
    }

    .average{
        color: rgb(189, 149, 40);
    }
</style>