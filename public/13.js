(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/roles/ModalAgregar.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/roles/ModalAgregar.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    value: Boolean
  },
  data: function data() {
    return {
      open: false,
      form: {
        nombre: "",
        identificador: "",
        descripcion: ""
      },
      errors: {}
    };
  },
  methods: {
    Submit: function Submit() {
      var _this = this;

      axios.post("/roles", this.form).then(function (res) {
        _this.$parent.getData();

        _this.open = false;

        _this.$swal("Mensaje de operación", "Datos registrados correctamente", "success");

        _this.resetInputs();
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;
      });
    },
    resetInputs: function resetInputs() {
      this.form.nombre = "";
      this.form.identificador = "";
      this.form.descripcion = "";
      this.form.permissions = [];
      this.errors = {};
    },
    show: function show() {
      this.open = true;
    },
    close: function close() {
      this.open = false;
      this.resetInputs();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/roles/ModalEditar.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/roles/ModalEditar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      open: false,
      form: {
        id: "",
        nombre: "",
        identificador: "",
        descripcion: ""
      },
      errors: {}
    };
  },
  methods: {
    Submit: function Submit() {
      var _this = this;

      axios.put("/roles/".concat(this.form.id), this.form).then(function (res) {
        _this.$parent.getData();

        _this.open = false;

        _this.$swal("Mensaje de operación", "Datos editados correctamente", "success");
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;
      });
    },
    show: function show() {
      this.open = true;
      this.errors = {};
    },
    close: function close() {
      this.open = false;
      this.errors = {};
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/seguridad/Roles.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/seguridad/Roles.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_roles_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/roles/ModalAgregar */ "./resources/js/components/roles/ModalAgregar.vue");
/* harmony import */ var _components_roles_ModalEditar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/roles/ModalEditar */ "./resources/js/components/roles/ModalEditar.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    ModalAgregar: _components_roles_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__["default"],
    ModalEditar: _components_roles_ModalEditar__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      search: "",
      loadingData: false,
      pagination: {},
      page: 1,
      RowsPerPageItems: [10, 15, 25],
      perPage: 10,
      headers: [{
        text: "Identificador"
      }, {
        text: "Nombre del rol"
      }, {
        text: "Descripción"
      }, {
        text: "Acciones"
      }],
      roles: []
    };
  },
  created: function created() {
    if (this.$auth.can("roles.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Roles";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted: function mounted() {
    this.$root.agregarRol = this.$refs.agregarRol;
    this.$root.editarRol = this.$refs.editarRol;
  },
  methods: {
    getData: function getData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/roles";
      this.loadingData = true;
      axios.get(url, {
        params: {
          perPage: this.perPage,
          page: this.page,
          search: this.search
        }
      }).then(function (res) {
        _this.roles = res.data.data;
        _this.pagination = _this.getPaginateElement(res.data);
        _this.loadingData = false;
      })["catch"](function (err) {
        console.log(err);

        if (err.response.status == 403) {
          _this.$router.push("/admin/403");
        }
      });
    },
    modalAgregar: function modalAgregar() {
      this.$root.agregarRol.show();
    },
    modalEditar: function modalEditar(persona) {
      this.$root.editarRol.show();
      this.$root.editarRol.form.id = persona.id;
      this.$root.editarRol.form.identificador = persona.slug;
      this.$root.editarRol.form.nombre = persona.name;
      this.$root.editarRol.form.descripcion = persona.description;
      this.$root.editarRol.form.permissions = persona.permissions;
    },
    deleteData: function deleteData(rol) {
      var _this2 = this;

      this.$swal({
        title: "¿Está seguro de eliminar el registro?",
        text: "Esta operación va a eliminar el registro",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, eliminar"
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/roles/".concat(rol.id)).then(function (res) {
            _this2.$swal("Mensaje de operación", "El rol se eliminó correctamente", "success");

            _this2.getData();
          })["catch"](function (err) {
            console.log(err);

            if (err.response.status == 403) {
              _this2.$router.push("/403");
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/roles/ModalAgregar.vue?vue&type=template&id=6dab59af&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/roles/ModalAgregar.vue?vue&type=template&id=6dab59af& ***!
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
    "v-layout",
    { attrs: { row: "", "justify-center": "" } },
    [
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", small: "", width: "800px" },
          model: {
            value: _vm.open,
            callback: function($$v) {
              _vm.open = $$v
            },
            expression: "open"
          }
        },
        [
          _c("card", [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.Submit($event)
                  }
                }
              },
              [
                _c("modal-header", {
                  attrs: { title: "Registrar rol" },
                  scopedSlots: _vm._u([
                    {
                      key: "close",
                      fn: function() {
                        return [
                          _c(
                            "btn-secondary",
                            {
                              staticClass: "rounded-circle",
                              attrs: {
                                onClick: _vm.close,
                                fab: "",
                                small: "",
                                color: "primary"
                              }
                            },
                            [_c("v-icon", [_vm._v("$vuetify.icons.close")])],
                            1
                          )
                        ]
                      },
                      proxy: true
                    }
                  ])
                }),
                _vm._v(" "),
                _c(
                  "v-card-text",
                  [
                    _c(
                      "v-container",
                      { attrs: { "grid-list-md": "" } },
                      [
                        _c(
                          "v-layout",
                          { attrs: { wrap: "" } },
                          [
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "El Identificador",
                                    required: "",
                                    filled: "",
                                    shaped: "",
                                    "error-messages": _vm.errors.identificador
                                  },
                                  model: {
                                    value: _vm.form.identificador,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "identificador", $$v)
                                    },
                                    expression: "form.identificador"
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
                                  attrs: {
                                    label: "Nombre del rol",
                                    required: "",
                                    filled: "",
                                    shaped: "",
                                    "error-messages": _vm.errors.nombre
                                  },
                                  model: {
                                    value: _vm.form.nombre,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "nombre", $$v)
                                    },
                                    expression: "form.nombre"
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
                                _c("v-textarea", {
                                  attrs: {
                                    label: "Descripción",
                                    required: "",
                                    filled: "",
                                    shaped: "",
                                    "error-messages": _vm.errors.descripcion
                                  },
                                  model: {
                                    value: _vm.form.descripcion,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "descripcion", $$v)
                                    },
                                    expression: "form.descripcion"
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
                    _c("small", [_vm._v("Ingrese los campos obligatorios.")])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-card-actions",
                  [
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c("btn-secondary", { attrs: { onClick: _vm.close } }, [
                      _vm._v("Cancelar")
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        staticClass: "rounded-lg",
                        attrs: { color: "primary", type: "submit" }
                      },
                      [_vm._v("Guardar")]
                    )
                  ],
                  1
                )
              ],
              1
            )
          ])
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/roles/ModalEditar.vue?vue&type=template&id=57bf529b&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/roles/ModalEditar.vue?vue&type=template&id=57bf529b& ***!
  \********************************************************************************************************************************************************************************************************************/
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
    "v-layout",
    { attrs: { row: "", "justify-center": "" } },
    [
      _c(
        "v-dialog",
        {
          attrs: { persistent: "", small: "", width: "800px" },
          model: {
            value: _vm.open,
            callback: function($$v) {
              _vm.open = $$v
            },
            expression: "open"
          }
        },
        [
          _c("card", [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.Submit($event)
                  }
                }
              },
              [
                _c("modal-header", {
                  attrs: { title: "Editar rol" },
                  scopedSlots: _vm._u([
                    {
                      key: "close",
                      fn: function() {
                        return [
                          _c(
                            "btn-secondary",
                            {
                              staticClass: "rounded-circle",
                              attrs: {
                                onClick: _vm.close,
                                fab: "",
                                small: "",
                                color: "primary"
                              }
                            },
                            [_c("v-icon", [_vm._v("$vuetify.icons.close")])],
                            1
                          )
                        ]
                      },
                      proxy: true
                    }
                  ])
                }),
                _vm._v(" "),
                _c(
                  "v-card-text",
                  [
                    _c(
                      "v-container",
                      { attrs: { "grid-list-md": "" } },
                      [
                        _c(
                          "v-layout",
                          { attrs: { wrap: "" } },
                          [
                            _c(
                              "v-flex",
                              { attrs: { xs12: "", sm6: "" } },
                              [
                                _c("v-text-field", {
                                  attrs: {
                                    label: "El Identificador",
                                    required: "",
                                    "error-messages": _vm.errors.identificador
                                  },
                                  model: {
                                    value: _vm.form.identificador,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "identificador", $$v)
                                    },
                                    expression: "form.identificador"
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
                                  attrs: {
                                    label: "Nombre del rol",
                                    required: "",
                                    "error-messages": _vm.errors.nombre
                                  },
                                  model: {
                                    value: _vm.form.nombre,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "nombre", $$v)
                                    },
                                    expression: "form.nombre"
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
                                _c("v-textarea", {
                                  attrs: {
                                    label: "Descripción",
                                    required: "",
                                    "error-messages": _vm.errors.descripcion
                                  },
                                  model: {
                                    value: _vm.form.descripcion,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "descripcion", $$v)
                                    },
                                    expression: "form.descripcion"
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
                    _c("small", [_vm._v("Ingrese los campos obligatorios.")])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "v-card-actions",
                  [
                    _c("v-spacer"),
                    _vm._v(" "),
                    _c("btn-secondary", { attrs: { onClick: _vm.close } }, [
                      _vm._v("Cancelar")
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        staticClass: "rounded-lg",
                        attrs: { color: "primary", type: "submit" }
                      },
                      [_vm._v("Guardar")]
                    )
                  ],
                  1
                )
              ],
              1
            )
          ])
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/seguridad/Roles.vue?vue&type=template&id=99c57462&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/seguridad/Roles.vue?vue&type=template&id=99c57462& ***!
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
      _c("page-header", {
        attrs: {
          title: "Roles",
          subtitle:
            "Administra los roles para los usuarios que acceden al sistema",
          img: "/img/information-security-1.png"
        },
        scopedSlots: _vm._u([
          {
            key: "action",
            fn: function() {
              return [
                _vm.$auth.can("roles.create") || _vm.$auth.isAdmin()
                  ? _c(
                      "div",
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "rounded-lg",
                            attrs: { color: "dark", large: "" },
                            on: {
                              click: function($event) {
                                $event.stopPropagation()
                                return _vm.modalAgregar($event)
                              }
                            }
                          },
                          [
                            _c("v-icon", [_vm._v("$vuetify.icons.add")]),
                            _vm._v("Agregar Rol\n                ")
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
                    _vm.roles.length
                      ? _vm._l(_vm.roles, function(rol) {
                          return _c("tr", { key: rol.id }, [
                            _c(
                              "td",
                              { staticClass: "text-xs-center" },
                              [_c("v-chip", [_vm._v(_vm._s(rol.slug))])],
                              1
                            ),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(rol.name))]),
                            _vm._v(" "),
                            _c("td", [_vm._v(_vm._s(rol.description))]),
                            _vm._v(" "),
                            _c(
                              "td",
                              [
                                _vm.$auth.can("roles.edit") ||
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
                                                              rol
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
                                _vm.$auth.can("roles.destroy") ||
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
                                                              rol
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
      ),
      _vm._v(" "),
      _c("modal-agregar", { ref: "agregarRol" }),
      _vm._v(" "),
      _c("modal-editar", { ref: "editarRol" })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/roles/ModalAgregar.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/roles/ModalAgregar.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalAgregar_vue_vue_type_template_id_6dab59af___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalAgregar.vue?vue&type=template&id=6dab59af& */ "./resources/js/components/roles/ModalAgregar.vue?vue&type=template&id=6dab59af&");
/* harmony import */ var _ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalAgregar.vue?vue&type=script&lang=js& */ "./resources/js/components/roles/ModalAgregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalAgregar_vue_vue_type_template_id_6dab59af___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalAgregar_vue_vue_type_template_id_6dab59af___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/roles/ModalAgregar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/roles/ModalAgregar.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/roles/ModalAgregar.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAgregar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/roles/ModalAgregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/roles/ModalAgregar.vue?vue&type=template&id=6dab59af&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/roles/ModalAgregar.vue?vue&type=template&id=6dab59af& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_6dab59af___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAgregar.vue?vue&type=template&id=6dab59af& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/roles/ModalAgregar.vue?vue&type=template&id=6dab59af&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_6dab59af___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_6dab59af___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/roles/ModalEditar.vue":
/*!*******************************************************!*\
  !*** ./resources/js/components/roles/ModalEditar.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalEditar_vue_vue_type_template_id_57bf529b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalEditar.vue?vue&type=template&id=57bf529b& */ "./resources/js/components/roles/ModalEditar.vue?vue&type=template&id=57bf529b&");
/* harmony import */ var _ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalEditar.vue?vue&type=script&lang=js& */ "./resources/js/components/roles/ModalEditar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalEditar_vue_vue_type_template_id_57bf529b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalEditar_vue_vue_type_template_id_57bf529b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/roles/ModalEditar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/roles/ModalEditar.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/roles/ModalEditar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalEditar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/roles/ModalEditar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/roles/ModalEditar.vue?vue&type=template&id=57bf529b&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/roles/ModalEditar.vue?vue&type=template&id=57bf529b& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_57bf529b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalEditar.vue?vue&type=template&id=57bf529b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/roles/ModalEditar.vue?vue&type=template&id=57bf529b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_57bf529b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_57bf529b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/admin/seguridad/Roles.vue":
/*!******************************************************!*\
  !*** ./resources/js/views/admin/seguridad/Roles.vue ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Roles_vue_vue_type_template_id_99c57462___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Roles.vue?vue&type=template&id=99c57462& */ "./resources/js/views/admin/seguridad/Roles.vue?vue&type=template&id=99c57462&");
/* harmony import */ var _Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Roles.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/seguridad/Roles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Roles_vue_vue_type_template_id_99c57462___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Roles_vue_vue_type_template_id_99c57462___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/seguridad/Roles.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/seguridad/Roles.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/admin/seguridad/Roles.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Roles.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/seguridad/Roles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/seguridad/Roles.vue?vue&type=template&id=99c57462&":
/*!*************************************************************************************!*\
  !*** ./resources/js/views/admin/seguridad/Roles.vue?vue&type=template&id=99c57462& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_template_id_99c57462___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Roles.vue?vue&type=template&id=99c57462& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/seguridad/Roles.vue?vue&type=template&id=99c57462&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_template_id_99c57462___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Roles_vue_vue_type_template_id_99c57462___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);