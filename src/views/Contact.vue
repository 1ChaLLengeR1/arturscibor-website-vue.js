<template>
  <div class="main__contact__container">
    <div class="box__contact">
      <Header :title="t('contact.title')"></Header>
      <form @submit.prevent="sendMessage">
        <div class="inputs">
          <v-text-field
            color="white"
            bg-color="#323946"
            v-model="form.name"
            :label="t('contact.name')"
          ></v-text-field>
          <v-text-field
            color="white"
            bg-color="#323946"
            v-model="form.email"
            :label="t('contact.email')"
          ></v-text-field>
        </div>
        <div class="inputs">
          <v-text-field
            color="white"
            bg-color="#323946"
            v-model="form.subject"
            :label="t('contact.subject')"
          ></v-text-field>
          <v-text-field
            color="white"
            bg-color="#323946"
            v-model="form.phone"
            :label="t('contact.phone')"
          ></v-text-field>
        </div>
        <v-textarea
          rows="15"
          color="white"
          bg-color="#323946"
          v-model="form.description"
          :label="t('contact.description')"
        ></v-textarea>
        <div class="button">
          <button type="submit" :disabled="!canSend">{{ t("contact.send") }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import Header from "../components/Contact/Header.vue";

export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const form = reactive({
      name: "",
      email: "",
      subject: "",
      phone: "",
      description: "",
    });

    const canSend = computed(
      () => form.name.trim() !== "" && form.email.trim() !== "" && form.description.trim() !== ""
    );

    const sendMessage = () => {
      if (!canSend.value) return;
      store.dispatch("contact/apiCreateContact", {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() === "" ? null : form.subject.trim(),
        phone: form.phone.trim() === "" ? null : form.phone.trim(),
        description: form.description.trim(),
      });

      form.name = "";
      form.email = "";
      form.subject = "";
      form.phone = "";
      form.description = "";
    };

    return { t, form, canSend, sendMessage };
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
        button:disabled {
          opacity: 0.5;
          box-shadow: none;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
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
