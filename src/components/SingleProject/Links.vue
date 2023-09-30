<template>
  <div class="links__container">
    <div class="box__buttons">
      <button
        class="button__download"
        v-if="path !== ''"
        @click.prevent="downloadProject(path)"
      >
        Pobierz Projekt
      </button>
      <a :href="link_page" alt="zobacz strone" class="link">Zobacz Strone</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["link_page", "path"],
  setup() {
    const downloadProject = (path) => {
      const url =
        "";
      const method = "POST";
      const headers = { "Content-Type": "application/json" };
      const body = { path: path };

      console.log(body);

      fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((res) => res.blob())
        .then((data) => {
          var a = document.createElement("a");
          a.href = window.URL.createObjectURL(data);
          a.download = "project.rar";
          a.click();
        });
    };
    return { downloadProject };
  },
};
</script>

<style lang="scss" scoped>
.links__container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;

  .box__buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;

    .button__download,
    .link {
      width: 100%;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--secend-bg-color);
      box-shadow: 0 0 1rem var(--main-color);
      background: var(--main-color);
      letter-spacing: 0.1rem;
      font-weight: 600;
      border-radius: 8px;
      transition: 0.5s ease;
      font-size: 10px;

      @media (min-width: 750px) {
        width: 20rem;
        height: 2.5rem;
        font-size: 18px;
      }
    }
    .button__download:hover,
    .link:hover {
      box-shadow: none;
    }

    @media (min-width: 750px) {
      width: 70%;
      flex-direction: row;
    }
  }
}
</style>
