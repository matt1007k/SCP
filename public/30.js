(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["estado"]
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/SearchPerson.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/SearchPerson.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EstadoChip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EstadoChip */ "./resources/js/components/personas/EstadoChip.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    EstadoChip: _EstadoChip__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    errors: {
      "default": null
    },
    person: {
      "default": null
    }
  },
  data: function data() {
    return {
      estado: "activo",
      toggleActiveBtn: 0,
      search: "",
      lista_personas: [],
      isLoading: false,
      persona: {}
    };
  },
  computed: {
    getPersona: {
      get: function get() {
        this.persona = this.person && this.person.nombre ? this.person : {};
        this.estado = this.person && this.person.estado ? this.person.estado : this.estado;
        this.onSelectStatus(this.estado);
        return this.persona;
      },
      set: function set(value) {
        return this.persona = value;
      }
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
    filterBy: function filterBy(prop) {
      this.estado = prop;
      this.lista_personas = [];
      this.$emit("input", {
        target: {
          value: {}
        }
      });
    },
    onSelect: function onSelect(result) {
      this.$emit("input", {
        target: {
          value: result
        }
      });
    },
    onSelectStatus: function onSelectStatus(estado) {
      if (estado == "activo") {
        this.toggleActiveBtn = 0;
      } else if (estado == "sobreviviente") {
        this.toggleActiveBtn = 1;
      } else if (estado == "cesante") {
        this.toggleActiveBtn = 2;
      } else {
        this.toggleActiveBtn = 0;
      }
    },
    getNameComplete: function getNameComplete(persona) {
      if (persona !== undefined) return "".concat(persona.apellido_paterno, " ").concat(persona.apellido_materno, ", ").concat(persona.nombre);else return "";
    }
  },
  watch: {
    search: function search(value) {
      var _this = this;

      if (this.isLoading) return;
      this.isLoading = true;
      var params = {
        q: value,
        estado: this.estado
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
    "span",
    [
      _vm.estado === "activo"
        ? [
            _c(
              "v-chip",
              {
                staticClass: "text-capitalize",
                attrs: { "text-color": "white", color: "success", small: "" }
              },
              [_vm._v(_vm._s(_vm.estado))]
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.estado === "cesante"
        ? [
            _c(
              "v-chip",
              {
                staticClass: "text-capitalize",
                attrs: { "text-color": "white", color: "error", small: "" }
              },
              [_vm._v(_vm._s(_vm.estado))]
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _vm.estado === "sobreviviente"
        ? [
            _c(
              "v-chip",
              {
                staticClass: "text-capitalize",
                attrs: { "text-color": "white", color: "info", small: "" }
              },
              [_vm._v(_vm._s(_vm.estado))]
            )
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/SearchPerson.vue?vue&type=template&id=5ddfee4a&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/personas/SearchPerson.vue?vue&type=template&id=5ddfee4a& ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {}
var staticRenderFns = []



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
                                _vm._v("Reporte de pagos por años")
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "body-1" }, [
                                _vm._v(
                                  "Consultar el pago de una persona por rango de años."
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
                              _vm._v("El periodo del pago por años")
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
                                      label: "Del año",
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
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            [
                              _c("v-icon", [
                                _vm._v("mdi mdi-arrow-expand-horizontal")
                              ])
                            ],
                            1
                          ),
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
                                      label: "Hasta el año",
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
                          _c(
                            "v-flex",
                            {
                              staticClass: "d-flex",
                              attrs: { xs12: "", sm4: "", "justify-end": "" }
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
              _vm.lista_resultado.length > 0
                ? [
                    _c(
                      "div",
                      { staticClass: "mb-2 d-flex justify-content-between" },
                      [
                        _c(
                          "div",
                          [
                            _c("div", { staticClass: "title" }, [
                              _vm._v("Resultados encontrados")
                            ]),
                            _vm._v(" "),
                            _c("dir", { staticClass: "caption" }, [
                              _vm._v(
                                "Descargar o imprimir todos los pagos por el rango de años"
                              )
                            ])
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
                                                attrs: {
                                                  color: "success",
                                                  icon: ""
                                                },
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
                                  3126189134
                                )
                              },
                              [
                                _vm._v(" "),
                                _c("span", [
                                  _vm._v(
                                    "Descargar constancia de pago de todos los años"
                                  )
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
                                                attrs: {
                                                  color: "info",
                                                  icon: ""
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
                                  902040089
                                )
                              },
                              [
                                _vm._v(" "),
                                _c("span", [
                                  _vm._v(
                                    "Imprimir constancia de pago de todos los años"
                                  )
                                ])
                              ]
                            )
                          ],
                          1
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.lista_resultado, function(pago, index) {
                      return [
                        _c(
                          "v-card",
                          { key: index },
                          [
                            _c(
                              "v-card-text",
                              { staticClass: "d-flex justify-content-between" },
                              [
                                _c("div", { staticClass: "details-info" }, [
                                  _c("div", { staticClass: "heading" }, [
                                    _vm._v("Año: " + _vm._s(pago.anio))
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "body-2" }, [
                                    _vm._v(
                                      "Nombre completo: " +
                                        _vm._s(_vm.getName())
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "caption" }, [
                                    _vm._v(
                                      "DNI: " + _vm._s(_vm.form.persona.dni)
                                    )
                                  ])
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

/***/ "./resources/js/components/personas/EstadoChip.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/personas/EstadoChip.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EstadoChip.vue?vue&type=template&id=3e8c4682& */ "./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682&");
/* harmony import */ var _EstadoChip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EstadoChip.vue?vue&type=script&lang=js& */ "./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EstadoChip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/personas/EstadoChip.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EstadoChip.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/EstadoChip.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EstadoChip.vue?vue&type=template&id=3e8c4682& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/EstadoChip.vue?vue&type=template&id=3e8c4682&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EstadoChip_vue_vue_type_template_id_3e8c4682___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/personas/SearchPerson.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/personas/SearchPerson.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SearchPerson_vue_vue_type_template_id_5ddfee4a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchPerson.vue?vue&type=template&id=5ddfee4a& */ "./resources/js/components/personas/SearchPerson.vue?vue&type=template&id=5ddfee4a&");
/* harmony import */ var _SearchPerson_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchPerson.vue?vue&type=script&lang=js& */ "./resources/js/components/personas/SearchPerson.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SearchPerson_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SearchPerson_vue_vue_type_template_id_5ddfee4a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SearchPerson_vue_vue_type_template_id_5ddfee4a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/personas/SearchPerson.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/personas/SearchPerson.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/personas/SearchPerson.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchPerson_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./SearchPerson.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/SearchPerson.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchPerson_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/personas/SearchPerson.vue?vue&type=template&id=5ddfee4a&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/personas/SearchPerson.vue?vue&type=template&id=5ddfee4a& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchPerson_vue_vue_type_template_id_5ddfee4a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./SearchPerson.vue?vue&type=template&id=5ddfee4a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/personas/SearchPerson.vue?vue&type=template&id=5ddfee4a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchPerson_vue_vue_type_template_id_5ddfee4a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchPerson_vue_vue_type_template_id_5ddfee4a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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