export default {
  state: {
    totalMileageStore: 0,
    markStore: 0,
    answerIdStore: [],
    quesIdStore: []
  },
  mutations: {
    increment (state,data) {
      state.totalMileage = state.totalMileage+data
    },
    showIndex (state) {
      state.markStore++
    },
    answerIdStore (state,data) {
      state.answerIdStore.push(data.choosedId)
      state.quesIdStore.push(data.choosedQuesId)
    }
  },
  actions: {
    inc (context,data) {
      context.commit("increment",data);
    },
    ans (context,data) {
      context.commit("answerIdStore",data);
    },
    sho (context) {
      context.commit("showIndex");
    }
  }
}
