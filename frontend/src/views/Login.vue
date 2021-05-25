<template>
 
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--primary" 
                        >
                          Iniciar sesión
                        </h1>
                        <div class="text-center mt-4"></div>
                        <h4 class="text-center mt-4">
                         Asegure su correo electrónico para registrarse
                        </h4>
                        <v-form>
                          <v-text-field
                            type="email"
                            v-model="usuario.email"
                            name="Email"                                                       
                            color="teal accent-3"
                          />

                          <v-text-field
                            type="password"
                            v-model="usuario.password"
                            name="password"                            
                            color="teal accent-3"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Olvidaste tu contraseña?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn rounded color="teal accent-8" dark @click="ingresar"
                          >Registrarse</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-8">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hola, Que tal tu dia?</h1>
                        <h5 class="text-center">
                          Ingrese sus datos personales y comience a trabajar con nosotros
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++"
                          >INSCRIBIRSE</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-8">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">¡Bienvenido de nuevo!</h1>
                        <h5 class="text-center">
                          Para mantenerse conectado con nosotros, inicie sesión con su
                          información personal
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Registrarse</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--primary"
                        >
                          Crear una cuenta
                        </h1>
                        
                        <h4 class="text-center mt-4">
                          Asegure su correo electrónico para registrarse
                        </h4>
                        <v-form>
                          <v-text-field
                            label="Name"
                            name="Name"
                            type="text"
                            color="teal accent-3"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            type="text"
                            color="teal accent-3"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn rounded color="teal accent-8" dark
                          >INSCRIBIRSE</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  
</template>



><script>
import axios from "axios";
export default {
  data: () => ({
    step: 1,
    usuario: {
      email: "",
      password: "",
    },
    errors: null,
  }),
  props: {
    source: String,
  },
  methods: {
    ingresar() {
      let me = this;
      axios
        .post("usuario/login", {
          email: me.usuario.email,
          password: me.usuario.password,
        })
        .then(function (response) {
          console.log(response.data);
          me.$store.dispatch("setToken", response.data);
          me.$router.push("/");
        })
        .catch(function ({ response }) {
          me.errors = response.data.msg;
        });
    },
  },
};
</script>

