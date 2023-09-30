<template>
  <div class="loginError__container">
      <div class="error__box">
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
        <div class="content">
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
              />
            </svg>
          </div>
          <div class="text">
            <h1>Ooops!</h1>
            <p>{{ error }}</p>
          </div>
        </div>
        <div class="button">
          <button @click="closePopup">Spróbuj pownownie!</button>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["close-popup"],
  props: ["error"],
  setup(props, content) {
    const error = ref(props.error);

    const closePopup = () => {
      content.emit("close-popup", false);
    };

    return { error, closePopup };
  },
};
</script>

<style lang="scss" scoped>
.loginError__container {
  width: 100%;
  min-height: calc(100vh - 5rem);
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(31, 36, 45, 0.9);
  padding: 0.5rem;
  

  .error__box {
    width: 40rem;
    height: 21rem;
    border-radius: 16px;
    background-color: #17181c;
    animation: show 1s ease forwards;
    @keyframes show {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .close {
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0.5rem;

      svg {
        width: 2rem;
        height: 2rem;
        fill: white;
        cursor: pointer;
      }
    }
    .content {
      width: 100%;
      height: 13.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;

      .icon {
        width: 30%;
        text-align: center;
        svg {
          width: 4rem;
          height: 4rem;
          fill: red;
        }
      }
      .text {
        width: 70%;
        text-align: center;
        color: white;
        h1 {
          font-size: 3rem;
        }
        p {
          font-size: 1.3rem;
        }
      }

      @media (min-width: 750px) {
        flex-direction: row;

        .text {
          text-align: left;
          h1 {
            font-size: 3.5rem;
          }
        }
        .icon {
          svg {
            width: 6rem;
            height: 6rem;
          }
        }
      }
    }
    .button {
      width: 100%;
      height: 4.5rem;
      display: flex;
      justify-content: center;
      padding: 0.5rem;
      position: relative;

      button {
        font-size: 18px;
        padding: 8px 15px;
        background-color: transparent;
        color: white;
        border: 1px solid #f65656;
        border-radius: 2px;
        cursor: pointer;

        &:hover {
          background: #8f95a333;
        }
      }

      @media (min-width: 750px) {
        .button {
          justify-content: flex-end;
        }
        button {
          position: absolute;
          right: 20px;
          bottom: 20px;
        }
      }
    }
  }
}
</style>
