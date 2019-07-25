(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/reportes/Anual.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        anio: "",
        certificado: ""
      },
      items_anio: [],
      isLoading: false,
      search: "",
      lista_personas: [],
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
    customFilter: function customFilter(item, queryText, itemText) {
      var nombre = item.nombre.toLowerCase();
      var apellido_paterno = item.apellido_paterno.toLowerCase();
      var apellido_materno = item.apellido_materno.toLowerCase();
      var dni = item.dni.toLowerCase();
      var searchText = queryText.toLowerCase();
      return nombre.indexOf(searchText) > -1 || apellido_paterno.indexOf(searchText) || apellido_materno.indexOf(searchText) || dni.indexOf(searchText) > -1;
    },
    getYears: function getYears() {
      var _this = this;

      axios.get("/periodos").then(function (res) {
        return _this.items_anio = res.data.years;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    buscarPago: function buscarPago() {
      var _this2 = this;

      this.loading = true;
      axios.get("/search/por-anio", {
        params: {
          anio: this.form.anio,
          dni: this.form.persona.dni,
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
    downloadPDF: function downloadPDF(anio, dni) {
      var _this3 = this;

      axios({
        url: "/reporte/por-anio",
        method: "GET",
        params: {
          anio: anio,
          dni: dni,
          certificado: this.form.certificado
        },
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
    viewPDF: function viewPDF(anio, dni) {
      // axios(`/reporte/por-anio`, {
      //   method: "GET",
      //   params: { anio, dni },
      //   responseType: "blob" //Force to receive data in a Blob Format
      // })
      //   .then(response => {
      //Create a Blob from the PDF Stream
      // const file = new Blob([response.data], { type: "application/pdf" });
      //Build a URL from the file
      // const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window7
      // window.open(fileURL, "_blank");
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // window.open("data:application/pdf;base64," + encodeURI(response.data));
      var certificado = this.form.certificado;
      window.open("/reporte/por-anio?anio=".concat(anio, "&dni=").concat(dni, "&certificado=").concat(certificado), "_blank"); // location.href = `/reporte/por-anio?anio=${anio}&dni=${dni}`;
      // target = "_blank";
      // done = 1;
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },
    getName: function getName() {
      return "".concat(this.form.persona.apellido_paterno, " ").concat(this.form.persona.apellido_materno, ", ").concat(this.form.persona.nombre, " ");
    }
  },
  watch: {
    search: function search(value) {
      var _this4 = this;

      if (this.isLoading) return;
      this.isLoading = true;
      var params = {
        q: value
      };
      axios.get("/search-personas", {
        params: params
      }).then(function (res) {
        _this4.isLoading = false;
        _this4.lista_personas = res.data.personas;
      })["catch"](function (err) {
        return console.log(err);
      })["finally"](function () {
        return _this4.isLoading = false;
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
                                    "error-messages": _vm.errors.dni
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