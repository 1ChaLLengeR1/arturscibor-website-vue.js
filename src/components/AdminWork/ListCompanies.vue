<template>
  <ul class="list__companies__container">
    <li class="item" v-for="company in collection" :key="company.id">
      <img
        v-if="resolveFileUrl(company.logo_url)"
        class="logo"
        :src="resolveFileUrl(company.logo_url)"
        :alt="company.company_name"
      />
      <div class="info">
        <p class="name">{{ company.company_name }}</p>
        <p class="items__count">{{ t("admin.work.positionsCount", { count: company.items.length }) }}</p>
      </div>
      <div class="icons">
        <v-btn color="blue" @click="showEditCompany(company.id)">{{ t("admin.work.edit") }}</v-btn>
        <v-btn color="black" @click="deleteCompany(company)">{{ t("admin.work.delete") }}</v-btn>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { resolveFileUrl } from "../../utils/url";
import { requestConfirm } from "../../utils/confirm";

export default {
  emits: ["show-edit-company"],
  setup(_, { emit }) {
    const store = useStore();
    const { t } = useI18n();

    const collection = computed(() => store.getters["work/collection"]);

    const showEditCompany = (workId) => {
      emit("show-edit-company", { show: true, workId });
    };

    const deleteCompany = (company) => {
      requestConfirm(store, {
        message: t("admin.work.confirmDeleteCompany", { name: company.company_name }),
        onConfirm: () => store.dispatch("work/apiDeleteWork", company.id),
      });
    };

    return { t, collection, showEditCompany, deleteCompany, resolveFileUrl };
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
    background-color: var(--card-bg-color);
    color: var(--card-text-color);
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

@media (max-width: 400px) {
  .list__companies__container {
    .item {
      padding: 0.4rem;
      gap: 0.5rem;

      .logo {
        width: 2rem;
        height: 2rem;
      }

      .info {
        .name {
          font-size: 0.85rem;
        }

        .items__count {
          font-size: 0.7rem;
        }
      }

      .icons {
        gap: 0.35rem;

        :deep(.v-btn) {
          min-width: 0;
          padding: 0 0.5rem;
          font-size: 0.6rem;
          height: 1.8rem;
        }
      }
    }
  }
}
</style>
