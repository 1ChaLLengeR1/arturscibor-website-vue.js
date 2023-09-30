<template>
  <header>
    <Transition name="sildeBar">
      <slide-bar
        v-if="sildeBarDefoult.activeClass && sildeBarDefoult.name === 'default'"
        :arrayLinks="arrayDefoultLinks"
        :position="false"
        :activeButton="true"
        @off-slidebar="offSlidebarLinksDefoult"
      ></slide-bar>
    </Transition>
    <Transition name="sildeBar">
      <slide-bar
        v-if="sildeBarAdmin.activeClass && sildeBarAdmin.name === 'admin'"
        :arrayLinks="arrayAdminLinks"
        :position="true"
        :activeButton="true"
        @off-slidebar="offSlidebarLinksAdmin"
      ></slide-bar>
    </Transition>
    <div class="wraper__container">
      <toggle-button
        v-if="activeToggleDefoult"
        @toggle-button="defoultNav"
        name="default"
        :reset="resetToggleDefoult"
      ></toggle-button>
      <h3>Panel Nawigacyjny</h3>
    </div>
    <div class="wraper__container">
      <h3>Panel Administratora</h3>
      <toggle-button
        v-if="activeToggleAdmin"
        @toggle-button="adminNav"
        name="admin"
        :reset="resetToggleAdmin"
      ></toggle-button>
    </div>
  </header>
</template>

<script>
import { ref, reactive } from "vue";
import ToggleButton from "../default__navigation/ToggleButton.vue";
import SlideBar from "../default__navigation/SlideBar.vue";
import ArrayLinksDefoult from "../../JS/ArrayLinksDefoult";
import ArrayLinksAdmin from "../../JS/ArrayLinksAdmin.js";
export default {
  components: {
    "toggle-button": ToggleButton,
    "slide-bar": SlideBar,
  },
  setup() {
    const resetToggleDefoult = ref(null);
    const resetToggleAdmin = ref(null);
    const activeToggleDefoult = ref(true);
    const activeToggleAdmin = ref(true);
    const sildeBarDefoult = reactive({
      activeClass: true,
      name: null,
    });
    const sildeBarAdmin = reactive({
      activeClass: true,
      name: null,
    });
    const arrayDefoultLinks = ref(ArrayLinksDefoult);
    const arrayAdminLinks = ref(ArrayLinksAdmin);

    const defoultNav = (val) => {
      activeToggleAdmin.value = !val.activeClass;
      sildeBarDefoult.activeClass = val.activeClass;
      sildeBarDefoult.name = val.name;
      resetToggleDefoult.value = val.resetToggleDefoult;
    };

    const adminNav = (val) => {
      activeToggleDefoult.value = !val.activeClass;
      sildeBarAdmin.activeClass = val.activeClass;
      sildeBarAdmin.name = val.name;
      resetToggleAdmin.value = val.resetToggleAdmin;
    };

    const offSlidebarLinksDefoult = (val) => {
      sildeBarDefoult.activeClass = val;
      resetToggleDefoult.value = !val;
    };

    const offSlidebarLinksAdmin = (val) => {
      sildeBarDefoult.activeClass = val;
      resetToggleAdmin.value = !val;
    };

    return {
      resetToggleDefoult,
      resetToggleAdmin,
      arrayDefoultLinks,
      arrayAdminLinks,
      sildeBarDefoult,
      sildeBarAdmin,
      activeToggleDefoult,
      activeToggleAdmin,
      defoultNav,
      adminNav,
      offSlidebarLinksDefoult,
      offSlidebarLinksAdmin,
    };
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
  
  .wraper__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    h3 {
      color: white;
      font-size: 0.75rem;
    }
  }

  @media (min-width: 750px){
    .wraper__container{
      h3{
        font-size: 1.2rem;
      }
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
