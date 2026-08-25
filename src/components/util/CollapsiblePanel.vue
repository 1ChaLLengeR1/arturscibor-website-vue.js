<template>
  <div class="collapsible__panel">
    <button type="button" class="panel__header" @click="$emit('update:modelValue', !modelValue)">
      <h3>{{ title }}</h3>
      <svg class="chevron" :class="{ open: modelValue }" viewBox="0 0 512 512">
        <path
          d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
        />
      </svg>
    </button>
    <v-expand-transition>
      <div v-if="modelValue" class="panel__body">
        <slot></slot>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
.collapsible__panel {
  width: 100%;

  .panel__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: transparent;

    h3 {
      font-size: 2rem;
      color: var(--text-color);
      text-align: left;
    }

    .chevron {
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
      fill: var(--main-color);
      transition: 0.3s ease;
    }

    .chevron.open {
      transform: rotate(180deg);
    }
  }

  .panel__body {
    width: 100%;
    padding-top: 0.5rem;
  }
}
</style>
