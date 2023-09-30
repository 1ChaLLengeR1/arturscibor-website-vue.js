<template>
  <div class="container__main__tools">
    <div class="title__container">
      <p>To są narzędzia, z któych korzystam w trakcie budowania strony</p>
      <hr />
    </div>
    <ul class="tools__items">
      <li class="item" v-for="item of loadTools" :key="item.id">
        <img :src="item.link_image" alt="icon" />
        <h3>{{item.name}}</h3>
        <p>
          {{ item.information }}
        </p>
        <div class="box__progress">
            <p>Poziom Umiejętności</p>
            <h3>{{item.progress}}</h3>
        </div>
        <a :href="item.link" alt="link do strony">Więcej na oficjalnej stronie</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  setup() {
    const store = useStore()
    store.dispatch('admin/loadTools');
    const loadTools = computed(()=>{
        return store.getters['admin/loadTools'].sort((l1, l2) => l1.numeric - l2.numeric)
    })

    return {loadTools};
  },
};
</script>

<style lang="scss" scoped>
.container__main__tools {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: var(--bg-color);

  .title__container {
    width: 100%;
    min-height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    animation: slideHeader 1s ease forwards;
    @keyframes slideHeader {
      0% {
        transform: translateY(-100px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    p {
      font-size: 25px;
      font-weight: bold;
      text-align: center;
      color: var(--main-color);
    }
    hr {
      width: 95%;
      height: 1px;
      background-color: var(--main-color);
    }

    
   
  }
  .tools__items {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 3rem;
    padding: 1rem;
    animation: slideTools 1s ease forwards;
    @keyframes slideTools {
      0% {
        transform: translateY(100px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .item {
      width: 20rem; 
      height: max-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem;
      background-color: var(--secend-bg-color);
      border-radius: 8px;
      box-shadow: 0px 0px 8px -2px rgba(0, 0, 0, 1);
      list-style: none;
      img {
        width: 5rem;
        height: 5rem;
      }
      h3 {
        font-size: 35px;
        text-align: center;
        color: var(--main-color);
      }
      p {
        font-size: 17px;
        text-align: center;
        color: white;
      }
      .box__progress{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--main-color);
        border-radius: 8px;
        padding: 0.5rem;
        gap: 1rem;

        p{
            font-size: 15px;
            font-weight: bold;
            color: black;
        }
        h3{
            font-size: 17px;
        }
      }
      a {
        width: 100%;
        display: block;
        padding: 0.8rem;
        color: var(--secend-bg-color);
        box-shadow: 0 0 0.5rem var(--main-color);
        background: var(--main-color);
        border-radius: 8px;
        letter-spacing: 0.1rem;
        font-size: 13px;
        font-weight: 600;
        transition: 0.3s ease;
      }
      a:hover{
        box-shadow: none;
      }
    }
  }
}
@media (min-width: 750px) {
  .container__main__tools {
    .title__container {
      p {
        font-size: 35px;
      }
    }
    .tools__items {
      width: 80%;
      .item {
        padding: 1rem;
        img {
          width: 6rem;
          height: 6rem;
        }
        h3 {
          font-size: 40px;
        }
        p {
          font-size: 20px;
        }
        .box__progress{
            width: 90%;
            p{
                font-size: 17px;
            }
            h3{
                font-size: 20px;
            }
        }
        a {
          font-size: 15px;
          box-shadow: 0 0 1rem var(--main-color);
        }
      }
    }
  }
}
</style>
