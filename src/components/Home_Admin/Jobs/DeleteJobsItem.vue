<template>
  <li class="item__job">
    <h4>{{ name }}</h4>
    <v-btn @click="deleteJobs"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="30"
        height="30"
        viewBox="0 0 30 30"
      >
        <path
          d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
        ></path></svg
    ></v-btn>
  </li>
</template>

<script>
import { fetchData } from "../../JS/fetch";
import { useStore } from "vuex";
import { notification } from "../../JS/Notification";
export default {
  props: ["name", "id"],
  setup(props) {
    const store = useStore();
    const deleteJobs = async () => {
      const url = "";
      const method = "DELETE";
      const headers = {
        authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-type": "application/json",
      };
      const body = { id: props.id };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response)
      store.dispatch("admin/loadArrayJobs");
    };

    return { deleteJobs };
  },
};
</script>

<style lang="scss" scoped>
.item__job {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0.3rem;
  border-radius: 8px;

  svg {
    fill: red;
  }
  button {
    background: black;
  }
  h4 {
    letter-spacing: 0.1rem;
  }
}
</style>
