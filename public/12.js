(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Personas.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Personas.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_personas_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/personas/ModalAgregar */ "./resources/js/components/personas/ModalAgregar.vue");
/* harmony import */ var _components_personas_ModalEditar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/personas/ModalEditar */ "./resources/js/components/personas/ModalEditar.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    ModalAgregar: _components_personas_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__["default"],
    ModalEditar: _components_personas_ModalEditar__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      search: "",
      tipo: "Todos",
      loading: false,
      pagination: {},
      RowsPerPageItems: [9, 15, 25, {
        text: "Todos",
        value: -1
      }],
      selected: [],
      headers: [{
        text: "Codigo Modular",
        align: "left",
        sortable: false,
        value: "codigo_modular"
      }, {
        text: "Nombre completo",
        value: "apellido_paterno"
      }, {
        text: "DNI",
        value: "dni"
      }, {
        text: "Cargo",
        value: "cargo"
      }, {
        text: "Estado",
        value: "estado"
      }],
      personas: [],
      showModalEdit: false
    };
  },
  created: function created() {
    document.title = "Lista de Personas";
    this.getData();
  },
  mounted: function mounted() {
    this.$root.agregarPersona = this.$refs.agregarPersona;
    this.$root.editarPersona = this.$refs.editarPersona;
  },
  methods: {
    getData: function getData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/personas";
      axios.get(url, {
        params: {
          tipo: this.tipo
        }
      }).then(function (res) {
        _this.personas = res.data.personas;
      })["catch"](function (err) {
        console.log(err);

        if (err.response.status == 403) {
          _this.$router.push("/admin/403");
        }
      });
    },
    filterBy: function filterBy(prop) {
      this.tipo = prop;
      this.getData();
    },
    modalAgregar: function modalAgregar() {
      this.$root.agregarPersona.show();
    },
    modalEditar: function modalEditar(persona) {
      this.$root.editarPersona.show();
      this.$root.editarPersona.form.id = persona.id;
      this.$root.editarPersona.form.nombre = persona.nombre;
      this.$root.editarPersona.form.apellido_paterno = persona.apellido_paterno;
      this.$root.editarPersona.form.apellido_materno = persona.apellido_materno;
      this.$root.editarPersona.form.dni = persona.dni;
      this.$root.editarPersona.form.codigo_modular = persona.codigo_modular;
      this.$root.editarPersona.form.cargo = persona.cargo;
      this.$root.editarPersona.form.estado = persona.estado;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734& ***!
  \************************************************************************************************************************************************************************************************************/
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
                                _vm._v("Lista de personas")
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            {
                              attrs: {
                                xs12: "",
                                sm3: "",
                                md3: "",
                                "justify-end": "",
                                flexbox: ""
                              }
                            },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { color: "primary" },
                                  on: {
                                    click: function($event) {
                                      $event.stopPropagation()
                                      return _vm.modalAgregar($event)
                                    }
                                  }
                                },
                                [
                                  _c("v-icon", [_vm._v("$vuetify.icons.add")]),
                                  _vm._v("Agregar persona\n              ")
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
                      }),
                      _vm._v(" "),
                      _c(
                        "span",
                        { staticClass: "mb-2" },
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
                              _c("span", [_vm._v("Filtar por estado")])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "" },
                              on: {
                                click: function($event) {
                                  return _vm.filterBy("Todos")
                                }
                              }
                            },
                            [_vm._v("Todos")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "", color: "success" },
                              on: {
                                click: function($event) {
                                  return _vm.filterBy("activo")
                                }
                              }
                            },
                            [_vm._v("Activos")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "", color: "info" },
                              on: {
                                click: function($event) {
                                  return _vm.filterBy("sobreviviente")
                                }
                              }
                            },
                            [_vm._v("Sobrevivientes")]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { flat: "", color: "error" },
                              on: {
                                click: function($event) {
                                  return _vm.filterBy("cesante")
                                }
                              }
                            },
                            [_vm._v("Censantes")]
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
                  items: _vm.personas,
                  search: _vm.search,
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
                          _vm._v(_vm._s(props.item.codigo_modular))
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(props.item.apellido_paterno) +
                              " " +
                              _vm._s(props.item.apellido_materno) +
                              ", " +
                              _vm._s(props.item.nombre)
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.dni))
                        ]),
                        _vm._v(" "),
                        _c("td", { staticClass: "text-xs-center" }, [
                          _vm._v(_vm._s(props.item.cargo))
                        ]),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "text-xs-center" },
                          [
                            props.item.estado === "activo"
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
                                    [_vm._v(_vm._s(props.item.estado))]
                                  )
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            props.item.estado === "cesante"
                              ? [
                                  _c(
                                    "v-chip",
                                    {
                                      staticClass: "text-capitalize",
                                      attrs: {
                                        "text-color": "white",
                                        color: "error",
                                        small: ""
                                      }
                                    },
                                    [_vm._v(_vm._s(props.item.estado))]
                                  )
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            props.item.estado === "sobreviviente"
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
                                    [_vm._v(_vm._s(props.item.estado))]
                                  )
                                ]
                              : _vm._e()
                          ],
                          2
                        ),
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
      ),
      _vm._v(" "),
      _c("modal-agregar", { ref: "agregarPersona" }),
      _vm._v(" "),
      _c("modal-editar", { ref: "editarPersona" })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/admin/Personas.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/admin/Personas.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Personas.vue?vue&type=template&id=e2d3e734& */ "./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734&");
/* harmony import */ var _Personas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Personas.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Personas.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Personas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Personas.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Personas.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/admin/Personas.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Personas.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Personas.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Personas.vue?vue&type=template&id=e2d3e734& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Personas.vue?vue&type=template&id=e2d3e734&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Personas_vue_vue_type_template_id_e2d3e734___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);