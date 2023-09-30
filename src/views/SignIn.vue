<template>
  <login-error
    v-if="closePopupValue"
    @close-popup="closePopup"
    :error="errorResponse"
  ></login-error>
  <div class="signIn__container">
    <div class="box__signin">
      <v-container>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title class="test">{{
              toggleInformation
            }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                label="Login"
                type="text"
                v-model="login"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <div class="login__password__false">
                <p>Test mode - zobacz!</p>
                <div class="login__password">
                  <p>Login: <span>test</span></p>
                  <p>Hasło: <span>test</span></p>
                </div>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="checkInputs"
              active
              color="black"
              @click.prevent="signIn"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { fetchData } from "../components/JS/fetch";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LoginError from "../components/util/LoginError.vue";
export default {
  components: {
    "login-error": LoginError,
  },
  setup() {
    const login = ref("");
    const password = ref("");
    const toggleInformation = ref(
      "Panel dotyczy wyłącznie administratora strony!"
    );
    const closePopupValue = ref(false);
    const errorResponse = ref("");
    const router = useRouter();
    const store = useStore();

    const autoLogin = () => {
      store.dispatch("auth/automaticallyLogin");
    };
    autoLogin();

    const signIn = async () => {
      const url = "";
      const method = "POST";
      const headers = {
        "content-type": "application/json",
      };
      const body = {
        login: login.value,
        password: password.value,
      };

      store.commit("util/loadingSpinner", true);
      const response = await fetchData(url, method, headers, body, "body");
      store.commit("util/loadingSpinner", false);

      if (response.error) {
        errorResponse.value = response.error;
        closePopupValue.value = true;
        return;
      }

      store.commit("util/navigationAdmin", false);
      store.commit("auth/loadTokens", response);
      router.push({ name: "adminhome" });
    };

    const closePopup = (val) => {
      closePopupValue.value = val;
    };

    const checkSreenWidth = () => {
      if (window.innerWidth >= 500) {
        toggleInformation.value =
          "Panel dotyczy wyłącznie administratora strony!";
      } else {
        toggleInformation.value = "Panel dla Administratora!";
      }
    };

    window.addEventListener("resize", checkSreenWidth);
    checkSreenWidth();

    const checkInputs = computed(() => {
      if (login.value === "" || password.value === "") {
        return true;
      }
      return false;
    });

    return {
      login,
      password,
      signIn,
      checkInputs,
      toggleInformation,
      checkSreenWidth,
      closePopupValue,
      closePopup,
      errorResponse,
      autoLogin,
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

  .box__signin {
    width: 100%;
    animation: showForm 2s ease forwards;

    .login__password__false {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      font-size: 12px;
      background-color: #f5f4f4;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 1px solid #a5a4a4;

      .login__password {
        width: 100%;
        display: flex;
        gap: 1rem;
        span{
          font-weight: bold;
          color: rgb(102, 4, 194);
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
