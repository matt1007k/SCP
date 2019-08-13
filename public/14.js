(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Historiales.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Historiales.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
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
        text: "N°. Certificado",
        value: "certificado",
        sortable: true
      }, {
        text: "Año",
        align: "left",
        sortable: true,
        value: "anio"
      }, {
        text: "El Mes o Meses",
        value: "meses"
      }, {
        text: "DNI de la persona",
        value: "dni"
      }, {
        text: "DNI del responsable",
        value: "dni_user"
      }, {
        text: "Fecha de entrega",
        value: "created_at",
        sortable: false
      }],
      historiales: []
    };
  },
  created: function created() {
    if (this.$auth.can("historiales.index") || this.$auth.isAdmin()) {
      document.title = "Lista de constancias";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  methods: {
    getData: function getData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/historiales";
      this.loadingData = true;
      axios.get(url).then(function (res) {
        _this.loadingData = false;
        _this.historiales = res.data.historiales;
      })["catch"](function (err) {
        console.log(err);

        if (err.response.status == 403) {
          _this.$router.push("/admin/403");
        }
      });
    },
    viewPDF: function viewPDF(historial) {
      var anio = historial.anio;
      var meses = historial.meses;
      var dni = historial.dni;
      var certificado = historial.certificado;
      var tipo = historial.tipo;
      console.log(historial);

      if (tipo == "rango") {
        var array_years = anio.split("-");
        var anio_anterior = array_years[0];
        var anio_actual = array_years[1];
        window.open("/reporte/por-anios?ver=1&anio_anterior=".concat(anio_anterior, "&anio_actual=").concat(anio_actual, "&dni=").concat(dni, "&certificado=").concat(certificado), "_blank");
      }

      if (tipo == "anio") {
        window.open("/reporte/por-anio?ver=1&anio=".concat(anio, "&dni=").concat(dni, "&certificado=").concat(certificado), "_blank");
      }

      if (tipo == "mes") {
        window.open("/reporte/por-mes?ver=1&anio=".concat(anio, "&mes=").concat(meses, "&dni=").concat(dni, "&certificado=").concat(certificado), "_blank");
      }
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Historiales.vue?vue&type=template&id=6e1df84e&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Historiales.vue?vue&type=template&id=6e1df84e& ***!
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
                          _c("v-flex", { attrs: { xs12: "" } }, [
                            _c("span", { staticClass: "headline" }, [
                              _vm._v("Lista de Historial de Constancias")
                            ])
                          ])
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
                          placeholder: "Buscar por número de certificado..."
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
                  items: _vm.historiales,
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
                          _vm._v(_vm._s(props.item.certificado))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.anio))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.meses))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.dni))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.dni_user))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.created_at))
                        ]),
                        _vm._v(" "),
                        _c(
                          "td",
                          [
                            _vm.$auth.can("pagos.consultar") ||
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
                                          color: "info",
                                          fab: "",
                                          small: ""
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.viewPDF(props.item)
                                          }
                                        },
                                        slot: "activator"
                                      },
                                      [
                                        _c("v-icon", [
                                          _vm._v("$vuetify.icons.file")
                                        ])
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c("span", [_vm._v("Ver constancia")])
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/admin/Historiales.vue":
/*!**************************************************!*\
  !*** ./resources/js/views/admin/Historiales.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Historiales_vue_vue_type_template_id_6e1df84e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Historiales.vue?vue&type=template&id=6e1df84e& */ "./resources/js/views/admin/Historiales.vue?vue&type=template&id=6e1df84e&");
/* harmony import */ var _Historiales_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Historiales.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Historiales.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Historiales_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Historiales_vue_vue_type_template_id_6e1df84e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Historiales_vue_vue_type_template_id_6e1df84e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Historiales.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Historiales.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/views/admin/Historiales.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Historiales_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Historiales.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Historiales.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Historiales_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Historiales.vue?vue&type=template&id=6e1df84e&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/admin/Historiales.vue?vue&type=template&id=6e1df84e& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Historiales_vue_vue_type_template_id_6e1df84e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Historiales.vue?vue&type=template&id=6e1df84e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Historiales.vue?vue&type=template&id=6e1df84e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Historiales_vue_vue_type_template_id_6e1df84e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Historiales_vue_vue_type_template_id_6e1df84e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);