<template>
  <div class="upload__information_container">
    <div class="upload__container">
      <h3>Zmień swoj krótki opis</h3>
      <v-textarea
        label="Krótki opis siebie"
        v-model="text.information"
        bg-color="white"
      ></v-textarea>
      <v-btn @click="uploadInformation">Zapisz</v-btn>
    </div>
  </div>
</template>

<script>
import { reactive, computed, watch } from "vue";
import { fetchData } from "../../JS/fetch";
import { notification } from "../../JS/Notification";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const text = reactive({
      id: null,
      information: null,
    });

    const informationMe = computed(() => {
      return store.getters["admin/loadInformationMe"];
    });

    watch(informationMe, (newVal) => {
      text.id = newVal.id;
      text.information = newVal.information;
    });

    const uploadInformation = async () => {
      const url = "";
      const method = "PUT";
      const headers = {
        authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = {
        id: text.id,
        information: text.information,
      };
      const response = await fetchData(url, method, headers, body, "body")
      notification(response)
      store.dispatch("admin/loadInformationHome");
    };

    return { text, uploadInformation, informationMe };
  },
};
</script>

<style lang="scss" scoped>
.upload__information_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  .upload__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;

    h3 {
      font-size: 2rem;
      color: white;
      text-align: center;
    }
  }
}

@media (min-width: 750px) {
  .upload__information_container {
    .upload__container {
      width: 70%;
      h3 {
        text-align: left;
      }
    }
  }
}
</style>
