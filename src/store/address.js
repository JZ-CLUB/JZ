export default {
  state: {
    addressInfo: ''
  },
  mutations: {
    editAddress (state,data) {
      console.log(data)
      state.addressInfo = data
    },
  },
  actions: {
    editAddress (context,data) {
      context.commit("editAddress",data);
    }
  }
}
