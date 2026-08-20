<template>
  <div class="admin__home__container">
    <add-jobs></add-jobs>
    <upload-information></upload-information>
    <upload-cv></upload-cv>
  </div>
</template>

<script>
import AddJobs from "../../components/Home_Admin/Jobs/AddJobs.vue";
import Upload_information from "../../components/Home_Admin/Information_Cv/Upload_information.vue";
import UploadCv from "../../components/Home_Admin/Information_Cv/UploadCv.vue";
export default {
  components: {
    "add-jobs": AddJobs,
    "upload-information": Upload_information,
    "upload-cv": UploadCv,
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
