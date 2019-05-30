(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pagos/Agregar.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/pagos/Agregar.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["addRow"],
  data: function data() {
    return {
      open: false,
      items: [],
      search: "",
      isLoadingD: false,
      tipo: "",
      headers: [{
        text: "Nombre",
        align: "left",
        sortable: false,
        value: "nombre"
      }, {
        text: "Descripción",
        value: "descripcion",
        sortable: false
      }, {
        text: "Acción",
        value: "action",
        sortable: false
      }]
    };
  },
  methods: {
    showModal: function showModal() {
      this.open = true;
      this.items = [];
      this.search = "";
      this.tipo = "";
    },
    closeModal: function closeModal() {
      this.open = false;
      this.tipo = "";
      this.items = [];
      this.search = "";
    },
    searchData: function searchData(ev) {
      var _this = this;

      if (this.isLoadingD) return;
      this.isLoadingD = true;
      var params = {
        q: ev
      };
      axios.get("/search-descuentos?tipo=".concat(this.tipo), {
        params: params
      }).then(function (res) {
        _this.isLoadingD = false;
        _this.items = res.data.descuentos;
      })["catch"](function (err) {
        return console.log(err);
      })["finally"](function () {
        return _this.isLoadingD = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/pagos/Editar.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/pagos/Editar.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/listMonthsOfTheYear */ "./resources/js/services/listMonthsOfTheYear.js");
/* harmony import */ var _services_listYears__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/listYears */ "./resources/js/services/listYears.js");
/* harmony import */ var _components_pagos_Agregar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/pagos/Agregar */ "./resources/js/components/pagos/Agregar.vue");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    Agregar: _components_pagos_Agregar__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  data: function data() {
    return {
      isLoading: false,
      form: {
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
      items_anio: _services_listYears__WEBPACK_IMPORTED_MODULE_1__["years"],
      items_mes: _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__["months"],
      errors: {},
      lista_personas: [],
      search: "",
      headersHaber: [{
        text: "Haber",
        align: "left",
        sortable: false,
        value: "haber"
      }, {
        text: "Monto S/.",
        value: "monto",
        sortable: false
      }, {
        text: "Accion",
        value: "action",
        sortable: false
      }],
      headersDescuento: [{
        text: "Descuento",
        align: "left",
        sortable: false,
        value: "descuento"
      }, {
        text: "Monto S/.",
        value: "monto",
        sortable: false
      }, {
        text: "Accion",
        value: "action",
        sortable: false
      }]
    };
  },
  beforeCreate: function beforeCreate() {
    this.addCurrentYear();
  },
  created: function created() {
    document.title = "Editar un Pago";
    this.getSale();
  },
  mounted: function mounted() {
    this.$root.modalAgregarhb = this.$refs.modalAgregarhb;
  },
  methods: {
    getSale: function getSale() {
      var _this = this;

      axios.get("/pagos/".concat(this.$route.params.id, "/edit")).then(function (res) {
        return _this.form = res.data.form;
      })["catch"](function (err) {
        return console.log(res);
      });
    },
    customFilter: function customFilter(item, queryText, itemText) {
      var nombre = item.nombre.toLowerCase();
      var apellido_paterno = item.apellido_paterno.toLowerCase();
      var apellido_materno = item.apellido_materno.toLowerCase();
      var dni = item.dni.toLowerCase();
      var searchText = queryText.toLowerCase();
      return nombre.indexOf(searchText) > -1 || apellido_paterno.indexOf(searchText) || apellido_materno.indexOf(searchText) || dni.indexOf(searchText) > -1;
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
            monto: 0.0
          }));
        } else {
          this.$root.$snackbar.show("El haber ya a sido agregado.", {
            color: "warning"
          });
        }
      } else if (tipo == "descuento") {
        var descuentos = _toConsumableArray(this.form.descuentos);

        var _updatedItemIndex = descuentos.findIndex(function (descuento) {
          return descuento.id === item.id;
        });

        if (_updatedItemIndex < 0) {
          this.form.descuentos.push(_objectSpread({}, item, {
            monto: 0.0
          }));
        } else {
          this.$root.$snackbar.show("El descuento ya a sido agregado.", {
            color: "warning"
          });
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
    addCurrentYear: function addCurrentYear() {
      var currentYear = new Date().getFullYear();
      var lastYear = this.items_anio.pop();

      if (Number(lastYear) < currentYear) {
        this.items_anio = [].concat(_toConsumableArray(this.items_anio), [lastYear]);
        this.items_anio = [].concat(_toConsumableArray(this.items_anio), [currentYear]);
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
    }
  },
  watch: {
    search: function search(value) {
      var _this2 = this;

      if (this.isLoading) return;
      this.isLoading = true;
      var params = {
        q: value
      };
      axios.get("/search-personas", {
        params: params
      }).then(function (res) {
        _this2.isLoading = false;
        _this2.lista_personas = res.data.personas;
      })["catch"](function (err) {
        return console.log(err);
      })["finally"](function () {
        return _this2.isLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pagos/Agregar.vue?vue&type=template&id=7bebedef&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/pagos/Agregar.vue?vue&type=template&id=7bebedef& ***!
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
    "v-layout",
    { attrs: { row: "", "justify-center": "" } },
    [
      _c(
        "v-dialog",
        {
          attrs: { small: "", width: "600px", persistent: "" },
          model: {
            value: _vm.open,
            callback: function($$v) {
              _vm.open = $$v
            },
            expression: "open"
          }
        },
        [
          _c(
            "v-card",
            [
              _c(
                "v-card-title",
                { attrs: { wrap: "" } },
                [
                  _c("v-flex", { attrs: { xs11: "" } }, [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v("Agregar " + _vm._s(this.tipo))
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
                          on: { click: _vm.closeModal }
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
                "v-container",
                { attrs: { wrap: "" } },
                [
                  _c(
                    "v-flex",
                    { attrs: { xs12: "" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          placeholder: "Buscar por nombre",
                          label: "nombre"
                        },
                        on: {
                          input: function($event) {
                            return _vm.searchData($event)
                          },
                          change: function($event) {
                            return _vm.searchData($event)
                          }
                        },
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v
                          },
                          expression: "search"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-data-table", {
                        attrs: {
                          "no-data-text": "No hay resultados",
                          headers: _vm.headers,
                          items: _vm.items,
                          "hide-actions": "",
                          loading: _vm.isLoadingD
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "items",
                            fn: function(props) {
                              return [
                                _c("td", [_vm._v(_vm._s(props.item.nombre))]),
                                _vm._v(" "),
                                _c("td", [
                                  _vm._v(_vm._s(props.item.descripcion))
                                ]),
                                _vm._v(" "),
                                _c(
                                  "td",
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        attrs: { color: "success" },
                                        on: {
                                          click: function($event) {
                                            return _vm.$emit(
                                              "addRow",
                                              props.item,
                                              _vm.tipo
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("Agregar")]
                                    )
                                  ],
                                  1
                                )
                              ]
                            }
                          }
                        ])
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



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
                            { staticClass: "mb-3", attrs: { xs12: "" } },
                            [
                              _c("span", { staticClass: "headline" }, [
                                _vm._v("Editar pago")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c("v-flex", { attrs: { xs12: "" } }, [
                            _c("span", { staticClass: "body-2" }, [
                              _vm._v("Datos de la persona")
                            ])
                          ]),
                          _vm._v(" "),
                          _c("v-flex", { attrs: { xs12: "", sm6: "" } }, [
                            _c(
                              "div",
                              { staticClass: "pr-2" },
                              [
                                _c("v-autocomplete", {
                                  attrs: {
                                    items: _vm.lista_personas,
                                    loading: _vm.isLoading,
                                    "search-input": _vm.search,
                                    "no-data-text": "Sin resultados",
                                    "item-text": "nombre",
                                    "item-value": "API",
                                    label: "Nombre",
                                    "prepend-icon": "mdi-database-search",
                                    filter: _vm.customFilter,
                                    placeholder:
                                      "Buscar por DNI o nombre completo...",
                                    "return-object": ""
                                  },
                                  on: {
                                    "update:searchInput": function($event) {
                                      _vm.search = $event
                                    },
                                    "update:search-input": function($event) {
                                      _vm.search = $event
                                    }
                                  },
                                  scopedSlots: _vm._u([
                                    {
                                      key: "item",
                                      fn: function(data) {
                                        return [
                                          _c(
                                            "v-list-tile-content",
                                            [
                                              _c("v-list-tile-title", [
                                                _vm._v(
                                                  _vm._s(
                                                    data.item.apellido_paterno
                                                  ) +
                                                    " " +
                                                    _vm._s(
                                                      data.item.apellido_materno
                                                    ) +
                                                    ", " +
                                                    _vm._s(data.item.nombre)
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("v-list-tile-sub-title", [
                                                _vm._v(
                                                  "DNI: " +
                                                    _vm._s(data.item.dni)
                                                )
                                              ])
                                            ],
                                            1
                                          )
                                        ]
                                      }
                                    }
                                  ]),
                                  model: {
                                    value: _vm.form.persona,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "persona", $$v)
                                    },
                                    expression: "form.persona"
                                  }
                                })
                              ],
                              1
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm6: "", md3: "" } },
                            [
                              _c("v-text-field", {
                                attrs: {
                                  label: "Apellido Paterno",
                                  disabled: ""
                                },
                                model: {
                                  value: _vm.form.persona.apellido_paterno,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.form.persona,
                                      "apellido_paterno",
                                      $$v
                                    )
                                  },
                                  expression: "form.persona.apellido_paterno"
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
                              _c("v-text-field", {
                                attrs: {
                                  label: "Apellido Materno",
                                  disabled: ""
                                },
                                model: {
                                  value: _vm.form.persona.apellido_materno,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.form.persona,
                                      "apellido_materno",
                                      $$v
                                    )
                                  },
                                  expression: "form.persona.apellido_materno"
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
                                attrs: { label: "El DNI", disabled: "" },
                                model: {
                                  value: _vm.form.persona.dni,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form.persona, "dni", $$v)
                                  },
                                  expression: "form.persona.dni"
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
                                attrs: { label: "El cargo", disabled: "" },
                                model: {
                                  value: _vm.form.persona.cargo,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form.persona, "cargo", $$v)
                                  },
                                  expression: "form.persona.cargo"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-flex", { attrs: { xs12: "" } }, [
                            _c("span", { staticClass: "body-2 mb-2" }, [
                              _vm._v("El periodo del pago")
                            ])
                          ]),
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
                                      label: "El año"
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
                                  label: "El mes"
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
            "v-flex",
            { staticClass: "mb-3", attrs: { xs12: "" } },
            [
              _c("v-data-table", {
                staticClass: "elevation-1",
                attrs: {
                  headers: _vm.headersHaber,
                  items: _vm.form.haberes,
                  "hide-actions": "",
                  "no-data-text": "No hay haberes agregados"
                },
                scopedSlots: _vm._u([
                  {
                    key: "items",
                    fn: function(props) {
                      return [
                        _c(
                          "td",
                          { staticClass: "text-xs-left" },
                          [
                            _c("v-text-field", {
                              attrs: { label: "Nombre", disabled: "" },
                              model: {
                                value: props.item.nombre,
                                callback: function($$v) {
                                  _vm.$set(props.item, "nombre", $$v)
                                },
                                expression: "props.item.nombre"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "text-xs-center" },
                          [
                            _c("v-text-field", {
                              attrs: { type: "number" },
                              model: {
                                value: props.item.monto,
                                callback: function($$v) {
                                  _vm.$set(props.item, "monto", $$v)
                                },
                                expression: "props.item.monto"
                              }
                            })
                          ],
                          1
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
                                      icon: "",
                                      color: "error"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.removeItem(
                                          props.index,
                                          "haber"
                                        )
                                      }
                                    },
                                    slot: "activator"
                                  },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.close")
                                    ])
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("span", [_vm._v("Eliminar haber")])
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ]
                    }
                  },
                  {
                    key: "footer",
                    fn: function() {
                      return [
                        _c("td", [
                          _c("strong", [_vm._v("Total Haber")]),
                          _vm._v(" "),
                          _c("p", [_vm._v("S/. " + _vm._s(_vm.totalHaber()))])
                        ]),
                        _vm._v(" "),
                        _c("td"),
                        _vm._v(" "),
                        _c("td")
                      ]
                    },
                    proxy: true
                  }
                ])
              }),
              _vm._v(" "),
              _c("v-data-table", {
                staticClass: "elevation-1",
                attrs: {
                  headers: _vm.headersDescuento,
                  items: _vm.form.descuentos,
                  "hide-actions": "",
                  "no-data-text": "No hay descuentos agregados"
                },
                scopedSlots: _vm._u([
                  {
                    key: "items",
                    fn: function(props) {
                      return [
                        _c(
                          "td",
                          { staticClass: "text-xs-left" },
                          [
                            _c("v-text-field", {
                              attrs: { label: "Nombre", disabled: "" },
                              model: {
                                value: props.item.nombre,
                                callback: function($$v) {
                                  _vm.$set(props.item, "nombre", $$v)
                                },
                                expression: "props.item.nombre"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "text-xs-center" },
                          [
                            _c("v-text-field", {
                              attrs: { type: "number" },
                              model: {
                                value: props.item.monto,
                                callback: function($$v) {
                                  _vm.$set(props.item, "monto", $$v)
                                },
                                expression: "props.item.monto"
                              }
                            })
                          ],
                          1
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
                                      icon: "",
                                      color: "error"
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.removeItem(
                                          props.index,
                                          "descuento"
                                        )
                                      }
                                    },
                                    slot: "activator"
                                  },
                                  [
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.close")
                                    ])
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("span", [_vm._v("Eliminar descuento")])
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ]
                    }
                  },
                  {
                    key: "footer",
                    fn: function() {
                      return [
                        _c("td", [
                          _c("strong", [_vm._v("Total Descuento")]),
                          _vm._v(" "),
                          _c("p", [
                            _vm._v("S/. " + _vm._s(_vm.totalDescuento()))
                          ])
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _c("strong", [_vm._v("Total Liquido")]),
                          _vm._v(" "),
                          _c("p", [_vm._v("S/. " + _vm._s(_vm.totalLiquido()))])
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _c("strong", [_vm._v("Total Remuneracion")]),
                          _vm._v(" "),
                          _c("p", [_vm._v("S/. 2131")])
                        ])
                      ]
                    },
                    proxy: true
                  }
                ])
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", sm6: "" } },
            [_c("v-btn", { attrs: { color: "error" } }, [_vm._v("Cancelar")])],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs12: "", sm6: "" } },
            [_c("v-btn", { attrs: { color: "primary" } }, [_vm._v("Guardar")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("agregar", { ref: "modalAgregarhb", on: { addRow: _vm.addRow } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/pagos/Agregar.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/pagos/Agregar.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Agregar_vue_vue_type_template_id_7bebedef___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Agregar.vue?vue&type=template&id=7bebedef& */ "./resources/js/components/pagos/Agregar.vue?vue&type=template&id=7bebedef&");
/* harmony import */ var _Agregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Agregar.vue?vue&type=script&lang=js& */ "./resources/js/components/pagos/Agregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Agregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Agregar_vue_vue_type_template_id_7bebedef___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Agregar_vue_vue_type_template_id_7bebedef___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/pagos/Agregar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/pagos/Agregar.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/pagos/Agregar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Agregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Agregar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pagos/Agregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Agregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/pagos/Agregar.vue?vue&type=template&id=7bebedef&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/pagos/Agregar.vue?vue&type=template&id=7bebedef& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Agregar_vue_vue_type_template_id_7bebedef___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Agregar.vue?vue&type=template&id=7bebedef& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/pagos/Agregar.vue?vue&type=template&id=7bebedef&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Agregar_vue_vue_type_template_id_7bebedef___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Agregar_vue_vue_type_template_id_7bebedef___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/services/listMonthsOfTheYear.js":
/*!******************************************************!*\
  !*** ./resources/js/services/listMonthsOfTheYear.js ***!
  \******************************************************/
/*! exports provided: months */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "months", function() { return months; });
var months = [{
  text: "Enero",
  value: "01"
}, {
  text: "Febrero",
  value: "02"
}, {
  text: "Marzo",
  value: "03"
}, {
  text: "Abril",
  value: "04"
}, {
  text: "Mayo",
  value: "05"
}, {
  text: "Junio",
  value: "06"
}, {
  text: "Julio",
  value: "07"
}, {
  text: "Agosto",
  value: "08"
}, {
  text: "Septiembre",
  value: "09"
}, {
  text: "Octubre",
  value: "10"
}, {
  text: "Noviembre",
  value: "11"
}, {
  text: "Diciembre",
  value: "12"
}];

/***/ }),

/***/ "./resources/js/services/listYears.js":
/*!********************************************!*\
  !*** ./resources/js/services/listYears.js ***!
  \********************************************/
/*! exports provided: years */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "years", function() { return years; });
var years = ["2002", "2016", "2017", "2018", "2019"];

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