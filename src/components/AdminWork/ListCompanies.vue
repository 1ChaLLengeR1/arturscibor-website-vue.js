<template>
  <ul class="list__companies__container">
    <li class="item" v-for="company in collection" :key="company.id">
      <img
        v-if="resolveFileUrl(company.logo_url)"
        class="logo"
        :src="resolveFileUrl(company.logo_url)"
        alt="logo firmy"
      />
      <div class="info">
        <p class="name">{{ company.company_name }}</p>
        <p class="items__count">{{ company.items.length }} stanowisk</p>
      </div>
      <div class="icons">
        <v-btn color="blue" @click="showEditCompany(company.id)">Edytuj</v-btn>
        <v-btn color="black" @click="deleteCompany(company.id)">Usuń</v-btn>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { resolveFileUrl } from "../../utils/url";

export default {
  emits: ["show-edit-company"],
  setup(_, { emit }) {
    const store = useStore();

    const collection = computed(() => store.getters["work/collection"]);

    const showEditCompany = (workId) => {
      emit("show-edit-company", { show: true, workId });
    };

    const deleteCompany = (workId) => {
      store.dispatch("work/apiDeleteWork", workId);
    };

    return { collection, showEditCompany, deleteCompany, resolveFileUrl };
  },
};
</script>

<style lang="scss" scoped>
.list__companies__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0.5rem;

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: white;
    color: black;
    padding: 0.5rem;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 2px rgb(71, 71, 71);

    .logo {
      width: 3rem;
      height: 3rem;
      object-fit: contain;
    }

    .info {
      flex: 1;

      .name {
        font-size: 1.1rem;
        font-weight: bold;
      }

      .items__count {
        font-size: 0.85rem;
        opacity: 0.7;
      }
    }

    .icons {
      display: flex;
      gap: 0.5rem;
    }
  }
}
@media (min-width: 750px) {
  .list__companies__container {
    width: 70%;
  }
}
</style>
