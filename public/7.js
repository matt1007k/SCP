(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{75:function(t,e,s){"use strict";s.r(e);var o=s(79),a={components:{SearchPerson:s(78).a},data:function(){return{form:{persona:{},mes:"",anio:"",certificado:""},items_mes:o.a,items_anio:[],lista_resultado:[],loading:!1,notFound:!1,msg:null,errors:{}}},created:function(){this.$auth.can("pagos.consultar")||this.$auth.isAdmin()?(document.title="Reporte de pagos por mes de un año",this.getYears()):this.$router.push("/admin/403")},methods:{getYears:function(){var t=this;axios.get("/periodos").then((function(e){return t.items_anio=e.data.years})).catch((function(t){return console.log(t)}))},getNameMonth:function(t){return this.items_mes.find((function(e){return e.value===t})).text},onPerson:function(t){this.form.persona=t.target.value},buscarPago:function(){var t=this;this.loading=!0,axios.get("/search/por-mes",{params:{anio:this.form.anio,mes:this.form.mes,persona_id:this.form.persona.id,certificado:this.form.certificado}}).then((function(e){t.loading=!1,t.errors={},t.lista_resultado=e.data.pagos;var s=e.data.msg;s&&(t.loading=!1,t.notFound=!0,t.msg=s,t.lista_resultado={})})).catch((function(e){t.loading=!1,t.errors=e.response.data.errors}))},downloadPDF:function(t,e,s){var o=this,a={anio:this.form.anio,mes:this.form.mes,persona_id:this.form.persona.id,certificado:this.form.certificado,ver:0},r=window.btoa(JSON.stringify(a));axios({url:"/reporte/por-mes/".concat(r),method:"GET",responseType:"blob"}).then((function(t){var e=window.URL.createObjectURL(new Blob([t.data])),s=document.createElement("a"),a="".concat(o.form.persona.codigo_modular,"-").concat(o.form.mes,"-").concat(o.form.anio,".pdf");s.href=e,s.setAttribute("download",a),document.body.appendChild(s),s.click()}))},viewPDF:function(t,e,s){var o={anio:this.form.anio,mes:this.form.mes,persona_id:this.form.persona.id,certificado:this.form.certificado,ver:0},a=window.btoa(JSON.stringify(o));window.open("/reporte/por-mes/".concat(a),"_blank")},getName:function(){return"".concat(this.form.persona.apellido_paterno," ").concat(this.form.persona.apellido_materno,", ").concat(this.form.persona.nombre," ")}}},r=s(6),n=Object(r.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-layout",{staticClass:"mb-3",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-card",[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("span",{staticClass:"headline"},[t._v("Reporte de pagos por mes")]),t._v(" "),s("div",{staticClass:"body-1"},[t._v("Consultar los pagos de una persona por un periodo mensual.")])]),t._v(" "),s("SearchPerson",{attrs:{errors:t.errors,person:t.form.persona},on:{input:function(e){return t.onPerson(e)}}}),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("span",{staticClass:"body-2 mb-2"},[t._v("El periodo del pago")])]),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:"",md3:""}},[s("div",{staticClass:"pr-2"},[s("v-select",{attrs:{items:t.items_anio,"item-text":"anio","item-value":"anio",label:"El año","error-messages":t.errors.anio},model:{value:t.form.anio,callback:function(e){t.$set(t.form,"anio",e)},expression:"form.anio"}})],1)]),t._v(" "),s("v-flex",{staticClass:"pl-2",attrs:{xs12:"",sm6:"",md3:""}},[s("v-select",{attrs:{items:t.items_mes,label:"El mes","error-messages":t.errors.mes},model:{value:t.form.mes,callback:function(e){t.$set(t.form,"mes",e)},expression:"form.mes"}})],1),t._v(" "),s("v-flex",{staticClass:"pl-2",attrs:{xs12:"",sm9:"",md3:""}},[s("v-text-field",{attrs:{label:"Número de Certificado","error-messages":t.errors.certificado},model:{value:t.form.certificado,callback:function(e){t.$set(t.form,"certificado",e)},expression:"form.certificado"}})],1),t._v(" "),s("v-flex",{staticClass:"d-flex",attrs:{xs12:"",sm3:"",md3:"","justify-end":""}},[s("v-btn",{attrs:{color:"success"},on:{click:function(e){return t.buscarPago()}}},[t._v("Buscar")])],1)],1)],1)],1)],1)],1),t._v(" "),s("v-layout",{attrs:{wrap:"",row:""}},[s("v-flex",{attrs:{xs12:""}},[0!==Object.keys(t.lista_resultado).length?[s("div",{staticClass:"title mb-2"},[t._v("Resultados encontrados")]),t._v(" "),s("v-card",[s("v-card-text",{staticClass:"d-flex justify-content-between"},[s("div",{staticClass:"details-info"},[s("div",{staticClass:"heading"},[t._v(t._s(t.getNameMonth(t.lista_resultado.mes))+", "+t._s(t.lista_resultado.anio))]),t._v(" "),s("div",{staticClass:"body-2"},[t._v(t._s(t.getName()))])]),t._v(" "),s("div",{staticClass:"actions"},[s("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[s("v-btn",t._g({attrs:{color:"success"},on:{click:function(e){return t.downloadPDF(t.lista_resultado.anio,t.lista_resultado.mes,t.form.persona.dni)}}},o),[s("v-icon",[t._v("mdi mdi-cloud-download-outline")])],1)]}}],null,!1,3122493249)},[t._v(" "),s("span",[t._v("Descargar constancia de pago")])]),t._v(" "),s("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[s("v-btn",t._g({attrs:{color:"info"},on:{click:function(e){return t.viewPDF(t.lista_resultado.anio,t.lista_resultado.mes,t.form.persona.dni)}}},o),[s("v-icon",[t._v("mdi mdi-printer")])],1)]}}],null,!1,293248246)},[t._v(" "),s("span",[t._v("Imprimir constancia de pago")])])],1)])],1)]:t.loading?[s("v-card",[s("v-card-text",[s("div",{staticClass:"text-xs-center"},[s("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1)])],1)]:t.notFound?[s("v-card",[s("v-card-text",[s("div",{staticClass:"text-xs-center body-2"},[t._v(t._s(this.msg))])])],1)]:t._e()],2)],1)],1)}),[],!1,null,null,null);e.default=n.exports},77:function(t,e,s){"use strict";var o={props:["estado"]},a=s(6),r=Object(a.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",["activo"===t.estado?[s("v-chip",{staticClass:"text-capitalize",attrs:{"text-color":"white",color:"success",small:""}},[t._v(t._s(t.estado))])]:t._e(),t._v(" "),"cesante"===t.estado?[s("v-chip",{staticClass:"text-capitalize",attrs:{"text-color":"white",color:"error",small:""}},[t._v(t._s(t.estado))])]:t._e(),t._v(" "),"sobreviviente"===t.estado?[s("v-chip",{staticClass:"text-capitalize",attrs:{"text-color":"white",color:"info",small:""}},[t._v(t._s(t.estado))])]:t._e()],2)}),[],!1,null,null,null);e.a=r.exports},78:function(t,e,s){"use strict";var o={components:{EstadoChip:s(77).a},props:{errors:{default:null},person:{default:null}},data:function(){return{estado:"activo",toggleActiveBtn:0,search:"",lista_personas:[],isLoading:!1,persona:{}}},computed:{getPersona:{get:function(){return this.persona=this.person&&this.person.nombre?this.person:{},this.estado=this.person&&this.person.estado?this.person.estado:this.estado,this.onSelectStatus(this.estado),this.persona},set:function(t){return this.persona=t}}},methods:{customFilter:function(t,e,s){var o=t.nombre.toLowerCase(),a=t.apellido_paterno.toLowerCase(),r=t.apellido_materno.toLowerCase(),n=t.dni.toLowerCase(),i=e.toLowerCase();return o.indexOf(i)>-1||a.indexOf(i)||r.indexOf(i)||n.indexOf(i)>-1},filterBy:function(t){this.estado=t,this.lista_personas=[],this.$emit("input",{target:{value:{}}})},onSelect:function(t){this.$emit("input",{target:{value:t}})},onSelectStatus:function(t){this.toggleActiveBtn="activo"==t?0:"sobreviviente"==t?1:"cesante"==t?2:0},getNameComplete:function(t){return void 0!==t?"".concat(t.apellido_paterno," ").concat(t.apellido_materno,", ").concat(t.nombre):""}},watch:{search:function(t){var e=this;if(!this.isLoading){this.isLoading=!0;var s={q:t,estado:this.estado};axios.get("/search-personas",{params:s}).then((function(t){e.isLoading=!1,e.lista_personas=t.data.personas})).catch((function(t){return console.log(t)})).finally((function(){return e.isLoading=!1}))}}}},a=s(6),r=Object(a.a)(o,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{staticClass:"mb-3",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("span",{staticClass:"body-2"},[t._v("Datos de la persona")])]),t._v(" "),s("v-flex",{staticClass:"mb-2 mt-2",attrs:{xs12:""}},[s("v-tooltip",{attrs:{bottom:""}},[s("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("$vuetify.icons.filter")]),t._v(" "),s("span",[t._v("Filtrar por estado")])],1),t._v(" "),s("v-btn-toggle",{attrs:{light:""},model:{value:t.toggleActiveBtn,callback:function(e){t.toggleActiveBtn=e},expression:"toggleActiveBtn"}},[s("v-btn",{attrs:{flat:"",color:"success"},on:{click:function(e){return t.filterBy("activo")}}},[t._v("Activos")]),t._v(" "),s("v-btn",{attrs:{flat:"",color:"info"},on:{click:function(e){return t.filterBy("sobreviviente")}}},[t._v("Sobrevivientes")]),t._v(" "),s("v-btn",{attrs:{flat:"",color:"error"},on:{click:function(e){return t.filterBy("cesante")}}},[t._v("Cesantes")])],1)],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("div",{staticClass:"pr-2"},[s("v-autocomplete",{attrs:{items:t.lista_personas,loading:t.isLoading,"search-input":t.search,"no-data-text":"Sin resultados","item-text":"nombre","item-value":"API",label:"Nombre","prepend-icon":"mdi-database-search",filter:t.customFilter,placeholder:"Buscar por Cod. Modular, DNI,  o nombre completo...","return-object":"","error-messages":t.errors.persona_id},on:{"update:searchInput":function(e){t.search=e},"update:search-input":function(e){t.search=e},change:t.onSelect},scopedSlots:t._u([{key:"item",fn:function(e){return[s("v-list-tile-content",[s("v-list-tile-title",[t._v(t._s(t.getNameComplete(e.item)))]),t._v(" "),s("v-list-tile-sub-title",[s("span",[t._v("DNI: "+t._s(e.item.dni)+" -")]),t._v(" "),s("span",[t._v("COD. MODULAR: "+t._s(e.item.codigo_modular))])])],1)]}}]),model:{value:t.getPersona,callback:function(e){t.getPersona=e},expression:"getPersona"}})],1)]),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("transition",{attrs:{name:"slide-fade"}},[0!==Object.keys(t.getPersona).length?s("v-card",{staticClass:"pa-2",attrs:{outlined:""}},[s("div",{staticClass:"title mb-1"},[t._v(t._s(t.getNameComplete(t.getPersona)))]),t._v(" "),s("div",{staticClass:"subtitle-1"},[s("div",[s("span",{staticClass:"font-weight-bold"},[t._v("DNI:")]),t._v("\n            "+t._s(t.getPersona.dni)+"\n          ")]),t._v(" "),s("div",[s("span",{staticClass:"font-weight-bold"},[t._v("COD. MODULAR:")]),t._v("\n            "+t._s(t.getPersona.codigo_modular)+"\n          ")]),t._v(" "),s("div",[s("span",{staticClass:"font-weight-bold"},[t._v("ESTADO:")]),t._v(" "),s("EstadoChip",{attrs:{estado:t.getPersona.estado}})],1)])]):t._e()],1)],1)],1)}),[],!1,null,null,null);e.a=r.exports},79:function(t,e,s){"use strict";s.d(e,"a",(function(){return o}));var o=[{text:"Enero",value:"01"},{text:"Febrero",value:"02"},{text:"Marzo",value:"03"},{text:"Abril",value:"04"},{text:"Mayo",value:"05"},{text:"Junio",value:"06"},{text:"Julio",value:"07"},{text:"Agosto",value:"08"},{text:"Septiembre",value:"09"},{text:"Octubre",value:"10"},{text:"Noviembre",value:"11"},{text:"Diciembre",value:"12"}]}}]);