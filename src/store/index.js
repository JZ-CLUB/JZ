import soreApp from './soreApp'
import myOrder from './myOrder'
export default {
  mutations: {

  },
  modules: {
    soreApp,myOrder
  },
  strict: process.env.NODE_ENV !== 'production'
}
