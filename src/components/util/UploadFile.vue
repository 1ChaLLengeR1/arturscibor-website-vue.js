<template>
  <div class="upload__file">
    <v-file-input
      bg-color="white"
      show-size
      counter
      :accept="accept"
      :label="label"
      v-model="file"
    ></v-file-input>
    <v-btn @click="upload" :disabled="file.length !== 1" color="blue">
      {{ buttonLabel }}
    </v-btn>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    label: {
      type: String,
      default: "Załaduj plik!",
    },
    buttonLabel: {
      type: String,
      default: "Wyślij",
    },
    accept: {
      type: String,
      default: undefined,
    },
  },
  emits: ["upload"],
  setup(_props, { emit }) {
    const file = ref([]);

    const upload = () => {
      if (file.value.length !== 1) return;
      emit("upload", file.value[0]);
      file.value = [];
    };

    return { file, upload };
  },
};
</script>

<style lang="scss" scoped>
.upload__file {
  width: 100%;
  display: flex;
  flex-direction: column;

  button {
    width: 100%;
  }
}
</style>
