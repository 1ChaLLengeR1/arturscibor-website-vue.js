<template>
    <div class="admin__aboutme__container">
        <upload-information></upload-information>
    </div>
</template>

<script>
import Upload_information from '../../components/AboutMe_Admin/InformationMe.vue';
export default {
    components:{
        'upload-information':Upload_information,
    },
}
</script>

<style lang="scss" scoped>
    .admin__aboutme__container{
        width: 100%;
        min-height: calc(100% - 5rem);
        background: var(--bg-color);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
