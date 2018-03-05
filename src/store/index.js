import address from './address'
import myOrder from './myOrder'
export default {
  mutations: {

  },
  modules: {
    address,myOrder
  },
  strict: process.env.NODE_ENV !== 'production'
}
