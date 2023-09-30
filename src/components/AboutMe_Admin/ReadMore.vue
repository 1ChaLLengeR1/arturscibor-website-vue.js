<template>
  <div class="readmore__container">
    <div class="readmore__box">
      <h3>Dodaj ReadMore</h3>
      <div class="add__item">
        <div class="inputs__name__numeric">
          <v-text-field
          label="Dodaj nazwa"
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
          label="Dodaj opis"
          auto-grow
          bg-color="white"
          v-model="item.information"
        ></v-textarea>
        <v-btn color="green" @click="addItem" :disabled="checkInputsAddItem">
          Dodaj
        </v-btn>
      </div>
      <ul class="items__box">
        <item-update-delete
          v-for="item in loadloadReadMore"
          :key="item"
          :id="item.id"
          :name="item.name"
          :information="item.information"
          :numeric="item.numeric"
        ></item-update-delete>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import { fetchData } from "../JS/fetch";
import { notification } from "../JS/Notification";
import ItemUpdateDelete from "./ItemUpdateDelete.vue";
export default {
  components: {
    "item-update-delete": ItemUpdateDelete,
  },
  setup() {
    const store = useStore();
    const item = reactive({
      name: "",
      information: "",
      numeric:null
    });

    const addItem = async () => {
      const url = "";
      const method = "POST";
      const headers = {
        authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = {
        name: item.name,
        information: item.information,
        numeric:item.numeric
      };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadReadMore");
      item.name = "";
      item.information = "";
      item.numeric = null
    };

    const checkInputsAddItem = computed(() => {
      if (item.name === "" || item.information === "" || item.numeric === null) {
        return true;
      }
      return false;
    });

    const loadloadReadMore = computed(() => {
      return store.getters["admin/loadReadMore"];
    });

    return { addItem, item, checkInputsAddItem, loadloadReadMore };
  },
};
</script>

<style lang="scss" scoped>
.readmore__container {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  .readmore__box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      width: 100%;
      font-size: 2rem;
      text-align: center;
      color: white;
    }

    .add__item {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .inputs__name__numeric{
        display: flex;
        flex-direction: column;
      }
    }

    .items__box {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      gap: 1rem;
      list-style: none;
    }
  }
}
@media (min-width: 750px) {
  .readmore__container {
    .readmore__box {
      width: 70%;
      h3 {
        text-align: left;
      }

      .add__item{
        .inputs__name__numeric{
          flex-direction: row;
          gap: 1rem;
        }
      }
    }
  }
}
</style>
