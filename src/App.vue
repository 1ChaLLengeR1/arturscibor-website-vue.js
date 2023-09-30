<template>
  <div class="app__container">
    <Transition name="bounce">
      <The-Notification
        v-if="notificationBox.offNotification"
        :information="notificationBox.information"
        :activeClass="notificationBox.class"
      ></The-Notification>
    </Transition>
    <Loading-Spinner v-if="loadingSpinner"></Loading-Spinner>
    <div class="main__container__app">
      <The-Header v-if="navigationAdmin"></The-Header>
      <Admin-Header v-else></Admin-Header>
      <main>
        <router-view></router-view>
      </main>
      <The-Footer></The-Footer>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Header from "./components/Header/default__navigation/Nav.vue";
import Footer from "./components/util/Footer.vue";
import AdminHeader from "./components/Header/admin__navigation/Nav.vue";
import LoadingSpinner from "./components/util/LoadingSpinner.vue";
import Notification from "./components/util/Notification.vue";
export default {
  components: {
    "The-Header": Header,
    "Admin-Header": AdminHeader,
    "Loading-Spinner": LoadingSpinner,
    "The-Notification": Notification,
    "The-Footer": Footer,
  },
  setup() {
    const store = useStore();

    const notificationBox = computed(() => {
      return store.getters["util/notificationBox"];
    });
    const loadingSpinner = computed(() => {
      return store.getters["util/loadingSpinner"];
    });
    const navigationAdmin = computed(() => {
      return store.getters["util/loadNavigationAdmin"];
    });

    return { loadingSpinner, navigationAdmin, notificationBox };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  border: none;
  outline: none;
}

:root {
  --bg-color: #1f242d;
  --secend-bg-color: #323946;
  --text-color: #fff;
  --main-color: #0ef;
}

.app__container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;

  .main__container__app {
    width: 100%;
    min-height: 100%;
    background: var(--bg-color);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateX(100%);
  }
  40% {
    transform: translateX(-10%);
  }
  80% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-5%);
  }
}
</style>
