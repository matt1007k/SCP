(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/CountItem.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dashboard/CountItem.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["color", "icon", "label", "total"]
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/chart/BarChart.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dashboard/chart/BarChart.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/es/index.js");

var reactiveProp = vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["mixins"].reactiveProp;
/* harmony default export */ __webpack_exports__["default"] = ({
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["Bar"],
  // props: { datasets: Array },
  mixins: [reactiveProp],
  data: function data() {
    return {
      // datacollection: {
      //   //Data to be represented on x-axis
      //   labels: [
      //     "Enero",
      //     "Febrero",
      //     "Marzo",
      //     "Abril",
      //     "Mayo",
      //     "Junio",
      //     "Julio",
      //     "Agosto",
      //     "Septiembre",
      //     "Octubre",
      //     "Noviembre",
      //     "Deciembre"
      //   ],
      //   datasets: this.datasets
      // },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function callback(label, index, labels) {
                return "S/. " + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
              }
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        tooltips: {
          mode: "label",
          label: "mylabel",
          callbacks: {
            label: function label(tooltipItem, data) {
              return "S/. " + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted: function mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.chartData, this.options);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/chart/PieChart.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dashboard/chart/PieChart.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-chartjs */ "./node_modules/vue-chartjs/es/index.js");

var reactiveProp = vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["mixins"].reactiveProp;
/* harmony default export */ __webpack_exports__["default"] = ({
  "extends": vue_chartjs__WEBPACK_IMPORTED_MODULE_0__["Pie"],
  props: {
    title: String
  },
  mixins: [reactiveProp],
  data: function data() {
    return {
      //Chart.js options that controls the appearance of the chart
      options: {
        title: {
          display: true,
          text: this.title
        },
        legend: {
          display: true
        },
        plugins: {
          labels: {
            render: function render(args) {
              return "$" + args.value;
            },
            arc: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted: function mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.chartData, this.options);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Dashboard.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Dashboard.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_dashboard_CountItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/dashboard/CountItem */ "./resources/js/components/dashboard/CountItem.vue");
/* harmony import */ var _components_dashboard_chart_BarChart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/dashboard/chart/BarChart */ "./resources/js/components/dashboard/chart/BarChart.vue");
/* harmony import */ var _components_dashboard_chart_PieChart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/dashboard/chart/PieChart */ "./resources/js/components/dashboard/chart/PieChart.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    CountItem: _components_dashboard_CountItem__WEBPACK_IMPORTED_MODULE_1__["default"],
    BarChart: _components_dashboard_chart_BarChart__WEBPACK_IMPORTED_MODULE_2__["default"],
    PieChart: _components_dashboard_chart_PieChart__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {
      count_items: [],
      dataConstanciasByUsers: [],
      dataPagos: {},
      dataPersonas: {},
      dataConstancias: {},
      anio: String(new Date().getFullYear()),
      items: []
    };
  },
  created: function created() {
    document.title = "Tablero de Resumenes";
    this.getCount();
    this.getTotalPagos();
    this.getTotalPersonas();
    this.getTotalConstancias();
    this.getTotalConstanciasByUsers();
    this.getYears();
  },
  mounted: function mounted() {
    this.getTotalPagos();
  },
  methods: {
    getYears: function getYears() {
      var _this = this;

      axios.get("/periodos").then(function (res) {
        return _this.items = res.data.years;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getCount: function getCount() {
      var _this2 = this;

      axios.get("/getCount").then(function (res) {
        return _this2.count_items = res.data.totales;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getTotalPagos: function getTotalPagos() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios.get("/getTotalPagos", {
                  params: {
                    anio: _this3.anio
                  }
                });

              case 3:
                res = _context.sent;
                _this3.dataPagos = {
                  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre"],
                  datasets: res.data.total_pagos
                };
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    getTotalPersonas: function getTotalPersonas() {
      var _this4 = this;

      axios.get("/getTotalPersonas").then(function (res) {
        _this4.dataPersonas = {
          labels: ["Activos", "Cesantes", "Sobrevivientes"],
          datasets: res.data.total_personas
        };
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getTotalConstancias: function getTotalConstancias() {
      var _this5 = this;

      axios.get("/getTotalConstancias").then(function (res) {
        _this5.dataConstancias = {
          labels: ["Por rango de años", "Por año", "Por mes"],
          datasets: res.data.total_constancias
        };
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    getTotalConstanciasByUsers: function getTotalConstanciasByUsers() {
      var _this6 = this;

      axios.get("/getTotalConstanciasByUsers").then(function (res) {
        _this6.dataConstanciasByUsers = res.data.totales;
      })["catch"](function (err) {
        return console.log(err);
      });
    },
    filterBy: function filterBy(estado) {
      this.estado = estado;
      this.getTotalPagos();
    },
    filterByYear: function filterByYear() {
      this.getTotalPagos();
    }
  }
});

/***/ }),

/***/ "./node_modules/chart.js/node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!************************************************************************!*\
  !*** ./node_modules/chart.js/node_modules/moment/locale sync ^\.\/.*$ ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/chart.js/node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/chart.js/node_modules/moment/locale/af.js",
	"./ar": "./node_modules/chart.js/node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/chart.js/node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/chart.js/node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/chart.js/node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/chart.js/node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/chart.js/node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/chart.js/node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/chart.js/node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/chart.js/node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/chart.js/node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/chart.js/node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/chart.js/node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/chart.js/node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/chart.js/node_modules/moment/locale/ar.js",
	"./az": "./node_modules/chart.js/node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/chart.js/node_modules/moment/locale/az.js",
	"./be": "./node_modules/chart.js/node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/chart.js/node_modules/moment/locale/be.js",
	"./bg": "./node_modules/chart.js/node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/chart.js/node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/chart.js/node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/chart.js/node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/chart.js/node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/chart.js/node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/chart.js/node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/chart.js/node_modules/moment/locale/bo.js",
	"./br": "./node_modules/chart.js/node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/chart.js/node_modules/moment/locale/br.js",
	"./bs": "./node_modules/chart.js/node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/chart.js/node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/chart.js/node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/chart.js/node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/chart.js/node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/chart.js/node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/chart.js/node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/chart.js/node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/chart.js/node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/chart.js/node_modules/moment/locale/cy.js",
	"./da": "./node_modules/chart.js/node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/chart.js/node_modules/moment/locale/da.js",
	"./de": "./node_modules/chart.js/node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/chart.js/node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/chart.js/node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/chart.js/node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/chart.js/node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/chart.js/node_modules/moment/locale/de.js",
	"./dv": "./node_modules/chart.js/node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/chart.js/node_modules/moment/locale/dv.js",
	"./el": "./node_modules/chart.js/node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/chart.js/node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/chart.js/node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/chart.js/node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/chart.js/node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/chart.js/node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/chart.js/node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/chart.js/node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/chart.js/node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/chart.js/node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/chart.js/node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/chart.js/node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/chart.js/node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/chart.js/node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/chart.js/node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/chart.js/node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/chart.js/node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/chart.js/node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/chart.js/node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/chart.js/node_modules/moment/locale/eo.js",
	"./es": "./node_modules/chart.js/node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/chart.js/node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/chart.js/node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/chart.js/node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/chart.js/node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/chart.js/node_modules/moment/locale/es.js",
	"./et": "./node_modules/chart.js/node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/chart.js/node_modules/moment/locale/et.js",
	"./eu": "./node_modules/chart.js/node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/chart.js/node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/chart.js/node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/chart.js/node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/chart.js/node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/chart.js/node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/chart.js/node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/chart.js/node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/chart.js/node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/chart.js/node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/chart.js/node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/chart.js/node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/chart.js/node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/chart.js/node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/chart.js/node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/chart.js/node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/chart.js/node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/chart.js/node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/chart.js/node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/chart.js/node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/chart.js/node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/chart.js/node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/chart.js/node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/chart.js/node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/chart.js/node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/chart.js/node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/chart.js/node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/chart.js/node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/chart.js/node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/chart.js/node_modules/moment/locale/gu.js",
	"./he": "./node_modules/chart.js/node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/chart.js/node_modules/moment/locale/he.js",
	"./hi": "./node_modules/chart.js/node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/chart.js/node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/chart.js/node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/chart.js/node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/chart.js/node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/chart.js/node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/chart.js/node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/chart.js/node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/chart.js/node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/chart.js/node_modules/moment/locale/id.js",
	"./is": "./node_modules/chart.js/node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/chart.js/node_modules/moment/locale/is.js",
	"./it": "./node_modules/chart.js/node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/chart.js/node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/chart.js/node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/chart.js/node_modules/moment/locale/it.js",
	"./ja": "./node_modules/chart.js/node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/chart.js/node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/chart.js/node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/chart.js/node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/chart.js/node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/chart.js/node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/chart.js/node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/chart.js/node_modules/moment/locale/kk.js",
	"./km": "./node_modules/chart.js/node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/chart.js/node_modules/moment/locale/km.js",
	"./kn": "./node_modules/chart.js/node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/chart.js/node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/chart.js/node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/chart.js/node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/chart.js/node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/chart.js/node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/chart.js/node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/chart.js/node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/chart.js/node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/chart.js/node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/chart.js/node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/chart.js/node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/chart.js/node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/chart.js/node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/chart.js/node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/chart.js/node_modules/moment/locale/lv.js",
	"./me": "./node_modules/chart.js/node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/chart.js/node_modules/moment/locale/me.js",
	"./mi": "./node_modules/chart.js/node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/chart.js/node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/chart.js/node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/chart.js/node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/chart.js/node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/chart.js/node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/chart.js/node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/chart.js/node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/chart.js/node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/chart.js/node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/chart.js/node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/chart.js/node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/chart.js/node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/chart.js/node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/chart.js/node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/chart.js/node_modules/moment/locale/mt.js",
	"./my": "./node_modules/chart.js/node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/chart.js/node_modules/moment/locale/my.js",
	"./nb": "./node_modules/chart.js/node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/chart.js/node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/chart.js/node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/chart.js/node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/chart.js/node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/chart.js/node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/chart.js/node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/chart.js/node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/chart.js/node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/chart.js/node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/chart.js/node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/chart.js/node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/chart.js/node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/chart.js/node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/chart.js/node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/chart.js/node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/chart.js/node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/chart.js/node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/chart.js/node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/chart.js/node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/chart.js/node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/chart.js/node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/chart.js/node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/chart.js/node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/chart.js/node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/chart.js/node_modules/moment/locale/sd.js",
	"./se": "./node_modules/chart.js/node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/chart.js/node_modules/moment/locale/se.js",
	"./si": "./node_modules/chart.js/node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/chart.js/node_modules/moment/locale/si.js",
	"./sk": "./node_modules/chart.js/node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/chart.js/node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/chart.js/node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/chart.js/node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/chart.js/node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/chart.js/node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/chart.js/node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/chart.js/node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/chart.js/node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/chart.js/node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/chart.js/node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/chart.js/node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/chart.js/node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/chart.js/node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/chart.js/node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/chart.js/node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/chart.js/node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/chart.js/node_modules/moment/locale/ta.js",
	"./te": "./node_modules/chart.js/node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/chart.js/node_modules/moment/locale/te.js",
	"./tet": "./node_modules/chart.js/node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/chart.js/node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/chart.js/node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/chart.js/node_modules/moment/locale/tg.js",
	"./th": "./node_modules/chart.js/node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/chart.js/node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/chart.js/node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/chart.js/node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/chart.js/node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/chart.js/node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/chart.js/node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/chart.js/node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/chart.js/node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/chart.js/node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/chart.js/node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/chart.js/node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/chart.js/node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/chart.js/node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/chart.js/node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/chart.js/node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/chart.js/node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/chart.js/node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/chart.js/node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/chart.js/node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/chart.js/node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/chart.js/node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/chart.js/node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/chart.js/node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/chart.js/node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/chart.js/node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/chart.js/node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/chart.js/node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/chart.js/node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/chart.js/node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/chart.js/node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/chart.js/node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/chart.js/node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/chart.js/node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/chart.js/node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/chart.js/node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/chart.js/node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/chart.js/node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/chart.js/node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Dashboard.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Dashboard.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.v-card__title.no-padding-bottom {\n  padding-bottom: 0;\n}\n.v-card__text.no-padding-top {\n  padding-top: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Dashboard.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/admin/Dashboard.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Dashboard.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/CountItem.vue?vue&type=template&id=1dc8816c&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/dashboard/CountItem.vue?vue&type=template&id=1dc8816c& ***!
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
  return _c("v-card", { staticClass: "rounded-xl" }, [
    _c("div", { staticClass: "pa-8" }, [
      _c("div", { staticClass: "d-flex align-center" }, [
        _c(
          "div",
          { staticClass: "rounded py-1 px-2", class: _vm.color },
          [
            _c("v-icon", { attrs: { dark: "", medium: "" } }, [
              _vm._v(_vm._s(_vm.icon))
            ])
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "body-1 ml-2 text--secondary" }, [
          _vm._v(_vm._s(_vm.label))
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "pt-4" }, [
        _c("span", { staticClass: "display-1 font-weight-bold" }, [
          _vm._v("\n        " + _vm._s(_vm.total) + " \n      ")
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



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
    "v-container",
    { attrs: { fluid: "", "grid-list-md": "" } },
    [
      _c(
        "v-layout",
        { staticClass: "mb-3", attrs: { row: "", wrap: "" } },
        [
          _vm.$auth.can("admin.index") || _vm.$auth.isAdmin()
            ? _c("v-flex", { attrs: { xs12: "" } }, [
                _c("div", { staticClass: "headline" }, [
                  _vm._v("Hola " + _vm._s(_vm.$auth.user.user.name) + ",")
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "display-2 font-weight-bold" }, [
                  _vm._v("Bienvenido")
                ])
              ])
            : _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _c("v-alert", { attrs: { value: true, type: "info" } }, [
                    _c("span", { staticClass: "headline" }, [
                      _vm._v(
                        "Usted no tiene ningún permiso, comuníquese con el administrador del sistema."
                      )
                    ])
                  ])
                ],
                1
              )
        ],
        1
      ),
      _vm._v(" "),
      _vm.$auth.can("admin.index") || _vm.$auth.isAdmin()
        ? _c(
            "v-layout",
            { staticClass: "mb-2", attrs: { row: "", wrap: "" } },
            _vm._l(_vm.count_items, function(item, index) {
              return _c(
                "v-flex",
                { key: index, attrs: { xs12: "", sm6: "", md3: "" } },
                [
                  _c("count-item", {
                    attrs: {
                      color: item.color,
                      icon: item.icon,
                      label: item.label,
                      total: item.total
                    }
                  })
                ],
                1
              )
            }),
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.$auth.can("admin.index") || _vm.$auth.isAdmin()
        ? _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _vm.$auth.isAdmin()
                ? [
                    _c(
                      "v-flex",
                      { attrs: { xs12: "" } },
                      [
                        _c(
                          "v-card",
                          { staticClass: "rounded-xl pa-6 mt-5" },
                          [
                            _c(
                              "v-list",
                              [
                                _c(
                                  "div",
                                  { staticClass: "headline font-weight-bold" },
                                  [_vm._v("Constancias Entregadas")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "body-1 text--secondary" },
                                  [
                                    _vm._v(
                                      "Cantidad de constancias de pago entregadas por usuario"
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _vm._l(_vm.dataConstanciasByUsers, function(
                                  user
                                ) {
                                  return _c(
                                    "v-list-tile",
                                    { key: user.dni },
                                    [
                                      _c(
                                        "v-list-tile-content",
                                        [
                                          _c("v-list-tile-title", [
                                            _vm._v(_vm._s(user.nombre))
                                          ]),
                                          _vm._v(" "),
                                          _c("v-list-tile-sub-title", [
                                            _vm._v("DNI: " + _vm._s(user.dni))
                                          ])
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("v-spacer"),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        [
                                          _c(
                                            "v-chip",
                                            {
                                              attrs: {
                                                color: "info",
                                                "text-color": "white"
                                              }
                                            },
                                            [
                                              _c("h3", [
                                                _vm._v(
                                                  "Por años: " +
                                                    _vm._s(user.total_anios)
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "v-icon",
                                                { attrs: { right: "" } },
                                                [_vm._v("$vuetify.icons.file")]
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-chip",
                                            {
                                              attrs: {
                                                color: "error",
                                                "text-color": "white"
                                              }
                                            },
                                            [
                                              _c("h3", [
                                                _vm._v(
                                                  "Por año: " +
                                                    _vm._s(user.total_anio)
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "v-icon",
                                                { attrs: { right: "" } },
                                                [_vm._v("$vuetify.icons.file")]
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-chip",
                                            {
                                              attrs: {
                                                color: "indigo",
                                                "text-color": "white"
                                              }
                                            },
                                            [
                                              _c("h3", [
                                                _vm._v(
                                                  "Por mes: " +
                                                    _vm._s(user.total_mes)
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "v-icon",
                                                { attrs: { right: "" } },
                                                [_vm._v("$vuetify.icons.file")]
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
                                })
                              ],
                              2
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "" } },
                [
                  _vm.$auth.isAdmin()
                    ? _c(
                        "v-card",
                        { staticClass: "rounded-xl pa-6 mt-5" },
                        [
                          _c(
                            "v-card-title",
                            { staticClass: "no-padding-bottom" },
                            [
                              _c(
                                "v-layout",
                                { attrs: { row: "", "align-center": "" } },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "mr-4" },
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
                                                      "v-icon",
                                                      _vm._g({}, on),
                                                      [
                                                        _vm._v(
                                                          "$vuetify.icons.filter"
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                }
                                              }
                                            ],
                                            null,
                                            false,
                                            2928224150
                                          )
                                        },
                                        [
                                          _vm._v(" "),
                                          _c("span", [
                                            _vm._v(
                                              "Filtar o ver los total de pagos por año y estado de personas"
                                            )
                                          ])
                                        ]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "text-center" },
                                    [
                                      _c("v-select", {
                                        attrs: {
                                          dense: "",
                                          filled: "",
                                          shaped: "",
                                          items: _vm.items,
                                          "item-text": "anio",
                                          "item-value": "anio",
                                          label: "Seleccionar el año"
                                        },
                                        on: {
                                          input: function($event) {
                                            return _vm.filterByYear()
                                          }
                                        },
                                        model: {
                                          value: _vm.anio,
                                          callback: function($$v) {
                                            _vm.anio = $$v
                                          },
                                          expression: "anio"
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-card-text",
                            { staticClass: "no-padding-top" },
                            [
                              _c("bar-chart", {
                                attrs: { "chart-data": _vm.dataPagos }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "", sm6: "" } },
                [
                  _c(
                    "v-card",
                    { staticClass: "rounded-xl pa-6 mt-5" },
                    [
                      _c(
                        "v-card-text",
                        [
                          _c("pie-chart", {
                            attrs: {
                              "chart-data": _vm.dataPersonas,
                              title: "Cantidad de personas por estado"
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
                "v-flex",
                { attrs: { xs12: "", sm6: "" } },
                [
                  _c(
                    "v-card",
                    { staticClass: "rounded-xl pa-6 mt-5" },
                    [
                      _c(
                        "v-card-text",
                        [
                          _c("pie-chart", {
                            attrs: {
                              "chart-data": _vm.dataConstancias,
                              title:
                                "Cantidad de constancias por tipo de reporte"
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
            2
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/dashboard/CountItem.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/dashboard/CountItem.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountItem_vue_vue_type_template_id_1dc8816c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountItem.vue?vue&type=template&id=1dc8816c& */ "./resources/js/components/dashboard/CountItem.vue?vue&type=template&id=1dc8816c&");
/* harmony import */ var _CountItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountItem.vue?vue&type=script&lang=js& */ "./resources/js/components/dashboard/CountItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CountItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CountItem_vue_vue_type_template_id_1dc8816c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CountItem_vue_vue_type_template_id_1dc8816c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dashboard/CountItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dashboard/CountItem.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/dashboard/CountItem.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./CountItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/CountItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CountItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dashboard/CountItem.vue?vue&type=template&id=1dc8816c&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/dashboard/CountItem.vue?vue&type=template&id=1dc8816c& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountItem_vue_vue_type_template_id_1dc8816c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./CountItem.vue?vue&type=template&id=1dc8816c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/CountItem.vue?vue&type=template&id=1dc8816c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountItem_vue_vue_type_template_id_1dc8816c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountItem_vue_vue_type_template_id_1dc8816c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/dashboard/chart/BarChart.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/dashboard/chart/BarChart.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BarChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BarChart.vue?vue&type=script&lang=js& */ "./resources/js/components/dashboard/chart/BarChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _BarChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dashboard/chart/BarChart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dashboard/chart/BarChart.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/dashboard/chart/BarChart.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BarChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BarChart.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/chart/BarChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BarChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/dashboard/chart/PieChart.vue":
/*!**************************************************************!*\
  !*** ./resources/js/components/dashboard/chart/PieChart.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PieChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PieChart.vue?vue&type=script&lang=js& */ "./resources/js/components/dashboard/chart/PieChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
  _PieChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/dashboard/chart/PieChart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/dashboard/chart/PieChart.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/dashboard/chart/PieChart.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PieChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PieChart.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/dashboard/chart/PieChart.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PieChart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

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
/* empty/unused harmony star reexport *//* harmony import */ var _Dashboard_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=style&index=0&lang=css& */ "./resources/js/views/admin/Dashboard.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
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

/***/ "./resources/js/views/admin/Dashboard.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************!*\
  !*** ./resources/js/views/admin/Dashboard.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/admin/Dashboard.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

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