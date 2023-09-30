<template>
  <div class="main__container__tools">
    <add-items></add-items>
    <delete-modification-item></delete-modification-item>
  </div>
</template>

<script>
import { useStore } from "vuex";
import AddItem from "../../components/AdminTools/AddItem.vue";
import DeleteModificationItem from "../../components/AdminTools/DeleteModificationItem.vue";
export default {
  components: {
    "add-items": AddItem,
    "delete-modification-item": DeleteModificationItem
  },
  setup() {
    // values
    const store = useStore()

    // functions
    store.dispatch('admin/loadTools')
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main__container__tools {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}
@media (min-width: 750px) {
    
}
</style>
