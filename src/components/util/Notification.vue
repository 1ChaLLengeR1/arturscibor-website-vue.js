<template>
  <div class="notification__container" :class="{ active__border: activeClass }">
    <div class="notification__box">
      <svg
        v-if="activeClass"
        class="active"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="50"
        height="50"
        viewBox="0 0 50 50"
      >
        <path
          d="M25,2C12.318,2,2,12.318,2,25c0,12.683,10.318,23,23,23c12.683,0,23-10.317,23-23C48,12.318,37.683,2,25,2z M35.827,16.562	L24.316,33.525l-8.997-8.349c-0.405-0.375-0.429-1.008-0.053-1.413c0.375-0.406,1.009-0.428,1.413-0.053l7.29,6.764l10.203-15.036	c0.311-0.457,0.933-0.575,1.389-0.266C36.019,15.482,36.138,16.104,35.827,16.562z"
        ></path>
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="error"
        x="0px"
        y="0px"
        viewBox="0 0 50 50"
      >
        <path
          d="M25,2C12.319,2,2,12.319,2,25s10.319,23,23,23s23-10.319,23-23S37.681,2,25,2z M33.71,32.29c0.39,0.39,0.39,1.03,0,1.42	C33.51,33.9,33.26,34,33,34s-0.51-0.1-0.71-0.29L25,26.42l-7.29,7.29C17.51,33.9,17.26,34,17,34s-0.51-0.1-0.71-0.29	c-0.39-0.39-0.39-1.03,0-1.42L23.58,25l-7.29-7.29c-0.39-0.39-0.39-1.03,0-1.42c0.39-0.39,1.03-0.39,1.42,0L25,23.58l7.29-7.29	c0.39-0.39,1.03-0.39,1.42,0c0.39,0.39,0.39,1.03,0,1.42L26.42,25L33.71,32.29z"
        ></path>
      </svg>
      <span>{{ information }}</span>
    </div>
    <svg
      @click="resetNotification"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
    >
      <path
        d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"
      ></path>
    </svg>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: ["information", "activeClass"],
  setup() {
    const store = useStore();

    const timeOut = setTimeout(() => {
        resetNotification();
    }, 1500);

      const resetNotification = () => {
      store.commit("util/notificationBox", {
        information: null,
        class: null,
        offNotification: false,
      });
      clearTimeout(timeOut)
    };


    return { resetNotification };
  },
};
</script>

<style lang="scss" scoped>
.notification__container {
  width: 100%;
  min-height: 4rem;
  position: fixed;
  top: 5rem;
  z-index: 120;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  padding: 0.5rem;

  @media (min-width: 425px){
    width: 25rem;
    right: 1rem;
  }

  .notification__box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
    .error {
      fill: red;
    }
    .active {
      fill: green;
    }

    span {
      font-weight: bold;
    }
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
}
.notification__container::before {
  position: absolute;
  content: "";
  height: 3px;
  width: 100%;
  background-color: red;
  bottom: 0;
  left: 0;
  animation: progress 1.5s linear forwards;
}
@keyframes progress {
  100% {
    width: 0%;
  }
}
.active__border::before {
  background-color: green;
}



</style>
