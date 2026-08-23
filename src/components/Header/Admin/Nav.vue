<template>
  <header>
    <Transition name="sildeBar">
      <AdminSlideBar v-if="menuOpen" @close="closeMenu"></AdminSlideBar>
    </Transition>
    <h3>{{ t("nav.adminPanel") }}</h3>
    <ToggleButton name="admin" :reset="resetToggle" @toggle-button="onToggle"></ToggleButton>
  </header>
</template>

<script>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import ToggleButton from "../ToggleButton.vue";
import AdminSlideBar from "./AdminSlideBar.vue";

export default {
  components: {
    ToggleButton,
    AdminSlideBar,
  },
  setup() {
    const { t } = useI18n();
    const menuOpen = ref(false);
    const resetToggle = ref(null);

    const onToggle = (val) => {
      menuOpen.value = val.activeClass;
      resetToggle.value = null;
    };

    const closeMenu = () => {
      if (!menuOpen.value) return;
      menuOpen.value = false;
      resetToggle.value = true;
    };

    return { t, menuOpen, resetToggle, onToggle, closeMenu };
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 5rem;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: var(--bg-color);

  h3 {
    color: var(--text-color);
    font-size: 0.75rem;
  }

  @media (min-width: 750px) {
    h3 {
      font-size: 1.2rem;
    }
  }
}

.sildeBar-enter-from,
.sildeBar-leave-to {
  opacity: 0;
}

.sildeBar-enter-active {
  transition: all 0.5s ease-out;
}

.sildeBar-leave-active {
  transition: all 0.5s ease-in;
}

.sildeBar-enter-to,
.sildeBar-leave-from {
  opacity: 1;
}
</style>
