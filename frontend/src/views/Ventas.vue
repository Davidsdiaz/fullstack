<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="ventas"
        sort-by="numerocomprobante"
        class="elevation-1"
        
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Ventas</v-toolbar-title>
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
                          v-model="editaItem._id"
                          label="_id"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.usuario"
                          label="usuario"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.persona"
                          label="persona"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.tipocomprobante"
                          label="tipocomprobante"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.numerocomprobante"
                          label="numerocomprobante"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.impuesto"
                          label="impuesto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.total"
                          label="total"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.estado"
                          label="estado"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editarItem.detalles"
                          label="Detalles"
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
            <v-dialog v-model="dialogDetalle" max-width="500px">
              <detalles :detalles="itemDetalles" />
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >desea borrar este item?</v-card-title
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
        <template v-slot:[`item.editarDetalle`]="{ item }">
          <v-icon small @click="editaDetalles(item)"> mdi-check </v-icon>
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
import Detalles from "../components/detalles.vue";
export default {
  data: () => ({
    itemDetalles: [],
    ventas: [],
    initialize: [],
    dialogDetalle: false,
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editarItem: {
      Usuario: 0,
      Persona: "",
      Tipocomprabante: 0,
      numerocomprobante: 0,
      Impuesto: 0,
      Total: 0,
      Detalles: "",
    },
    defaultItem: {
      Usuario: 0,
      Persona: "",
      Tipocomprobante: 0,
      numerocomprobante: 0,
      Impuesto: 0,
      Total: 0,
      Detalles: "",
    },
    headers: [
      {
        text: "ID",
        align: "start",
        value: "_id",
      },
      {
        text: "Usuario",
        align: "start",
        value: "persona.nombre",
      },
      {
        text: "Persona",
        align: "center",
        value: "persona.nombre",
      },
      { text: "Tipo Comprobante", align: "center", value: "tipocomprobante" },
      {
        text: "Numero Comprobante",
        align: "center",
        value: "numerocomprobante",
      },
      { text: "Impuesto", align: "center", value: "impuesto" },
      {
        text: "Total",
        align: "center",
        value: "total",
      },
      {
        text: "Estado",
        align: "center",
        value: "estado",
      },
      {
        text: "Detalle compra",
        value: "editarDetalle",
        align: "center",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  created() {
    this.listar();
  },

  props: {},

  components: { Detalles },

  methods: {
    listar() {
      console.log("Ventas");
      let me = this;

      let header = { headers: { token: this.$store.state.token } };
      axios
        .get("venta", header)
        .then(function (response) {
          me.ventas = response.data.venta;
          console.log(response.data);
        })
        .catch(function ({ response }) {
          console.log(response.data);
        });
    },

    editaItem(item) {
      this.editedIndex = this.ventas.indexOf(item);
      this.editarItem = Object.assign({}, item);
      console.log(item);
      this.dialog = true;
    },

    editaDetalles(item) {
      console.log('itemdetalles',item);
      this.dialogDetalle = true;
      this.itemDetalles =  item.detalles;
    },

    borraItem(item) {
      this.editedIndex = this.ventas.indexOf(item);
      this.editarItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.ventas.splice(this.editedIndex, 1);
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
        Object.assign(this.ventas[this.editedIndex], this.editarItem);
      } else {
        this.ventas.push(this.editarItem);
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