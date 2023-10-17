<script>
    import axios from 'axios'

    export default {
        name: 'createQuestion',
        data() {
            return{
                optionFieldLeft: 1,
                question: '',
                weight: null,
                options: [{option: "", stressPercent: null}]
            }
        },
        watch: {
            
        },
        methods: {
            submitQuestion(event) {
                event.preventDefault();

                axios.post('http://localhost:3000/api/create-new-question', {question: this.question, weight: this.weight, options: this.options})
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
                this.options.push({option: "", stressPercent: null})

            },
            removeOption (n) {
                this.optionFieldLeft--;
                this.options.splice(n, 1);
            }
        }
    }
</script>

<template>

    <div>
        <h3>Create Question</h3>
        
        <div class="mb-3">
            <button class="btn btn-dark" @click="this.$emit('change-viewed-comp', 'view-questions');"><i class="fa fa-chevron-left"></i> Go Back </button>
        </div>

        <form @submit="submitQuestion">

            <div class="form-group">
                <label class="mb-2">Question</label>
                <textarea placeholder="Question" class="form-control" cols="2" v-model="question" required> </textarea>
            </div>

            <div class="form-group w-25">
                <label class="mb-2">Weight</label>
                <input type="number" placeholder="0.1-1.0" class="form-control" step="0.1" min="0.1" max="1.0" v-model="weight" required>
            </div>

            <div>
                <div class="d-flex align-items-center" v-for="(i) in optionFieldLeft" :key="i">
                    <div class="d-flex flex-grow-1 mr-2">
                        <div class="form-group w-75 mr-2">
                            <label class="mb-2">Options</label>
                            <input type="text" placeholder="Option" class="form-control" v-model="options[i - 1].option" required>
                        </div>
                        <div class="form-group w-25">
                            <label class="mb-2">Stress Percent</label>
                            <input type="number" placeholder="1-10" min="1" max="10" class="form-control" v-model="options[i - 1].stressPercent" required>
                        </div>
                    </div>

                    <div class="flex-grow-0">
                        <button type="button" class="btn btn-danger" @click="removeOption(i - 1)"> <i class="fa fa-times"></i> </button>
                    </div>
                </div>

                <div class="mb-4">
                    <button type="button" class="btn btn-primary mr-2" @click="plusOption(1)">Add More Options</button>
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

    .form-control{
        border: 1px solid rgb(148, 148, 148);
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none;
        appearance: none;
    }
</style>