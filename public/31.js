(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/pagos/Editar.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/pagos/Editar.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/listMonthsOfTheYear */ "./resources/js/services/listMonthsOfTheYear.js");
/* harmony import */ var _components_pagos_Agregar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/pagos/Agregar */ "./resources/js/components/pagos/Agregar.vue");
/* harmony import */ var _components_periodos_ModalAgregar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/periodos/ModalAgregar */ "./resources/js/components/periodos/ModalAgregar.vue");
/* harmony import */ var _components_personas_SearchPerson__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/personas/SearchPerson */ "./resources/js/components/personas/SearchPerson.vue");
/* harmony import */ var _components_pagos_ListaItems__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/pagos/ListaItems */ "./resources/js/components/pagos/ListaItems.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    Agregar: _components_pagos_Agregar__WEBPACK_IMPORTED_MODULE_1__["default"],
    ListaItems: _components_pagos_ListaItems__WEBPACK_IMPORTED_MODULE_4__["default"],
    ModalAgregar: _components_periodos_ModalAgregar__WEBPACK_IMPORTED_MODULE_2__["default"],
    SearchPerson: _components_personas_SearchPerson__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      form: {
        id: "",
        anio: "",
        mes: "",
        persona: {},
        total_haber: 0,
        haberes: [],
        total_descuento: 0,
        descuentos: [],
        monto_liquido: 0,
        monto_imponible: 0
      },
      items_anio: [],
      items_mes: _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__["months"],
      lista_personas: [],
      errors: {},
      search: "",
      isLoading: false
    };
  },
  created: function created() {
    if (this.$auth.can("pagos.edit") || this.$auth.isAdmin()) {
      document.title = "Editar un Pago";
      this.getYears();
      this.getItem();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted: function mounted() {
    this.$root.modalAgregarhb = this.$refs.modalAgregarhb;
    this.$root.modalAgregarPeriodo = this.$refs.modalAgregarPeriodo;
  },
  methods: {
    getItem: function getItem() {
      var _this = this;

      axios.get("/pagos/".concat(this.$route.params.id, "/edit")).then(function (res) {
        _this.form = res.data.form;
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;

        if (err.response.status == 403) {
          _this.$router.push("/403");
        }
      });
    },
    getYears: function getYears() {
      var _this2 = this;

      axios.get("/periodos").then(function (res) {
        return _this2.items_anio = res.data.years;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    addPeriodo: function addPeriodo() {
      this.$root.modalAgregarPeriodo.show();
    },
    addHD: function addHD(tipo) {
      this.$root.modalAgregarhb.showModal();
      this.$root.modalAgregarhb.tipo = tipo;
    },
    addRow: function addRow(item, tipo) {
      if (tipo == "haber") {
        var haberes = _toConsumableArray(this.form.haberes);

        var updatedItemIndex = haberes.findIndex(function (haber) {
          return haber.id === item.id;
        });

        if (updatedItemIndex < 0) {
          this.form.haberes.push(_objectSpread({}, item, {
            monto: 0.0,
            hd_id: item.id
          }));
        } else {
          this.$swal("Mensaje de operación", "El haber ya ha sido agregado.", "info");
        }
      } else if (tipo == "descuento") {
        var descuentos = _toConsumableArray(this.form.descuentos);

        var _updatedItemIndex = descuentos.findIndex(function (descuento) {
          return descuento.id === item.id;
        });

        if (_updatedItemIndex < 0) {
          this.form.descuentos.push(_objectSpread({}, item, {
            monto: 0.0,
            hd_id: item.id
          }));
        } else {
          this.$swal("Mensaje de operación", "El descuento ya ha sido agregado.", "info");
        }
      }
    },
    removeItem: function removeItem(index, tipo) {
      if (tipo == "haber") {
        this.form.haberes.splice(index, 1);
      } else if (tipo == "descuento") {
        this.form.descuentos.splice(index, 1);
      }
    },
    totalHaber: function totalHaber() {
      var totalHaber = this.form.haberes.map(function (item) {
        var total = 0;
        return total += parseFloat(item.monto);
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
      return parseFloat(totalHaber).toFixed(2);
    },
    totalDescuento: function totalDescuento() {
      var totalDescuento = this.form.descuentos.map(function (item) {
        var total = 0;
        return total += parseFloat(item.monto);
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
      return parseFloat(totalDescuento).toFixed(2);
    },
    totalLiquido: function totalLiquido() {
      var total = this.totalHaber() - this.totalDescuento();
      return parseFloat(total).toFixed(2);
    },
    totalImponible: function totalImponible() {
      var total = this.form.haberes.map(function (item) {
        var totalItem = 0;

        if (item.es_imponible == 1) {
          return totalItem += parseFloat(item.monto);
        }

        return totalItem;
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
      return parseFloat(total).toFixed(2);
    },
    onPerson: function onPerson(e) {
      this.form.persona = e.target.value;
      console.log(this.form.persona);
    },
    onSubmit: function onSubmit() {
      var _this3 = this;

      var form = {
        anio: this.form.anio,
        mes: this.form.mes,
        persona_id: this.form.persona.id,
        total_haber: this.totalHaber(),
        haberes: this.form.haberes,
        total_descuento: this.totalDescuento(),
        descuentos: this.form.descuentos,
        monto_liquido: this.totalLiquido(),
        monto_imponible: this.totalImponible()
      };
      axios.put("/pagos/".concat(this.$route.params.id), form).then(function (res) {
        _this3.$router.push("/admin/pagos/lista");

        _this3.$swal("Mensaje de operación", "Datos editados correctamente", "success");
      })["catch"](function (err) {
        _this3.errors = err.response.data.errors;

        if (err.response.status == 403) {
          _this3.$router.push("/403");
        }
      });
    },
    onCancel: function onCancel() {
      this.$router.push("/admin/pagos/lista");
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/pagos/Editar.vue?vue&type=template&id=527d6ee2&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/pagos/Editar.vue?vue&type=template&id=527d6ee2& ***!
  \****************************************************************************************************************************************************************************************************************/
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
        "form",
        {
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.onSubmit($event)
            }
          }
        },
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
                    "v-btn",
                    { attrs: { color: "info" }, on: { click: _vm.onCancel } },
                    [
                      _c("v-icon", [_vm._v("$vuetify.icons.left")]),
                      _vm._v(" "),
                      _c("span", [_vm._v("Regresar Atrás")])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
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
                                { staticClass: "mb-3", attrs: { xs12: "" } },
                                [
                                  _c("span", { staticClass: "headline" }, [
                                    _vm._v("Editar pago")
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c("SearchPerson", {
                                attrs: {
                                  errors: _vm.errors,
                                  person: _vm.form.persona
                                },
                                on: {
                                  input: function($event) {
                                    return _vm.onPerson($event)
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "" } },
                                [
                                  _c("span", { staticClass: "body-2 mb-2" }, [
                                    _vm._v("El periodo del pago")
                                  ]),
                                  _vm._v(" "),
                                  _vm.$auth.can("periodos.create") ||
                                  _vm.$auth.isAdmin()
                                    ? _c(
                                        "v-tooltip",
                                        { attrs: { top: "" } },
                                        [
                                          _c(
                                            "v-btn",
                                            {
                                              attrs: {
                                                slot: "activator",
                                                color: "primary",
                                                fab: "",
                                                small: ""
                                              },
                                              on: {
                                                click: function($event) {
                                                  return _vm.addPeriodo()
                                                }
                                              },
                                              slot: "activator"
                                            },
                                            [
                                              _c("v-icon", [
                                                _vm._v("$vuetify.icons.add")
                                              ])
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("span", [
                                            _vm._v("Agregar un nuevo año")
                                          ])
                                        ],
                                        1
                                      )
                                    : _vm._e()
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md3: "" } },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "pr-2" },
                                    [
                                      _c("v-select", {
                                        attrs: {
                                          items: _vm.items_anio,
                                          "item-text": "anio",
                                          "item-value": "anio",
                                          label: "El año",
                                          "error-messages": _vm.errors.anio
                                        },
                                        model: {
                                          value: _vm.form.anio,
                                          callback: function($$v) {
                                            _vm.$set(_vm.form, "anio", $$v)
                                          },
                                          expression: "form.anio"
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                {
                                  staticClass: "pl-2",
                                  attrs: { xs12: "", sm6: "", md3: "" }
                                },
                                [
                                  _c("v-select", {
                                    attrs: {
                                      items: _vm.items_mes,
                                      label: "El mes",
                                      "error-messages": _vm.errors.mes
                                    },
                                    model: {
                                      value: _vm.form.mes,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "mes", $$v)
                                      },
                                      expression: "form.mes"
                                    }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md3: "" } },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: { color: "success" },
                                      on: {
                                        click: function($event) {
                                          return _vm.addHD("haber")
                                        }
                                      }
                                    },
                                    [_vm._v("Agregar Haber")]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-flex",
                                { attrs: { xs12: "", sm6: "", md3: "" } },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: { color: "success" },
                                      on: {
                                        click: function($event) {
                                          return _vm.addHD("descuento")
                                        }
                                      }
                                    },
                                    [_vm._v("Agregar Descuento")]
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
                "transition",
                { attrs: { name: "fade" } },
                [
                  _vm.errors.haberes
                    ? _c(
                        "v-flex",
                        { attrs: { xs12: "" } },
                        [
                          _c(
                            "v-alert",
                            { attrs: { value: true, type: "error" } },
                            [
                              _c("div", { staticClass: "body-2" }, [
                                _vm._v("Los haberes son necesarios.")
                              ])
                            ]
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "transition",
                { attrs: { name: "fade" } },
                [
                  _vm.errors.descuentos
                    ? _c(
                        "v-flex",
                        { attrs: { xs12: "" } },
                        [
                          _c(
                            "v-alert",
                            { attrs: { value: true, type: "error" } },
                            [
                              _c("div", { staticClass: "body-2" }, [
                                _vm._v("Los descuentos son necesarios.")
                              ])
                            ]
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("lista-items", {
                    attrs: { title: "Haberes", items: _vm.form.haberes },
                    on: { remove: _vm.removeItem }
                  }),
                  _vm._v(" "),
                  _c("lista-items", {
                    attrs: { title: "Descuentos", items: _vm.form.descuentos },
                    on: { remove: _vm.removeItem }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { staticClass: "mb-2", attrs: { xs12: "" } },
                [
                  _c(
                    "v-card",
                    [
                      _c(
                        "v-container",
                        { attrs: { fluid: "", "grid-list-lg": "" } },
                        [
                          _c(
                            "v-layout",
                            { attrs: { row: "", wrap: "" } },
                            [
                              _c("v-flex", { attrs: { xs12: "", sm3: "" } }, [
                                _c(
                                  "div",
                                  {
                                    staticClass: "subheading font-weight-bold"
                                  },
                                  [_vm._v("Total Haber")]
                                ),
                                _vm._v(" "),
                                _c("p", { staticClass: "no-margin" }, [
                                  _vm._v("S/. " + _vm._s(_vm.totalHaber()))
                                ])
                              ]),
                              _vm._v(" "),
                              _c("v-flex", { attrs: { xs12: "", sm3: "" } }, [
                                _c(
                                  "div",
                                  {
                                    staticClass: "subheading font-weight-bold"
                                  },
                                  [_vm._v("Total Descuento")]
                                ),
                                _vm._v(" "),
                                _c("p", { staticClass: "no-margin" }, [
                                  _vm._v("S/. " + _vm._s(_vm.totalDescuento()))
                                ])
                              ]),
                              _vm._v(" "),
                              _c("v-flex", { attrs: { xs12: "", sm3: "" } }, [
                                _c(
                                  "div",
                                  {
                                    staticClass: "subheading font-weight-bold"
                                  },
                                  [_vm._v("Total Líquido")]
                                ),
                                _vm._v(" "),
                                _c("p", { staticClass: "no-margin" }, [
                                  _vm._v("S/. " + _vm._s(_vm.totalLiquido()))
                                ])
                              ]),
                              _vm._v(" "),
                              _c("v-flex", { attrs: { xs12: "", sm3: "" } }, [
                                _c(
                                  "div",
                                  {
                                    staticClass: "subheading font-weight-bold"
                                  },
                                  [_vm._v("Total Imponible")]
                                ),
                                _vm._v(" "),
                                _c("p", { staticClass: "no-margin" }, [
                                  _vm._v("S/. " + _vm._s(_vm.totalImponible()))
                                ])
                              ])
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
                "v-flex",
                { attrs: { xs12: "", sm6: "" } },
                [
                  _c(
                    "v-btn",
                    { attrs: { color: "error" }, on: { click: _vm.onCancel } },
                    [_vm._v("Cancelar")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "", sm6: "" } },
                [
                  _c("v-btn", { attrs: { color: "primary", type: "submit" } }, [
                    _vm._v("Guardar")
                  ])
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
      _c("agregar", { ref: "modalAgregarhb", on: { addRow: _vm.addRow } }),
      _vm._v(" "),
      _c("modal-agregar", { ref: "modalAgregarPeriodo" })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/admin/pagos/Editar.vue":
/*!***************************************************!*\
  !*** ./resources/js/views/admin/pagos/Editar.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Editar_vue_vue_type_template_id_527d6ee2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editar.vue?vue&type=template&id=527d6ee2& */ "./resources/js/views/admin/pagos/Editar.vue?vue&type=template&id=527d6ee2&");
/* harmony import */ var _Editar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editar.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/pagos/Editar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Editar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Editar_vue_vue_type_template_id_527d6ee2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Editar_vue_vue_type_template_id_527d6ee2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/pagos/Editar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/pagos/Editar.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/views/admin/pagos/Editar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Editar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/pagos/Editar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Editar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/pagos/Editar.vue?vue&type=template&id=527d6ee2&":
/*!**********************************************************************************!*\
  !*** ./resources/js/views/admin/pagos/Editar.vue?vue&type=template&id=527d6ee2& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Editar_vue_vue_type_template_id_527d6ee2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Editar.vue?vue&type=template&id=527d6ee2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/pagos/Editar.vue?vue&type=template&id=527d6ee2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Editar_vue_vue_type_template_id_527d6ee2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Editar_vue_vue_type_template_id_527d6ee2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);