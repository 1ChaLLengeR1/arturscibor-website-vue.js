<template>
  <div class="main__container__aboutme">
    <Transition name="bounce">
      <read-more
        v-if="readMoreBackground"
        :arrayItems="loadReadMore"
        @close-readmore="closeReadMore"
      ></read-more>
    </Transition>
    <div class="image__container">
      <img :src="loadInformationAboutMe.link_image"/>
    </div>
    <div class="context__container">
      <h2 class="about"><span>{{loadInformationAboutMe.name}}</span></h2>
      <h3>{{loadInformationAboutMe.job}}</h3>
      <p>
       {{ loadInformationAboutMe.information }}
      </p>
      <v-btn
        class="button__read"
        rounded
        width="20rem"
        height="3rem"
        size="large"
        @click="readMore"
      >
        Przeczytaj Więcej!
      </v-btn>
    </div>
  </div>
</template>

<script>
import ReadMore from "../components/AboutMe/ReadMoreAboutMe.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    "read-more": ReadMore,
  },
  setup() {
    const store = useStore()
    const readMoreBackground = ref(false);

    store.dispatch('admin/loadInformationAboutMe')
    const loadInformationAboutMe = computed(()=>{
      return store.getters['admin/loadInformationAboutMe']
    })

    store.dispatch('admin/loadReadMore')
    const loadReadMore = computed(()=>{
      return store.getters['admin/loadReadMore']
    })

    const readMore = () => {
      readMoreBackground.value = true;
    };

    const closeReadMore = (val) => {
      readMoreBackground.value = val;
    };

    return { readMoreBackground, readMore, closeReadMore, loadInformationAboutMe, loadReadMore };
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/aboutme.scss";
</style>
