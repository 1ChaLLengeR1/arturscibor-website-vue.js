<template>
  <div class="greeting">
    <h3>{{ t("home.greeting") }}</h3>
    <h1>{{ t("home.name") }}</h1>
    <div class="text__typing">
      <div>
        <span>{{ t("home.iAm") }}</span>
      </div>
      <div class="text">
        <span :key="role" :style="{ '--char-count': role.length || 1 }">{{ role }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t, tm } = useI18n();
    const roles = computed(() => tm("home.roles"));

    const index = ref(0);
    const role = computed(() => roles.value[index.value] ?? "");
    let timer = null;

    onMounted(() => {
      timer = setInterval(() => {
        index.value = (index.value + 1) % roles.value.length;
      }, 4000);
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return { t, role };
  },
};
</script>

<style lang="scss" scoped>
.greeting {
  display: contents;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    animation: slideBottom 1s ease forwards;
    @keyframes slideBottom {
      0% {
        transform: translateY(100px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.3;
    animation: sildeLeft 1s ease forwards;
    @keyframes sildeLeft {
      0% {
        transform: translateX(-150px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }

  .text__typing {
    width: max-content;
    display: flex;
    gap: 0.5rem;
    font-size: 1.2rem;
    overflow: hidden;

    .text {
      position: relative;
      color: var(--main-color);
      span:before {
        content: "";
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--bg-color);
        border-left: 2px solid var(--main-color);
        animation: animate 4s steps(var(--char-count, 22)) infinite;
        @keyframes animate {
          40%,
          60% {
            left: 100%;
          }
          100% {
            left: 0;
          }
        }
      }
    }
  }

  @media (min-width: 1000px) {
    h3 {
      font-size: 3.2rem;
    }
    h1 {
      font-size: 5.6rem;
    }
    .text__typing {
      font-size: 2.8rem;
    }
  }

  @media (min-width: 1530px) {
    .text__typing {
      font-size: 3.5rem;
    }
  }
}
</style>
