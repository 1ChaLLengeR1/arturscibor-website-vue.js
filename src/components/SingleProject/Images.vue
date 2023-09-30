<template>
  <div class="images__container">
    <div class="box__images">
      <h3>{{ title }}</h3>
      <img src="../../images/brak.png" alt="empty images" v-if="checkImages" />
      <v-carousel show-arrows="hover" v-else hide-controls :height="fullScreen">
        <v-carousel-item
          v-for="(item, i) in images"
          :key="i"
          :src="item.link"
          max-width="100%"
          max-height="100%"
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  props: ["images", "title"],
  setup(props) {
    const images = computed(() => {
      return props.images;
    });

    const checkImages = computed(() => {
      if (props.images.length === 0) {
        return true;
      }
      return false;
    });

    const fullScreen = ref("85vh");
    const checkScreenCarusel = () => {
      if (window.innerWidth >= 750) {
        fullScreen.value = "85vh";
      } else {
        fullScreen.value = "100%";
      }
    };
    window.addEventListener("resize", checkScreenCarusel);
    checkScreenCarusel();
    return { fullScreen, checkScreenCarusel, images, checkImages };
  },
};
</script>

<style lang="scss" scoped>
.images__container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .box__images {
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--secend-bg-color);
    border-radius: 8px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 1);

    img {
      max-width: 100%;
      max-height: 100%;
    }
    h3 {
      font-size: 15px;
      text-align: center;
      color: var(--text-color);

      @media (min-width: 750px) {
        font-size: 30px;
      }
    }
  }
}
@media (min-width: 750px) {
  .images__container {
    .box__images {
      width: 80%;
    }
  }
}
</style>
