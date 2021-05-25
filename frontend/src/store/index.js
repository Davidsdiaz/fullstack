import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDVkMmViODJkMGRhYjE5Mjg5OWRiNzEiLCJpYXQiOjE2MjA5NjA3NjIsImV4cCI6MTYyMDk3NTE2Mn0.jPqBbEFYt90490Xh0Vjlp2hhWsBE97BVIsm2VtGgU4Q",
    usuario:{
      estado: 1,
      _id: "605d2eb82d0dab192899db71",
      nombre: "Jesus",
      email: "jesusprueba@gmail.com",
      password: "$2b$10$2pvu9hsLx.z/HY3yhsSvVuiWbYaE05gkNA/AKbAO3qWVCkM9Hmqr6",
      rol: "ADMIN_ROL",
      createdAt: "2021-03-26T00:45:44.192Z",
      __v: 0
  }
  },
  mutations: {
    setToken(state,data){

        state.token=data.token,
        state.usuario=data.usuario
        console.log(data)
        
 
    
    }
  },
  actions: {
    setToken(context,data){
      context.commit('setToken',data)
    }
  },
  modules: {
  }
})
