<script>
    import axios from 'axios'

    export default {
        name: 'fullQuestion',
        props: {
            'singleQuestion': Object,
        },
        data () {
            return {
                deleteStatus: false
            }
        },
        methods: {
            deleteQuestion() {
                const questionID =  this.singleQuestion._id;
                axios.delete(`http://localhost:3000/api/delete-question/${questionID}`)
                .then((response) => {
                    if (response.data.message === "Successly deleted") {
                        this.$emit('update-questions');
                        this.$emit('update-operation-status', "delete");

                        this.$emit('change-viewed-comp', 'view-questions');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<template>

    <div>

        <div class="mb-3">
            <button class="btn btn-dark" @click="this.$emit('change-viewed-comp', 'view-questions');"><i class="fa fa-chevron-left"></i> Go Back</button>
        </div>

        <h3>Full Questions Details</h3>
        
        <div>

            <ul>
                <li>Question: <b>{{ singleQuestion.question }}</b></li>
                <li>Weight <b>{{ singleQuestion.weight }}</b></li>
                <li>Options:
                    <ol>
                        <li v-for="item in singleQuestion.options" :key="item._id"> 
                            {{ item.option }} <b>(rating: {{ item.stressPercent }})</b> 
                        </li>
                    </ol>
                </li>
            </ul>

            <div>
                <button class="btn btn-success mr-2">Edit</button>
                <button class="btn btn-danger" @click="deleteStatus = !deleteStatus">Delete</button>
            </div>
        </div>

        <Transition>
            <div style="transition: all .4s; transform-origin: top; background-color: rgb(255, 204, 204);" v-if="deleteStatus" class="p-3">
                <p>Are you sure? </p>
    
                <div>
                    <button class="btn btn-success mr-2" @click="deleteQuestion">Yes</button>
                    <button class="btn btn-danger" @click="deleteStatus= false">No</button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
    .v-enter-from{
        opacity: 0;
        transform: scaleY(0);
    }
    .v-enter-to{
        opacity: 1;
        transform: scaleY(1);
    }
    .v-leave-from{
        opacity: 1;
        transform: scaleY(1);
    }
    .v-leave-to{
        opacity: 0;
        transform: scaleY(0);
    }
</style>