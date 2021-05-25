<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="usuario"
        sort-by="nombre"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Usuarios</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ titulo }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem._id"
                          label="_id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.nombre"
                          label="nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.email"
                          label="email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.rol"
                          label="rol"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.estado"
                          label="estado"
                        ></v-text-field>
                      </v-col>
                      
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >desea borrar este usuario?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editaItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="borraItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    usuario: [],
    initialize: [],

    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editarItem: {
      
      nombre: "",
      email: "",
      rol: "",
      estado: 0,
      
    },
    defaultItem: {
       nombre: "",
      email: "",
      rol: "",
      estado: 0,
    },
    headers: [
      {
        text: "ID",
        align: "start",
        value: "_id",
      },
      {
        text: "Nombre",
        align: "start",
        value: "nombre",
      },
      {
        text: "Email",
        align: "center",
        value: "email",
      },
      { text: "Rol", align: "center", value: "rol" },
      {
        text: "Estado",
        align: "center",
        value: "estado",
      },
       { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  created() {
    this.listar();
  },
  
  props:{},
  
  components:{},

  methods: {
    listar() {
      console.log("usuarios");
      let me = this;

      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("usuario", header)
        .then(function (response) {
          me.usuario = response.data.usuarios;
          console.log(response.data);
        })
        .catch(function ({ response }) {
          console.log(response.data);
        });
    },

    editaItem (item) {
    this.editedIndex = this.usuario.indexOf(item);
    this.editarItem = Object.assign({}, item);
    console.log(item)
    this.dialog = true;
    },

    borraItem (item) {
    this.editedIndex = this.usuario.indexOf(item);
    this.editarItem = Object.assign({}, item);
    this.dialogDelete = true;
    },

    deleteItemConfirm() {
    this.usuario.splice(this.editedIndex, 1);
    this.closeDelete();
  },

  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editarItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  },

  closeDelete() {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editarItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  },

  save() {
    if (this.editedIndex > -1) {
      Object.assign(this.usuario[this.editedIndex], this.editarItem);
    } else {
      this.usuario.push(this.editarItem);
    }
    this.close();
  },

  },

  computed: {
    titulo() {
      return this.editedIndex === -1 ? "Nuevo Item" : "Editar Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

 
};
</script>