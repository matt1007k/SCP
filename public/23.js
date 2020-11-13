(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_personas_SearchPerson__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/personas/SearchPerson */ "./resources/js/components/personas/SearchPerson.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    SearchPerson: _components_personas_SearchPerson__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      form: {
        persona: {},
        anio: "",
        certificado: ""
      },
      items_anio: [],
      lista_resultado: [],
      loading: false,
      notFound: false,
      msg: null,
      errors: {}
    };
  },
  created: function created() {
    if (this.$auth.can("pagos.consultar") || this.$auth.isAdmin()) {
      document.title = "Reporte de pagos por año";
      this.getYears();
    } else {
      this.$router.push("/admin/403");
    }
  },
  methods: {
    getYears: function getYears() {
      var _this = this;

      axios.get("/periodos").then(function (res) {
        return _this.items_anio = res.data.years;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    onPerson: function onPerson(e) {
      this.form.persona = e.target.value;
    },
    buscarPago: function buscarPago() {
      var _this2 = this;

      this.loading = true;
      axios.get("/search/por-anio", {
        params: {
          anio: this.form.anio,
          persona_id: this.form.persona.id,
          certificado: this.form.certificado
        }
      }).then(function (res) {
        _this2.loading = false;
        _this2.errors = {};
        _this2.lista_resultado = res.data.pagos;
        var msg = res.data.msg;

        if (msg) {
          _this2.loading = false;
          _this2.notFound = true;
          _this2.msg = msg;
          _this2.lista_resultado = {};
        }
      })["catch"](function (err) {
        _this2.loading = false;
        _this2.errors = err.response.data.errors;
      });
    },
    downloadPDF: function downloadPDF(anio, persona_id) {
      var _this3 = this;

      var params = {
        anio: this.form.anio,
        persona_id: this.form.persona.id,
        certificado: this.form.certificado,
        ver: 0
      };
      var params_code = window.btoa(JSON.stringify(params));
      axios({
        url: "/reporte/por-anio/".concat(params_code),
        method: "GET",
        responseType: "blob" // important

      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        var name_file = "".concat(_this3.form.persona.codigo_modular, "-").concat(_this3.form.anio, ".pdf");
        link.href = url;
        link.setAttribute("download", name_file); //or any other extension

        document.body.appendChild(link);
        link.click();
      });
    },
    viewPDF: function viewPDF(anio, persona_id) {
      var params = {
        anio: this.form.anio,
        persona_id: this.form.persona.id,
        certificado: this.form.certificado,
        ver: 0
      };
      var params_code = window.btoa(JSON.stringify(params));
      window.open("/reporte/por-anio/".concat(params_code), "_blank");
    },
    getName: function getName() {
      return "".concat(this.form.persona.apellido_paterno, " ").concat(this.form.persona.apellido_materno, ", ").concat(this.form.persona.nombre, " ");
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
                              _c("v-text-field", {
                                attrs: {
                                  label: "Número de Certificado",
                                  "error-messages": _vm.errors.certificado
                                },
                                model: {
                                  value: _vm.form.certificado,
                                  callback: function($$v) {
                                    _vm.$set(_vm.form, "certificado", $$v)
                                  },
                                  expression: "form.certificado"
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
              Object.keys(_vm.lista_resultado).length !== 0
                ? [
                    _c(
                      "div",
                      { staticClass: "mb-2 d-flex justify-content-between" },
                      [
                        _c("div", { staticClass: "title" }, [
                          _vm._v("Resultados encontrados")
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "caption" }, [
                          _vm._v("Descargar o imprimir todos los pagos por año")
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-card",
                      [
                        _c(
                          "v-card-text",
                          { staticClass: "d-flex justify-content-between" },
                          [
                            _c("div", { staticClass: "details-info" }, [
                              _c("div", {
                                staticClass: "heading",
                                domProps: {
                                  innerHTML: _vm._s(_vm.lista_resultado.anio)
                                }
                              }),
                              _vm._v(" "),
                              _c("div", { staticClass: "body-2" }, [
                                _vm._v(_vm._s(_vm.getName()))
                              ])
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "actions" },
                              [
                                _c(
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
                                                    attrs: { color: "success" },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.downloadPDF(
                                                          _vm.lista_resultado
                                                            .anio,
                                                          _vm.form.persona.dni
                                                        )
                                                      }
                                                    }
                                                  },
                                                  on
                                                ),
                                                [
                                                  _c("v-icon", [
                                                    _vm._v(
                                                      "mdi mdi-cloud-download-outline"
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
                                      false,
                                      1554603751
                                    )
                                  },
                                  [
                                    _vm._v(" "),
                                    _c("span", [
                                      _vm._v("Descargar constancia de pago")
                                    ])
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
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
                                                    attrs: { color: "info" },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.viewPDF(
                                                          _vm.lista_resultado
                                                            .anio,
                                                          _vm.form.persona.dni
                                                        )
                                                      }
                                                    }
                                                  },
                                                  on
                                                ),
                                                [
                                                  _c("v-icon", [
                                                    _vm._v("mdi mdi-printer")
                                                  ])
                                                ],
                                                1
                                              )
                                            ]
                                          }
                                        }
                                      ],
                                      null,
                                      false,
                                      77256240
                                    )
                                  },
                                  [
                                    _vm._v(" "),
                                    _c("span", [
                                      _vm._v("Imprimir constancia de pago")
                                    ])
                                  ]
                                )
                              ],
                              1
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ]
                : _vm.loading
                ? [
                    _c(
                      "v-card",
                      [
                        _c("v-card-text", [
                          _c(
                            "div",
                            { staticClass: "text-xs-center" },
                            [
                              _c("v-progress-circular", {
                                attrs: { indeterminate: "", color: "primary" }
                              })
                            ],
                            1
                          )
                        ])
                      ],
                      1
                    )
                  ]
                : _vm.notFound
                ? [
                    _c(
                      "v-card",
                      [
                        _c("v-card-text", [
                          _c("div", { staticClass: "text-xs-center body-2" }, [
                            _vm._v(_vm._s(this.msg))
                          ])
                        ])
                      ],
                      1
                    )
                  ]
                : _vm._e()
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