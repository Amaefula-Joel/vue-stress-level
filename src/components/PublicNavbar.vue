<template>
    <div class="mb-4">
        <nav class="navbar navbar-expand-md bg-dark navbar-dark">
            <!-- Brand -->
            <a class="navbar-brand" href="/">Questionaire</a>

            <!-- Toggler/collapsibe Button -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Navbar links -->
            <div class="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                    </li>
                </ul>

            <!-- <div v-show="userData != null"><a href="">link</a></div> -->
            </div>
        </nav>
    </div>
</template>

<script>
    export default{
        name: 'NavbarComp',
        data() {
            return{

            }
        }
    }
</script>