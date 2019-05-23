(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/HaberDescuentos.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/HaberDescuentos.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      search: "",
      loading: false,
      pagination: {},
      RowsPerPageItems: [9, 15, 25, {
        text: "Todos",
        value: -1
      }],
      selected: [],
      headers: [{
        text: "Codigo",
        align: "left",
        sortable: false,
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
      }],
      descuentos: []
    };
  },
  created: function created() {
    document.title = "Lista de Haberes y Descuentos";
    this.getData();
    console.log(this.$root.$agregar.go());
  },
  methods: {
    getData: function getData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/descuentos";
      axios.get(url).then(function (res) {
        _this.personas = res.data.descuentos;
      })["catch"](function (err) {
        console.log(err);
      });
    },
    sortBy: function sortBy(prop) {
      this.personas.sort(function (a, b) {
        return a[prop] < b[prop] ? -1 : 1;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/HaberDescuentos.vue?vue&type=template&id=753f855c&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/HaberDescuentos.vue?vue&type=template&id=753f855c& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
                                _vm._v("Lista de Haberes y Descuentos")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
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
                                { attrs: { color: "primary" } },
                                [
                                  _c("v-icon", [_vm._v("$vuetify.icons.add")]),
                                  _vm._v(
                                    "Agregar hab. o desct.\n              "
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
                  items: _vm.descuentos,
                  search: _vm.search,
                  "hide-actions": "",
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
                          _vm._v(_vm._s(props.item.codigo))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.nombre))
                        ]),
                        _vm._v(" "),
                        _c(
                          "td",
                          [
                            props.item.tipo === "descuento"
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
                                    [_vm._v(_vm._s(props.item.tipo))]
                                  )
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            props.item.tipo === "haber"
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
                                    [_vm._v(_vm._s(props.item.tipo))]
                                  )
                                ]
                              : _vm._e()
                          ],
                          2
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/admin/HaberDescuentos.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/admin/HaberDescuentos.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HaberDescuentos_vue_vue_type_template_id_753f855c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HaberDescuentos.vue?vue&type=template&id=753f855c& */ "./resources/js/views/admin/HaberDescuentos.vue?vue&type=template&id=753f855c&");
/* harmony import */ var _HaberDescuentos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HaberDescuentos.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/HaberDescuentos.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _HaberDescuentos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HaberDescuentos_vue_vue_type_template_id_753f855c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HaberDescuentos_vue_vue_type_template_id_753f855c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/HaberDescuentos.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/HaberDescuentos.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/admin/HaberDescuentos.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HaberDescuentos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./HaberDescuentos.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/HaberDescuentos.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_HaberDescuentos_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/HaberDescuentos.vue?vue&type=template&id=753f855c&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/admin/HaberDescuentos.vue?vue&type=template&id=753f855c& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HaberDescuentos_vue_vue_type_template_id_753f855c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./HaberDescuentos.vue?vue&type=template&id=753f855c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/HaberDescuentos.vue?vue&type=template&id=753f855c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HaberDescuentos_vue_vue_type_template_id_753f855c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HaberDescuentos_vue_vue_type_template_id_753f855c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);