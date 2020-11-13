(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/usuarios/ModalAgregar.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/usuarios/ModalAgregar.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    value: Boolean
  },
  data: function data() {
    return {
      open: false,
      form: {
        name: "",
        dni: "",
        email: "",
        password: "",
        estado: "activo",
        roles: [],
        permissions: []
      },
      errors: {},
      items_roles: [],
      items_permissions: []
    };
  },
  created: function created() {
    this.getRoles();
    this.getPermissions();
  },
  methods: {
    Submit: function Submit() {
      var _this = this;

      axios.post("/usuarios", this.form).then(function (res) {
        _this.$parent.getData();

        _this.open = false;

        _this.$swal("Mensaje de operación", "Datos registrados correctamente.", "success");

        _this.resetInputs();
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;
      });
    },
    getRoles: function getRoles() {
      var _this2 = this;

      axios.get("/getRoles").then(function (res) {
        _this2.items_roles = res.data.roles;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getPermissions: function getPermissions() {
      var _this3 = this;

      axios.get("/getPermissions").then(function (res) {
        _this3.items_permissions = res.data.permissions;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    resetInputs: function resetInputs() {
      this.form.name = "";
      this.form.dni = "";
      this.form.email = "";
      this.form.password = "";
      this.form.estado = "activo";
      this.form.roles = [];
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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/usuarios/ModalEditar.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/usuarios/ModalEditar.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      open: false,
      hidePassword: true,
      form: {
        id: "",
        name: "",
        dni: "",
        email: "",
        password: "",
        estado: "activo",
        roles: [],
        permissions: []
      },
      errors: {},
      items_roles: [],
      items_permissions: []
    };
  },
  created: function created() {
    this.getRoles();
    this.getPermissions();
  },
  methods: {
    Submit: function Submit() {
      var _this = this;

      axios.put("/usuarios/".concat(this.form.id), this.form).then(function (res) {
        _this.$parent.getData();

        _this.$swal("Mensaje de operación", "Datos editados correctamente.", "success");
      })["catch"](function (err) {
        _this.errors = err.response.data.errors;
      });
    },
    show: function show() {
      this.open = true;
      this.errors = {};
    },
    getRoles: function getRoles() {
      var _this2 = this;

      axios.get("/getRoles").then(function (res) {
        _this2.items_roles = res.data.roles;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getPermissions: function getPermissions() {
      var _this3 = this;

      axios.get("/getPermissions").then(function (res) {
        _this3.items_permissions = res.data.permissions;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    showPassword: function showPassword() {
      this.hidePassword = !this.hidePassword;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Usuarios.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Usuarios.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_usuarios_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/usuarios/ModalAgregar */ "./resources/js/components/usuarios/ModalAgregar.vue");
/* harmony import */ var _components_usuarios_ModalEditar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/usuarios/ModalEditar */ "./resources/js/components/usuarios/ModalEditar.vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    ModalAgregar: _components_usuarios_ModalAgregar__WEBPACK_IMPORTED_MODULE_0__["default"],
    ModalEditar: _components_usuarios_ModalEditar__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
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
        text: "DNI",
        align: "left",
        sortable: false,
        value: "dni"
      }, {
        text: "Nombre completo",
        value: "name"
      }, {
        text: "Correo Electrónico",
        value: "email"
      }, {
        text: "Roles",
        value: "roles.name"
      }, {
        text: "Estado",
        value: "estado"
      }],
      usuarios: []
    };
  },
  created: function created() {
    if (this.$auth.can("users.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Usuarios";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted: function mounted() {
    this.$root.agregarUsuario = this.$refs.agregarUsuario;
    this.$root.editarUsuario = this.$refs.editarUsuario;
  },
  methods: {
    getData: function getData() {
      var _this = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/usuarios";
      this.loadingData = true;
      axios.get(url).then(function (res) {
        _this.usuarios = res.data.usuarios;
        _this.loadingData = false;
      })["catch"](function (err) {
        console.log(err);

        if (err.response.status == 403) {
          _this.$router.push("/admin/403");
        }
      });
    },
    modalAgregar: function modalAgregar() {
      this.$root.agregarUsuario.show();
    },
    modalEditar: function modalEditar(persona) {
      this.$root.editarUsuario.show();
      this.$root.editarUsuario.form.id = persona.id;
      this.$root.editarUsuario.form.dni = persona.dni;
      this.$root.editarUsuario.form.name = persona.name;
      this.$root.editarUsuario.form.email = persona.email;
      this.$root.editarUsuario.form.roles = persona.roles;
      this.$root.editarUsuario.form.permissions = persona.permissions;
      this.$root.editarUsuario.form.estado = persona.estado;
    },
    deleteData: function deleteData(usuario) {
      var _this2 = this;

      this.$swal({
        title: "¿Está seguro de cambiar el estado?",
        text: "Esta operación va a cambiar el estado del registro",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, cambiar"
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/usuarios/".concat(usuario.id)).then(function (res) {
            _this2.$swal("Mensaje de operación", "Estado cambiado correctamente", "success");

            _this2.getData();
          })["catch"](function (err) {
            console.log(err);

            if (err.response.status == 403) {
              _this2.$router.push("/403");
            }
          });
        }
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/usuarios/ModalAgregar.vue?vue&type=template&id=42a9afa1&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/usuarios/ModalAgregar.vue?vue&type=template&id=42a9afa1& ***!
  \************************************************************************************************************************************************************************************************************************/
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
          _c("v-card", [
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
                _c(
                  "v-card-title",
                  {
                    staticClass: "blue-grey darken-2 white--text",
                    attrs: { wrap: "" }
                  },
                  [
                    _c("v-flex", { attrs: { xs11: "" } }, [
                      _c("span", { staticClass: "headline" }, [
                        _vm._v("Registrar usuario")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-flex",
                      { staticClass: "d-flex justify-end", attrs: { xs1: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { color: "error" },
                            on: {
                              click: function($event) {
                                return _vm.close()
                              }
                            }
                          },
                          [_c("v-icon", [_vm._v("$vuetify.icons.close")])],
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
                                    label: "Nombre completo",
                                    required: "",
                                    "error-messages": _vm.errors.name
                                  },
                                  model: {
                                    value: _vm.form.name,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "name", $$v)
                                    },
                                    expression: "form.name"
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
                                    label: "El DNI",
                                    required: "",
                                    maxlength: "8",
                                    "error-messages": _vm.errors.dni
                                  },
                                  model: {
                                    value: _vm.form.dni,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "dni", $$v)
                                    },
                                    expression: "form.dni"
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
                                    label: "Correo Electrónico",
                                    required: "",
                                    "error-messages": _vm.errors.email
                                  },
                                  model: {
                                    value: _vm.form.email,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "email", $$v)
                                    },
                                    expression: "form.email"
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
                                    label: "Contraseña",
                                    required: "",
                                    type: "password",
                                    "error-messages": _vm.errors.password
                                  },
                                  model: {
                                    value: _vm.form.password,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "password", $$v)
                                    },
                                    expression: "form.password"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "" } },
                              [
                                _c("div", { staticClass: "body-2" }, [
                                  _vm._v("Estado del usuario")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "v-radio-group",
                                  {
                                    attrs: {
                                      row: "",
                                      "error-messages": _vm.errors.estado
                                    },
                                    model: {
                                      value: _vm.form.estado,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "estado", $$v)
                                      },
                                      expression: "form.estado"
                                    }
                                  },
                                  [
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Activo",
                                        value: "activo",
                                        color: "success"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Inactivo",
                                        value: "inactivo",
                                        color: "error"
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
                        _c(
                          "v-layout",
                          { attrs: { wrap: "" } },
                          [
                            _c(
                              "v-flex",
                              { attrs: { xs12: "" } },
                              [
                                _c("h4", [_vm._v("Asignar Roles")]),
                                _vm._v(" "),
                                _c("v-select", {
                                  attrs: {
                                    items: _vm.items_roles,
                                    "item-text": "name",
                                    "return-object": "",
                                    chips: "",
                                    label: "Roles",
                                    multiple: ""
                                  },
                                  model: {
                                    value: _vm.form.roles,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "roles", $$v)
                                    },
                                    expression: "form.roles"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "" } },
                              [
                                _c("h4", [
                                  _vm._v("Asignar Permisos Especiales")
                                ]),
                                _vm._v(" "),
                                _c("v-select", {
                                  attrs: {
                                    items: _vm.items_permissions,
                                    "item-text": "name",
                                    "return-object": "",
                                    chips: "",
                                    label: "Permisos",
                                    multiple: ""
                                  },
                                  model: {
                                    value: _vm.form.permissions,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "permissions", $$v)
                                    },
                                    expression: "form.permissions"
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
                    _c(
                      "v-btn",
                      {
                        attrs: { text: "", color: "error" },
                        on: {
                          click: function($event) {
                            return _vm.close()
                          }
                        }
                      },
                      [_vm._v("Cancelar")]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      { attrs: { color: "success", type: "submit" } },
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/usuarios/ModalEditar.vue?vue&type=template&id=08f5132e&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/usuarios/ModalEditar.vue?vue&type=template&id=08f5132e& ***!
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
          _c("v-card", [
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
                _c(
                  "v-card-title",
                  {
                    staticClass: "blue-grey darken-2 white--text",
                    attrs: { wrap: "" }
                  },
                  [
                    _c("v-flex", { attrs: { xs11: "" } }, [
                      _c("span", { staticClass: "headline" }, [
                        _vm._v("Editar usuario")
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "v-flex",
                      { staticClass: "d-flex justify-end", attrs: { xs1: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { color: "error" },
                            on: {
                              click: function($event) {
                                _vm.open = false
                              }
                            }
                          },
                          [_c("v-icon", [_vm._v("$vuetify.icons.close")])],
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
                                    label: "Nombre completo",
                                    required: "",
                                    "error-messages": _vm.errors.name
                                  },
                                  model: {
                                    value: _vm.form.name,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "name", $$v)
                                    },
                                    expression: "form.name"
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
                                    label: "El DNI",
                                    required: "",
                                    maxlength: "8",
                                    "error-messages": _vm.errors.dni
                                  },
                                  model: {
                                    value: _vm.form.dni,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "dni", $$v)
                                    },
                                    expression: "form.dni"
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
                                    label: "Correo Electrónico",
                                    required: "",
                                    type: "email",
                                    "error-messages": _vm.errors.email
                                  },
                                  model: {
                                    value: _vm.form.email,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "email", $$v)
                                    },
                                    expression: "form.email"
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
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { color: "primary" },
                                    on: { click: _vm.showPassword }
                                  },
                                  [_vm._v("Cambiar Contraseña")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { class: { "d-none": _vm.hidePassword } },
                                  [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: "Contraseña",
                                        type: "password",
                                        "error-messages": _vm.errors.password
                                      },
                                      model: {
                                        value: _vm.form.password,
                                        callback: function($$v) {
                                          _vm.$set(_vm.form, "password", $$v)
                                        },
                                        expression: "form.password"
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
                              "v-flex",
                              { attrs: { xs12: "" } },
                              [
                                _c("div", { staticClass: "body-2" }, [
                                  _vm._v("Estado del usuario")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "v-radio-group",
                                  {
                                    attrs: {
                                      row: "",
                                      "error-messages": _vm.errors.estado
                                    },
                                    model: {
                                      value: _vm.form.estado,
                                      callback: function($$v) {
                                        _vm.$set(_vm.form, "estado", $$v)
                                      },
                                      expression: "form.estado"
                                    }
                                  },
                                  [
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Activo",
                                        value: "activo",
                                        color: "success"
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c("v-radio", {
                                      attrs: {
                                        label: "Inactivo",
                                        value: "inactivo",
                                        color: "error"
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
                        _c(
                          "v-layout",
                          { attrs: { wrap: "" } },
                          [
                            _c(
                              "v-flex",
                              { attrs: { xs12: "" } },
                              [
                                _c("h4", [_vm._v("Asignar Roles")]),
                                _vm._v(" "),
                                _c("v-select", {
                                  attrs: {
                                    items: _vm.items_roles,
                                    "item-text": "name",
                                    "return-object": "",
                                    chips: "",
                                    label: "Roles",
                                    multiple: ""
                                  },
                                  model: {
                                    value: _vm.form.roles,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "roles", $$v)
                                    },
                                    expression: "form.roles"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs12: "" } },
                              [
                                _c("h4", [_vm._v("Asignar Permisos")]),
                                _vm._v(" "),
                                _c("v-select", {
                                  attrs: {
                                    items: _vm.items_permissions,
                                    "item-text": "name",
                                    "return-object": "",
                                    chips: "",
                                    label: "Permisos",
                                    multiple: ""
                                  },
                                  model: {
                                    value: _vm.form.permissions,
                                    callback: function($$v) {
                                      _vm.$set(_vm.form, "permissions", $$v)
                                    },
                                    expression: "form.permissions"
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
                    _c(
                      "v-btn",
                      {
                        attrs: { text: "", color: "error" },
                        on: {
                          click: function($event) {
                            _vm.open = false
                          }
                        }
                      },
                      [_vm._v("Cancelar")]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      { attrs: { color: "success", type: "submit" } },
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Usuarios.vue?vue&type=template&id=deb66bb8&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Usuarios.vue?vue&type=template&id=deb66bb8& ***!
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
        { staticClass: "mb-3" },
        [
          _c(
            "v-flex",
            { attrs: { xs12: "" } },
            [
              _c(
                "v-card",
                [
                  _c("v-container", [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex flex-column flex-sm-row justify-sm-space-between align-sm-center"
                      },
                      [
                        _c("div", { staticClass: "headline" }, [
                          _vm._v("Lista de usuarios")
                        ]),
                        _vm._v(" "),
                        _vm.$auth.can("users.create") || _vm.$auth.isAdmin()
                          ? _c(
                              "div",
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
                                    _c("v-icon", [
                                      _vm._v("$vuetify.icons.add")
                                    ]),
                                    _vm._v("Agregar usuario\n              ")
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          : _vm._e()
                      ]
                    )
                  ]),
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
        "div",
        [
          _c(
            "v-data-table",
            {
              staticClass: "elevation-1",
              attrs: {
                headers: _vm.headers,
                items: _vm.usuarios,
                search: _vm.search,
                loading: _vm.loadingData,
                "no-data-text": "No hay registros",
                "no-results-text": "No hay registros encontrados"
              },
              scopedSlots: _vm._u([
                {
                  key: "items",
                  fn: function(props) {
                    return [
                      _c("td", { staticClass: "text-xs-center" }, [
                        _vm._v(_vm._s(props.item.dni))
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(props.item.name))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(props.item.email))]),
                      _vm._v(" "),
                      props.item.roles.length > 0
                        ? [
                            _c(
                              "td",
                              _vm._l(props.item.roles, function(rol, index) {
                                return _c(
                                  "v-chip",
                                  {
                                    key: index,
                                    staticClass: "text-capitalize",
                                    attrs: {
                                      "text-color": "white",
                                      color: "info",
                                      small: ""
                                    }
                                  },
                                  [_vm._v(_vm._s(rol.name))]
                                )
                              }),
                              1
                            )
                          ]
                        : [
                            _c("td", { staticClass: "text-xs-center" }, [
                              _vm._v("N/A")
                            ])
                          ],
                      _vm._v(" "),
                      _c(
                        "td",
                        [
                          _c(
                            "v-chip",
                            {
                              staticClass: "ma-2",
                              attrs: { color: "indigo", "text-color": "white" }
                            },
                            [
                              _c(
                                "v-avatar",
                                { attrs: { left: "" } },
                                [_c("v-icon", [_vm._v("mdi-account-circle")])],
                                1
                              ),
                              _vm._v("Ranee\n          ")
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      props.item.estado === "activo"
                        ? [
                            _c(
                              "td",
                              [
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
                              ],
                              1
                            )
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      props.item.estado === "inactivo"
                        ? [
                            _c(
                              "td",
                              [
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
                              ],
                              1
                            )
                          ]
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "td",
                        [
                          _vm.$auth.can("users.edit") || _vm.$auth.isAdmin()
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
                                                    small: ""
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.modalEditar(
                                                        props.item
                                                      )
                                                    }
                                                  }
                                                },
                                                on
                                              ),
                                              [
                                                _c("v-icon", [
                                                  _vm._v("$vuetify.icons.edit")
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
                          _vm.$auth.can("users.destroy") || _vm.$auth.isAdmin()
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
                                                    small: ""
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.deleteData(
                                                        props.item
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
                                  _c("span", [_vm._v("Cambiar estado")])
                                ]
                              )
                            : _vm._e()
                        ],
                        1
                      )
                    ]
                  }
                }
              ])
            },
            [
              _c("v-progress-linear", {
                attrs: { color: "error", indeterminate: "" },
                scopedSlots: _vm._u([
                  {
                    key: "progress",
                    fn: function() {
                      return undefined
                    },
                    proxy: true
                  }
                ])
              }),
              _vm._v(" "),
              _vm._v(" "),
              _c("v-data-footer", {
                attrs: {
                  "rows-per-page-items": _vm.RowsPerPageItems,
                  "rows-per-page-text": "Mostrar"
                }
              })
            ],
            1
          ),
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
      ),
      _vm._v(" "),
      _c("modal-agregar", { ref: "agregarUsuario" }),
      _vm._v(" "),
      _c("modal-editar", { ref: "editarUsuario" })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/usuarios/ModalAgregar.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/usuarios/ModalAgregar.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalAgregar_vue_vue_type_template_id_42a9afa1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalAgregar.vue?vue&type=template&id=42a9afa1& */ "./resources/js/components/usuarios/ModalAgregar.vue?vue&type=template&id=42a9afa1&");
/* harmony import */ var _ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalAgregar.vue?vue&type=script&lang=js& */ "./resources/js/components/usuarios/ModalAgregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalAgregar_vue_vue_type_template_id_42a9afa1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalAgregar_vue_vue_type_template_id_42a9afa1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/usuarios/ModalAgregar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/usuarios/ModalAgregar.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/usuarios/ModalAgregar.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAgregar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/usuarios/ModalAgregar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/usuarios/ModalAgregar.vue?vue&type=template&id=42a9afa1&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/usuarios/ModalAgregar.vue?vue&type=template&id=42a9afa1& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_42a9afa1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalAgregar.vue?vue&type=template&id=42a9afa1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/usuarios/ModalAgregar.vue?vue&type=template&id=42a9afa1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_42a9afa1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalAgregar_vue_vue_type_template_id_42a9afa1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/usuarios/ModalEditar.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/usuarios/ModalEditar.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ModalEditar_vue_vue_type_template_id_08f5132e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalEditar.vue?vue&type=template&id=08f5132e& */ "./resources/js/components/usuarios/ModalEditar.vue?vue&type=template&id=08f5132e&");
/* harmony import */ var _ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalEditar.vue?vue&type=script&lang=js& */ "./resources/js/components/usuarios/ModalEditar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ModalEditar_vue_vue_type_template_id_08f5132e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ModalEditar_vue_vue_type_template_id_08f5132e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/usuarios/ModalEditar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/usuarios/ModalEditar.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/usuarios/ModalEditar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalEditar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/usuarios/ModalEditar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/usuarios/ModalEditar.vue?vue&type=template&id=08f5132e&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/usuarios/ModalEditar.vue?vue&type=template&id=08f5132e& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_08f5132e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ModalEditar.vue?vue&type=template&id=08f5132e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/usuarios/ModalEditar.vue?vue&type=template&id=08f5132e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_08f5132e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalEditar_vue_vue_type_template_id_08f5132e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/views/admin/Usuarios.vue":
/*!***********************************************!*\
  !*** ./resources/js/views/admin/Usuarios.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Usuarios_vue_vue_type_template_id_deb66bb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Usuarios.vue?vue&type=template&id=deb66bb8& */ "./resources/js/views/admin/Usuarios.vue?vue&type=template&id=deb66bb8&");
/* harmony import */ var _Usuarios_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Usuarios.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Usuarios.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Usuarios_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Usuarios_vue_vue_type_template_id_deb66bb8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Usuarios_vue_vue_type_template_id_deb66bb8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Usuarios.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Usuarios.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./resources/js/views/admin/Usuarios.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Usuarios_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Usuarios.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Usuarios.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Usuarios_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Usuarios.vue?vue&type=template&id=deb66bb8&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/admin/Usuarios.vue?vue&type=template&id=deb66bb8& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Usuarios_vue_vue_type_template_id_deb66bb8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Usuarios.vue?vue&type=template&id=deb66bb8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Usuarios.vue?vue&type=template&id=deb66bb8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Usuarios_vue_vue_type_template_id_deb66bb8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Usuarios_vue_vue_type_template_id_deb66bb8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);