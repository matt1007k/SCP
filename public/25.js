(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        anio_anterior: "",
        anio_actual: "",
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

      if (this.form.anio_anterior > this.form.anio_actual) {
        this.$swal("Mensaje de operación", "El campo (del año anterior) debe ser menor, que el campo (hasta el año) o actual.", "info");
      }

      axios.get("/search/por-anios", {
        params: {
          anio_anterior: this.form.anio_anterior,
          anio_actual: this.form.anio_actual,
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
          _this2.lista_resultado = [];
        }
      })["catch"](function (err) {
        _this2.loading = false;
        _this2.errors = err.response.data.errors;
      });
    },
    downloadAllPDF: function downloadAllPDF() {
      var _this3 = this;

      var params = {
        anio_anterior: this.form.anio_anterior,
        anio_actual: this.form.anio_actual,
        persona_id: this.form.persona.id,
        certificado: this.form.certificado,
        ver: 0
      };
      var params_code = window.btoa(JSON.stringify(params));
      axios({
        url: "/reporte/por-anios/".concat(params_code),
        method: "GET",
        responseType: "blob" // important

      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        var name_file = "".concat(_this3.form.persona.codigo_modular, "-").concat(_this3.form.anio_anterior, "-").concat(_this3.form.anio_actual, ".pdf");
        link.href = url;
        link.setAttribute("download", name_file); //or any other extension

        document.body.appendChild(link);
        link.click();
      });
    },
    viewAllPDF: function viewAllPDF() {
      var params = {
        anio_anterior: this.form.anio_anterior,
        anio_actual: this.form.anio_actual,
        persona_id: this.form.persona.id,
        certificado: this.form.certificado,
        ver: 0
      };
      var params_code = window.btoa(JSON.stringify(params));
      window.open("/reporte/por-anios/".concat(params_code), "_blank");
    },
    getName: function getName() {
      return "".concat(this.form.persona.apellido_paterno, " ").concat(this.form.persona.apellido_materno, ", ").concat(this.form.persona.nombre, " ");
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=template&id=d6d8296c&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=template&id=d6d8296c& ***!
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
    "v-container",
    [
      _c("page-header", {
        attrs: {
          title: "Reporte de Constancia por Años",
          subtitle: "Consultar el pago de una persona por rango de años.",
          img: "/img/clip-web-security.png"
        }
      }),
      _vm._v(" "),
      _c(
        "card",
        { staticClass: "mt-4" },
        [
          _c(
            "v-container",
            { attrs: { "fill-height": "", fluid: "" } },
            [
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c("SearchPerson", {
                    attrs: { errors: _vm.errors, person: _vm.form.persona },
                    on: {
                      input: function($event) {
                        return _vm.onPerson($event)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("v-flex", { attrs: { xs12: "" } }, [
                    _c(
                      "span",
                      { staticClass: "body-2 mb-2 font-weight-semibold" },
                      [_vm._v("El periodo del pago por años")]
                    )
                  ]),
                  _vm._v(" "),
                  _c("v-flex", { attrs: { xs12: "", sm6: "", md3: "" } }, [
                    _c(
                      "div",
                      { staticClass: "pr-2" },
                      [
                        _c("v-select", {
                          attrs: {
                            items: _vm.items_anio,
                            "item-text": "anio",
                            "item-value": "anio",
                            label: "Del año",
                            filled: "",
                            shaped: "",
                            "error-messages": _vm.errors.anio_anterior
                          },
                          model: {
                            value: _vm.form.anio_anterior,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "anio_anterior", $$v)
                            },
                            expression: "form.anio_anterior"
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    [_c("v-icon", [_vm._v("mdi mdi-arrow-expand-horizontal")])],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-flex", { attrs: { xs12: "", sm6: "", md3: "" } }, [
                    _c(
                      "div",
                      { staticClass: "pr-2" },
                      [
                        _c("v-select", {
                          attrs: {
                            items: _vm.items_anio,
                            "item-text": "anio",
                            "item-value": "anio",
                            label: "Hasta el año",
                            filled: "",
                            shaped: "",
                            "error-messages": _vm.errors.anio_actual
                          },
                          model: {
                            value: _vm.form.anio_actual,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "anio_actual", $$v)
                            },
                            expression: "form.anio_actual"
                          }
                        })
                      ],
                      1
                    )
                  ]),
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
                          filled: "",
                          shaped: "",
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
                  _c(
                    "v-flex",
                    { attrs: { xs12: "", sm3: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "rounded-lg",
                          attrs: { color: "primary", block: "" },
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
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { attrs: { row: "" } },
        [
          _c(
            "v-col",
            { attrs: { md: "12" } },
            [
              _vm.lista_resultado.length > 0
                ? [
                    _c("div", { staticClass: "mb-2 d-flex justify-between" }, [
                      _c(
                        "div",
                        [
                          _c("div", { staticClass: "title" }, [
                            _vm._v("Resultados encontrados")
                          ]),
                          _vm._v(" "),
                          _c(
                            "dir",
                            { staticClass: "caption text--secondary" },
                            [
                              _vm._v(
                                "\n                            Descargar o imprimir todos los pagos por el\n                            rango de años\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      ),
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
                                              staticClass: "rounded-lg",
                                              attrs: { text: "" },
                                              on: {
                                                click: function($event) {
                                                  return _vm.downloadAllPDF()
                                                }
                                              }
                                            },
                                            on
                                          ),
                                          [
                                            _c("v-icon", [
                                              _vm._v(
                                                "mdi\n                                        mdi-cloud-download-outline"
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
                                3930314855
                              )
                            },
                            [_vm._v(" "), _c("span", [_vm._v("Descargar")])]
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
                                              staticClass: "rounded-lg",
                                              attrs: {
                                                color: "dark",
                                                text: ""
                                              },
                                              on: {
                                                click: function($event) {
                                                  return _vm.viewAllPDF()
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
                                1258594456
                              )
                            },
                            [_vm._v(" "), _c("span", [_vm._v("Imprimir")])]
                          )
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.lista_resultado, function(pago, index) {
                      return [
                        _c(
                          "card",
                          { key: index, staticClass: "mb-2" },
                          [
                            _c(
                              "v-card-text",
                              { staticClass: "d-flex justify-content-between" },
                              [
                                _c("div", { staticClass: "details-info" }, [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "display-1 font-weight-bold ",
                                      class:
                                        "" +
                                        (_vm.$vuetify.theme.dark
                                          ? "white--text"
                                          : "black--text")
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(pago.anio) +
                                          "\n                                "
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "body-2" }, [
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(_vm.getName()) +
                                        "\n                                "
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "caption text--secondary" },
                                    [
                                      _vm._v(
                                        "\n                                    DNI " +
                                          _vm._s(_vm.form.persona.dni) +
                                          "\n                                "
                                      )
                                    ]
                                  )
                                ])
                              ]
                            )
                          ],
                          1
                        )
                      ]
                    })
                  ]
                : _vm.loading
                ? [
                    _c(
                      "card",
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
                      "card",
                      [
                        _c("v-card-text", [
                          _c("div", { staticClass: "text-xs-center body-2" }, [
                            _vm._v(
                              "\n                            " +
                                _vm._s(this.msg) +
                                "\n                        "
                            )
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

/***/ "./resources/js/views/admin/reportes/RangoAnual.vue":
/*!**********************************************************!*\
  !*** ./resources/js/views/admin/reportes/RangoAnual.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RangoAnual_vue_vue_type_template_id_d6d8296c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RangoAnual.vue?vue&type=template&id=d6d8296c& */ "./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=template&id=d6d8296c&");
/* harmony import */ var _RangoAnual_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RangoAnual.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _RangoAnual_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RangoAnual_vue_vue_type_template_id_d6d8296c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RangoAnual_vue_vue_type_template_id_d6d8296c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/reportes/RangoAnual.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RangoAnual_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RangoAnual.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RangoAnual_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=template&id=d6d8296c&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=template&id=d6d8296c& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RangoAnual_vue_vue_type_template_id_d6d8296c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./RangoAnual.vue?vue&type=template&id=d6d8296c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/RangoAnual.vue?vue&type=template&id=d6d8296c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RangoAnual_vue_vue_type_template_id_d6d8296c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RangoAnual_vue_vue_type_template_id_d6d8296c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);