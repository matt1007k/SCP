(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Dashboard.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Dashboard.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null
    };
  },
  computed: {
    fields: function fields() {
      var _this = this;

      if (!this.model) return [];
      return Object.keys(this.model).map(function (key) {
        return {
          key: key,
          value: _this.model[key] || "n/a"
        };
      });
    },
    items: function items() {
      var _this2 = this;

      return this.entries.map(function (entry) {
        var Description = entry.Description.length > _this2.descriptionLimit ? entry.Description.slice(0, _this2.descriptionLimit) + "..." : entry.Description;
        return Object.assign({}, entry, {
          Description: Description
        });
      });
    }
  },
  watch: {
    search: function search(val) {
      var _this3 = this;

      // Items have already been loaded
      if (this.items.length > 0) return; // Items have already been requested

      if (this.isLoading) return;
      this.isLoading = true; // Lazily load input items

      fetch("https://api.publicapis.org/entries").then(function (res) {
        return res.json();
      }).then(function (res) {
        var count = res.count,
            entries = res.entries;
        _this3.count = count;
        _this3.entries = entries;
      })["catch"](function (err) {
        console.log(err);
      })["finally"](function () {
        return _this3.isLoading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Dashboard.vue?vue&type=template&id=22ef35f6&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Dashboard.vue?vue&type=template&id=22ef35f6& ***!
  \*************************************************************************************************************************************************************************************************************/
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
    "v-card",
    { attrs: { color: "red lighten-2", dark: "" } },
    [
      _c("v-card-title", { staticClass: "headline red lighten-3" }, [
        _vm._v("Search for Public APIs")
      ]),
      _vm._v(" "),
      _c("v-card-text", [
        _vm._v(
          "\n    Explore hundreds of free API's ready for consumption! For more information visit\n    "
        ),
        _c(
          "a",
          {
            staticClass: "grey--text text--lighten-3",
            attrs: {
              href: "https://github.com/toddmotto/public-apis",
              target: "_blank"
            }
          },
          [_vm._v("the Github repository")]
        ),
        _vm._v(".\n  ")
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c("v-autocomplete", {
            attrs: {
              items: _vm.items,
              loading: _vm.isLoading,
              "search-input": _vm.search,
              color: "white",
              "no-data-text": "Sin resultados",
              "hide-selected": "",
              "item-text": "Description",
              "item-value": "API",
              label: "Public APIs",
              placeholder: "Start typing to Search",
              "prepend-icon": "mdi-database-search",
              "return-object": ""
            },
            on: {
              "update:searchInput": function($event) {
                _vm.search = $event
              },
              "update:search-input": function($event) {
                _vm.search = $event
              }
            },
            model: {
              value: _vm.model,
              callback: function($$v) {
                _vm.model = $$v
              },
              expression: "model"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c(
        "v-expand-transition",
        [
          _vm.model
            ? _c(
                "v-list",
                { staticClass: "green lighten-3" },
                _vm._l(_vm.fields, function(field, i) {
                  return _c(
                    "v-list-tile",
                    { key: i },
                    [
                      _c(
                        "v-list-tile-content",
                        [
                          _c("v-list-tile-title", {
                            domProps: { textContent: _vm._s(field.value) }
                          }),
                          _vm._v(" "),
                          _c("v-list-tile-sub-title", {
                            domProps: { textContent: _vm._s(field.key) }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  )
                }),
                1
              )
            : _vm._e()
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
              attrs: { disabled: !_vm.model, color: "grey darken-3" },
              on: {
                click: function($event) {
                  _vm.model = null
                }
              }
            },
            [
              _vm._v("\n      Clear\n      "),
              _c("v-icon", { attrs: { right: "" } }, [
                _vm._v("mdi-close-circle")
              ])
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

/***/ "./resources/js/views/admin/Dashboard.vue":
/*!************************************************!*\
  !*** ./resources/js/views/admin/Dashboard.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_22ef35f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=22ef35f6& */ "./resources/js/views/admin/Dashboard.vue?vue&type=template&id=22ef35f6&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./resources/js/views/admin/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_22ef35f6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_22ef35f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/admin/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/admin/Dashboard.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/admin/Dashboard.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/admin/Dashboard.vue?vue&type=template&id=22ef35f6&":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/admin/Dashboard.vue?vue&type=template&id=22ef35f6& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_22ef35f6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=22ef35f6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Dashboard.vue?vue&type=template&id=22ef35f6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_22ef35f6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_22ef35f6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);