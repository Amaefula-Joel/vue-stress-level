<template>
    <div>
        <h3>{{ question }}</h3>
        
        <div class="options-container">
            <label v-for="x in options" :key="x.option" :class="{chosen: whetherSelected === x.option}">
                {{ x.option }}
                <input type="radio" v-model="selected" :name="'option'+ (index + 1)" :value="x.option" @change="optionSelect(x.option), sendAnswer(index, x.option, x.stressPercent)">
            </label>
        </div>
    </div>   
</template>

<script>

    export  default {
        name: 'QuestionItem',
        props: {
            question: String,
            options: Array,
            index: Number
        },
        data () {
            return{
                selected: false,
                whetherSelected: this.selectedOption,
                userAnswer: {
                    index: null,
                    answered: false, 
                    option: '',
                    stressPercent: 0
                }
            }
        },
        methods: {
            optionSelect(option) {
                this.whetherSelected = option;
            },
            sendAnswer(index, answer, stressPercent) {
                this.userAnswer = {
                    index: index,
                    answered: true, 
                    option: answer,
                    stressPercent: stressPercent
                }
                
                this.$emit('answer-emitted', this.userAnswer);
            }
        }
    }
</script>

<style scoped>
    h2{
        text-align: left;
        margin-bottom: 15px;
    }

    .options-container{
        margin-bottom: 34px;
    }

    .options-container label{
        display: inline-block;
        border: 2px solid rgb(150, 150, 150);
        padding: 10px;
        margin-bottom: 10px;
        /* width: 100%; */
        display: flex;
        justify-content: space-between;
    }

    .options-container label.chosen{
        background-color: rgb(210, 210, 243);
    }

</style>