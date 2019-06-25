(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

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
/* harmony import */ var _components_pagos_ListaItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/pagos/ListaItems */ "./resources/js/components/pagos/ListaItems.vue");
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




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Agregar: _components_pagos_Agregar__WEBPACK_IMPORTED_MODULE_2__["default"],
    ListaItems: _components_pagos_ListaItems__WEBPACK_IMPORTED_MODULE_3__["default"]
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
      items_anio: _services_listYears__WEBPACK_IMPORTED_MODULE_1__["years"],
      items_mes: _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__["months"],
      lista_personas: [],
      errors: {},
      search: "",
      isLoading: false
    };
  },
  created: function created() {
    document.title = "Editar un Pago"; // this.addCurrentYear();

    this.getItem();
  },
  mounted: function mounted() {
    this.$root.modalAgregarhb = this.$refs.modalAgregarhb;
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
            monto: 0.0,
            hd_id: item.id
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
            monto: 0.0,
            hd_id: item.id
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
    // addCurrentYear() {
    //   let currentYear = new Date().getFullYear();
    //   let lastYear = this.items_anio.pop();
    //   if (Number(lastYear) < currentYear) {
    //     this.items_anio = [...this.items_anio, lastYear];
    //     this.items_anio = [...this.items_anio, currentYear];
    //   }
    // },
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
    onSubmit: function onSubmit() {
      var _this2 = this;

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
        _this2.$router.push("/admin/pagos/lista");

        _this2.$parent["this"].$root.$snackbar.show("Datos editados correctamente.");
      })["catch"](function (err) {
        _this2.errors = err.response.data.errors;

        if (err.response.status == 403) {
          _this2.$router.push("/403");
        }
      });
    },
    onCancel: function onCancel() {
      this.$router.push("/admin/pagos/lista");
    }
  },
  watch: {
    search: function search(value) {
      var _this3 = this;

      if (this.isLoading) return;
      this.isLoading = true;
      var params = {
        q: value
      };
      axios.get("/search-personas", {
        params: params
      }).then(function (res) {
        _this3.isLoading = false;
        _this3.lista_personas = res.data.personas;
      })["catch"](function (err) {
        return console.log(err);
      })["finally"](function () {
        return _this3.isLoading = false;
      });
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
                                        "return-object": "",
                                        "error-messages": _vm.errors.persona
                                      },
                                      on: {
                                        "update:searchInput": function($event) {
                                          _vm.search = $event
                                        },
                                        "update:search-input": function(
                                          $event
                                        ) {
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
                                                        data.item
                                                          .apellido_paterno
                                                      ) +
                                                        " " +
                                                        _vm._s(
                                                          data.item
                                                            .apellido_materno
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
                                      expression:
                                        "form.persona.apellido_paterno"
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
                                      expression:
                                        "form.persona.apellido_materno"
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
      _c("agregar", { ref: "modalAgregarhb", on: { addRow: _vm.addRow } })
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