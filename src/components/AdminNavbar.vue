<template>
    <div class="sub-nav d-flex flex-column align-items-center p-3 bg-light text-center">
        <div class="mb-3 pb-2 border-bottom">
            <div class="avatar d-flex justify-content-center align-items-center rounded-circle">
                <i class="fa fa-cog"></i>
            </div>
        </div>

        <div>
            <div class="component-link-con bg-light mb-3">
                <button class="component-link text-dark p-2 d-block rounded border-0 w-100" @click="toggleComp('user-table')">
                    <i class="fa fa-male d-block"></i>
                    <span class="d-block font-weight-bold">Users</span>
                </button>
            </div>
            <div class="component-link-con bg-light mb-3">
                <button class="component-link text-dark p-2 d-block rounded border-0 w-100" @click="toggleComp('stress-chart')">
                    <i class="fa fa-bar-chart d-block"></i>
                    <span class="d-block font-weight-bold">Chart</span>
                </button>
            </div>
            <div class="component-link-con bg-light mb-3">
                <a href="/admin/editQuestions" class="component-link text-dark p-2 d-block rounded border-0 w-100">
                    <i class="fa fa-bar-chart d-block"></i>
                    <span class="d-block font-weight-bold">Edit Questions</span>
                </a>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'adminNavbar',
        data() {
            return{

            }
        },
        methods: {
            toggleComp(component) {
                this.$emit('toggle-component', component);
            }
        }
    }
</script>

<style scoped>
    .sub-nav{
        max-width: 100px;
    }

    .avatar{
        height: 40px;
        width: 40px;
        font-size: 20px;
        background-color: rgb(218, 218, 218);
    }

    .component-link{
        background-color: transparent;
    }
    .component-link:hover{
        text-decoration: none;
        background-color: rgb(180, 180, 180);
    }
    .component-link i{
        font-size: 19px;
    }

</style>