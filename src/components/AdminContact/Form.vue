<template>
  <div class="form__box__container">
    <ul>
      <li v-for="item in loadMessage" :key="item.id">
        <p>{{ item.name }}</p>
        <div class="icons">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.88 121.51"
            @click="openMessage(item.id)"
          >
            <title>zobacz wiadomość</title>
            <path
              d="M28.66,1.64H58.88L44.46,16.71H28.66a13.52,13.52,0,0,0-9.59,4l0,0a13.52,13.52,0,0,0-4,9.59v76.14H91.21a13.5,13.5,0,0,0,9.59-4l0,0a13.5,13.5,0,0,0,4-9.59V77.3l15.07-15.74V92.85a28.6,28.6,0,0,1-8.41,20.22l0,.05a28.58,28.58,0,0,1-20.2,8.39H11.5a11.47,11.47,0,0,1-8.1-3.37l0,0A11.52,11.52,0,0,1,0,110V30.3A28.58,28.58,0,0,1,8.41,10.09L8.46,10a28.58,28.58,0,0,1,20.2-8.4ZM73,76.47l-29.42,6,4.25-31.31L73,76.47ZM57.13,41.68,96.3.91A2.74,2.74,0,0,1,99.69.38l22.48,21.76a2.39,2.39,0,0,1-.19,3.57L82.28,67,57.13,41.68Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            @click.prevent="deleteMessage(item.id)"
          >
            <title>delete</title>
            <path
              d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
            ></path>
          </svg>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { fetchData } from "../JS/fetch";
import { notification } from "../JS/Notification";
export default {
  emits: ["open-message"],
  setup(_, context) {
    //values
    const store = useStore();

    //functions
    store.dispatch("admin/loadMessage");

    const openMessage = (id) => {
      context.emit("open-message", {
        id: id,
        value: true,
      });
    };

    const deleteMessage = async (id) => {
      const url = "";
      const method = "DELETE";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = { id: id };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadMessage");
    };

    //computed
    const loadMessage = computed(() => {
      return store.getters["admin/loadMessage"];
    });

    return { loadMessage, deleteMessage, openMessage };
  },
};
</script>

<style lang="scss" scoped>
.form__box__container {
  width: 100%;
  display: flex;
  justify-content: center;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
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
        font-size: 15px;
        font-weight: bold;
      }
      .icons {
        width: max-content;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        svg {
          width: 1.5em;
          height: 1.5rem;
          fill: blue;
          cursor: pointer;
        }
        svg:nth-child(even) {
          fill: red;
        }
      }
    }
  }
}
@media (min-width: 750px) {
  .form__box__container {
    width: 70%;
    ul {
      li {
        p {
          font-size: 30px;
        }
        .icons {
          gap: 1rem;
          svg {
            width: 2em;
            height: 2rem;
          }
        }
      }
    }
  }
}
</style>
