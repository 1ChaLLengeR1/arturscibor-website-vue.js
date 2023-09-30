<template>
  <li class="item__update__delete">
    <h3>{{ id }}</h3>
    <div class="inputs__name__numeric">
        <v-text-field
        label="Nazwa"
        bg-color="white"
        v-model="item.name"
      ></v-text-field>
      <v-text-field
      label="Dodaj Numeracje"
      bg-color="white"
      v-model="item.numeric"
    ></v-text-field>
    </div>
    
    <v-textarea
      name="input-7-1"
      variant="filled"
      label="Opis"
      auto-grow
      bg-color="white"
      v-model="item.information"
    ></v-textarea>
    <div class="buttons__box">
      <v-btn color="blue" @click="update"> Zaaktualizuj </v-btn>
      <v-btn color="black" @click="deleteItem">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <path
            d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"
          ></path>
        </svg>
      </v-btn>
    </div>
  </li>
</template>

<script>
import { toRefs, reactive, watch } from "vue";
import { fetchData } from "../JS/fetch";
import { notification } from "../JS/Notification";
import { useStore } from "vuex";
export default {
  props: ["id", "name", "information", "numeric"],
  setup(props) {
    // values
    const store = useStore();
    const { id, name, information, numeric } = toRefs(props);
    const item = reactive({
      id: "",
      name: "",
      information: "",
      numeric:null
    });
    const itemProps = reactive({
      id: id,
      name: name,
      information: information,
      numeric:numeric
    });

    // functions
    setTimeout(()=>{
        item.id = itemProps.id
        item.name = itemProps.name
        item.information = itemProps.information
        item.numeric = itemProps.numeric
    }, 100)

    const deleteItem = async () => {
      const url = "";
      const method = "DELETE";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = { id: item.id };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadReadMore");
    };

    const update = async () => {
      const url = "";
      const method = "PUT";
      const headers = {
        Authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = {
        id: item.id,
        name: item.name,
        information: item.information,
        numeric: item.numeric
      };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadReadMore");
    };

    return { item, itemProps, deleteItem, update };
  },
};
</script>

<style lang="scss" scoped>
.item__update__delete {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    width: 100%;
    font-size: 2rem;
    text-align: center;
    color: white;
  }

  .inputs__name__numeric{
    display: flex;
    flex-direction: column;
  }

  .buttons__box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    svg {
      fill: red;
    }
  }
}
@media (min-width: 750px) {
  .item__update__delete {
    h3 {
      text-align: left;
    }
    .inputs__name__numeric{
        flex-direction: row;
        gap: 1rem;
      }
  }
}
</style>
