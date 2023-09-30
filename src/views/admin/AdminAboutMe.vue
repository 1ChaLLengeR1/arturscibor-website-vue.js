<template>
    <div class="admin__aboutme__container">
        <upload-information></upload-information>
        <read-more></read-more>
    </div>
</template>

<script>
import Upload_information from '../../components/AboutMe_Admin/InformationMe.vue';
import ReadMore from '../../components/AboutMe_Admin/ReadMore.vue';
import { useStore } from 'vuex';
import store from '../../storage';
export default {
    components:{
        'upload-information':Upload_information,
        'read-more':ReadMore
    },
    setup () {
        const store = useStore()
        store.dispatch('admin/loadInformationAboutMe')
        store.dispatch('admin/loadReadMore')
        return {}
    }
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