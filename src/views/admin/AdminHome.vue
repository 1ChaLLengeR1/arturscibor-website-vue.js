<template>
  <div class="admin__home__container">
    <add-jobs></add-jobs>
    <upload-information></upload-information>
    <upload-cv :template="templateCv" :setup="setupCV"></upload-cv>
    <upload-images :template="templateImages" :setup="setupImages"></upload-images>
  </div>
</template>

<script>
import AddJobs from "../../components/Home_Admin/Jobs/AddJobs.vue";
import Upload_information from "../../components/Home_Admin/Information_Cv/Upload_information.vue";
import UploadFile from "../../components/Home_Admin/UploadFile.vue";
import {ref} from 'vue'
import { useStore } from "vuex";
export default {
  components: {
    "add-jobs": AddJobs,
    "upload-information": Upload_information,
    "upload-cv": UploadFile,
    "upload-images":UploadFile,
  },
  setup() {

    const templateCv = ref({
      nazwa: 'Zmień CV',
      multiple: false,
      classItemDelete: false
    })
    const setupCV = ref({
      formdata:{
        id: 'id_cv',
        item:'cv'
      },
      urlPost:'',
      methodFetch:'PUT',
      loadUrl:''
    })

    const templateImages = ref({
      nazwa: 'Załaduj zdjęcia Portfolio',
      multiple: true,
      classItemDelete: true
    })
    const setupImages = ref({
      formdata:{
        id: null,
        item:'images'
      },
      urlPost:'',
      methodFetch:'POST',
      loadUrl:''
    })

    const store = useStore();
    store.dispatch("admin/loadArrayJobs");
    store.dispatch("admin/loadInformationHome");
    return {templateCv, setupCV, templateImages, setupImages};
  },
};
</script>

<style lang="scss" scoped>
.admin__home__container {
  width: 100%;
  min-height: calc(100% - 5rem);
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
