<template>
  <img :key="cycle" :class="{ 'fade-cycle': images.length > 1 }" :src="current" alt="My Image" />
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const index = ref(0);
    const cycle = ref(0);
    const current = ref(props.images[0] ?? "");
    let timer = null;

    const tick = () => {
      if (props.images.length <= 1) {
        return;
      }
      index.value = (index.value + 1) % props.images.length;
      current.value = props.images[index.value];
      cycle.value++;
    };

    watch(
      () => props.images,
      (newImages) => {
        index.value = 0;
        current.value = newImages[0] ?? "";
        cycle.value++;
      },
    );

    onMounted(() => {
      timer = setInterval(tick, 3000);
    });

    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return { current, cycle };
  },
};
</script>

<style scoped>
.fade-cycle {
  animation: carousel-fade 3s ease-in-out forwards;
}

@keyframes carousel-fade {
  0%,
  66.67% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
