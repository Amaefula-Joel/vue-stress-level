<script>
    export default {
        name: 'adminSideBar',
        data() {
            return {

            }
        }
    }
</script>

<template>
    <aside class="sidebar bg-dark">
        <div class=" text-center bg-secondary py-3">
            <img src="/favicon.ico" alt="">
        </div>

        <div class="mt-3">
            <a href="/admin/users" class="d-block py-2 px-3 text-light"> <i class="fa fa-male mr-2"></i> Users</a>
            <a href="/admin/editQuestions" class="d-block py-2 px-3 text-light"> <i class="fa fa-question-circle mr-2"></i> Questions</a>
            <a href="/admin/stressChart" class="d-block py-2 px-3 text-light"> <i class="fa fa-bar-chart mr-2"></i> Chart</a>
        </div>
    </aside>
</template>

<style>
.sidebar{
    grid-column: 1;
    grid-row: 1 / span 2;
    width: 200px;
    min-height: 100vh;
}

</style>