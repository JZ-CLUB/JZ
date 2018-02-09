export default {
  state: {
    stateList:[],
    items:[]
  },
  mutations: {
    // 获取所有订单
    allOrder(state,res){
      var arr = [];
      res.map(item => {
        arr = arr.concat(item.orderGoodsList[0])
      })
      state.stateList=arr;
    },

    itemShow(state,res){
      var arr = [];
      if(res.type===0){
        state.items = []
      }
      res.data.map(item => {
        state.items = state.items.concat(item)
      })
    }
  },
  actions: {

  }
}
