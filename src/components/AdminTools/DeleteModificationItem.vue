<template>
  <div class="delete__modification__item">
    <form enctype="multipart/form-data">
      <ul>
        <h3>Modifikacja Narzędzi</h3>
        <v-text-field
        bg-color="white"
        label="Znajdz Narzędzie!"
        v-model="search"
      ></v-text-field>
        <item-li
          v-for="item in loadTools"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :information="item.information"
          :progress="item.progress"
          :numeric="item.numeric"
          :link="item.link"
          :link_image="item.link_image"
        ></item-li>
      </ul>
    </form>
  </div>
</template>

<script>
import Item from "./itemLi.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  components: {
    "item-li": Item,
  },
  setup() {
    // values
    const store = useStore();
    const search = ref('')

    // computed
    const loadTools = computed(() => {
      return store.getters["admin/loadTools"].filter(name=>name.name.includes(search.value)).sort((l1, l2) => l1 - l2);
    });
    return {search, loadTools};
  },
};
</script>

<style lang="scss" scoped>
.delete__modification__item {
  width: 100%;
  form {
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      h3 {
        width: 100%;
        font-size: 2rem;
        color: white;
        text-align: center;
      }
    }
  }
}
@media (min-width: 750px) {
  .delete__modification__item {
    width: 70%;
    form {
      ul {
        h3 {
          text-align: left;
        }
      }
    }
  }
}
</style>
