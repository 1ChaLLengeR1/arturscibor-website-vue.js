<template>
  <div class="sliderBar__default" :class="{'activePostion':position}">
    <router-link
      v-for="item in arrayLinks"
      :key="item"
      :to="{ name: item.link_name }"
      @click="offSildeBar"
      >{{ item.name }}</router-link
    >
    <button v-if="activeButton" @click="logout">Wyloguj się!</button>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
export default {
  props: ["arrayLinks", "position", "activeButton"],
  emits:['off-slidebar'],
  setup(_,context) {
    const store = useStore()
    const router = useRouter()
    const offSildeBar = () =>{
        context.emit('off-slidebar', false)
    } 
    const logout = () =>{
      store.commit('auth/logout');
      router.push({name:'signin'})
    }
    return {offSildeBar, logout}
  },
};
</script>

<style lang="scss" scoped>
.sliderBar__default {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.5rem;
  
  a {
    font-size: 1.2rem;
    color: var(--text-color);
    transition: 0.3s;
  }
  a:hover {
    color: var(--main-color);
  }
  .active {
    color: var(--text-color);
  }
  .exact-active-link {
    color: var(--main-color);
  }
  margin-top: 5rem;
  background: var(--bg-color);

  button{
    font-size: 1.2rem;
    color: var(--text-color);
  }
}

.activePostion{
  align-items: flex-end;
}
</style>
