<template>
  <div class="main__contact__container">
    <div class="box__contact">
      <the-header title="Skontaktuj się ze Mną!"></the-header>
      <form enctype="multipart/form-data">
        <div class="inputs">
          <v-text-field
            color="white"
            bg-color="#323946"
            v-model="item_message.name"
            label="Imię i Nazwisko"
          ></v-text-field>
          <v-text-field
            color="white"
            bg-color="#323946"
            v-model="item_message.email"
            label="E-mail"
          ></v-text-field>
        </div>
        <v-textarea
          rows="15"
          color="white"
          bg-color="#323946"
          v-model="item_message.description"
          label="Opis wiadomości"
        ></v-textarea>
        <p>Dołącz zdjęcia strony, którą chcesz wycenić</p>
        <v-file-input
          multiple
          color="white"
          bg-color="#323946"
          v-model="item_message.images"
          show-size
          label="Załaduj zdjęcia"
        ></v-file-input>
        <div class="button">
          <button @click.prevent="sendMessage">Wyślij wiadomość</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { fetchData } from "../components/JS/fetch.js";
import { notification } from "../components/JS/Notification.js";
import { reactive } from "vue";
import Header from "../components/Contact/Header.vue";
export default {
  components: {
    "the-header": Header,
  },
  setup() {
    //values
    const item_message = reactive({
      name: "",
      email: "",
      description: "",
      images: [],
    });

    const sendMessage = async () => {
      const formData = new FormData();
      formData.append("name", item_message.name);
      formData.append("email", item_message.email);
      formData.append("description", item_message.description);
      if (item_message.images.length !== 0) {
        for(const image of item_message.images){
          formData.append("files", image);
        }
      } else {
        formData.append("files", new File(["brak"], "brak.txt"));
      }

      const url = "";
      const method = "POST";
      const headers = {};

      const response = await fetchData(
        url,
        method,
        headers,
        formData,
        "formData"
      );
      notification(response);

      item_message.name = "";
      item_message.email = "";
      item_message.description = "";
      item_message.images = [];
    };

    return { sendMessage, item_message };
  },
};
</script>

<style lang="scss" scoped>
.main__contact__container {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  .box__contact {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      animation: slideContact 1s ease forwards;
      @keyframes slideContact {
        0% {
          transform: translateY(100px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .inputs {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
      }
      p {
        width: 100%;
        text-align: center;
        font-size: 20px;
        color: white;
      }
      .button {
        width: 100%;
        display: flex;
        justify-content: center;
        button {
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
          font-size: 14px;

          @media (min-width: 750px) {
            width: 20rem;
            height: 2.5rem;
            font-size: 18px;
          }
        }
        button:hover{
          box-shadow: none;
        }
      }
    }
  }
}

@media (min-width: 750px) {
  .main__contact__container {
    .box__contact {
      width: 80%;
      form {
        p{
          font-size: 25px;
        }
        .inputs {
          flex-direction: row;
        }
      }
    }
  }
}
@media (min-width: 1200px) {
  .main__contact__container {
    .box__contact {
      width: 50%;
    }
  }
}
</style>
