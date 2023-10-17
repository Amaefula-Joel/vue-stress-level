<script>
    export default {
        name: "viewQuestionComp",
        props: {
            'questions': Array,
            'questionOperationStatus': Object,
        },
        data() {
            return{
                // number: 21
            }
        },
        methods: {
            fullQuestion(selectedQues) {
                this.$emit('change-viewed-comp', 'full-question');
                this.$emit('storeQuestion', selectedQues);
            },
            createQuestion () {
                this.$emit('create-question');
            }
        }
    }
</script>

<template>

    <div>
        <div class="questions">
            
            <h3 class="mb-4"> All Questions</h3>
            
            <div class="mb-3">
                <button class="btn btn-dark" @click="this.$emit('change-viewed-comp', 'create-question');"><i class="fa fa-plus"></i> Create New Question</button>
            </div>

            <div v-if="questionOperationStatus.status && questionOperationStatus.operation === 'create'" class="alert alert-success">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Success!</strong> New Question Successfully Added.
            </div>
            <div v-else-if="questionOperationStatus.status && questionOperationStatus.operation === 'delete'" class="alert alert-danger">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Success!</strong> Question Successfully Deleted.
            </div>

            <div class="container-fluid">
                <div class="row row-cols-md-2 row-cols-1">
                    <div v-for="(questionItem, index) in questions" :key="questionItem._id" class="p-1">

                        <div class="px-3 py-4 bg-dark">
                            <p class="text-light mb-3">{{ index + 1 + ". " + questionItem.question }}</p>
    
                            <div class="text-center">
                                <button class="btn btn-light mr-2" @click="fullQuestion(questionItem)">See More</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>