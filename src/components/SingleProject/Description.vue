<template>
  <div class="description__container">
    <div class="box">
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["description"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.description__container {
  width: 100%;
  display: flex;
  justify-content: center;

  .box {
    width: 100%;
    padding: 0.5rem;
    background: var(--secend-bg-color);
    border-radius: 8px;
    text-align: center;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 1);
    p {
      font-family: verdana;
      color: var(--text-color);
      font-size: 15px;
    }
    @media (min-width: 750px) {
      width: 70%;
      p {
        font-size: 25px;
      }
    }
  }
}
</style>
