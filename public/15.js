(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{56:function(t,e,s){"use strict";s.r(e);var r={data:function(){return{open:!1,form:{nombre:"",tipo:"descuento",descripcion:"",descripcion_simple:""},errors:{}}},methods:{Submit:function(){var t=this;axios.post("/descuentos",this.form).then((function(e){t.$parent.getData(),t.open=!1,t.$swal("Mensaje de operación","Datos registrados correctamente","success"),t.resetInputs()})).catch((function(e){t.errors=e.response.data.errors,403==e.response.status&&t.$router.push("/403")}))},resetInputs:function(){this.form.nombre="",this.form.tipo="descuento",this.form.descripcion="",this.form.descripcion_simple="",this.errors={}},show:function(){this.open=!0,this.resetInputs()},close:function(){this.resetInputs(),this.open=!1}}},o=s(6),i={data:function(){return{open:!1,form:{id:"",nombre:"",tipo:"descuento",descripcion:"",descripcion_simple:""},errors:{}}},methods:{Submit:function(){var t=this;axios.put("/descuentos/".concat(this.form.id),this.form).then((function(e){t.$parent.getData(),t.open=!1,t.$swal("Mensaje de operación","Datos editados correctamente","success")})).catch((function(e){t.errors=e.response.data.errors,403==e.response.status&&t.$router.push("/403")}))},show:function(){this.open=!0,this.errors={}}}},a={components:{ModalAgregar:Object(o.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-dialog",{attrs:{persistent:"",small:"",width:"800px"},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}},[s("v-card",[s("form",{on:{submit:function(e){return e.preventDefault(),t.Submit(e)}}},[s("v-card-title",{staticClass:"blue-grey darken-2 white--text",attrs:{wrap:""}},[s("v-flex",{attrs:{xs11:""}},[s("span",{staticClass:"headline"},[t._v("Registrar un Descuento")])]),t._v(" "),s("v-flex",{staticClass:"d-flex justify-end",attrs:{xs1:""}},[s("v-btn",{attrs:{color:"error"},on:{click:function(e){return t.close()}}},[s("v-icon",[t._v("$vuetify.icons.close")])],1)],1)],1),t._v(" "),s("v-card-text",[s("v-container",{attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Nombre",required:"","error-messages":t.errors.nombre},model:{value:t.form.nombre,callback:function(e){t.$set(t.form,"nombre",e)},expression:"form.nombre"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Descripción",required:"","error-messages":t.errors.descripcion},model:{value:t.form.descripcion,callback:function(e){t.$set(t.form,"descripcion",e)},expression:"form.descripcion"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Descripción simple",required:"","error-messages":t.errors.descripcion_simple},model:{value:t.form.descripcion_simple,callback:function(e){t.$set(t.form,"descripcion_simple",e)},expression:"form.descripcion_simple"}})],1)],1)],1),t._v(" "),s("small",[t._v("Ingrese los campos obligatorios.")])],1),t._v(" "),s("v-card-actions",[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{color:"error"},on:{click:function(e){return t.close()}}},[t._v("Cancelar")]),t._v(" "),s("v-btn",{attrs:{color:"success",type:"submit"}},[t._v("Guardar")])],1)],1)])],1)],1)}),[],!1,null,null,null).exports,ModalEditar:Object(o.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-dialog",{attrs:{persistent:"",small:"",width:"800px"},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}},[s("v-card",[s("form",{on:{submit:function(e){return e.preventDefault(),t.Submit(e)}}},[s("v-card-title",{staticClass:"blue-grey darken-2 white--text",attrs:{wrap:""}},[s("v-flex",{attrs:{xs11:""}},[s("span",{staticClass:"headline"},[t._v("Editar el Descuento")])]),t._v(" "),s("v-flex",{staticClass:"d-flex justify-end",attrs:{xs1:""}},[s("v-btn",{attrs:{color:"error"},on:{click:function(e){t.open=!1}}},[s("v-icon",[t._v("$vuetify.icons.close")])],1)],1)],1),t._v(" "),s("v-card-text",[s("v-container",{attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Nombre",required:"","error-messages":t.errors.nombre},model:{value:t.form.nombre,callback:function(e){t.$set(t.form,"nombre",e)},expression:"form.nombre"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Descripción",required:"","error-messages":t.errors.descripcion},model:{value:t.form.descripcion,callback:function(e){t.$set(t.form,"descripcion",e)},expression:"form.descripcion"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"Descripción simple",required:"","error-messages":t.errors.descripcion_simple},model:{value:t.form.descripcion_simple,callback:function(e){t.$set(t.form,"descripcion_simple",e)},expression:"form.descripcion_simple"}})],1)],1)],1),t._v(" "),s("small",[t._v("Ingrese los campos obligatorios.")])],1),t._v(" "),s("v-card-actions",[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{color:"error"},on:{click:function(e){t.open=!1}}},[t._v("Cancelar")]),t._v(" "),s("v-btn",{attrs:{color:"success",type:"submit"}},[t._v("Guardar")])],1)],1)])],1)],1)}),[],!1,null,null,null).exports},data:function(){return{search:"",loading:!1,loadingData:!1,pagination:{},RowsPerPageItems:[9,15,25,{text:"Todos",value:-1}],selected:[],headers:[{text:"Codigo",align:"left",sortable:!0,value:"codigo"},{text:"Nombre",value:"nombre"},{text:"Tipo",value:"tipo"},{text:"Descripcion",value:"descripcion"},{text:"Descripcion simple",value:"descripcion_simple"}],descuentos:[]}},created:function(){this.$auth.can("descuentos.index")||this.$auth.isAdmin()?(document.title="Lista de Descuentos",this.getData()):this.$router.push("/admin/403")},mounted:function(){this.$root.agregarDescuento=this.$refs.agregarDescuento,this.$root.editarDescuento=this.$refs.editarDescuento},methods:{getData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/descuentos";this.loadingData=!0,axios.get(e).then((function(e){t.loadingData=!1,t.descuentos=e.data.descuentos})).catch((function(e){console.log(e),403==e.response.status&&t.$router.push("/admin/403")}))},modalAgregar:function(){this.$root.agregarDescuento.show()},modalEditar:function(t){this.$root.editarDescuento.show(),this.$root.editarDescuento.form.id=t.id,this.$root.editarDescuento.form.codigo=t.codigo,this.$root.editarDescuento.form.nombre=t.nombre,this.$root.editarDescuento.form.tipo=t.tipo,this.$root.editarDescuento.form.descripcion=t.descripcion,this.$root.editarDescuento.form.descripcion_simple=t.descripcion_simple},deleteData:function(t){var e=this;this.$swal({title:"¿Está seguro de eliminar el registro?",text:"Esta operación va a eliminar el registro",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"Cancelar",confirmButtonText:"Sí, eliminar"}).then((function(s){s.value&&axios.delete("/descuentos/".concat(t.id)).then((function(t){e.$swal("Mensaje de operación","El descuento se eliminó correctamente","success"),e.getData()})).catch((function(t){console.log(t),403==errors.response.status&&e.$router.push("/403")}))}))}},computed:{pages:function(){return null==this.pagination.rowsPerPage||null==this.pagination.totalItems?0:Math.ceil(this.pagination.totalItems/this.pagination.rowsPerPage)}}},n=Object(o.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-layout",{staticClass:"mb-3",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-card",[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"",sm8:"",md9:""}},[s("span",{staticClass:"headline"},[t._v("Lista de Descuentos")])]),t._v(" "),t.$auth.can("descuentos.create")||t.$auth.isAdmin()?s("v-flex",{attrs:{xs12:"",sm4:"",md3:"","justify-end":"",flexbox:""}},[s("v-btn",{attrs:{color:"primary"},on:{click:t.modalAgregar}},[s("v-icon",[t._v("$vuetify.icons.add")]),t._v("Agregar descuento\n              ")],1)],1):t._e()],1)],1),t._v(" "),s("v-container",{staticStyle:{"padding-bottom":"0","padding-top":"0"},attrs:{fluid:""}},[s("v-text-field",{attrs:{clearable:"",label:"Buscar",type:"text"},scopedSlots:t._u([{key:"prepend",fn:function(){return[s("v-icon",[t._v("$vuetify.icons.search")])]},proxy:!0},{key:"append",fn:function(){return[s("v-fade-transition",{attrs:{"leave-absolute":""}},[t.loading?s("v-progress-circular",{attrs:{size:"24",color:"info",indeterminate:""}}):t._e()],1)]},proxy:!0}]),model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)],1)],1),t._v(" "),s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.descuentos,search:t.search,loading:t.loadingData,pagination:t.pagination,"rows-per-page-items":t.RowsPerPageItems,"rows-per-page-text":"Mostrar","no-data-text":"No hay registros","no-results-text":"No hay registros encontrados"},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[s("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.codigo))]),t._v(" "),s("td",[t._v(t._s(e.item.nombre))]),t._v(" "),s("td",[s("v-chip",{staticClass:"text-capitalize",attrs:{"text-color":"white",color:"success",small:""}},[t._v(t._s(e.item.tipo))])],1),t._v(" "),s("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.descripcion))]),t._v(" "),s("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.descripcion_simple))]),t._v(" "),s("td",[t.$auth.can("descuentos.edit")||t.$auth.isAdmin()?s("v-tooltip",{attrs:{bottom:""}},[s("v-btn",{attrs:{slot:"activator",color:"info",fab:"",small:""},on:{click:function(s){return t.modalEditar(e.item)}},slot:"activator"},[s("v-icon",[t._v("$vuetify.icons.edit")])],1),t._v(" "),s("span",[t._v("Editar registro")])],1):t._e(),t._v(" "),t.$auth.can("descuentos.destroy")||t.$auth.isAdmin()?s("v-tooltip",{attrs:{bottom:""}},[s("v-btn",{attrs:{slot:"activator",color:"error",fab:"",small:""},on:{click:function(s){return t.deleteData(e.item)}},slot:"activator"},[s("v-icon",[t._v("$vuetify.icons.delete")])],1),t._v(" "),s("span",[t._v("Eliminar registro")])],1):t._e()],1)]}}])}),t._v(" "),s("div",{staticClass:"text-xs-center pt-2"})],1)],1),t._v(" "),s("modal-agregar",{ref:"agregarDescuento"}),t._v(" "),s("modal-editar",{ref:"editarDescuento"})],1)}),[],!1,null,null,null);e.default=n.exports}}]);