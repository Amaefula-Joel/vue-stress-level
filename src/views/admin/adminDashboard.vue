<script>
    import axios from 'axios'
    import adminSideBar from '@/components/adminComponents/sideBar.vue'
    import adminNavbar from '@/components/adminComponents/navBar.vue'

    export default {
        name: "adminDashboard",
        components: {
            'admin-sidebar' : adminSideBar,
            'admin-navbar' : adminNavbar,

        },
        data() {
            return{
                userData: null,
                questionData: null,
                userCount: 0,
                questionCount: 0
            }
        },
        mounted() {
            this.userInfo();
        },
        methods: {
            userInfo() {
                const urls = ["http://localhost:3000/api/all-users", "http://localhost:3000/api/questions"];
                const request = urls.map(url => axios.get(url) );

                Promise.all(request)
                .then((responses) => {
                    // stores both responses
                    this.userData = responses[0].data;
                    this.questionData = responses[1].data;

                    this.userCount = this.userData.length;
                    this.questionCount = this.questionData.length;
                })
                .catch((err) => {
                    console.log(err);
                });
            },
        }
    }
</script>

<template>

    <div>

        <div class="main-container">
            <!-- navbar  -->
            <admin-navbar/>
    
            <!-- sidenav -->
            <admin-sidebar/>

            <!-- start of dashboard content body -->
            <div class="content p-4">

                <div class="container-fluid">
                    <div class="row row-cols-3 justify-content-between">
                        
                        <div class="col">
                            <div class="bg-gray p-4 text-center text-dark">
                                <h4 class="mb-2 display-3">{{userCount}}</h4>
                                <h6>User(s) registered</h6>
                            </div>
                        </div>
                        
                        <div class="col">
                            <div class="bg-primary p-4 text-center text-light">
                                <h4 class="mb-2 display-3">{{questionCount}}</h4>
                                <h6>Question(s) present</h6>
                            </div>
                        </div>
                        
                        <div class="col">
                            <div class="bg-success p-4 text-center text-light">
                                <h4 class="mb-2 display-3">{{questionCount}}</h4>
                                <h6>User(s) took the Questionaire</h6>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <!-- end of dahboard content body -->

        </div>

    </div>

</template>

<style>
    
    .main-container{
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;

    }
    .main-container .content{
        grid-column: 2;
    }

    .bg-gray{
        background-color: rgb(202, 202, 202);
    }
</style>
