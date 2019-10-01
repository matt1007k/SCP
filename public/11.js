(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{63:function(t,e,a){"use strict";a.r(e);var o=a(78),s={data:function(){return{search:"",loading:!1,loadingData:!1,pagination:{},RowsPerPageItems:[9,15,25,{text:"Todos",value:-1}],selected:[],headers:[{text:"Periodo",align:"left",sortable:!0,value:"anio"},{text:"Nombre persona",value:"persona.dni"},{text:"Total Haber",value:"total_haber"},{text:"Total Descuento",value:"total_descuento"},{text:"Monto Liquido",value:"monto_liquido"},{text:"Monto Imponible",value:"monto_Total"}],pagos:[],items_anio:[],items_mes:o.a,anio:"",mes:""}},created:function(){if(this.$auth.can("pagos.index")||this.$auth.isAdmin()){document.title="Lista de Pagos";var t=new Date;this.anio=String(t.getFullYear()),this.mes=t.getMonth().toString().padStart(2,"0"),this.getData(),this.getYears()}else this.$router.push("/admin/403")},methods:{getData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/pagos";this.loadingData=!0,axios.get(e,{params:{anio:this.anio,mes:this.mes}}).then((function(e){t.loadingData=!1,t.pagos=e.data.pagos})).catch((function(e){console.log(e),403==e.response.status&&t.$router.push("/admin/403")}))},filterByYear:function(){this.mes="01",this.getData()},filterByMonth:function(){this.getData()},getYears:function(){var t=this;axios.get("/periodos").then((function(e){return t.items_anio=e.data.years})).catch((function(t){return console.log(t)}))},modalEditar:function(t){this.$router.push("/admin/pagos/editar/"+t.id)},deleteData:function(t){var e=this;this.$swal({title:"¿Está seguro de eliminar el registro?",text:"Esta operación va a eliminar el registro.",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"Cancelar",confirmButtonText:"Sí, eliminar"}).then((function(a){a.value&&axios.delete("/pagos/".concat(t.id)).then((function(t){e.$swal("Mensaje de operación","El pago se eliminó correctamente","success"),e.getData()})).catch((function(t){console.log(t),403==t.response.status&&e.$router.push("/403")}))}))}},computed:{pages:function(){return null==this.pagination.rowsPerPage||null==this.pagination.totalItems?0:Math.ceil(this.pagination.totalItems/this.pagination.rowsPerPage)}}},i=a(6),n=Object(i.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-layout",{staticClass:"mb-3",attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-card",[a("v-container",{attrs:{"fill-height":"",fluid:""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:"",sm9:"",md9:""}},[a("span",{staticClass:"headline"},[t._v("Lista de pagos")])]),t._v(" "),t.$auth.can("pagos.create")||t.$auth.isAdmin()?a("v-flex",{attrs:{xs12:"",sm3:"",md3:""}},[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"primary",router:"",to:"/admin/pagos/crear"}},[a("v-icon",[t._v("$vuetify.icons.add")]),t._v("Realizar pago\n              ")],1)],1):t._e()],1)],1),t._v(" "),a("v-container",{staticStyle:{"padding-bottom":"0","padding-top":"0"},attrs:{fluid:""}},[a("v-text-field",{attrs:{clearable:"",label:"Buscar",type:"text",placeholder:"Buscar por DNI de la persona..."},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("v-icon",[t._v("$vuetify.icons.search")])]},proxy:!0},{key:"append",fn:function(){return[a("v-fade-transition",{attrs:{"leave-absolute":""}},[t.loading?a("v-progress-circular",{attrs:{size:"24",color:"info",indeterminate:""}}):t._e()],1)]},proxy:!0}]),model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),a("v-layout",{staticClass:"mb-2",attrs:{row:"",wrap:"","align-center":""}},[a("v-flex",{attrs:{xs1:""}},[a("v-tooltip",{attrs:{bottom:""}},[a("v-icon",{attrs:{slot:"activator"},slot:"activator"},[t._v("$vuetify.icons.filter")]),t._v(" "),a("span",[t._v("Filtar por periodo")])],1)],1),t._v(" "),a("v-flex",{attrs:{xs4:""}},[a("v-select",{attrs:{items:t.items_anio,"item-text":"anio","item-value":"anio",label:"Seleccionar el año"},on:{input:function(e){return t.filterByYear()}},model:{value:t.anio,callback:function(e){t.anio=e},expression:"anio"}})],1),t._v(" "),a("v-flex",{staticClass:"ml-2",attrs:{xs4:""}},[a("v-select",{attrs:{items:t.items_mes,label:"Seleccionar el mes"},on:{input:function(e){return t.filterByMonth()}},model:{value:t.mes,callback:function(e){t.mes=e},expression:"mes"}})],1)],1)],1)],1)],1)],1),t._v(" "),a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.pagos,search:t.search,loading:t.loadingData,"rows-per-page-text":"Mostrar","no-data-text":"No hay pagos registrados","no-results-text":"No hay registros encontrados",pagination:t.pagination,"rows-per-page-items":t.RowsPerPageItems},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.anio)+", "+t._s(e.item.mes))]),t._v(" "),a("td",[t._v(t._s(e.item.persona.apellido_paterno)+" "+t._s(e.item.persona.apellido_materno)+", "+t._s(e.item.persona.nombre))]),t._v(" "),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.total_haber))]),t._v(" "),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.total_descuento))]),t._v(" "),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.monto_liquido))]),t._v(" "),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.monto_imponible))]),t._v(" "),a("td",[t.$auth.can("pagos.edit")||t.$auth.isAdmin()?a("v-tooltip",{attrs:{bottom:""}},[a("v-btn",{attrs:{slot:"activator",color:"info",fab:"",small:""},on:{click:function(a){return t.modalEditar(e.item)}},slot:"activator"},[a("v-icon",[t._v("$vuetify.icons.edit")])],1),t._v(" "),a("span",[t._v("Editar registro")])],1):t._e(),t._v(" "),t.$auth.can("pagos.destroy")||t.$auth.isAdmin()?a("v-tooltip",{attrs:{bottom:""}},[a("v-btn",{attrs:{slot:"activator",color:"error",fab:"",small:""},on:{click:function(a){return t.deleteData(e.item)}},slot:"activator"},[a("v-icon",[t._v("$vuetify.icons.delete")])],1),t._v(" "),a("span",[t._v("Eliminar registro")])],1):t._e()],1)]}}])}),t._v(" "),a("div",{staticClass:"text-xs-center pt-2"},[a("v-pagination",{attrs:{length:t.pages},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)],1)],1)],1)}),[],!1,null,null,null);e.default=n.exports},78:function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var o=[{text:"Enero",value:"01"},{text:"Febrero",value:"02"},{text:"Marzo",value:"03"},{text:"Abril",value:"04"},{text:"Mayo",value:"05"},{text:"Junio",value:"06"},{text:"Julio",value:"07"},{text:"Agosto",value:"08"},{text:"Septiembre",value:"09"},{text:"Octubre",value:"10"},{text:"Noviembre",value:"11"},{text:"Diciembre",value:"12"}]}}]);