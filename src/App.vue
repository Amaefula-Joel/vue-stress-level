
<template>

  <div>

    <router-view></router-view>
  </div>
  
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css';
  import 'bootstrap/dist/js/bootstrap.js';
  import 'font-awesome/css/font-awesome.min.css'
  import 'animate.css'

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  
  

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  export default {
    data() {
      return{
        
      }
    },
    methods: {
      
    },
    mounted() {
      
    }
  }
</script>

<style>
  body{
      background-color: rgb(243, 243, 243);
  }
  .form-control{
    border: 1px solid rgb(119, 119, 119);
  }
</style>
