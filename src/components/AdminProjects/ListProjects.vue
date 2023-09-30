<template>
  <ul class="main__listProjects__container">
    <li v-for="item in loadProjects" :key="item">
      <p>{{ item.name_project }}</p>
      <div class="icons">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 122.88 121.51"
          @click="showEditProject(item.id)"
        >
          <title>edit</title>
          <path
            d="M28.66,1.64H58.88L44.46,16.71H28.66a13.52,13.52,0,0,0-9.59,4l0,0a13.52,13.52,0,0,0-4,9.59v76.14H91.21a13.5,13.5,0,0,0,9.59-4l0,0a13.5,13.5,0,0,0,4-9.59V77.3l15.07-15.74V92.85a28.6,28.6,0,0,1-8.41,20.22l0,.05a28.58,28.58,0,0,1-20.2,8.39H11.5a11.47,11.47,0,0,1-8.1-3.37l0,0A11.52,11.52,0,0,1,0,110V30.3A28.58,28.58,0,0,1,8.41,10.09L8.46,10a28.58,28.58,0,0,1,20.2-8.4ZM73,76.47l-29.42,6,4.25-31.31L73,76.47ZM57.13,41.68,96.3.91A2.74,2.74,0,0,1,99.69.38l22.48,21.76a2.39,2.39,0,0,1-.19,3.57L82.28,67,57.13,41.68Z"
          />
        </svg>
        <svg
          @click.prevent="deleteProject(item.id)"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <title>delete</title>
          <path
            d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
          ></path>
        </svg>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { notification } from "../JS/Notification";
import { fetchData } from "../JS/fetch";
export default {
  emits: ["show-edit-project"],
  setup(_, context) {
    //values
    const store = useStore();

    //functions

    const showEditProject = (id) => {
      context.emit("show-edit-project", {
        show: true,
        id_project: id,
      });
    };

    store.dispatch("admin/loadProjects");

    const deleteProject = async (id) => {
      const url = "";
      const method = "DELETE";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = { id: id };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadProjects");
    };

    //computed
    const loadProjects = computed(() => {
      return store.getters["admin/loadProjects"];
    });

    return { loadProjects, deleteProject, showEditProject };
  },
};
</script>

<style lang="scss" scoped>
.main__listProjects__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  list-style: none;
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: white;
    color: black;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 2px rgb(71, 71, 71);

    p {
      font-size: 20px;
      font-weight: bold;
    }
    .icons {
      width: max-content;
      display: flex;
      align-items: center;
      gap: 2rem;
      svg {
        width: 2rem;
        height: 2rem;
        fill: blue;
        cursor: pointer;
      }
      svg:nth-child(even) {
        fill: red;
      }
    }
  }
}
@media (min-width: 750px) {
  .main__listProjects__container {
    width: 70%;

    li{
      p{
        font-size: 30px;
      }
      .icons{
        gap: 3rem;
      }
    }
  }
}
</style>
