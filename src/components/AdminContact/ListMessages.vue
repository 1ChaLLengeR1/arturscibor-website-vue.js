<template>
  <ul class="list__messages__container">
    <li v-if="collection.length === 0" class="empty">{{ t("admin.contact.empty") }}</li>
    <li class="item" v-for="message in collection" :key="message.id">
      <span class="badge" :class="{ read: message.is_read }">
        {{ message.is_read ? t("admin.contact.read") : t("admin.contact.unread") }}
      </span>
      <div class="info">
        <p class="name">{{ message.name }}</p>
        <p class="subject">{{ message.subject || t("admin.contact.noSubject") }}</p>
      </div>
      <div class="icons">
        <v-btn color="blue" @click="$emit('view-message', message)">{{ t("admin.contact.view") }}</v-btn>
        <v-btn color="black" @click="deleteMessage(message.id)">{{ t("admin.contact.delete") }}</v-btn>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default {
  emits: ["view-message"],
  setup() {
    const store = useStore();
    const { t } = useI18n();

    const collection = computed(() => store.getters["contact/collection"]);

    const deleteMessage = (contactId) => {
      store.dispatch("contact/apiDeleteContact", contactId);
    };

    return { t, collection, deleteMessage };
  },
};
</script>

<style lang="scss" scoped>
.list__messages__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0.5rem;

  .empty {
    width: 100%;
    text-align: center;
    color: white;
    opacity: 0.7;
    padding: 1rem;
  }

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

    .badge {
      flex-shrink: 0;
      font-size: 0.7rem;
      font-weight: bold;
      text-transform: uppercase;
      padding: 0.2rem 0.5rem;
      border-radius: 999px;
      color: white;
      background: var(--main-color);
    }
    .badge.read {
      background: rgba(0, 0, 0, 0.4);
    }

    .info {
      flex: 1;
      min-width: 0;

      .name {
        font-size: 1.1rem;
        font-weight: bold;
      }
      .subject {
        font-size: 0.85rem;
        opacity: 0.7;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .icons {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
    }
  }
}
@media (min-width: 750px) {
  .list__messages__container {
    width: 70%;
  }
}
</style>
