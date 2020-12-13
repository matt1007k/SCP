(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      loadingData: false,
      pagination: {},
      page: 1,
      RowsPerPageItems: [10, 15, 25],
      perPage: 10,
      headers: [{
        text: "Periodo"
      }, {
        text: "Nombre persona"
      }, {
        text: "Total Haber"
      }, {
        text: "Total Descuento"
      }, {
        text: "Monto Liquido"
      }, {
        text: "Monto Imponible"
      }, {
        text: "Acciones"
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
      var date_now = new Date();
      this.anio = String(date_now.getFullYear());
      this.mes = date_now.getMonth().toString().padStart(2, "0");
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
          mes: this.mes,
          perPage: this.perPage,
          search: this.search,
          page: this.page
        }
      }).then(function (res) {
        _this.pagos = res.data.data;
        _this.pagination = _this.getPaginateElement(res.data);
        _this.loadingData = false;
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
      _c("page-header", {
        attrs: {
          title: "Pagos",
          subtitle: "Administra los pagos recibidos por las personas.",
          img: "/img/clip-payment-processed-2.png"
        },
        scopedSlots: _vm._u([
          {
            key: "action",
            fn: function() {
              return [
                _vm.$auth.can("pagos.create") || _vm.$auth.isAdmin()
                  ? _c(
                      "div",
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "rounded-lg",
                            attrs: {
                              color: "dark",
                              large: "",
                              router: "",
                              to: "/admin/pagos/crear"
                            }
                          },
                          [
                            _c("v-icon", [_vm._v("$vuetify.icons.add")]),
                            _vm._v("Registrar Pago\n                ")
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
            { staticClass: "d-flex align-end", attrs: { row: "" } },
            [
              _c(
                "v-col",
                { attrs: { sm: "12", md: "5" } },
                [
                  _c(
                    "span",
                    { staticClass: "font-weight-bold text--secondary" },
                    [_c("span", [_vm._v("Filtar por periodo:")])]
                  ),
                  _vm._v(" "),
                  _c("v-select", {
                    attrs: {
                      items: _vm.items_anio,
                      filled: "",
                      shaped: "",
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
                "v-col",
                { staticClass: "ml-2", attrs: { xs: "12", md: "4" } },
                [
                  _c("v-select", {
                    attrs: {
                      items: _vm.items_mes,
                      filled: "",
                      shaped: "",
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
                    _vm.pagos.length
                      ? _vm._l(_vm.pagos, function(pago) {
                          return _c("tr", { key: pago.id }, [
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(pago.anio) +
                                  ", " +
                                  _vm._s(pago.mes) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _c("p", { staticClass: "mb-0" }, [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(pago.persona.apellido_paterno) +
                                    "\n                                " +
                                    _vm._s(pago.persona.apellido_materno) +
                                    ",\n                                " +
                                    _vm._s(pago.persona.nombre) +
                                    "\n                            "
                                )
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "mb-0 text--secondary" }, [
                                _vm._v(
                                  "\n                                COD. MODULAR\n                                " +
                                    _vm._s(pago.persona.codigo_modular) +
                                    "\n                            "
                                )
                              ])
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(pago.total_haber) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(pago.total_descuento) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(pago.monto_liquido) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(pago.monto_imponible) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "td",
                              [
                                _vm.$auth.can("pagos.edit") ||
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
                                                              pago
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
                                _vm.$auth.can("pagos.destroy") ||
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
                                                              pago
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