<template>
  <div class="main__contact__container">
    <LookMessage
      v-if="openMessage.open"
      :id="openMessage.id"
      @close-message="closeMessage"
    ></LookMessage>
    <Header title="Wiadomości"></Header>
    <Form @open-message="messageValue"></Form>
  </div>
</template>

<script>
import { reactive } from "vue";
import Header from "../../components/Contact/Header.vue";
import Form from "../../components/AdminContact/Form.vue";
import LookMessage from "../../components/AdminContact/LookMessage.vue";
export default {
  components: {
    Header,
    Form,
    LookMessage,
  },
  setup() {
    //values
    const openMessage = reactive({
      id: "",
      open: false,
    });

    //functions
    const messageValue = (val) => {
      openMessage.id = val.id;
      openMessage.open = val.value;
    };

    const closeMessage = (val) => {
      openMessage.id = "";
      openMessage.open = val;
    };
    return { openMessage, messageValue, closeMessage};
  },
};
</script>

<style lang="scss" scoped>
.main__contact__container {
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}
</style>
