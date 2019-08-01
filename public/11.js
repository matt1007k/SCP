(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/pagos/Index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/pagos/Index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/listMonthsOfTheYear */ "./resources/js/services/listMonthsOfTheYear.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        text: "Periodo",
        align: "left",
        sortable: true,
        value: "anio"
      }, {
        text: "Nombre persona",
        value: "persona.dni"
      }, {
        text: "Total Haber",
        value: "total_haber"
      }, {
        text: "Total Descuento",
        value: "total_descuento"
      }, {
        text: "Monto Liquido",
        value: "monto_liquido"
      }, {
        text: "Monto Imponible",
        value: "monto_Total"
      }],
      pagos: [],
      items_anio: [],
      items_mes: _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__["months"],
      anio: "",
      mes: ""
    };
  },
  created: function created() {
    if (this.$auth.can("pagos.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Pagos";
      this.getData();
      this.getYears();
    } else {
      this.$router.push("/admin/403");
    }
  },
  methods: {
    getData: function getData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/pagos";
      this.loadingData = true;
      axios.get(url, {
        params: {
          anio: this.anio,
          mes: this.mes
        }
      }).then(function (res) {
        _this.loadingData = false;
        _this.pagos = res.data.pagos;
      })["catch"](function (err) {
        console.log(err);

        if (err.response.status == 403) {
          _this.$router.push("/admin/403");
        }
      });
    },
    filterByYear: function filterByYear() {
      this.mes = "01";
      this.getData();
    },
    filterByMonth: function filterByMonth() {
      this.getData();
    },
    getYears: function getYears() {
      var _this2 = this;

      axios.get("/periodos").then(function (res) {
        return _this2.items_anio = res.data.years;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    modalEditar: function modalEditar(pago) {
      this.$router.push("/admin/pagos/editar/" + pago.id);
    },
    deleteData: function deleteData(pago) {
      var _this3 = this;

      this.$swal({
        title: "¿Está seguro de eliminar el registro?",
        text: "Esta operación va a eliminar el registro.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, eliminar"
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/pagos/".concat(pago.id)).then(function (res) {
            _this3.$swal("Mensaje de operación", "El pago se eliminó correctamente", "success");

            _this3.getData();
          })["catch"](function (err) {
            console.log(err);

            if (err.response.status == 403) {
              _this3.$router.push("/403");
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/pagos/Index.vue?vue&type=template&id=dfa821a4&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/pagos/Index.vue?vue&type=template&id=dfa821a4& ***!
  \***************************************************************************************************************************************************************************************************************/
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
                                _vm._v("Lista de pagos")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _vm.$auth.can("pagos.create") || _vm.$auth.isAdmin()
                            ? _c(
                                "v-flex",
                                { attrs: { xs12: "", sm3: "", md3: "" } },
                                [
                                  _c("v-spacer"),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        color: "primary",
                                        router: "",
                                        to: "/admin/pagos/crear"
                                      }
                                    },
                                    [
                                      _c("v-icon", [
                                        _vm._v("$vuetify.icons.add")
                                      ]),
                                      _vm._v("Realizar pago\n              ")
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
                        attrs: {
                          clearable: "",
                          label: "Buscar",
                          type: "text",
                          placeholder: "Buscar por DNI de la persona..."
                        },
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
                        "v-layout",
                        {
                          staticClass: "mb-2",
                          attrs: { row: "", wrap: "", "align-center": "" }
                        },
                        [
                          _c(
                            "v-flex",
                            { attrs: { xs1: "" } },
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
                                  _c("span", [_vm._v("Filtar por periodo")])
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs4: "" } },
                            [
                              _c("v-select", {
                                attrs: {
                                  items: _vm.items_anio,
                                  "item-text": "anio",
                                  "item-value": "anio",
                                  label: "Seleccionar el año"
                                },
                                on: {
                                  input: function($event) {
                                    return _vm.filterByYear()
                                  }
                                },
                                model: {
                                  value: _vm.anio,
                                  callback: function($$v) {
                                    _vm.anio = $$v
                                  },
                                  expression: "anio"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { staticClass: "ml-2", attrs: { xs4: "" } },
                            [
                              _c("v-select", {
                                attrs: {
                                  items: _vm.items_mes,
                                  label: "Seleccionar el mes"
                                },
                                on: {
                                  input: function($event) {
                                    return _vm.filterByMonth()
                                  }
                                },
                                model: {
                                  value: _vm.mes,
                                  callback: function($$v) {
                                    _vm.mes = $$v
                                  },
                                  expression: "mes"
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
                  items: _vm.pagos,
                  search: _vm.search,
                  loading: _vm.loadingData,
                  "rows-per-page-text": "Mostrar",
                  "no-data-text": "No hay pagos registrados",
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
                          _vm._v(
                            _vm._s(props.item.anio) +
                              ", " +
                              _vm._s(props.item.mes)
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(props.item.persona.apellido_paterno) +
                              " " +
                              _vm._s(props.item.persona.apellido_materno) +
                              ", " +
                              _vm._s(props.item.persona.nombre)
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.total_haber))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.total_descuento))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.monto_liquido))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.monto_imponible))
                        ]),
                        _vm._v(" "),
                        _c(
                          "td",
                          [
                            _vm.$auth.can("pagos.edit") || _vm.$auth.isAdmin()
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
                            _vm.$auth.can("pagos.destroy") ||
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
                                    _c("span", [_vm._v("Eliminar registro")])
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



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

/***/ "./resources/js/views/admin/pagos/Index.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/admin/pagos/Index.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_dfa821a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=dfa821a4& */ "./resources/js/views/admin/pagos/Index.vue?vue&type=template&id=dfa821a4&");
/* harmony import */ var _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/pagos/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_dfa821a4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Index_vue_vue_type_template_id_dfa821a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/pagos/Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/pagos/Index.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/admin/pagos/Index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/pagos/Index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/pagos/Index.vue?vue&type=template&id=dfa821a4&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/admin/pagos/Index.vue?vue&type=template&id=dfa821a4& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_dfa821a4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=template&id=dfa821a4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/pagos/Index.vue?vue&type=template&id=dfa821a4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_dfa821a4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_template_id_dfa821a4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);