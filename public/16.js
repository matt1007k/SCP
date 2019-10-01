(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{61:function(e,t,r){"use strict";r.r(t);var s={data:function(){return{open:!1,form:{nombre:"",tipo:"haber",descripcion:"",descripcion_simple:"",es_imponible:"0"},errors:{}}},methods:{Submit:function(){var e=this;axios.post("/haberes",this.form).then((function(t){e.$parent.getData(),e.open=!1,e.$swal("Mensaje de operación","Datos registrados correctamente","success"),e.resetInputs()})).catch((function(t){e.errors=t.response.data.errors,403==t.response.status&&e.$router.push("/403")}))},resetInputs:function(){this.form.nombre="",this.form.tipo="haber",this.form.descripcion="",this.form.descripcion_simple="",this.form.es_imponible="0",this.errors={}},show:function(){this.open=!0,this.resetInputs()},close:function(){this.open=!1,this.resetInputs()}}},o=r(6),a={data:function(){return{open:!1,form:{id:"",nombre:"",tipo:"haber",descripcion:"",descripcion_simple:"",es_imponible:"0"},errors:{}}},methods:{Submit:function(){var e=this;axios.put("/haberes/".concat(this.form.id),this.form).then((function(t){e.$parent.getData(),e.open=!1,e.$swal("Mensaje de operación","Datos editados correctamente","success")})).catch((function(t){e.errors=t.response.data.errors,403==t.response.status&&e.$router.push("/403")}))},show:function(){this.open=!0,this.errors={}}}},i={components:{ModalAgregar:Object(o.a)(s,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-layout",{attrs:{row:"","justify-center":""}},[r("v-dialog",{attrs:{persistent:"",small:"",width:"800px"},model:{value:e.open,callback:function(t){e.open=t},expression:"open"}},[r("v-card",[r("form",{on:{submit:function(t){return t.preventDefault(),e.Submit(t)}}},[r("v-card-title",{staticClass:"blue-grey darken-2 white--text",attrs:{wrap:""}},[r("v-flex",{attrs:{xs11:""}},[r("span",{staticClass:"headline"},[e._v("Registrar un Haber")])]),e._v(" "),r("v-flex",{staticClass:"d-flex justify-end",attrs:{xs1:""}},[r("v-btn",{attrs:{color:"error"},on:{click:function(t){return e.close()}}},[r("v-icon",[e._v("$vuetify.icons.close")])],1)],1)],1),e._v(" "),r("v-card-text",[r("v-container",{attrs:{"grid-list-md":""}},[r("v-layout",{attrs:{wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Nombre",required:"","error-messages":e.errors.nombre},model:{value:e.form.nombre,callback:function(t){e.$set(e.form,"nombre",t)},expression:"form.nombre"}})],1),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Descripción",required:"","error-messages":e.errors.descripcion},model:{value:e.form.descripcion,callback:function(t){e.$set(e.form,"descripcion",t)},expression:"form.descripcion"}})],1),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Descripción simple",required:"","error-messages":e.errors.descripcion_simple},model:{value:e.form.descripcion_simple,callback:function(t){e.$set(e.form,"descripcion_simple",t)},expression:"form.descripcion_simple"}})],1),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("div",{staticClass:"body-2"},[e._v("Si es asegurable")]),e._v(" "),r("v-radio-group",{attrs:{row:"","error-messages":e.errors.es_imponible},model:{value:e.form.es_imponible,callback:function(t){e.$set(e.form,"es_imponible",t)},expression:"form.es_imponible"}},[r("v-radio",{attrs:{label:"No",value:"0",color:"error"}}),e._v(" "),r("v-radio",{attrs:{label:"Si",value:"1",color:"success"}})],1)],1)],1)],1),e._v(" "),r("small",[e._v("Ingrese los campos obligatorios.")])],1),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"error"},on:{click:function(t){return e.close()}}},[e._v("Cancelar")]),e._v(" "),r("v-btn",{attrs:{color:"success",type:"submit"}},[e._v("Guardar")])],1)],1)])],1)],1)}),[],!1,null,null,null).exports,ModalEditar:Object(o.a)(a,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-layout",{attrs:{row:"","justify-center":""}},[r("v-dialog",{attrs:{persistent:"",small:"",width:"800px"},model:{value:e.open,callback:function(t){e.open=t},expression:"open"}},[r("v-card",[r("form",{on:{submit:function(t){return t.preventDefault(),e.Submit(t)}}},[r("v-card-title",{staticClass:"blue-grey darken-2 white--text",attrs:{wrap:""}},[r("v-flex",{attrs:{xs11:""}},[r("span",{staticClass:"headline"},[e._v("Editar el Haber")])]),e._v(" "),r("v-flex",{staticClass:"d-flex justify-end",attrs:{xs1:""}},[r("v-btn",{attrs:{color:"error"},on:{click:function(t){e.open=!1}}},[r("v-icon",[e._v("$vuetify.icons.close")])],1)],1)],1),e._v(" "),r("v-card-text",[r("v-container",{attrs:{"grid-list-md":""}},[r("v-layout",{attrs:{wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Nombre",required:"","error-messages":e.errors.nombre},model:{value:e.form.nombre,callback:function(t){e.$set(e.form,"nombre",t)},expression:"form.nombre"}})],1),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Descripción",required:"","error-messages":e.errors.descripcion},model:{value:e.form.descripcion,callback:function(t){e.$set(e.form,"descripcion",t)},expression:"form.descripcion"}})],1),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("v-text-field",{attrs:{label:"Descripción simple",required:"","error-messages":e.errors.descripcion_simple},model:{value:e.form.descripcion_simple,callback:function(t){e.$set(e.form,"descripcion_simple",t)},expression:"form.descripcion_simple"}})],1),e._v(" "),r("v-flex",{attrs:{xs12:""}},[r("div",{staticClass:"body-2"},[e._v("Si es asegurable")]),e._v(" "),r("v-radio-group",{attrs:{row:"","error-messages":e.errors.es_imponible},model:{value:e.form.es_imponible,callback:function(t){e.$set(e.form,"es_imponible",t)},expression:"form.es_imponible"}},[r("v-radio",{attrs:{label:"No",value:"0",color:"error"}}),e._v(" "),r("v-radio",{attrs:{label:"Si",value:"1",color:"success"}})],1)],1)],1)],1),e._v(" "),r("small",[e._v("Ingrese los campos obligatorios.")])],1),e._v(" "),r("v-card-actions",[r("v-spacer"),e._v(" "),r("v-btn",{attrs:{color:"error"},on:{click:function(t){e.open=!1}}},[e._v("Cancelar")]),e._v(" "),r("v-btn",{attrs:{color:"success",type:"submit"}},[e._v("Guardar")])],1)],1)])],1)],1)}),[],!1,null,null,null).exports},data:function(){return{imponible:"Todos",search:"",loading:!1,loadingData:!1,pagination:{},RowsPerPageItems:[9,15,25,{text:"Todos",value:-1}],selected:[],headers:[{text:"Codigo",align:"left",sortable:!0,value:"codigo"},{text:"Nombre",value:"nombre"},{text:"Tipo",value:"tipo"},{text:"Descripcion",value:"descripcion"},{text:"Descripcion simple",value:"descripcion_simple"},{text:"Asegurable",value:"es_imponible",sortable:!1}],haberes:[]}},created:function(){this.$auth.can("haberes.index")||this.$auth.isAdmin()?(document.title="Lista de Haberes",this.getData()):this.$router.push("/admin/403")},mounted:function(){this.$root.agregarHaber=this.$refs.agregarHaber,this.$root.editarHaber=this.$refs.editarHaber},methods:{getData:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/haberes";this.loadingData=!0,axios.get(t,{params:{imponible:this.imponible}}).then((function(t){e.loadingData=!1,e.haberes=t.data.haberes})).catch((function(t){console.log(t),403==t.response.status&&e.$router.push("/admin/403")}))},filterBy:function(e){this.imponible=e,this.getData()},modalAgregar:function(){this.$root.agregarHaber.show()},modalEditar:function(e){this.$root.editarHaber.show(),this.$root.editarHaber.form.id=e.id,this.$root.editarHaber.form.codigo=e.codigo,this.$root.editarHaber.form.nombre=e.nombre,this.$root.editarHaber.form.tipo=e.tipo,this.$root.editarHaber.form.descripcion=e.descripcion,this.$root.editarHaber.form.descripcion_simple=e.descripcion_simple,this.$root.editarHaber.form.es_imponible=String(e.es_imponible)},deleteData:function(e){var t=this;this.$swal({title:"¿Está seguro de cambiar el estado del registro?",text:"Esta operación va a cambiar a ser asegurable o no el haber",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"Cancelar",confirmButtonText:"Sí, cambiar"}).then((function(r){r.value&&axios.delete("/haberes/".concat(e.id)).then((function(e){t.$swal("Mensaje de operación","Se cambio el estado correctamente","success"),t.getData()})).catch((function(e){console.log(e),403==errors.response.status&&t.$router.push("/403")}))}))}},computed:{pages:function(){return null==this.pagination.rowsPerPage||null==this.pagination.totalItems?0:Math.ceil(this.pagination.totalItems/this.pagination.rowsPerPage)}}},n=Object(o.a)(i,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",[r("v-layout",{staticClass:"mb-3",attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("v-card",[r("v-container",{attrs:{"fill-height":"",fluid:""}},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{xs12:"",sm8:"",md9:""}},[r("span",{staticClass:"headline"},[e._v("Lista de Haberes")])]),e._v(" "),e.$auth.can("haberes.create")||e.$auth.isAdmin()?r("v-flex",{attrs:{xs12:"",sm4:"",md3:"","justify-end":"",flexbox:""}},[r("v-btn",{attrs:{color:"primary"},on:{click:e.modalAgregar}},[r("v-icon",[e._v("$vuetify.icons.add")]),e._v("Agregar haber\n              ")],1)],1):e._e()],1)],1),e._v(" "),r("v-container",{staticStyle:{"padding-bottom":"0","padding-top":"0"},attrs:{fluid:""}},[r("v-text-field",{attrs:{clearable:"",label:"Buscar",type:"text"},scopedSlots:e._u([{key:"prepend",fn:function(){return[r("v-icon",[e._v("$vuetify.icons.search")])]},proxy:!0},{key:"append",fn:function(){return[r("v-fade-transition",{attrs:{"leave-absolute":""}},[e.loading?r("v-progress-circular",{attrs:{size:"24",color:"info",indeterminate:""}}):e._e()],1)]},proxy:!0}]),model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),r("span",{staticClass:"mb-2"},[r("v-tooltip",{attrs:{bottom:""}},[r("v-icon",{attrs:{slot:"activator"},slot:"activator"},[e._v("$vuetify.icons.filter")]),e._v(" "),r("span",[e._v("Filtar por si es afectado por un impuesto o tributo")])],1),e._v(" "),r("v-btn",{attrs:{flat:""},on:{click:function(t){return e.filterBy("Todos")}}},[e._v("Todos")]),e._v(" "),r("v-btn",{attrs:{flat:"",color:"success"},on:{click:function(t){return e.filterBy("1")}}},[e._v("Asegurables")]),e._v(" "),r("v-btn",{attrs:{flat:"",color:"info"},on:{click:function(t){return e.filterBy("0")}}},[e._v("No Asegurables")])],1)],1)],1)],1)],1),e._v(" "),r("v-layout",{attrs:{wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.haberes,search:e.search,loading:e.loadingData,pagination:e.pagination,"rows-per-page-items":e.RowsPerPageItems,"rows-per-page-text":"Mostrar","no-data-text":"No hay registros","no-results-text":"No hay registros encontrados"},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"items",fn:function(t){return[r("td",{staticClass:"text-xs-center"},[e._v(e._s(t.item.codigo))]),e._v(" "),r("td",[e._v(e._s(t.item.nombre))]),e._v(" "),r("td",[r("v-chip",{staticClass:"text-capitalize",attrs:{"text-color":"white",color:"info",small:""}},[e._v(e._s(t.item.tipo))])],1),e._v(" "),r("td",{staticClass:"text-xs-center"},[e._v(e._s(t.item.descripcion))]),e._v(" "),r("td",{staticClass:"text-xs-center"},[e._v(e._s(t.item.descripcion_simple))]),e._v(" "),r("td",{staticClass:"text-xs-center"},["1"==t.item.es_imponible?[r("v-chip",{staticClass:"text-capitalize",attrs:{"text-color":"white",color:"success",small:""}},[e._v("Si")])]:e._e(),e._v(" "),"0"==t.item.es_imponible?[r("v-chip",{staticClass:"text-capitalize",attrs:{"text-color":"white",color:"info",small:""}},[e._v("No")])]:e._e()],2),e._v(" "),r("td",[e.$auth.can("haberes.edit")||e.$auth.isAdmin()?r("v-tooltip",{attrs:{bottom:""}},[r("v-btn",{attrs:{slot:"activator",color:"info",fab:"",small:""},on:{click:function(r){return e.modalEditar(t.item)}},slot:"activator"},[r("v-icon",[e._v("$vuetify.icons.edit")])],1),e._v(" "),r("span",[e._v("Editar registro")])],1):e._e(),e._v(" "),e.$auth.can("haberes.destroy")||e.$auth.isAdmin()?r("v-tooltip",{attrs:{bottom:""}},[r("v-btn",{attrs:{slot:"activator",color:"error",fab:"",small:""},on:{click:function(r){return e.deleteData(t.item)}},slot:"activator"},[r("v-icon",[e._v("$vuetify.icons.delete")])],1),e._v(" "),r("span",[e._v("Cambiar asegurable")])],1):e._e()],1)]}}])}),e._v(" "),r("div",{staticClass:"text-xs-center pt-2"})],1)],1),e._v(" "),r("modal-agregar",{ref:"agregarHaber"}),e._v(" "),r("modal-editar",{ref:"editarHaber"})],1)}),[],!1,null,null,null);t.default=n.exports}}]);