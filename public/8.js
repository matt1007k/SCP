(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["estado"]
});

/***/ }),

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

        _this.$swal("Mensaje de operación", "Datos registrados correctamente", "success");

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
      this.errors = {};
    },
    show: function show() {
      this.open = true;
    },
    close: function close() {
      this.open = false;
      this.errors = {};
      this.resetInputs();
    }
  },
  computed: {
    getCodigoModular: function getCodigoModular() {
      return this.form.codigo_modular = "10" + this.form.dni;
    }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

      axios.put("/personas/".concat(this.form.id), {
        params: {
          persona_id: this.form.id
        }
      }).then(function (res) {
        _this.$parent.getData();

        _this.open = false;

        _this.$swal("Mensaje de operación", "Datos editados correctamente", "success");
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;
      });
    },
    show: function show() {
      this.open = true;
      this.errors = {};
    },
    close: function close() {
      this.open = false;
      this.errors = {};
    }
  },
  computed: {
    getCodigoModular: function getCodigoModular() {
      return this.form.codigo_modular = "10" + this.form.dni;
    }
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
/* harmony import */ var _components_personas_EstadoChip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/personas/EstadoChip */ "./resources/js/components/personas/EstadoChip.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    ModalEditar: _components_personas_ModalEditar__WEBPACK_IMPORTED_MODULE_1__["default"],
    EstadoChip: _components_personas_EstadoChip__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      search: "",
      estado: "activo",
      loadingData: false,
      pagination: {},
      page: 1,
      RowsPerPageItems: [10, 15, 25],
      perPage: 10,
      headers: [{
        text: "Codigo Modular"
      }, {
        text: "Nombre completo"
      }, {
        text: "Cargo"
      }, {
        text: "Estado"
      }, {
        text: "Acciones"
      }],
      personas: []
    };
  },
  created: function created() {
    if (this.$auth.can("personas.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Personas";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted: function mounted() {
    this.$root.agregarPersona = this.$refs.agregarPersona;
    this.$root.editarPersona = this.$refs.editarPersona;
  },
  methods: {
    getData: function getData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/personas?perPage=".concat(this.perPage, "&search=").concat(this.search, "&page=").concat(this.page, "&estado=").concat(this.estado);
      this.loadingData = true;
      axios.get(url, {
        params: {
          estado: this.estado
        }
      }).then(function (res) {
        _this.personas = res.data.data;
        _this.pagination = _this.getPaginateElement(res.data);
        _this.loadingData = false;
      })["catch"](function (err) {
        console.log(err);

        if (err.response.status == 403) {
          _this.$router.push("/admin/403");
        }
      });
    },
    filterBy: function filterBy(status) {
      this.estado = status;
      this.getData();
      this.resetPage();
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
        title: "¿Está seguro de eliminar el registro?",
        text: "Esta operación va a eliminar el registro",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, eliminar"
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/personas/".concat(persona.id)).then(function (res) {
            _this2.$swal("Mensaje de operación", "La persona se eliminó correctamente", "success");

            _this2.getData();
          })["catch"](function (err) {
            console.log(err);

            if (err.response.status == 403) {
              _this2.$router.push("/403");
            }
          });
        }
      });
    },
    resetPage: function resetPage() {
      this.page = 1;
    }
  },
  watch: {
    search: function search(value) {
      this.resetPage();
      this.getData();
    },
    perPage: function perPage(value) {
      this.resetPage();
      this.getData();
    },
    page: function page(value) {
      this.getData();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
    "span",
    [
      _vm.estado === "activo"
        ? [
            _c(
              "v-chip",
              {
                staticClass: "text-capitalize",
                attrs: { "text-color": "white", color: "success", small: "" }
              },
              [_vm._v(_vm._s(_vm.estado))]
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.estado === "cesante"
        ? [
            _c(
              "v-chip",
              {
                staticClass: "text-capitalize",
                attrs: { "text-color": "white", color: "error", small: "" }
              },
              [_vm._v(_vm._s(_vm.estado))]
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.estado === "sobreviviente"
        ? [
            _c(
              "v-chip",
              {
                staticClass: "text-capitalize",
                attrs: { "text-color": "white", color: "info", small: "" }
              },
              [_vm._v(_vm._s(_vm.estado))]
            )
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



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
          _c("card", [
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
                _c("modal-header", {
                  attrs: { title: "Registrar persona" },
                  scopedSlots: _vm._u([
                    {
                      key: "close",
                      fn: function() {
                        return [
                          _c(
                            "btn-secondary",
                            {
                              staticClass: "rounded-circle",
                              attrs: {
                                onClick: _vm.close,
                                fab: "",
                                small: "",
                                color: "primary"
                              }
                            },
                            [_c("v-icon", [_vm._v("$vuetify.icons.close")])],
                            1
                          )
                        ]
                      },
                      proxy: true
                    }
                  ])
                }),
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                  "div",
                                  { staticClass: "body-2 font-weight-bold" },
                                  [
                                    _vm._v(
                                      "\n                                    Estado\n                                "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
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
                    _c("small", [_vm._v("Ingrese los campos obligatorios.")])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-card-actions",
                  [
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c("btn-secondary", { attrs: { onClick: _vm.close } }, [
                      _vm._v("Cancelar")
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        staticClass: "rounded-lg",
                        attrs: { color: "primary", type: "submit" }
                      },
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
          _c("card", [
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
                _c("modal-header", {
                  attrs: { title: "Editar persona" },
                  scopedSlots: _vm._u([
                    {
                      key: "close",
                      fn: function() {
                        return [
                          _c(
                            "btn-secondary",
                            {
                              staticClass: "rounded-circle",
                              attrs: {
                                onClick: _vm.close,
                                fab: "",
                                small: "",
                                color: "primary"
                              }
                            },
                            [_c("v-icon", [_vm._v("$vuetify.icons.close")])],
                            1
                          )
                        ]
                      },
                      proxy: true
                    }
                  ])
                }),
                _vm._v(" "),
                _c(
                  "v-card-text",
                  [
                    _c(
                      "v-container",
                      { attrs: { "grid-list-lg": "" } },
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                  "div",
                                  { staticClass: "body-2 font-weight-bold" },
                                  [
                                    _vm._v(
                                      "\n                                    Estado\n                                "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
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
                    _c("small", [_vm._v("Ingrese los campos obligatorios.")])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-card-actions",
                  [
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c("btn-secondary", { attrs: { onClick: _vm.close } }, [
                      _vm._v("Cancelar")
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        staticClass: "rounded-lg",
                        attrs: { color: "primary", type: "submit" }
                      },
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
      _c("page-header", {
        attrs: {
          title: "Personas",
          subtitle: "Administra las personas que reciban sus pagos.",
          img: "/img/bermuda-profitable-growth.png"
        },
        scopedSlots: _vm._u([
          {
            key: "action",
            fn: function() {
              return [
                _vm.$auth.can("personas.create") || _vm.$auth.isAdmin()
                  ? _c(
                      "div",
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "rounded-lg",
                            attrs: { color: "dark", large: "" },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                return _vm.modalAgregar($event)
                              }
                            }
                          },
                          [
                            _c("v-icon", [_vm._v("$vuetify.icons.add")]),
                            _vm._v("Agregar Persona\n                ")
                          ],
                          1
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ]
            },
            proxy: true
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "card",
        { staticClass: "mt-6" },
        [
          _c(
            "v-flex",
            { attrs: { row: "" } },
            [
              _c(
                "v-col",
                { attrs: { sm: "12", md: "5", flex: "" } },
                [
                  _c(
                    "span",
                    { staticClass: "font-weight-bold text--secondary" },
                    [_vm._v("Filtrar por:")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-chip",
                    {
                      staticClass: "ma-2",
                      attrs: {
                        color: "" + (_vm.estado == "activo" ? "primary" : "")
                      },
                      on: {
                        click: function($event) {
                          return _vm.filterBy("activo")
                        }
                      }
                    },
                    [_vm._v("\n                    Activo\n                ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-chip",
                    {
                      staticClass: "ma-2",
                      attrs: {
                        color:
                          "" + (_vm.estado == "sobreviviente" ? "primary" : "")
                      },
                      on: {
                        click: function($event) {
                          return _vm.filterBy("sobreviviente")
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    Sobreviviente\n                "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-chip",
                    {
                      staticClass: "ma-2",
                      attrs: {
                        color: "" + (_vm.estado == "cesante" ? "primary" : "")
                      },
                      on: {
                        click: function($event) {
                          return _vm.filterBy("cesante")
                        }
                      }
                    },
                    [_vm._v("\n                    Cesante\n                ")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { row: "" } },
            [
              _c(
                "v-col",
                { attrs: { sm: "12", md: "5" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      shaped: "",
                      filled: "",
                      label: "Buscar",
                      "prepend-inner-icon": "mdi-magnify"
                    },
                    model: {
                      value: _vm.search,
                      callback: function($$v) {
                        _vm.search = $$v
                      },
                      expression: "search"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { sm: "12", md: "2" } },
                [
                  _c("v-select", {
                    attrs: {
                      items: _vm.RowsPerPageItems,
                      filled: "",
                      label: "Mostrar",
                      dense: "",
                      shaped: ""
                    },
                    model: {
                      value: _vm.perPage,
                      callback: function($$v) {
                        _vm.perPage = $$v
                      },
                      expression: "perPage"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-fade-transition",
            { attrs: { "leave-absolute": "" } },
            [
              _vm.loadingData
                ? _c("v-progress-linear", {
                    attrs: { size: "24", color: "primary", indeterminate: "" }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("data-table", {
            attrs: { headers: _vm.headers },
            scopedSlots: _vm._u([
              {
                key: "body",
                fn: function() {
                  return [
                    _vm.personas.length
                      ? _vm._l(_vm.personas, function(person) {
                          return _c("tr", { key: person.id }, [
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(person.codigo_modular) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass: "d-flex flex-column justify-center"
                              },
                              [
                                _c("p", { staticClass: "mb-0" }, [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(person.apellido_paterno) +
                                      "\n                                " +
                                      _vm._s(person.apellido_materno) +
                                      ",\n                                " +
                                      _vm._s(person.nombre) +
                                      "\n                            "
                                  )
                                ]),
                                _vm._v(" "),
                                _c(
                                  "p",
                                  { staticClass: "text--secondary mb-0" },
                                  [
                                    _vm._v(
                                      "\n                                DNI " +
                                        _vm._s(person.dni) +
                                        "\n                            "
                                    )
                                  ]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(_vm._s(person.cargo))
                            ]),
                            _vm._v(" "),
                            _c(
                              "td",
                              { staticClass: "text-xs-center" },
                              [
                                _c("EstadoChip", {
                                  attrs: { estado: person.estado }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              [
                                _vm.$auth.can("personas.edit") ||
                                _vm.$auth.isAdmin()
                                  ? _c(
                                      "v-tooltip",
                                      {
                                        attrs: { bottom: "" },
                                        scopedSlots: _vm._u(
                                          [
                                            {
                                              key: "activator",
                                              fn: function(ref) {
                                                var on = ref.on
                                                return [
                                                  _c(
                                                    "v-btn",
                                                    _vm._g(
                                                      {
                                                        attrs: {
                                                          color: "info",
                                                          fab: "",
                                                          "x-small": ""
                                                        },
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.modalEditar(
                                                              person
                                                            )
                                                          }
                                                        }
                                                      },
                                                      on
                                                    ),
                                                    [
                                                      _c("v-icon", [
                                                        _vm._v(
                                                          "$vuetify.icons.edit"
                                                        )
                                                      ])
                                                    ],
                                                    1
                                                  )
                                                ]
                                              }
                                            }
                                          ],
                                          null,
                                          true
                                        )
                                      },
                                      [
                                        _vm._v(" "),
                                        _c("span", [_vm._v("Editar registro")])
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.$auth.can("personas.destroy") ||
                                _vm.$auth.isAdmin()
                                  ? _c(
                                      "v-tooltip",
                                      {
                                        attrs: { bottom: "" },
                                        scopedSlots: _vm._u(
                                          [
                                            {
                                              key: "activator",
                                              fn: function(ref) {
                                                var on = ref.on
                                                return [
                                                  _c(
                                                    "v-btn",
                                                    _vm._g(
                                                      {
                                                        attrs: {
                                                          color: "error",
                                                          fab: "",
                                                          "x-small": ""
                                                        },
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.deleteData(
                                                              person
                                                            )
                                                          }
                                                        }
                                                      },
                                                      on
                                                    ),
                                                    [
                                                      _c("v-icon", [
                                                        _vm._v(
                                                          "$vuetify.icons.delete"
                                                        )
                                                      ])
                                                    ],
                                                    1
                                                  )
                                                ]
                                              }
                                            }
                                          ],
                                          null,
                                          true
                                        )
                                      },
                                      [
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v("Eliminar registro")
                                        ])
                                      ]
                                    )
                                  : _vm._e()
                              ],
                              1
                            )
                          ])
                        })
                      : [
                          _c("tr", [
                            _c(
                              "td",
                              { attrs: { colspan: _vm.headers.length } },
                              [_vm._v("No hay registros.")]
                            )
                          ])
                        ]
                  ]
                },
                proxy: true
              }
            ])
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "d-flex justify-between align-center flex-column flex-md-row"
            },
            [
              _c("p", { staticClass: "caption mb-0" }, [
                _vm._v(
                  "\n                Mostrando " +
                    _vm._s(_vm.pagination.from) +
                    " al " +
                    _vm._s(_vm.pagination.to) +
                    " de\n                " +
                    _vm._s(_vm.pagination.total) +
                    " registros\n            "
                )
              ]),
              _vm._v(" "),
              _c("v-pagination", {
                attrs: {
                  length: _vm.pagination.last_page,
                  "total-visible": 7,
                  color: "primary"
                },
                model: {
                  value: _vm.page,
                  callback: function($$v) {
                    _vm.page = $$v
                  },
                  expression: "page"
                }
              })
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

/***/ "./resources/js/components/personas/EstadoChip.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/personas/EstadoChip.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EstadoChip.vue?vue&type=template&id=3e8c4682& */ "./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682&");
/* harmony import */ var _EstadoChip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EstadoChip.vue?vue&type=script&lang=js& */ "./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EstadoChip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/personas/EstadoChip.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EstadoChip.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EstadoChip.vue?vue&type=template&id=3e8c4682& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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