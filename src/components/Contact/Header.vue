<template>
  <div class="header__contact">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: ["title"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.header__contact {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slideHeader 1s ease forwards;
    @keyframes slideHeader {
      0% {
        transform: translateY(-100px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  h1{
    font-size: 20px;
    color: var(--main-color);
    @media (min-width: 750px){
        font-size: 50px;  
    }
  }
}
</style>
