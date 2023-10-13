
<script>

    import adminSideBar from '@/components/adminComponents/sideBar.vue'
    import adminNavbar from '@/components/adminComponents/navBar.vue'
    import axios from 'axios'
    import { Bar } from 'vue-chartjs'

    export default {
        name: 'stressChart',
        components: {
            Bar,
            'admin-sidebar' : adminSideBar,
            'admin-navbar' : adminNavbar
        },
        props: {
            
        },
        data() {
            return{
                num: 20,
                test: {
                    data: [{
                        number: {
                            userData: null,
                            one: this.num
                        }
                    }],
                    test2: this.num
                },
                barChart: {
                    data: {
                        labels: ['Normally Stressed', 'Averagely Stressed', 'Highly Stressed'],
                        datasets: [{
                            label: "Stress Rating",
                            data: [10, 30, 20],
                            backgroundColor: [
                                'rgba(54, 162, 25, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(255, 99, 132, 0.5)'
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true
                    }
                },
                chartData: [],
            }
        },
        created() {
            axios.get('http://localhost:3000/api/all-users')
            .then((response) => {
                this.userData = response.data;
                console.log(this.userData);


                // stores the correct data in the chart once component is created
                const normal = this.userData.filter((user) => { return user.stressPrediction === "Normally Stressed"});
                const average = this.userData.filter((user) => { return user.stressPrediction === "Averagely Stressed"});
                const high = this.userData.filter((user) => { return user.stressPrediction === "Highly Stressed"});
                
                this.chartData.push(normal.length, average.length, high.length);

                this.barChart.data.datasets[0].data = this.chartData;
            });
            
        },
        mounted() {
            
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

            <div class="content">
                <h1>Stress Chart</h1>

                <div class="w-50">
                    <Bar :data="barChart.data" :option="barChart.options"/>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>

</style>