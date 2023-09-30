<template>
    <div class="title-header__container">
        <h1>{{name_project}}</h1>
        <hr />
    </div>
</template>

<script>
export default {
    props:['name_project'],
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
    .title-header__container{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--main-color);
        h1{
            font-size: 25px;
        }
        hr{
            width: 100%;
            height: 1px;
            background-color: var(--main-color);
        }
    }
    @media (min-width: 750px){
        .title-header__container{
            h1{
                font-size: 50px; 
            }
        }
    }
</style>