<template>
  <div class="main__contact__container">
    <Header :title="t('admin.contact.title')"></Header>
    <ListMessages @view-message="openMessage"></ListMessages>

    <v-dialog v-model="dialogOpen" max-width="600">
      <v-card v-if="activeMessage" class="message__dialog">
        <div class="close__container">
          <svg @click="dialogOpen = false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            />
          </svg>
        </div>
        <h3>{{ t("admin.contact.detailTitle") }}</h3>
        <dl>
          <dt>{{ t("admin.contact.name") }}</dt>
          <dd>{{ activeMessage.name }}</dd>
          <dt>{{ t("admin.contact.email") }}</dt>
          <dd><a :href="`mailto:${activeMessage.email}`">{{ activeMessage.email }}</a></dd>
          <template v-if="activeMessage.phone">
            <dt>{{ t("admin.contact.phone") }}</dt>
            <dd>{{ activeMessage.phone }}</dd>
          </template>
          <dt>{{ t("admin.contact.subject") }}</dt>
          <dd>{{ activeMessage.subject || t("admin.contact.noSubject") }}</dd>
          <dt>{{ t("admin.contact.sentAt") }}</dt>
          <dd>{{ formatDate(activeMessage.created_at) }}</dd>
        </dl>
        <p class="description">{{ activeMessage.description }}</p>
        <v-btn class="close__dialog" variant="text" @click="dialogOpen = false">
          {{ t("admin.contact.close") }}
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import Header from "../../components/Contact/Header.vue";
import ListMessages from "../../components/AdminContact/ListMessages.vue";

export default {
  components: {
    Header,
    ListMessages,
  },
  setup() {
    const store = useStore();
    const { t, locale } = useI18n();

    store.dispatch("contact/apiGetContactCollection");

    const activeMessage = ref(null);
    const dialogOpen = computed({
      get: () => activeMessage.value !== null,
      set: (value) => {
        if (!value) activeMessage.value = null;
      },
    });

    const openMessage = (message) => {
      activeMessage.value = message;
    };

    const formatDate = (dateStr) =>
      new Intl.DateTimeFormat(locale.value, { dateStyle: "medium", timeStyle: "short" }).format(
        new Date(dateStr)
      );

    return { t, activeMessage, dialogOpen, openMessage, formatDate };
  },
};
</script>

<style lang="scss" scoped>
.main__contact__container {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}

.message__dialog {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--secend-bg-color);

  .close__container {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: white;
      cursor: pointer;
    }
  }

  h3 {
    font-size: 1.5rem;
    color: var(--main-color);
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.35rem 1rem;

    dt {
      color: white;
      opacity: 0.7;
      font-weight: bold;
    }
    dd {
      color: white;
      margin: 0;
      word-break: break-word;

      a {
        color: var(--main-color);
      }
    }
  }

  .description {
    color: white;
    white-space: pre-wrap;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 0.75rem;
  }

  .close__dialog {
    align-self: flex-end;
    color: var(--text-color);
  }
}
</style>
