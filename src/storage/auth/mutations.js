export default {
  loadTokens(state, payload) {
    localStorage.setItem("user", JSON.stringify(payload));
    state.optionsTokens = {
      id_user: payload.id_user,
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      type: payload.type
    };
  },
  logout(state){
    localStorage.removeItem('user');
    state.optionsTokens = {
      id_user: null,
      access_token: null,
      refresh_token: null,
      type: null
    }
  }
};
