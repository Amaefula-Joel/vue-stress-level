<script>

    export default {
        name: "adminNavBar",
        data() {
            return{

            }
        }
    }
</script>

<template>
    <nav class="navbar navbar-expand navbar-light">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
                <a class="nav-link" href="/admin">Dashboard <span class="sr-only">(current)</span></a>
            </li>
            <!-- <li class="nav-item">
                <a class="nav-link" href="#">Users</a>
            </li> -->
        </ul>
        
        <div>
            <img style="width: 30px; height: 30px;" class="rounded-circle" src="/robot-gbff761b1d_1920.jpg" alt="avatar">
        </div>
    </nav>

</template>

<style >
    .navbar {
        grid-column: 2;
        background-color: rgb(231, 231, 231);
    }
</style>