<template>
  <div class="read__more__container">
    <div class="close">
      <svg
        @click="closePopup"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </div>
    <div class="container__items">
      <ul class="items">
        <li v-for="item in array" :key="item" class="item">
          <h3>{{ item.name }}</h3>
          <p>{{ item.information }}</p>
          <a href='https://www.strava.com/athletes/71887305' alt='link do profilu' v-if="item.name==='Hobby'">Link do Strava</a>
          <a href='https://www.facebook.com/Sciborowka' alt='link do profilu' v-if="item.name==='Praca'">Fanpage Ściborówka</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close-readmore"],
  props: ["arrayItems"],
  setup(props, context) {
    const closePopup = () => {
      context.emit("close-readmore", false);
    };

    const array = props.arrayItems;
    array.sort((l1, l2) => l1.numeric - l2.numeric);

    return { closePopup, array };
  },
};
</script>

<style lang="scss" scoped>
.read__more__container {
  width: 100%;
  min-height: 100%;
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  background-color: var(--secend-bg-color);

  .close {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5rem;

    svg {
      max-width: 100%;
      max-height: 100%;
      cursor: pointer;
    }
  }

  .container__items {
    width: 100%;
    padding: 1rem;
    color: white;
    .items {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: var(--bg-color);
      border-radius: 8px;

      .item {
        width: 100%;
        padding: 1rem;
        list-style: none;
        font-weight: 700;
        line-height: 36px;
        h3 {
          font-size: 30px;
          color: var(--main-color)
        }
        p {
          font-size: 20px;
        }
        a{
          font-size: 20px;
          color: var(--main-color)
        }
      }
    }
  }
}

@media (min-width: 750px) {
  .read__more__container {
    .container__items {
      padding: 1rem 4rem;
    }
  }
}
</style>
