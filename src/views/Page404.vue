<template>
  <main>
    <div class="main__box">
      <h1>404</h1>
      <div class="box__info">
        <p>{{ information || "Opps! Strona nie została odnaleziona" }}</p>
      </div>
      <div class="box__paragraf">
        <p>
          {{
            error ||
            " Strona, której szukasz jest niedostępna. Może popełniłeś błąd wpisaniu adresu. Sprówbuj ponownie, lub wróci do głównej strony za pomocąguzika!"
          }}
        </p>
      </div>
      <div>
        <v-btn
          class="button"
          color="black"
          block
          rounded="xl"
          @click="backToMainPage"
          >Wróć do strony głównej</v-btn
        >
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore()

    const information = ref(null)
    const error = ref(null)

    try {
      error.value = store.getters['util/informationObject'].error
      information.value = store.getters['util/informationObject'].information
      setTimeout(()=>{
        store.commit('util/informationObject', null)
      },500)
    } catch (error) {
      error.value = null
      information.value = null
    }
    
    const backToMainPage = () => {
      router.push({ name: "home" });
    };
    return { backToMainPage, information, error };
  },
};
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow: auto;
  background: rgb(31, 36, 45);
  background: linear-gradient(
    90deg,
    rgba(31, 36, 45, 1) 0%,
    rgba(50, 57, 70, 1) 100%
  );
  .main__box {
    min-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0px 0px 24px 0px rgba(10, 10, 10, 1);
    background-image: url("../images/p404.png");
    background-repeat: repeat;
    @media (min-width: 750px) {
      min-width: 80%;
      height: 45rem;
    }
    h1 {
      margin: 0;
      padding: 0;
      font-size: 7rem;
      font-weight: bold;
      color: white;
      @media (min-width: 750px) {
        font-size: 20rem;
        line-height: 16rem;
      }
    }
    .box__info {
      width: 95%;
      min-height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      @media (min-width: 750px) {
        width: 25rem;
      }
      p {
        margin: 0;
        font-size: 0.8rem;
        font-weight: bold;
        @media (min-width: 750px) {
          font-size: 1.2rem;
        }
      }
    }
    .box__paragraf {
      width: 100%;
      height: 7rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      @media (min-width: 750px) {
        width: 80%;
        height: 5rem;
      }
      p {
        margin: 0;
        font-size: 1rem;
        font-weight: bold;
        color: white;
        @media (min-width: 750px) {
          font-size: 1.3rem;
        }
      }
    }
    .button {
      width: 100%;
      height: 3rem;
      font-size: 0.8rem;
      @media (min-width: 750px) {
        width: 20rem;
        height: 3rem;
      }
    }
  }
}
</style>
