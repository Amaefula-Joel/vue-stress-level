<script>
    import axios from 'axios'
    import viewQuestionsComp from '@/components/questionsComponents/viewQuestionsComp.vue'
    import fullQuestionComp from '@/components/questionsComponents/fullQuestionComp.vue'
    import createQuestionComp from '@/components/questionsComponents/createQuestionComp.vue'
    import adminSideBar from '@/components/adminComponents/sideBar.vue'
    import adminNavbar from '@/components/adminComponents/navBar.vue'

    export default {
        name: "editQuestions",
        components: {
            'admin-sidebar' : adminSideBar,
            'admin-navbar' : adminNavbar,
            'view-questions' : viewQuestionsComp,
            'full-question' : fullQuestionComp,
            'create-question' : createQuestionComp
        },
        data() {
            return{
                questions: null,
                singleQuestion: null,
                componentViewed: 'view-questions',
                questionOperationStatus: {status: false, operation: ""},
            }
        },
        watch: {
            componentViewed (newVal) {
                if (newVal !== "view-questions") {
                    this.questionOperationStatus.status = false;
                }
            }
        },
        mounted() {
            this.grabQuestions();
        },
        methods: {
            grabQuestions(){
                axios.get("http://localhost:3000/api/questions")
                .then((response) => {
                    this.questions = response.data;
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            changeComp(component) {
                this.componentViewed = component;
            },
            storeQuestion (question) {
                this.singleQuestion = question;
            },
            addNewQuestion(newQuestion) {
                this.questions.push(newQuestion);
            },
            updateOperationStatus(status){
                this.questionOperationStatus.status = true;
                this.questionOperationStatus.operation = status;
            }
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

            <div class="content p-3">

                <div class="">

                    <component :is="componentViewed" 
                    :questions="questions" 
                    :singleQuestion="singleQuestion"
                    :questionOperationStatus="questionOperationStatus"
                    
                    @changeComp="changeComp" 
                    @storeQuestion="storeQuestion"
                    @change-viewed-comp="changeComp"
                    @add-new-question="addNewQuestion"
                    @update-operation-status="updateOperationStatus"></component>

                </div>

            </div>
        </div>

        
    </div>
</template>

<style>

</style>