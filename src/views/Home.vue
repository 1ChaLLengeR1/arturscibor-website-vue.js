<template>
  <div class="main__container__home">
    <section class="context_container">
      <h3>Cześć, to Ja</h3>
      <h1>Artur Ścibor</h1>
      <div class="text__typing">
        <div>
          <span>Jestem</span>
        </div>
        <div class="text">
          <span>{{ developer }}</span>
        </div>
      </div>
      <p>
        {{ informationMe }}
      </p>
      <social-media></social-media>
      <v-btn
        class="button__cv"
        rounded
        width="15rem"
        height="3rem"
        size="x-large"
        @click="downoloadCV"
      >
        Pobierz CV
      </v-btn>
    </section>
    <section class="image__container">
      <img :src="image" alt="My Image" />
    </section>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SocialMedia from "../components/Home/SocialMedia.vue";
export default {
  components: {
    "social-media": SocialMedia,
  },
  setup() {
    const store = useStore();
    let image = ref('../../src/images/portfolio.png')
    

    const developer = ref("Frontend Developer");
    store.dispatch("admin/loadArrayJobs");
    const arrayDevelopers = computed(() => {
      return store.getters["admin/loadArrayJobsName"];
    });

    store.dispatch("admin/loadInformationHome");
    const informationMe = computed(() => {
      return store.getters["admin/loadInformationMe"].information;
    });

    store.dispatch("admin/loadImagesPortfolio");
    const imagesMe = computed(() => {
      return store.getters["admin/loadImagesPortfolioLinks"];
    });
    
    const downoloadCV = async () => {
      const url = "";
      const method = "GET";
      const headers = {};

      store.commit('util/loadingSpinner', true)

      fetch(url, {
        method: method,
        headers: headers,
      })
        .then((res) => res.blob())
        .then((data) => {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = "arturscibor_cv";
          a.click();
        });

        store.commit('util/loadingSpinner', false)
    };

    let index = 0
    const iterationImages = () =>{
      const item = imagesMe.value[index]
      image.value = item
      if(index === imagesMe.value.length-1){
        index = 0
      }else{
        index++
      }
    }
    setInterval(iterationImages, 4000)

    setInterval(() => {
      const index = Math.floor(Math.random() * arrayDevelopers.value.length);
      const element = arrayDevelopers.value[index];
      developer.value = element;
    }, 4000);

    return { developer, informationMe, downoloadCV, imagesMe, image,iterationImages};
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/home.scss";
</style>
