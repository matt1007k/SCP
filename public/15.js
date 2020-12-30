(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Judicial.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/reportes/Judicial.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/listMonthsOfTheYear */ "./resources/js/services/listMonthsOfTheYear.js");
/* harmony import */ var _components_personas_SearchPerson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/personas/SearchPerson */ "./resources/js/components/personas/SearchPerson.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    SearchPerson: _components_personas_SearchPerson__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      form: {
        persona: {},
        mes: "",
        anio: "",
        certificado: ""
      },
      items_mes: _services_listMonthsOfTheYear__WEBPACK_IMPORTED_MODULE_0__["months"],
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
      document.title = "Reporte de pagos por mes de un año";
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
    getNameMonth: function getNameMonth(numero) {
      var mes_item = this.items_mes.find(function (mes) {
        return mes.value === numero;
      });
      return mes_item.text;
    },
    onPerson: function onPerson(e) {
      this.form.persona = e.target.value;
    },
    buscarPago: function buscarPago() {
      var _this2 = this;

      this.loading = true;
      axios.get("/search/por-judicial", {
        params: {
          anio: this.form.anio,
          mes: this.form.mes,
          persona_id: this.form.persona.id,
          certificado: this.form.certificado
        }
      }).then(function (res) {
        _this2.loading = false;
        _this2.errors = {};
        _this2.lista_resultado = res.data.judiciales;
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
    downloadPDF: function downloadPDF(id) {
      var _this3 = this;

      var params = {
        id: id,
        anio: this.form.anio,
        mes: this.form.mes,
        persona_id: this.form.persona.id,
        certificado: this.form.certificado,
        ver: 0
      };
      var params_code = window.btoa(JSON.stringify(params));
      axios({
        url: "/reporte/judicial/".concat(params_code),
        method: "GET",
        responseType: "blob" // important

      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data]));
        var link = document.createElement("a");
        var name_file = "".concat(_this3.form.persona.codigo_modular, "-").concat(_this3.form.mes, "-").concat(_this3.form.anio, ".pdf");
        link.href = url;
        link.setAttribute("download", name_file); //or any other extension

        document.body.appendChild(link);
        link.click();
      });
    },
    viewPDF: function viewPDF(id) {
      var params = {
        id: id,
        anio: this.form.anio,
        mes: this.form.mes,
        persona_id: this.form.persona.id,
        certificado: this.form.certificado,
        ver: 0
      };
      var params_code = window.btoa(JSON.stringify(params));
      window.open("/reporte/judicial/".concat(params_code), "_blank");
    },
    getName: function getName() {
      return "".concat(this.form.persona.apellido_paterno, " ").concat(this.form.persona.apellido_materno, ", ").concat(this.form.persona.nombre, " ");
    },
    getNameB: function getNameB(persona) {
      return "".concat(persona.b_apellido_paterno, " ").concat(persona.b_apellido_materno, " ,\n                                    ").concat(persona.b_nombre);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Judicial.vue?vue&type=template&id=37cd5542&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/reportes/Judicial.vue?vue&type=template&id=37cd5542& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
          title: "Reporte Judicial",
          subtitle: "Consultar los beneficiarios judiciales de una persona.",
          img: "/img/clip-web-security.png"
        }
      }),
      _vm._v(" "),
      _c(
        "card",
        { staticClass: "mt-4" },
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
          _c(
            "v-flex",
            { attrs: { row: "" } },
            [
              _c("v-col", { attrs: { xs: "12", md: "12" } }, [
                _c(
                  "span",
                  { staticClass: "body-2 mb-2 font-weight-semibold" },
                  [_vm._v("El periodo del pago")]
                )
              ]),
              _vm._v(" "),
              _c("v-col", { attrs: { xs: "12", sm: "6", md: "3" } }, [
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
                        filled: "",
                        shaped: "",
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
              ]),
              _vm._v(" "),
              _c(
                "v-col",
                { staticClass: "pl-2", attrs: { xs: "12", sm: "6", md: "3" } },
                [
                  _c("v-select", {
                    attrs: {
                      items: _vm.items_mes,
                      label: "El mes",
                      filled: "",
                      shaped: "",
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
              _c("v-col", { attrs: { xs: "12", sm: "3", md: "6" } }),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { xs: "12", sm: "3", md: "3" } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "rounded-lg",
                      attrs: { block: "", color: "primary" },
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
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { attrs: { row: "" } },
        [
          _c(
            "v-col",
            { attrs: { xs: "12" } },
            [
              Object.keys(_vm.lista_resultado).length !== 0
                ? [
                    _c("div", { staticClass: "mb-2" }, [
                      _c("div", { staticClass: "title" }, [
                        _vm._v("Resultados encontrados")
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "caption text--secondary" }, [
                        _vm._v(
                          "\n                        Descargar o imprimir el reporte judicial\n                    "
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.lista_resultado, function(lista) {
                      return _c(
                        "card",
                        { key: lista.id, staticClass: "mb-4" },
                        [
                          _c(
                            "v-card-text",
                            { staticClass: "d-flex justify-between" },
                            [
                              _c("div", { staticClass: "details-info" }, [
                                _c(
                                  "div",
                                  {
                                    staticClass: "display-1 font-weight-bold ",
                                    class:
                                      "" +
                                      (_vm.$vuetify.theme.dark
                                        ? "white--text"
                                        : "black--text")
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(lista.periodo) +
                                        "\n                            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "body-1  font-weight-bold text--secondary"
                                  },
                                  [
                                    _vm._v(
                                      "\n                                Titular\n                            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c("div", { staticClass: "body-2" }, [
                                  _vm._v(_vm._s(_vm.getName()))
                                ])
                              ]),
                              _vm._v(" "),
                              _c("div", [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "body-1  font-weight-bold text--secondary"
                                  },
                                  [
                                    _vm._v(
                                      "\n                                Beneficiario\n                            "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c("div", { staticClass: "heading-1" }, [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(_vm.getNameB(lista)) +
                                      "\n                            "
                                  )
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "body-2" }, [
                                  _vm._v("DNI " + _vm._s(lista.b_dni))
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
                                                      staticClass: "rounded-lg",
                                                      attrs: {
                                                        color: "dark",
                                                        text: ""
                                                      },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.downloadPDF(
                                                            lista.id
                                                          )
                                                        }
                                                      }
                                                    },
                                                    on
                                                  ),
                                                  [
                                                    _c("v-icon", [
                                                      _vm._v(
                                                        "mdi\n                                            mdi-cloud-download-outline"
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
                                      _c("span", [_vm._v("Descargar")])
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
                                                      staticClass: "rounded-lg",
                                                      attrs: {
                                                        color: "dark",
                                                        text: ""
                                                      },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.viewPDF(
                                                            lista.id
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
                                        true
                                      )
                                    },
                                    [
                                      _vm._v(" "),
                                      _c("span", [_vm._v("Imprimir")])
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

/***/ "./resources/js/views/admin/reportes/Judicial.vue":
/*!********************************************************!*\
  !*** ./resources/js/views/admin/reportes/Judicial.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Judicial_vue_vue_type_template_id_37cd5542___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Judicial.vue?vue&type=template&id=37cd5542& */ "./resources/js/views/admin/reportes/Judicial.vue?vue&type=template&id=37cd5542&");
/* harmony import */ var _Judicial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Judicial.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/reportes/Judicial.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Judicial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Judicial_vue_vue_type_template_id_37cd5542___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Judicial_vue_vue_type_template_id_37cd5542___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/reportes/Judicial.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/reportes/Judicial.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/admin/reportes/Judicial.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Judicial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Judicial.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Judicial.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Judicial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/reportes/Judicial.vue?vue&type=template&id=37cd5542&":
/*!***************************************************************************************!*\
  !*** ./resources/js/views/admin/reportes/Judicial.vue?vue&type=template&id=37cd5542& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Judicial_vue_vue_type_template_id_37cd5542___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Judicial.vue?vue&type=template&id=37cd5542& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Judicial.vue?vue&type=template&id=37cd5542&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Judicial_vue_vue_type_template_id_37cd5542___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Judicial_vue_vue_type_template_id_37cd5542___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);