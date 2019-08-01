(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/ModalAgregar.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/haberes/ModalAgregar.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      open: false,
      form: {
        nombre: "",
        tipo: "haber",
        descripcion: "",
        descripcion_simple: "",
        es_imponible: "0"
      },
      errors: {}
    };
  },
  methods: {
    Submit: function Submit() {
      var _this = this;

      axios.post("/haberes", this.form).then(function (res) {
        _this.$parent.getData();

        _this.open = false;

        _this.$swal("Mensaje de operación", "Datos registrados correctamente", "success");

        _this.resetInputs();
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;

        if (err.response.status == 403) {
          _this.$router.push("/403");
        }
      });
    },
    resetInputs: function resetInputs() {
      this.form.nombre = "";
      this.form.tipo = "haber";
      this.form.descripcion = "";
      this.form.descripcion_simple = "";
      this.es_imponible = "0";
      this.errors = {};
    },
    show: function show() {
      this.open = true;
      this.resetInputs();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/ModalEditar.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/haberes/ModalEditar.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      open: false,
      form: {
        id: "",
        nombre: "",
        tipo: "haber",
        descripcion: "",
        descripcion_simple: "",
        es_imponible: "0"
      },
      errors: {}
    };
  },
  methods: {
    Submit: function Submit() {
      var _this = this;

      axios.put("/haberes/".concat(this.form.id), this.form).then(function (res) {
        _this.$parent.getData();

        _this.open = false;

        _this.$swal("Mensaje de operación", "Datos editados correctamente", "success");

        _this.resetInputs();
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;

        if (err.response.status == 403) {
          _this.$router.push("/403");
        }
      });
    },
    resetInputs: function resetInputs() {
      this.errors = {};
    },
    show: function show() {
      this.open = true;
      this.resetInputs();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Haberes.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Haberes.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_haberes_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/haberes/ModalAgregar */ "./resources/js/components/haberes/ModalAgregar.vue");
/* harmony import */ var _components_haberes_ModalEditar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/haberes/ModalEditar */ "./resources/js/components/haberes/ModalEditar.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    ModalAgregar: _components_haberes_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__["default"],
    ModalEditar: _components_haberes_ModalEditar__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      imponible: "Todos",
      search: "",
      loading: false,
      loadingData: false,
      pagination: {},
      RowsPerPageItems: [9, 15, 25, {
        text: "Todos",
        value: -1
      }],
      selected: [],
      headers: [{
        text: "Codigo",
        align: "left",
        sortable: true,
        value: "codigo"
      }, {
        text: "Nombre",
        value: "nombre"
      }, {
        text: "Tipo",
        value: "tipo"
      }, {
        text: "Descripcion",
        value: "descripcion"
      }, {
        text: "Descripcion simple",
        value: "descripcion_simple"
      }, {
        text: "Asegurable",
        value: "es_imponible",
        sortable: false
      }],
      haberes: []
    };
  },
  created: function created() {
    if (this.$auth.can("haberes.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Haberes";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted: function mounted() {
    this.$root.agregarHaber = this.$refs.agregarHaber;
    this.$root.editarHaber = this.$refs.editarHaber;
  },
  methods: {
    getData: function getData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/haberes";
      this.loadingData = true;
      axios.get(url, {
        params: {
          imponible: this.imponible
        }
      }).then(function (res) {
        _this.loadingData = false;
        _this.haberes = res.data.haberes;
      })["catch"](function (err) {
        console.log(err);

        if (err.response.status == 403) {
          _this.$router.push("/admin/403");
        }
      });
    },
    filterBy: function filterBy(prop) {
      this.imponible = prop;
      this.getData();
    },
    modalAgregar: function modalAgregar() {
      this.$root.agregarHaber.show();
    },
    modalEditar: function modalEditar(persona) {
      this.$root.editarHaber.show();
      this.$root.editarHaber.form.id = persona.id;
      this.$root.editarHaber.form.codigo = persona.codigo;
      this.$root.editarHaber.form.nombre = persona.nombre;
      this.$root.editarHaber.form.tipo = persona.tipo;
      this.$root.editarHaber.form.descripcion = persona.descripcion;
      this.$root.editarHaber.form.descripcion_simple = persona.descripcion_simple;
      this.$root.editarHaber.form.es_imponible = String(persona.es_imponible);
    },
    deleteData: function deleteData(haber) {
      var _this2 = this;

      this.$swal({
        title: "¿Está seguro de cambiar el estado del registro?",
        text: "Esta operación va a cambiar a ser asegurable o no el haber",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, cambiar"
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/haberes/".concat(haber.id)).then(function (res) {
            _this2.$swal("Mensaje de operación", "Se cambio el estado correctamente", "success");

            _this2.getData();
          })["catch"](function (err) {
            console.log(err);

            if (errors.response.status == 403) {
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/ModalAgregar.vue?vue&type=template&id=0b974a68&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/haberes/ModalAgregar.vue?vue&type=template&id=0b974a68& ***!
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
                  {
                    staticClass: "blue-grey darken-2 white--text",
                    attrs: { wrap: "" }
                  },
                  [
                    _c("v-flex", { attrs: { xs11: "" } }, [
                      _c("span", { staticClass: "headline" }, [
                        _vm._v("Registrar un Haber")
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
                            attrs: { color: "error" },
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
                              { attrs: { xs12: "" } },
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
                              { attrs: { xs12: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Descripción",
                                    required: "",
                                    "error-messages": _vm.errors.descripcion
                                  },
                                  model: {
                                    value: _vm.form.descripcion,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "descripcion", $$v)
                                    },
                                    expression: "form.descripcion"
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
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Descripción simple",
                                    required: "",
                                    "error-messages":
                                      _vm.errors.descripcion_simple
                                  },
                                  model: {
                                    value: _vm.form.descripcion_simple,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.form,
                                        "descripcion_simple",
                                        $$v
                                      )
                                    },
                                    expression: "form.descripcion_simple"
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
                                _c("div", { staticClass: "body-2" }, [
                                  _vm._v("Si es asegurable")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "v-radio-group",
                                  {
                                    attrs: {
                                      row: "",
                                      "error-messages": _vm.errors.es_imponible
                                    },
                                    model: {
                                      value: _vm.form.es_imponible,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "es_imponible", $$v)
                                      },
                                      expression: "form.es_imponible"
                                    }
                                  },
                                  [
                                    _c("v-radio", {
                                      attrs: {
                                        label: "No",
                                        value: "0",
                                        color: "error"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Si",
                                        value: "1",
                                        color: "success"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/ModalEditar.vue?vue&type=template&id=d2b4327c&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/haberes/ModalEditar.vue?vue&type=template&id=d2b4327c& ***!
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
                  {
                    staticClass: "blue-grey darken-2 white--text",
                    attrs: { wrap: "" }
                  },
                  [
                    _c("v-flex", { attrs: { xs11: "" } }, [
                      _c("span", { staticClass: "headline" }, [
                        _vm._v("Editar el Haber")
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
                            attrs: { color: "error" },
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
                              { attrs: { xs12: "" } },
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
                              { attrs: { xs12: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Descripción",
                                    required: "",
                                    "error-messages": _vm.errors.descripcion
                                  },
                                  model: {
                                    value: _vm.form.descripcion,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "descripcion", $$v)
                                    },
                                    expression: "form.descripcion"
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
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Descripción simple",
                                    required: "",
                                    "error-messages":
                                      _vm.errors.descripcion_simple
                                  },
                                  model: {
                                    value: _vm.form.descripcion_simple,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.form,
                                        "descripcion_simple",
                                        $$v
                                      )
                                    },
                                    expression: "form.descripcion_simple"
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
                                _c("div", { staticClass: "body-2" }, [
                                  _vm._v("Si es asegurable")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "v-radio-group",
                                  {
                                    attrs: {
                                      row: "",
                                      "error-messages": _vm.errors.es_imponible
                                    },
                                    model: {
                                      value: _vm.form.es_imponible,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "es_imponible", $$v)
                                      },
                                      expression: "form.es_imponible"
                                    }
                                  },
                                  [
                                    _c("v-radio", {
                                      attrs: {
                                        label: "No",
                                        value: "0",
                                        color: "error"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Si",
                                        value: "1",
                                        color: "success"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Haberes.vue?vue&type=template&id=63bb9cd5&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Haberes.vue?vue&type=template&id=63bb9cd5& ***!
  \***********************************************************************************************************************************************************************************************************/
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
                            { attrs: { xs12: "", sm8: "", md9: "" } },
                            [
                              _c("span", { staticClass: "headline" }, [
                                _vm._v("Lista de Haberes")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _vm.$auth.can("haberes.create") || _vm.$auth.isAdmin()
                            ? _c(
                                "v-flex",
                                {
                                  attrs: {
                                    xs12: "",
                                    sm4: "",
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
                                      on: { click: _vm.modalAgregar }
                                    },
                                    [
                                      _c("v-icon", [
                                        _vm._v("$vuetify.icons.add")
                                      ]),
                                      _vm._v("Agregar haber\n              ")
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            : _vm._e()
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
                              _c("span", [
                                _vm._v(
                                  "Filtar por si es afectado por un impuesto o tributo"
                                )
                              ])
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
                                  return _vm.filterBy("1")
                                }
                              }
                            },
                            [_vm._v("Asegurables")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "", color: "info" },
                              on: {
                                click: function($event) {
                                  return _vm.filterBy("0")
                                }
                              }
                            },
                            [_vm._v("No Asegurables")]
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
                  items: _vm.haberes,
                  search: _vm.search,
                  loading: _vm.loadingData,
                  pagination: _vm.pagination,
                  "rows-per-page-items": _vm.RowsPerPageItems,
                  "rows-per-page-text": "Mostrar",
                  "no-data-text": "No hay registros",
                  "no-results-text": "No hay registros encontrados"
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
                          _vm._v(_vm._s(props.item.codigo))
                        ]),
                        _vm._v(" "),
                        _c("td", [_vm._v(_vm._s(props.item.nombre))]),
                        _vm._v(" "),
                        _c(
                          "td",
                          [
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
                              [_vm._v(_vm._s(props.item.tipo))]
                            )
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.descripcion))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.descripcion_simple))
                        ]),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "text-xs-center" },
                          [
                            props.item.es_imponible == "1"
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
                                    [_vm._v("Si")]
                                  )
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            props.item.es_imponible == "0"
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
                                    [_vm._v("No")]
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
                            _vm.$auth.can("haberes.edit") || _vm.$auth.isAdmin()
                              ? _c(
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
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.$auth.can("haberes.destroy") ||
                            _vm.$auth.isAdmin()
                              ? _c(
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
                                    _c("span", [_vm._v("Cambiar asegurable")])
                                  ],
                                  1
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      ]
                    }
                  }
                ])
              }),
              _vm._v(" "),
              _c("div", { staticClass: "text-xs-center pt-2" })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("modal-agregar", { ref: "agregarHaber" }),
      _vm._v(" "),
      _c("modal-editar", { ref: "editarHaber" })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/haberes/ModalAgregar.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/haberes/ModalAgregar.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalAgregar_vue_vue_type_template_id_0b974a68___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalAgregar.vue?vue&type=template&id=0b974a68& */ "./resources/js/components/haberes/ModalAgregar.vue?vue&type=template&id=0b974a68&");
/* harmony import */ var _ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalAgregar.vue?vue&type=script&lang=js& */ "./resources/js/components/haberes/ModalAgregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalAgregar_vue_vue_type_template_id_0b974a68___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalAgregar_vue_vue_type_template_id_0b974a68___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/haberes/ModalAgregar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/haberes/ModalAgregar.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/haberes/ModalAgregar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAgregar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/ModalAgregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/haberes/ModalAgregar.vue?vue&type=template&id=0b974a68&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/haberes/ModalAgregar.vue?vue&type=template&id=0b974a68& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_0b974a68___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAgregar.vue?vue&type=template&id=0b974a68& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/ModalAgregar.vue?vue&type=template&id=0b974a68&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_0b974a68___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_0b974a68___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/haberes/ModalEditar.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/haberes/ModalEditar.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalEditar_vue_vue_type_template_id_d2b4327c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalEditar.vue?vue&type=template&id=d2b4327c& */ "./resources/js/components/haberes/ModalEditar.vue?vue&type=template&id=d2b4327c&");
/* harmony import */ var _ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalEditar.vue?vue&type=script&lang=js& */ "./resources/js/components/haberes/ModalEditar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalEditar_vue_vue_type_template_id_d2b4327c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalEditar_vue_vue_type_template_id_d2b4327c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/haberes/ModalEditar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/haberes/ModalEditar.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/haberes/ModalEditar.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalEditar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/ModalEditar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/haberes/ModalEditar.vue?vue&type=template&id=d2b4327c&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/haberes/ModalEditar.vue?vue&type=template&id=d2b4327c& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_d2b4327c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalEditar.vue?vue&type=template&id=d2b4327c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/ModalEditar.vue?vue&type=template&id=d2b4327c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_d2b4327c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_d2b4327c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/admin/Haberes.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/admin/Haberes.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Haberes_vue_vue_type_template_id_63bb9cd5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Haberes.vue?vue&type=template&id=63bb9cd5& */ "./resources/js/views/admin/Haberes.vue?vue&type=template&id=63bb9cd5&");
/* harmony import */ var _Haberes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Haberes.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Haberes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Haberes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Haberes_vue_vue_type_template_id_63bb9cd5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Haberes_vue_vue_type_template_id_63bb9cd5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Haberes.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Haberes.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/admin/Haberes.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Haberes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Haberes.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Haberes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Haberes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Haberes.vue?vue&type=template&id=63bb9cd5&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/admin/Haberes.vue?vue&type=template&id=63bb9cd5& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Haberes_vue_vue_type_template_id_63bb9cd5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Haberes.vue?vue&type=template&id=63bb9cd5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Haberes.vue?vue&type=template&id=63bb9cd5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Haberes_vue_vue_type_template_id_63bb9cd5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Haberes_vue_vue_type_template_id_63bb9cd5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);