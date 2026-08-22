<template>
  <div class="signIn__container">
    <div class="box__signin">
      <v-container>
        <v-card class="signin__card">
          <v-toolbar class="signin__toolbar">
            <v-toolbar-title>{{ toggleInformation }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                bg-color="white"
                :label="t('signin.login')"
                type="text"
                v-model="login"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                bg-color="white"
                :label="t('signin.password')"
                type="password"
                v-model="password"
              ></v-text-field>
              <div class="login__password__false">
                <p>{{ t("signin.testModeTitle") }}</p>
                <div class="login__password">
                  <p>{{ t("signin.testLogin") }} <span>test</span></p>
                  <p>{{ t("signin.testPassword") }} <span>test</span></p>
                </div>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="checkInputs" color="blue" @click.prevent="signIn">
              {{ t("signin.submit") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { login as apiLogin } from "../api/auth/post";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { notifyError } from "../storage/common/notify";

export default {
  setup() {
    const { t } = useI18n();
    const login = ref("");
    const password = ref("");
    const toggleInformation = ref(t("signin.title"));
    const router = useRouter();
    const store = useStore();

    // Sesja jest już przywrócona przez strażniczkę routera (auth/apiRestoreSession)
    // zanim ten widok się zamontuje - jeśli mamy ważne tokeny, przeskocz od razu do panelu.
    if (store.getters["auth/optionsTokens"].id_user !== null) {
      router.push({ name: "adminhome" });
    }

    const signIn = async () => {
      store.commit("util/loadingSpinner", true);
      const result = await apiLogin({ login: login.value, password: password.value });
      store.commit("util/loadingSpinner", false);

      if (result.status === "ERROR") {
        notifyError(store.commit, result.data.message);
        return;
      }

      store.commit("util/navigationAdmin", false);
      store.commit("auth/loadTokens", result.data);
      router.push({ name: "adminhome" });
    };

    const checkSreenWidth = () => {
      toggleInformation.value = window.innerWidth >= 500 ? t("signin.title") : t("signin.titleShort");
    };

    window.addEventListener("resize", checkSreenWidth);
    checkSreenWidth();

    const checkInputs = computed(() => login.value === "" || password.value === "");

    return {
      t,
      login,
      password,
      signIn,
      checkInputs,
      toggleInformation,
    };
  },
};
</script>

<style lang="scss" scoped>
.signIn__container {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-color);

  .box__signin {
    width: 100%;
    animation: showForm 2s ease forwards;

    .signin__card {
      background: var(--secend-bg-color) !important;
    }

    .signin__toolbar {
      background: var(--main-color) !important;

      :deep(.v-toolbar-title) {
        color: var(--bg-color);
        font-weight: 600;
      }
    }

    .login__password__false {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      font-size: 12px;
      color: var(--text-color);
      background-color: rgba(255, 255, 255, 0.05);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);

      .login__password {
        width: 100%;
        display: flex;
        gap: 1rem;
        span {
          font-weight: bold;
          color: var(--main-color);
        }
      }
    }
    @keyframes showForm {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  @media (min-width: 1000px) {
    .box__signin {
      width: 50%;
      .login__password__false {
        p {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
