<template>
  <div class="admin__slidebar">
    <div class="slidebar__top">
      <LanguageSwitcher></LanguageSwitcher>
    </div>

    <div class="tabs">
      <button
        v-for="tab in TABS"
        :key="tab.key"
        type="button"
        class="tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ t(tab.labelKey) }}
      </button>
    </div>

    <nav class="links">
      <router-link
        v-for="item in currentLinks"
        :key="item.link_name"
        :to="{ name: item.link_name }"
        @click="close"
      >
        {{ t(item.labelKey) }}
      </router-link>
    </nav>

    <button type="button" class="logout" @click="logout">{{ t("nav.logout") }}</button>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "../../util/LanguageSwitcher.vue";
import ArrayLinksDefoult from "../../JS/ArrayLinksDefoult";
import ArrayLinksAdmin from "../../JS/ArrayLinksAdmin";

const TABS = [
  { key: "admin", labelKey: "nav.adminPanel", links: ArrayLinksAdmin },
  { key: "default", labelKey: "nav.navigationPanel", links: ArrayLinksDefoult },
];

export default {
  components: {
    LanguageSwitcher,
  },
  emits: ["close"],
  setup(_, { emit }) {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();
    const activeTab = ref("admin");

    const currentLinks = computed(() => {
      const links = TABS.find((tab) => tab.key === activeTab.value)?.links ?? [];
      // Jesteśmy w panelu admina, więc na pewno zalogowani - link "Zaloguj się" jest tu bez sensu.
      return links.filter((link) => link.link_name !== "signin");
    });

    const close = () => emit("close");

    const logout = () => {
      store.commit("auth/logout");
      router.push({ name: "signin" });
      close();
    };

    return { t, TABS, activeTab, currentLinks, close, logout };
  },
};
</script>

<style lang="scss" scoped>
.admin__slidebar {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem;
  margin-top: 5rem;
  background: var(--bg-color);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);

  .slidebar__top {
    display: flex;
    justify-content: flex-end;
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);

    .tab {
      background: transparent;
      color: var(--text-color);
      opacity: 0.6;
      font-size: 0.95rem;
      font-weight: bold;
      padding: 0.5rem 0.75rem;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: 0.3s ease;
    }

    .tab:hover {
      opacity: 0.9;
    }

    .tab.active {
      opacity: 1;
      color: var(--main-color);
      border-bottom-color: var(--main-color);
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.5rem 0;

    a {
      font-size: 1.2rem;
      color: var(--text-color);
      transition: 0.3s;
    }
    a:hover {
      color: var(--main-color);
    }
    .active {
      color: var(--text-color);
    }
    .exact-active-link {
      color: var(--main-color);
    }
  }

  .logout {
    align-self: flex-start;
    font-size: 1.2rem;
    color: var(--text-color);
  }
}
</style>
