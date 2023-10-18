<script>
    import axios from 'axios';
    import QuestionItem from '@/components/QuestionItem.vue'

    export default {
        name: "userWelcomePage",
        components: {
            'question-item' : QuestionItem
        },
        data() {
            return{
                userData: null,
                userName: null,
                info: null, // grabs all the questions
                numberOfquestions: 0, // how many questions there are
                questionIndex: 0, // know what question we are on
                error: false,
                chosenOptions: [], // stores the users answers
            }
        },
        mounted() {
            this.check();

            axios.get('http://localhost:3000/api/questions')
            .then(response => {
                this.info = response.data;

                this.numberOfquestions = this.info.length;

                this.addStatus(); // run the addStatus method
            })
            .catch(err => console.log(err));

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
                    this.userData = response.data; 
                    this.userName = this.userData.name;
                })
                .catch((err) => { 
                    console.log(err);
                });
            },
            handleData(data) {
                // updates the property to store their answer
                this.chosenOptions[data.index].answered = data.answered;
                this.chosenOptions[data.index].userAnswer.answer = data.option;
                this.chosenOptions[data.index].stressPercent = data.stressPercent;

                // also remove the error message
                this.error = false;
            },
            addStatus() {
                for (var i = 0; i < this.numberOfquestions; i++) {
                    // adds an object for each question to know if it has been answered

                    const defaultOption = {
                        answered: false, 
                        weight: this.info[i].weight,
                        userAnswer: {
                            question: this.info[i].question, 
                            answer: ''
                        },
                        stressPercent: 0
                    }
                    this.chosenOptions.push(defaultOption);
                }
            },
            nextQuestion() {
                if (this.chosenOptions[this.questionIndex].answered === true) {
                    this.error = false;

                    this.questionIndex++;
                } else {
                    this.error = true;
                }
            },
            previousQuestion(){
                this.questionIndex--;
                // if there was an error before
                this.error = false;
            },
            submitAnswer(event) {
                event.preventDefault();

                axios.put(`http://localhost:3000/api/submit-answer/${this.userData._id}`, this.chosenOptions)
                .then((response) => {
                    if(response.status === 200) {
                        this.$router.push('/thank-you')
                    } else{
                        console.log(response);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            }
        }
    }
</script>

<template>

    <div>
        
        <div class="container my-4">
            <!-- <h1>Welcome {{userData.name}}</h1> -->
            <h1>Welcome {{ userName }}</h1>

            <p class="mb-5">please answer the following questions</p>

            <form @submit="submitAnswer">

                <div v-for="(item, $index) in info" :key="item._id">
                    <question-item
                        class="questionItem"
                        :question="item.question"
                        :options="item.options"
                        :index="$index"
    
                        v-show="questionIndex === $index"
                        @answer-emitted="handleData"
                    />
                </div>

                <div class="btn-container">
                    <button class="btn btn-primary mr-2" type="button" @click="previousQuestion" v-show="questionIndex > 0">Back</button>

                    <button class="btn btn-primary mr-2" type="button" @click="nextQuestion" v-if="questionIndex < (numberOfquestions - 1)">Next</button>

                    <button class="btn btn-primary" type="submit" @click="submitAnswer" v-else>Submit</button>
                </div>
            </form>


        </div>
    </div>
</template>


<style scoped>
</style>