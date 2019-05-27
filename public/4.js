(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/ModalAgregar.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/ModalAgregar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    value: Boolean
  },
  data: function data() {
    return {
      open: false,
      form: {
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        dni: "",
        codigo_modular: "10",
        cargo: "",
        estado: "activo"
      },
      errors: {}
    };
  },
  methods: {
    Submit: function Submit() {
      var _this = this;

      axios.post("/personas", this.form).then(function (res) {
        _this.$parent.getData();

        _this.open = false;

        _this.$root.$snackbar.show("Datos registrados correctamente.");

        _this.resetInputs();
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;
      });
    },
    resetInputs: function resetInputs() {
      this.form.nombre = "";
      this.form.apellido_paterno = "";
      this.form.apellido_materno = "";
      this.form.dni = "";
      this.form.codigo_modular = "10";
      this.form.cargo = "";
      this.form.estado = "activo";
    },
    show: function show() {
      this.open = true;
    }
  },
  computed: {
    getCodigoModular: function getCodigoModular() {
      return this.form.codigo_modular = "10" + this.form.dni;
    } // show: {
    //   get() {
    //     return this.value;
    //   },
    //   set(value) {
    //     this.$emit("input", value);
    //   }
    // }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/ModalEditar.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/ModalEditar.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    value: Boolean
  },
  data: function data() {
    return {
      open: false,
      form: {
        id: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        dni: "",
        codigo_modular: "10",
        cargo: "",
        estado: "activo"
      },
      errors: {}
    };
  },
  methods: {
    Submit: function Submit() {
      var _this = this;

      axios.put("/personas/".concat(this.form.id), this.form).then(function (res) {
        _this.$parent.getData();

        _this.open = false;

        _this.$root.$snackbar.show("Datos editados correctamente.");
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;
      });
    },
    show: function show() {
      this.open = true;
    }
  },
  computed: {
    getCodigoModular: function getCodigoModular() {
      return this.form.codigo_modular = "10" + this.form.dni;
    } // show: {
    //   get() {
    //     return this.value;
    //   },
    //   set(value) {
    //     this.$emit("input", value);
    //   }
    // }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Personas.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Personas.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_personas_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/personas/ModalAgregar */ "./resources/js/components/personas/ModalAgregar.vue");
/* harmony import */ var _components_personas_ModalEditar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/personas/ModalEditar */ "./resources/js/components/personas/ModalEditar.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    ModalAgregar: _components_personas_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__["default"],
    ModalEditar: _components_personas_ModalEditar__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      search: "",
      tipo: "Todos",
      loading: false,
      loadingData: false,
      pagination: {},
      RowsPerPageItems: [9, 15, 25, {
        text: "Todos",
        value: -1
      }],
      selected: [],
      headers: [{
        text: "Codigo Modular",
        align: "left",
        sortable: false,
        value: "codigo_modular"
      }, {
        text: "Nombre completo",
        value: "apellido_paterno"
      }, {
        text: "DNI",
        value: "dni"
      }, {
        text: "Cargo",
        value: "cargo"
      }, {
        text: "Estado",
        value: "estado"
      }],
      personas: [],
      showModalEdit: false
    };
  },
  created: function created() {
    document.title = "Lista de Personas";
    this.getData();
  },
  mounted: function mounted() {
    this.$root.agregarPersona = this.$refs.agregarPersona;
    this.$root.editarPersona = this.$refs.editarPersona;
  },
  methods: {
    getData: function getData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/personas";
      this.loadingData = true;
      axios.get(url, {
        params: {
          tipo: this.tipo
        }
      }).then(function (res) {
        _this.loadingData = false;
        _this.personas = res.data.personas;
      })["catch"](function (err) {
        console.log(err);

        if (err.response.status == 403) {
          _this.$router.push("/admin/403");
        }
      });
    },
    filterBy: function filterBy(prop) {
      this.tipo = prop;
      this.getData();
    },
    modalAgregar: function modalAgregar() {
      this.$root.agregarPersona.show();
    },
    modalEditar: function modalEditar(persona) {
      this.$root.editarPersona.show();
      this.$root.editarPersona.form.id = persona.id;
      this.$root.editarPersona.form.nombre = persona.nombre;
      this.$root.editarPersona.form.apellido_paterno = persona.apellido_paterno;
      this.$root.editarPersona.form.apellido_materno = persona.apellido_materno;
      this.$root.editarPersona.form.dni = persona.dni;
      this.$root.editarPersona.form.codigo_modular = persona.codigo_modular;
      this.$root.editarPersona.form.cargo = persona.cargo;
      this.$root.editarPersona.form.estado = persona.estado;
    },
    deleteData: function deleteData(persona) {
      var _this2 = this;

      this.$swal({
        title: "Esta seguro de cambiar el estado?",
        text: "Esta operación va ha cambiar el estado del registro",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, cambiar"
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/personas/".concat(persona.id)).then(function (res) {
            _this2.$swal("Mensaje de operación", "Estado cambiado correctamente", "success");

            _this2.getData();
          })["catch"](function (err) {
            console.log(err);

            if (err.response.status == 403) {
              _this2.$router.push("/403");
            }
          });
        }
      });
    }
  },
  computed: {
    pages: function pages() {
      if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0;
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/ModalAgregar.vue?vue&type=template&id=c4fcaec2&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/ModalAgregar.vue?vue&type=template&id=c4fcaec2& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", "justify-center": "" } },
    [
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", small: "", width: "800px" },
          model: {
            value: _vm.open,
            callback: function($$v) {
              _vm.open = $$v
            },
            expression: "open"
          }
        },
        [
          _c("v-card", [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.Submit($event)
                  }
                }
              },
              [
                _c(
                  "v-card-title",
                  { attrs: { wrap: "" } },
                  [
                    _c("v-flex", { attrs: { xs11: "" } }, [
                      _c("span", { staticClass: "headline" }, [
                        _vm._v("Registrar persona")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-flex",
                      { staticClass: "d-flex justify-end", attrs: { xs1: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { flat: "", color: "error" },
                            on: {
                              click: function($event) {
                                _vm.open = false
                              }
                            }
                          },
                          [_c("v-icon", [_vm._v("$vuetify.icons.close")])],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-card-text",
                  [
                    _c(
                      "v-container",
                      { attrs: { "grid-list-md": "" } },
                      [
                        _c(
                          "v-layout",
                          { attrs: { wrap: "" } },
                          [
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Nombre",
                                    required: "",
                                    "error-messages": _vm.errors.nombre
                                  },
                                  model: {
                                    value: _vm.form.nombre,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "nombre", $$v)
                                    },
                                    expression: "form.nombre"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Apellido Paterno",
                                    required: "",
                                    "error-messages":
                                      _vm.errors.apellido_paterno
                                  },
                                  model: {
                                    value: _vm.form.apellido_paterno,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.form,
                                        "apellido_paterno",
                                        $$v
                                      )
                                    },
                                    expression: "form.apellido_paterno"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Apellido Materno",
                                    required: "",
                                    "error-messages":
                                      _vm.errors.apellido_materno
                                  },
                                  model: {
                                    value: _vm.form.apellido_materno,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.form,
                                        "apellido_materno",
                                        $$v
                                      )
                                    },
                                    expression: "form.apellido_materno"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "El DNI",
                                    required: "",
                                    maxlength: "8",
                                    "error-messages": _vm.errors.dni
                                  },
                                  model: {
                                    value: _vm.form.dni,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "dni", $$v)
                                    },
                                    expression: "form.dni"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Código Modular",
                                    required: "",
                                    maxlength: "10",
                                    "error-messages": _vm.errors.codigo_modular
                                  },
                                  model: {
                                    value: _vm.getCodigoModular,
                                    callback: function($$v) {
                                      _vm.getCodigoModular = $$v
                                    },
                                    expression: "getCodigoModular"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Cargo",
                                    required: "",
                                    "error-messages": _vm.errors.cargo
                                  },
                                  model: {
                                    value: _vm.form.cargo,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "cargo", $$v)
                                    },
                                    expression: "form.cargo"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "" } },
                              [
                                _c(
                                  "v-radio-group",
                                  {
                                    attrs: {
                                      row: "",
                                      "error-messages": _vm.errors.estado
                                    },
                                    model: {
                                      value: _vm.form.estado,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "estado", $$v)
                                      },
                                      expression: "form.estado"
                                    }
                                  },
                                  [
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Activo",
                                        value: "activo",
                                        color: "success"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Sobreviviente",
                                        value: "sobreviviente",
                                        color: "info"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Cesante",
                                        value: "cesante",
                                        color: "error"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("small", [
                      _vm._v("*indicado todos los campos son obligatorios.")
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-card-actions",
                  [
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        attrs: { color: "error" },
                        on: {
                          click: function($event) {
                            _vm.open = false
                          }
                        }
                      },
                      [_vm._v("Cancelar")]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      { attrs: { color: "success", type: "submit" } },
                      [_vm._v("Guardar")]
                    )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/ModalEditar.vue?vue&type=template&id=452934aa&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/ModalEditar.vue?vue&type=template&id=452934aa& ***!
  \***********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-layout",
    { attrs: { row: "", "justify-center": "" } },
    [
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", small: "", width: "800px" },
          model: {
            value: _vm.open,
            callback: function($$v) {
              _vm.open = $$v
            },
            expression: "open"
          }
        },
        [
          _c("v-card", [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.Submit($event)
                  }
                }
              },
              [
                _c(
                  "v-card-title",
                  { attrs: { wrap: "" } },
                  [
                    _c("v-flex", { attrs: { xs11: "" } }, [
                      _c("span", { staticClass: "headline" }, [
                        _vm._v("Editar persona")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-flex",
                      { staticClass: "d-flex justify-end", attrs: { xs1: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { flat: "", color: "error" },
                            on: {
                              click: function($event) {
                                _vm.open = false
                              }
                            }
                          },
                          [_c("v-icon", [_vm._v("$vuetify.icons.close")])],
                          1
                        )
                      ],
                      1
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-card-text",
                  [
                    _c(
                      "v-container",
                      { attrs: { "grid-list-md": "" } },
                      [
                        _c(
                          "v-layout",
                          { attrs: { wrap: "" } },
                          [
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Nombre",
                                    required: "",
                                    "error-messages": _vm.errors.nombre
                                  },
                                  model: {
                                    value: _vm.form.nombre,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "nombre", $$v)
                                    },
                                    expression: "form.nombre"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Apellido Paterno",
                                    required: "",
                                    "error-messages":
                                      _vm.errors.apellido_paterno
                                  },
                                  model: {
                                    value: _vm.form.apellido_paterno,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.form,
                                        "apellido_paterno",
                                        $$v
                                      )
                                    },
                                    expression: "form.apellido_paterno"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Apellido Materno",
                                    required: "",
                                    "error-messages":
                                      _vm.errors.apellido_materno
                                  },
                                  model: {
                                    value: _vm.form.apellido_materno,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.form,
                                        "apellido_materno",
                                        $$v
                                      )
                                    },
                                    expression: "form.apellido_materno"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "El DNI",
                                    required: "",
                                    maxlength: "8",
                                    "error-messages": _vm.errors.dni
                                  },
                                  model: {
                                    value: _vm.form.dni,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "dni", $$v)
                                    },
                                    expression: "form.dni"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Código Modular",
                                    required: "",
                                    maxlength: "10",
                                    "error-messages": _vm.errors.codigo_modular
                                  },
                                  model: {
                                    value: _vm.getCodigoModular,
                                    callback: function($$v) {
                                      _vm.getCodigoModular = $$v
                                    },
                                    expression: "getCodigoModular"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Cargo",
                                    required: "",
                                    "error-messages": _vm.errors.cargo
                                  },
                                  model: {
                                    value: _vm.form.cargo,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "cargo", $$v)
                                    },
                                    expression: "form.cargo"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "" } },
                              [
                                _c(
                                  "v-radio-group",
                                  {
                                    attrs: {
                                      row: "",
                                      "error-messages": _vm.errors.estado
                                    },
                                    model: {
                                      value: _vm.form.estado,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "estado", $$v)
                                      },
                                      expression: "form.estado"
                                    }
                                  },
                                  [
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Activo",
                                        value: "activo",
                                        color: "success"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Sobreviviente",
                                        value: "sobreviviente",
                                        color: "info"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Cesante",
                                        value: "cesante",
                                        color: "error"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("small", [
                      _vm._v("*indicado todos los campos son obligatorios.")
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-card-actions",
                  [
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        attrs: { color: "error" },
                        on: {
                          click: function($event) {
                            _vm.open = false
                          }
                        }
                      },
                      [_vm._v("Cancelar")]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      { attrs: { color: "success", type: "submit" } },
                      [_vm._v("Guardar")]
                    )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-container",
    [
      _c(
        "v-layout",
        { staticClass: "mb-3", attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-container",
                    { attrs: { "fill-height": "", fluid: "" } },
                    [
                      _c(
                        "v-layout",
                        { attrs: { row: "", wrap: "" } },
                        [
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm9: "", md9: "" } },
                            [
                              _c("span", { staticClass: "headline" }, [
                                _vm._v("Lista de personas")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            {
                              attrs: {
                                xs12: "",
                                sm3: "",
                                md3: "",
                                "justify-end": "",
                                flexbox: ""
                              }
                            },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "primary" },
                                  on: {
                                    click: function($event) {
                                      $event.stopPropagation()
                                      return _vm.modalAgregar($event)
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", [_vm._v("$vuetify.icons.add")]),
                                  _vm._v("Agregar persona\n              ")
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-container",
                    {
                      staticStyle: {
                        "padding-bottom": "0",
                        "padding-top": "0"
                      },
                      attrs: { fluid: "" }
                    },
                    [
                      _c("v-text-field", {
                        attrs: { clearable: "", label: "Buscar", type: "text" },
                        scopedSlots: _vm._u([
                          {
                            key: "prepend",
                            fn: function() {
                              return [
                                _c("v-icon", [_vm._v("$vuetify.icons.search")])
                              ]
                            },
                            proxy: true
                          },
                          {
                            key: "append",
                            fn: function() {
                              return [
                                _c(
                                  "v-fade-transition",
                                  { attrs: { "leave-absolute": "" } },
                                  [
                                    _vm.loading
                                      ? _c("v-progress-circular", {
                                          attrs: {
                                            size: "24",
                                            color: "info",
                                            indeterminate: ""
                                          }
                                        })
                                      : _vm._e()
                                  ],
                                  1
                                )
                              ]
                            },
                            proxy: true
                          }
                        ]),
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v
                          },
                          expression: "search"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        { staticClass: "mb-2" },
                        [
                          _c(
                            "v-tooltip",
                            { attrs: { bottom: "" } },
                            [
                              _c(
                                "v-icon",
                                {
                                  attrs: { slot: "activator" },
                                  slot: "activator"
                                },
                                [_vm._v("$vuetify.icons.filter")]
                              ),
                              _vm._v(" "),
                              _c("span", [_vm._v("Filtar por estado")])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "" },
                              on: {
                                click: function($event) {
                                  return _vm.filterBy("Todos")
                                }
                              }
                            },
                            [_vm._v("Todos")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "", color: "success" },
                              on: {
                                click: function($event) {
                                  return _vm.filterBy("activo")
                                }
                              }
                            },
                            [_vm._v("Activos")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "", color: "info" },
                              on: {
                                click: function($event) {
                                  return _vm.filterBy("sobreviviente")
                                }
                              }
                            },
                            [_vm._v("Sobrevivientes")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "", color: "error" },
                              on: {
                                click: function($event) {
                                  return _vm.filterBy("cesante")
                                }
                              }
                            },
                            [_vm._v("Censantes")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [
              _c("v-data-table", {
                staticClass: "elevation-1",
                attrs: {
                  headers: _vm.headers,
                  items: _vm.personas,
                  search: _vm.search,
                  loading: _vm.loadingData,
                  "rows-per-page-text": "Mostrar",
                  "no-data-text": "No hay registros",
                  "no-results-text": "No hay registros encontrados",
                  pagination: _vm.pagination,
                  "rows-per-page-items": _vm.RowsPerPageItems
                },
                on: {
                  "update:pagination": function($event) {
                    _vm.pagination = $event
                  }
                },
                scopedSlots: _vm._u([
                  {
                    key: "items",
                    fn: function(props) {
                      return [
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.codigo_modular))
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(props.item.apellido_paterno) +
                              " " +
                              _vm._s(props.item.apellido_materno) +
                              ", " +
                              _vm._s(props.item.nombre)
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.dni))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.cargo))
                        ]),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "text-xs-center" },
                          [
                            props.item.estado === "activo"
                              ? [
                                  _c(
                                    "v-chip",
                                    {
                                      staticClass: "text-capitalize",
                                      attrs: {
                                        "text-color": "white",
                                        color: "success",
                                        small: ""
                                      }
                                    },
                                    [_vm._v(_vm._s(props.item.estado))]
                                  )
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            props.item.estado === "cesante"
                              ? [
                                  _c(
                                    "v-chip",
                                    {
                                      staticClass: "text-capitalize",
                                      attrs: {
                                        "text-color": "white",
                                        color: "error",
                                        small: ""
                                      }
                                    },
                                    [_vm._v(_vm._s(props.item.estado))]
                                  )
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            props.item.estado === "sobreviviente"
                              ? [
                                  _c(
                                    "v-chip",
                                    {
                                      staticClass: "text-capitalize",
                                      attrs: {
                                        "text-color": "white",
                                        color: "info",
                                        small: ""
                                      }
                                    },
                                    [_vm._v(_vm._s(props.item.estado))]
                                  )
                                ]
                              : _vm._e()
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          [
                            _c(
                              "v-tooltip",
                              { attrs: { bottom: "" } },
                              [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: {
                                      slot: "activator",
                                      color: "info",
                                      fab: "",
                                      small: ""
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.modalEditar(props.item)
                                      }
                                    },
                                    slot: "activator"
                                  },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.edit")
                                    ])
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("span", [_vm._v("Editar registro")])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-tooltip",
                              { attrs: { bottom: "" } },
                              [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: {
                                      slot: "activator",
                                      color: "error",
                                      fab: "",
                                      small: ""
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteData(props.item)
                                      }
                                    },
                                    slot: "activator"
                                  },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.delete")
                                    ])
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("span", [_vm._v("Cambiar estado")])
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "text-xs-center pt-2" },
                [
                  _c("v-pagination", {
                    attrs: { length: _vm.pages },
                    model: {
                      value: _vm.pagination.page,
                      callback: function($$v) {
                        _vm.$set(_vm.pagination, "page", $$v)
                      },
                      expression: "pagination.page"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("modal-agregar", { ref: "agregarPersona" }),
      _vm._v(" "),
      _c("modal-editar", { ref: "editarPersona" })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/personas/ModalAgregar.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/personas/ModalAgregar.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalAgregar_vue_vue_type_template_id_c4fcaec2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalAgregar.vue?vue&type=template&id=c4fcaec2& */ "./resources/js/components/personas/ModalAgregar.vue?vue&type=template&id=c4fcaec2&");
/* harmony import */ var _ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalAgregar.vue?vue&type=script&lang=js& */ "./resources/js/components/personas/ModalAgregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalAgregar_vue_vue_type_template_id_c4fcaec2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalAgregar_vue_vue_type_template_id_c4fcaec2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/personas/ModalAgregar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/personas/ModalAgregar.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/personas/ModalAgregar.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAgregar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/ModalAgregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/personas/ModalAgregar.vue?vue&type=template&id=c4fcaec2&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/personas/ModalAgregar.vue?vue&type=template&id=c4fcaec2& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_c4fcaec2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAgregar.vue?vue&type=template&id=c4fcaec2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/ModalAgregar.vue?vue&type=template&id=c4fcaec2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_c4fcaec2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_c4fcaec2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/personas/ModalEditar.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/personas/ModalEditar.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalEditar_vue_vue_type_template_id_452934aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalEditar.vue?vue&type=template&id=452934aa& */ "./resources/js/components/personas/ModalEditar.vue?vue&type=template&id=452934aa&");
/* harmony import */ var _ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalEditar.vue?vue&type=script&lang=js& */ "./resources/js/components/personas/ModalEditar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalEditar_vue_vue_type_template_id_452934aa___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalEditar_vue_vue_type_template_id_452934aa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/personas/ModalEditar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/personas/ModalEditar.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/personas/ModalEditar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalEditar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/ModalEditar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/personas/ModalEditar.vue?vue&type=template&id=452934aa&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/personas/ModalEditar.vue?vue&type=template&id=452934aa& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_452934aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalEditar.vue?vue&type=template&id=452934aa& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/ModalEditar.vue?vue&type=template&id=452934aa&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_452934aa___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_452934aa___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/admin/Personas.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/admin/Personas.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Personas.vue?vue&type=template&id=e2d3e734& */ "./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734&");
/* harmony import */ var _Personas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Personas.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Personas.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Personas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Personas.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Personas.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/admin/Personas.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Personas.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Personas.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Personas.vue?vue&type=template&id=e2d3e734& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);