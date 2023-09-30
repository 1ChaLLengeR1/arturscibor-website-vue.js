<template>
  <div class="add_jobs_container">
    <div class="add_container">
      <h3>Dodaj swoją prace!</h3>
      <div>
        <v-text-field
          label="Wpisz nazwę pracy!"
          class="input__job"
          v-model="inputJob"
        ></v-text-field>
      </div>
      <v-btn class="button__job" @click="addJob" :disabled="checkInputJob"
        >Dodaj</v-btn
      >
    </div>
    <ul class="show__jobs__container">
      <delete-job-item
        v-for="item in arrayJobs"
        :key="item"
        :id="item.id"
        :name="item.name"
      ></delete-job-item>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { fetchData } from "../../JS/fetch.js";
import { notification } from "../../JS/Notification.js";
import DeleteJobItem from "../Jobs/DeleteJobsItem.vue";
export default {
  components: {
    "delete-job-item": DeleteJobItem,
  },
  setup() {
    const store = useStore();
    const inputJob = ref("");
    const arrayJobs = computed(() => {
      return store.getters["admin/loadArrayJobs"];
    });

    const addJob = async () => {
      const url = "";
      const method = "POST";
      const headers = {
        authorization: `Bearer ${store.getters["auth/optionsTokens"].access_token}`,
        "Content-Type": "application/json",
      };
      const body = {
        job: inputJob.value,
      };
      const response = await fetchData(url, method, headers, body, "body");
      notification(response);
      store.dispatch("admin/loadArrayJobs");
      inputJob.value = "";
    };

    const checkInputJob = computed(() => {
      if (inputJob.value === "") {
        return true;
      }
      return false;
    });

    return { arrayJobs, inputJob, addJob, checkInputJob };
  },
};
</script>

<style lang="scss" scoped>
.add_jobs_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  gap: 1rem;

  .add_container {
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

    .input__job {
      color: white;
    }
    .button__job {
      font-size: 1rem;
    }
  }
  .show__jobs__container {
    width: 100%;
    max-height: 18rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: auto;
  }
  @media (min-width: 750px) {
    .add_container {
      width: 70%;

      h3 {
        text-align: left;
      }
    }
    .show__jobs__container {
      width: 70%;
    }
  }
}
</style>
