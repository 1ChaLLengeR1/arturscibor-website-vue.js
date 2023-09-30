<template>
  <div class="main__container__projects">
    <h1>Projekty, które wykonałem, bądz brałem udział</h1>
    <ul class="box__projects">
      <li v-for="item in loadProjects" :key="item">
        <img :src="item.file_link" alt="photo_project" />
        <div class="box">
          <h2>{{ item.name_project }}</h2>
          <p>{{ item.short_description }}</p>
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="256"
              height="256"
              viewBox="0 0 128 128"
              @click="singleProject(item.id)"
            >
              <path
                d="M 84 11 C 82.3 11 81 12.3 81 14 C 81 15.7 82.3 17 84 17 L 106.80078 17 L 60.400391 63.400391 C 59.200391 64.600391 59.200391 66.499609 60.400391 67.599609 C 61.000391 68.199609 61.8 68.5 62.5 68.5 C 63.2 68.5 63.999609 68.199609 64.599609 67.599609 L 111 21.199219 L 111 44 C 111 45.7 112.3 47 114 47 C 115.7 47 117 45.7 117 44 L 117 14 C 117 12.3 115.7 11 114 11 L 84 11 z M 24 31 C 16.8 31 11 36.8 11 44 L 11 104 C 11 111.2 16.8 117 24 117 L 84 117 C 91.2 117 97 111.2 97 104 L 97 59 C 97 57.3 95.7 56 94 56 C 92.3 56 91 57.3 91 59 L 91 104 C 91 107.9 87.9 111 84 111 L 24 111 C 20.1 111 17 107.9 17 104 L 17 44 C 17 40.1 20.1 37 24 37 L 69 37 C 70.7 37 72 35.7 72 34 C 72 32.3 70.7 31 69 31 L 24 31 z"
              ></path>
            </svg>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter()
    //functions
    store.dispatch("admin/loadProjects");

    const singleProject = (id) =>{
      router.push({
        name:'singleproject',
        params:{
          id:id
        }
      })
    }

    //computed
    const loadProjects = computed(() => {
      return store.getters["admin/loadProjects"];
    });

    return { loadProjects, singleProject };
  },
};
</script>

<style lang="scss" scoped>
.main__container__projects {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  gap: 1rem;
  background: var(--secend-bg-color);

  h1 {
    width: 90%;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color: var(--main-color);
    border-bottom: 1px solid var(--main-color);
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
  }

  .box__projects {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
    list-style: none;
    animation: slideProjects 1s ease forwards;
    @keyframes slideProjects {
      0% {
        transform: translateY(100px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    li {
      width: 100%;
      min-height: 20rem;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 1);
      color: white;
      overflow: hidden;
      padding: 0.5rem;

      .box {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 8px;
        background: linear-gradient(rgba(0, 0, 0, 0.1), var(--main-color));
        transform: translateY(100%);
        transition: 0.5s ease;

        h2 {
          font-size: 30px;
          font-weight: bold;
          font-variant-caps: all-small-caps;
        }
        p {
          text-align: center;
          font-size: 13px;
          font-weight: bold;
          color: black;
        }
        .icon {
          display: flex;
          background-color: white;
          border-radius: 50%;
          padding: 1rem;
          cursor: pointer;
          svg {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }

      img {
        position: absolute;
        z-index: 0;
        max-width: 100%;
        max-height: 100%;
        transition: 0.5s ease;
      }
    }
    li:hover .box {
      transform: translate(0);
    }
    li:hover img {
      transform: scale(1.1);
    }
  }
}
@media (min-width: 750px) {
  .main__container__projects {
    h1 {
      font-size: 60px;
    }
    .box__projects {
      width: 70%;
      li {
        width: 25rem;
        min-height: 18rem;
        .box {
          p{
            font-size: 15px;
          }
          .icon {
            svg {
              width: 2rem;
              height: 2rem;
            }
          }
        }
      }
    }
  }
}
</style>
