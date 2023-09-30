<template>
  <header>
    <Transition name="sildeBar">
      <slidebar-default
        v-if="sildeBar.activeClass && sildeBar.name === 'default'"
        :arrayLinks="arrayDefoultLinks"
        :position="true"
        :activeButton="false"
        @off-slidebar="offSlidebarLinks"
      ></slidebar-default>
    </Transition>
    <the-logo></the-logo>
    <nav v-if="mobile" class="navbar">
      <router-link
        v-for="(item, index) in arrayDefoultLinks"
        :key="item"
        :to="{ name: item.link_name }"
        :style="'--i:'+index+';'"
        >{{ item.name }}</router-link
      >
    </nav>
    <toggle-button
      v-if="!mobile"
      name="default"
      :reset="resetToggle"
      @toggle-button="toggleButtonFunction"
    ></toggle-button>
  </header>
</template>

<script>
import Logo from "./Logo.vue";
import ToggleButton from "./ToggleButton.vue";
import SlideBarDefault from "./SlideBar.vue";
import ArrayDefoultLinks from "../../JS/ArrayLinksDefoult.js";
import { ref, reactive  } from "vue";
export default {
  components: {
    "the-logo": Logo,
    "toggle-button": ToggleButton,
    "slidebar-default": SlideBarDefault,
  },
  setup() {
    const arrayDefoultLinks = ref(ArrayDefoultLinks);
    const mobile = ref(false);
    const sildeBar = reactive({
      activeClass: true,
      name: null,
    });
    const resetToggle = ref(null)

    const checkSreenWidth = () => {
      if (window.innerWidth >= 1200) {
        mobile.value = true;
        sildeBar.activeClass = false;
      } else {
        mobile.value = false;
      }
    };

    const toggleButtonFunction = (val) => {
      sildeBar.activeClass = val.activeClass;
      sildeBar.name = val.name;
      resetToggle.value = val.resetToggle
    };

    const offSlidebarLinks = (val) =>{
      sildeBar.activeClass = val
      resetToggle.value = !val
    }

    window.addEventListener("resize", checkSreenWidth);
    checkSreenWidth();

    return {
      mobile,
      sildeBar,
      arrayDefoultLinks,
      resetToggle,
      checkSreenWidth,
      toggleButtonFunction,
      offSlidebarLinks,
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

  .navbar {
    display: flex;
    gap: 3rem;
    margin-right: 4rem;
    a {
      font-size: 1.7rem;
      color: var(--text-color);
      transition: 0.3s;
      animation: slideTop .5s ease forwards;
      animation-delay: calc(.2s * var(--i));

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

    @keyframes slideTop {
      0%{
        transform: translateY(100px);
        opacity: 0;
      }
      100%{
        transform: translateY(0);
        opacity: 1;
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
