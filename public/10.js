(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/listMonthsOfTheYear */ "./resources/js/services/listMonthsOfTheYear.js");
/* harmony import */ var _services_listYears__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/listYears */ "./resources/js/services/listYears.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      form: {
        persona: {},
        mes: "",
        anio: ""
      },
      isLoading: false,
      items_anio: _services_listYears__WEBPACK_IMPORTED_MODULE_1__["years"],
      items_mes: _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__["months"],
      search: "",
      lista_personas: [],
      lista_resultado: [],
      errors: {}
    };
  },
  methods: {
    customFilter: function customFilter(item, queryText, itemText) {
      var nombre = item.nombre.toLowerCase();
      var apellido_paterno = item.apellido_paterno.toLowerCase();
      var apellido_materno = item.apellido_materno.toLowerCase();
      var dni = item.dni.toLowerCase();
      var searchText = queryText.toLowerCase();
      return nombre.indexOf(searchText) > -1 || apellido_paterno.indexOf(searchText) || apellido_materno.indexOf(searchText) || dni.indexOf(searchText) > -1;
    },
    buscarPago: function buscarPago() {
      // axios
      //   .get(`/reporte/por-anio`, {
      //     params: {
      //       anio: this.form.anio,
      //       persona_id: this.form.persona.id
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     this.errors = err.response.data.errors;
      //   });
      axios({
        url: "/reporte/por-anio",
        method: "GET",
        params: {
          anio: this.form.anio,
          persona_id: this.form.persona.id
        },
        responseType: "blob" // important

      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf"); //or any other extension

        document.body.appendChild(link);
        link.click();
      });
    }
  },
  watch: {
    search: function search(value) {
      var _this = this;

      if (this.isLoading) return;
      this.isLoading = true;
      var params = {
        q: value
      };
      axios.get("/search-personas", {
        params: params
      }).then(function (res) {
        _this.isLoading = false;
        _this.lista_personas = res.data.personas;
      })["catch"](function (err) {
        return console.log(err);
      })["finally"](function () {
        return _this.isLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Anual.vue?vue&type=template&id=55c205c5&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/reportes/Anual.vue?vue&type=template&id=55c205c5& ***!
  \******************************************************************************************************************************************************************************************************************/
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
                                _vm._v("Reporte de pagos por año")
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "body-1" }, [
                                _vm._v(
                                  "Consultar el pago de una persona de un año completo."
                                )
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
                          _c("v-flex", {
                            attrs: { xs12: "", sm9: "", md3: "" }
                          }),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            {
                              staticClass: "d-flex",
                              attrs: {
                                xs12: "",
                                sm3: "",
                                md3: "",
                                "justify-end": ""
                              }
                            },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "success" },
                                  on: {
                                    click: function($event) {
                                      return _vm.buscarPago()
                                    }
                                  }
                                },
                                [_vm._v("Buscar")]
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
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [
              _c("div", { staticClass: "title mb-2" }, [
                _vm._v("Resultados encontrados")
              ]),
              _vm._v(" "),
              _vm.lista_resultado.lenght > 0
                ? [
                    _c(
                      "v-card",
                      [
                        _c("v-card-text", [
                          _c("div", { staticClass: "body-2" }, [_vm._v("go")])
                        ])
                      ],
                      1
                    )
                  ]
                : [
                    _c(
                      "v-card",
                      [
                        _c("v-card-text", [
                          _c("div", { staticClass: "body-2" }, [
                            _vm._v("Sin resultados...")
                          ])
                        ])
                      ],
                      1
                    )
                  ]
            ],
            2
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

/***/ "./resources/js/views/admin/reportes/Anual.vue":
/*!*****************************************************!*\
  !*** ./resources/js/views/admin/reportes/Anual.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Anual_vue_vue_type_template_id_55c205c5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Anual.vue?vue&type=template&id=55c205c5& */ "./resources/js/views/admin/reportes/Anual.vue?vue&type=template&id=55c205c5&");
/* harmony import */ var _Anual_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Anual.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Anual_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Anual_vue_vue_type_template_id_55c205c5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Anual_vue_vue_type_template_id_55c205c5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/reportes/Anual.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Anual_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Anual.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Anual_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/reportes/Anual.vue?vue&type=template&id=55c205c5&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/admin/reportes/Anual.vue?vue&type=template&id=55c205c5& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Anual_vue_vue_type_template_id_55c205c5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Anual.vue?vue&type=template&id=55c205c5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Anual.vue?vue&type=template&id=55c205c5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Anual_vue_vue_type_template_id_55c205c5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Anual_vue_vue_type_template_id_55c205c5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);