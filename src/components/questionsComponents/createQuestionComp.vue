<script>
    import axios from 'axios'

    export default {
        name: 'createQuestion',
        data() {
            return{
                optionFieldLeft: 1,
                question: '',
                options: [{option: "", stressRating: 1}]
            }
        },
        watch: {
            
        },
        methods: {
            submitQuestion(event) {
                event.preventDefault();

                axios.post('http://localhost:3000/api/create-new-question', {question: this.question, options: this.options})
                .then((response) => {
                    const savedQuestion = response.data.newQuestion;
                    // update the questions
                    this.$emit('add-new-question', savedQuestion); 

                    this.$emit('changeComp', 'view-questions');
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            plusOption(n) {
                
                this.optionFieldLeft += n;

                if (n === 1) {
                    console.log("positive");
                    this.options.push({option: "", stressRating: 1})
                } else if(n === -1) {
                    // if there is only one option field left
                    if (this.optionFieldLeft < 1) {
                        this.optionFieldLeft = 1;
                    } else{
                        this.options.pop()
                    }
                }

            }
        }
    }
</script>

<template>

    <div>
        <h3>Create Question</h3>
        
        <div>
            <button class="btn btn-dark" @click="this.$emit('change-viewed-comp', 'view-questions');"><i class="fa fa-chevron-left"></i> Go Back </button>
        </div>

        <form @submit="submitQuestion">
            <div class="form-group">
                <label class="">Question</label>
                <textarea placeholder="Question" class="form-control" cols="2" v-model="question" required> </textarea>
            </div>
            <div>
                <p>Options</p>

                <div class="d-flex" v-for="(i) in optionFieldLeft" :key="i">
                    <div class="form-group w-75">
                        <input type="text" placeholder="Option" class="form-control" v-model="options[i - 1].option" required>
                    </div>
                    <div class="form-group w-25">
                        <input type="number" placeholder="Stress Rating" min="1" class="form-control" v-model="options[i - 1].stressRating" required>
                    </div>
                </div>

                <div class="mb-4">
                    <button type="button" class="btn btn-primary mr-2" @click="plusOption(1)">Add More Options</button>
                    <button type="button" class="btn btn-primary" @click="plusOption(-1)">Remove Option</button>
                </div>
            </div>

            <button type="submit" class="btn btn-success">Create Question</button>
        </form>
    </div>
</template>

<style scoped>
    textarea{
        resize: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none;
        appearance: none;
    }
</style>