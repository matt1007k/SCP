(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/IsAsegurable.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/haberes/IsAsegurable.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["haber"]
});

/***/ }),

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      this.form.es_imponible = "0";
      this.errors = {};
    },
    show: function show() {
      this.open = true;
      this.resetInputs();
    },
    close: function close() {
      this.open = false;
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;

        if (err.response.status == 403) {
          _this.$router.push("/403");
        }
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
/* harmony import */ var _components_haberes_IsAsegurable_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/haberes/IsAsegurable.vue */ "./resources/js/components/haberes/IsAsegurable.vue");
/* harmony import */ var _components_haberes_ModalAgregar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/haberes/ModalAgregar */ "./resources/js/components/haberes/ModalAgregar.vue");
/* harmony import */ var _components_haberes_ModalEditar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/haberes/ModalEditar */ "./resources/js/components/haberes/ModalEditar.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    ModalAgregar: _components_haberes_ModalAgregar__WEBPACK_IMPORTED_MODULE_1__["default"],
    ModalEditar: _components_haberes_ModalEditar__WEBPACK_IMPORTED_MODULE_2__["default"],
    IsAsegurable: _components_haberes_IsAsegurable_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      imponible: "Todos",
      search: "",
      loadingData: false,
      pagination: {},
      page: 1,
      RowsPerPageItems: [10, 15, 25],
      perPage: 10,
      headers: [{
        text: "Codigo"
      }, {
        text: "Nombre"
      }, {
        text: "Descripcion"
      }, {
        text: "Descripcion simple"
      }, {
        text: "Asegurable"
      }, {
        text: "Acciones"
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

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/haberes?perPage=".concat(this.perPage, "&search=").concat(this.search, "&page=").concat(this.page, "&imponible=").concat(this.imponible);
      this.loadingData = true;
      axios.get(url, {
        params: {
          imponible: this.imponible
        }
      }).then(function (res) {
        _this.haberes = res.data.data;
        _this.pagination = _this.getPaginateElement(res.data);
        _this.loadingData = false;
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
      this.resetPage();
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
        title: "¿Está seguro de cambiar el imponible del registro?",
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
            _this2.$swal("Mensaje de operación", "Se cambio el imponible correctamente", "success");

            _this2.getData();
          })["catch"](function (err) {
            console.log(err);

            if (errors.response.status == 403) {
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/IsAsegurable.vue?vue&type=template&id=7ac6d48b&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/haberes/IsAsegurable.vue?vue&type=template&id=7ac6d48b& ***!
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
  return _vm.haber.es_imponible == "1"
    ? _c(
        "span",
        [
          _c(
            "v-chip",
            {
              staticClass: "text-capitalize",
              attrs: { "text-color": "white", color: "success", small: "" }
            },
            [_vm._v("Si")]
          )
        ],
        1
      )
    : _c(
        "span",
        [
          _c(
            "v-chip",
            {
              staticClass: "text-capitalize",
              attrs: { "text-color": "white", color: "info", small: "" }
            },
            [_vm._v("No")]
          )
        ],
        1
      )
}
var staticRenderFns = []
render._withStripped = true



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
                  attrs: { title: "Registrar haber" },
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
                              { attrs: { xs12: "" } },
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
                              { attrs: { xs12: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Descripción",
                                    required: "",
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                _c(
                                  "div",
                                  { staticClass: "body-2 font-weight-bold" },
                                  [
                                    _vm._v(
                                      "\n                                    Si es asegurable\n                                "
                                    )
                                  ]
                                ),
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
                  attrs: { title: "Editar haber" },
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
                              { attrs: { xs12: "" } },
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
                              { attrs: { xs12: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "Descripción",
                                    required: "",
                                    filled: "",
                                    shaped: "",
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
                                    filled: "",
                                    shaped: "",
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
                                _c(
                                  "div",
                                  { staticClass: "body-2 font-weight-bold" },
                                  [
                                    _vm._v(
                                      "\n                                    Si es asegurable\n                                "
                                    )
                                  ]
                                ),
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
      _c("page-header", {
        attrs: {
          title: "Haberes",
          subtitle: "Administra los haberes para los pagos.",
          img: "/img/delesign-assets-and-liabilities.png"
        },
        scopedSlots: _vm._u([
          {
            key: "action",
            fn: function() {
              return [
                _vm.$auth.can("haberes.create") || _vm.$auth.isAdmin()
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
                            _vm._v("Agregar Haberes\n                ")
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
                { attrs: { sm: "12", md: "6", flex: "" } },
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
                        color: "" + (_vm.imponible == "Todos" ? "primary" : "")
                      },
                      on: {
                        click: function($event) {
                          return _vm.filterBy("activo")
                        }
                      }
                    },
                    [_vm._v("\n                    Todos\n                ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-chip",
                    {
                      staticClass: "ma-2",
                      attrs: {
                        color: "" + (_vm.imponible == "1" ? "primary" : "")
                      },
                      on: {
                        click: function($event) {
                          return _vm.filterBy("1")
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    Asegurable\n                "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-chip",
                    {
                      staticClass: "ma-2",
                      attrs: {
                        color: "" + (_vm.imponible == "0" ? "primary" : "")
                      },
                      on: {
                        click: function($event) {
                          return _vm.filterBy("0")
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    No asegurable\n                "
                      )
                    ]
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
                    _vm.haberes.length
                      ? _vm._l(_vm.haberes, function(haber) {
                          return _c("tr", { key: haber.id }, [
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(_vm._s(haber.codigo))
                            ]),
                            _vm._v(" "),
                            _c(
                              "td",
                              [
                                _c("p", { staticClass: "mb-0" }, [
                                  _vm._v(_vm._s(haber.nombre))
                                ]),
                                _vm._v(" "),
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
                                  [_vm._v(_vm._s(haber.tipo))]
                                )
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(haber.descripcion) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(haber.descripcion_simple) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "td",
                              { staticClass: "text-xs-center" },
                              [
                                _c("is-asegurable", { attrs: { haber: haber } })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              [
                                _vm.$auth.can("haberes.edit") ||
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
                                                              haber
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
                                _vm.$auth.can("haberes.destroy") ||
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
                                                              haber
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
                                          _vm._v("Cambiar asegurable")
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

/***/ "./resources/js/components/haberes/IsAsegurable.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/haberes/IsAsegurable.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IsAsegurable_vue_vue_type_template_id_7ac6d48b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IsAsegurable.vue?vue&type=template&id=7ac6d48b& */ "./resources/js/components/haberes/IsAsegurable.vue?vue&type=template&id=7ac6d48b&");
/* harmony import */ var _IsAsegurable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IsAsegurable.vue?vue&type=script&lang=js& */ "./resources/js/components/haberes/IsAsegurable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _IsAsegurable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IsAsegurable_vue_vue_type_template_id_7ac6d48b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _IsAsegurable_vue_vue_type_template_id_7ac6d48b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/haberes/IsAsegurable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/haberes/IsAsegurable.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/haberes/IsAsegurable.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IsAsegurable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./IsAsegurable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/IsAsegurable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IsAsegurable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/haberes/IsAsegurable.vue?vue&type=template&id=7ac6d48b&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/haberes/IsAsegurable.vue?vue&type=template&id=7ac6d48b& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IsAsegurable_vue_vue_type_template_id_7ac6d48b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./IsAsegurable.vue?vue&type=template&id=7ac6d48b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/haberes/IsAsegurable.vue?vue&type=template&id=7ac6d48b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IsAsegurable_vue_vue_type_template_id_7ac6d48b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IsAsegurable_vue_vue_type_template_id_7ac6d48b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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