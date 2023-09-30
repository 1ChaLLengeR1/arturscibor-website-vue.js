<template>
  <div class="basic__information__container">
    <div class="container__information">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
      >
        <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
        />
      </svg>
      <div class="information__box">
        <p>Data ukończenia projektu:&nbsp;</p>
        <span> {{ date }}</span>
      </div>
    </div>
    <div class="container__information">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="52"
        height="52"
        viewBox="0 0 52 52"
      >
        <image
          id="Warstwa_0"
          data-name="Warstwa 0"
          x="112"
          y="88"
          width="52"
          height="52"
          xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAVUlEQVRoge3PARHAMAwAoaz+PWc2vj1wwLe7Ow85L2VG6AJCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1Qmkz8wPwnQRkj+nr+AAAAABJRU5ErkJggg=="
        />
        <image
          id="list"
          width="52"
          height="52"
          xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAACv0lEQVRoge2aO2gUQRjHf7cawRgfMUGxiIogKBa2PhEsxEawsVBERAQtbCxEUSwCsdPEBMRCT0RUBEGRgCl8YKGkExRFiFEMRsEHiFF8nfFkwnfyMbd73uYutzPH/mC42dnb5f/feex8M4uwFXgLjEh6CizDY34AeSud9tFOIL9HgZ/WuT8J6Kkqc4F2VUtdPpoIVP4d8CpBLVUhsG4y01Mf/5hcwbWrgePArCprGi85IFuJoTPA0mQ9FHHSbnJxyCarPZSbldTQCaAXmDaBAuMwCjyuxJBhoLaa/4/d5IKIvDfYohtVfkY9GLql8n011jJhLAdW1ouZlJQaY+Zl8+vhoc8GLkn4bQK7QeCQA7rGRRMwFBKCm3TWQz+cs0zY6wvrHdAYCy1+OzAHuKzKLnjkZYxeEf5Qle1Shq4lqC02Zra9CVgH9KuLj6j8/YibNgB7gRZHvOSkZRXRrWrHxBjTI25wJWIgSTJ9tkWutcTsL/FE+hw0lM8ogY2ylNUkxw+ANSUMmZfwAYdWin4DF3XBXeX0Y3K6qsNBZcZ0ro0+m1lhtcNfMrI9l3QsJBB0mmwZnc2rCesq4FMJM7eBqQ7oLIvCKNcstVBoWnn5zcnmV0pKSjiTrFITOiwGpoTNi3yiQQK97zIgmDD8BtDmq6H+iCH7vY9LwrstE6+tY+82j+8o8d1StkWVDSasLxbmxbpNlrA+yKBgWAS8kPxwib7UosKNpBkVrWMslMi0TWppWNXQ9QihO4GvDgV3xtB5W+QX60/m65IFEYYGXIxY7S1JUzNL1HFGItOhEEP7ZCe82ZEmZ+adPRnZmu8BngAdwB7pV4Wvscwm2IaIm2Qc60PfTOaeqrJWOdmqyt4kqzMeQcGVcAqYB+xQZSNuWyhms9WxctZxu2uCy+FqxKjxSOZ5XnIYeCaz7JdAp3dmgL9PYlJmzdNQmQAAAABJRU5ErkJggg=="
        />
      </svg>

      <div class="information__box">
        <p>Numer projektu, który wykonałem/brałem udział:&nbsp;</p>
        <span> {{ numeric }}</span>
      </div>
    </div>
    <div class="container__information">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="52"
        height="52"
        viewBox="0 0 52 52"
      >
        <image
          id="Warstwa_0"
          data-name="Warstwa 0"
          x="112"
          y="88"
          width="52"
          height="52"
          xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAVUlEQVRoge3PARHAMAwAoaz+PWc2vj1wwLe7Ow85L2VG6AJCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1QnVCdUJ1Qmkz8wPwnQRkj+nr+AAAAABJRU5ErkJggg=="
        />
        <image
          id="level"
          width="52"
          height="52"
          xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAADMElEQVRoge1ay2+MURT/TalnJDQWHvGIzM4r8WirKsVCPLph0VhUJSTWorEibFj4EyR2YokmrASpRj0SxIJKsWiFKgsqoapo5cjvZu43HnO/e+4383Uyv2Ryv8yc87vn990zX885UwB4CKAXwAyUCcb5WlwOcqoAjPF6rIDthEAVTwfWOuEFlRUqgtKOiqC0oyIo7agISjsqgtKOyQnGNw3AHgD1ALJ87yWAewAuARhJauMfLEwXBuRsBdBntSb5rz7aJILQgk5bwfcAOMPgW3n9zPr8VNoFtVvBnvhHSst7Jy27wwH2jSCUoNVWkEcc7I9a9suVe0cQSlAXeTpi+Fyhz3Xl3hGEENREjm8AFsXwW8bWX3zrFPtHEEJQBznOeviep+8Fxf4RaAUtAPCTHCs9/GvpOwqgxjOGCLSCDtH/gSKGp+TYp+D4jRClTzPXywoO8yDZGSAe1QnNAvCV/msUMTSQ4xNLJhU0grbTt1952tUABsm1RSNGm3K1XDuVk9fvAG7xul4TkFZQE9fbSh5BN9fNWiLflJNfK4YDli5ryfVZ+z3yFWSqg7eB+ioR8YGcDb4kmpRbz7WLN0WLESt115VCUCPXuwHEGNzhukFD4pNykmIf6ed9N/+CRnIOakh8BJn6awjAFM3mebAfNCt8CHxTbiPXThaVoTBsPb5NShdF0C6uNwOKMTCcO3wJ4qbcbKtdyDrYx8Uqq1mcXgxBLbTvTUCMQT/3aHYzz8En5dq4XvTwdYVpJ9p8nOOc0DxrUuPTnbqijntIas+J6xxH0DHaPkpMSg4ypPSa27kKkp7lPW33KoN1wQHu9Tquo6ug47R7BSCTmIwcpBoxTV97HEcXQVnLriVQwC7Yb02Elrg6FRIkd+oxbW4UTUoO3dz7vqvD/wTN5JhWPn8HYG4CARfCfKtPuurSe5m/+vlF5m4Az/nZCxKXCkut35ueWKXXH8gwP6s5bRFxWwFss7pGITrIvifIZNMDckKbAJyzZudSGF9jD/WG47SBjOO/lY0GbhN8ILXd1AJ+PZKPAxwYSk8v4mSkZI+kJpFITq+UkFi/5MUmpZtkl6wZAEO/ANZG66Ht7++5AAAAAElFTkSuQmCC"
        />
      </svg>

      <div class="information__box">
        <p>Poziom zaawansowania projektu:&nbsp;</p>
        <span> {{ level }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["date", "numeric", "level"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.basic__information__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  .container__information {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.5rem;
    background: var(--secend-bg-color);
    border-radius: 8px;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
    .information__box {
      display: flex;
      color: white;
      font-size: 11px;
      span {
        color: var(--main-color);
      }
    }
  }
}
@media (min-width: 1560px) {
  .basic__information__container {
    flex-direction: row;
  }
}

@media (min-width: 830px) {
  .basic__information__container {
    flex-direction: row;
    .container__information {
      flex-direction: row;
      align-items: center;
      svg{
        width: 2rem;
        height: 2rem;
      }
      .information__box {
        font-size: 20px;
      }
    }
  }
}

@media (min-width: 540px) {
  .basic__information__container {
    .container__information {
      width: max-content;

      .information__box {
        font-size: 20px;
      }
    }
  }
}
</style>
