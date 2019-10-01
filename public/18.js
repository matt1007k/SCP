(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{58:function(t,e,s){"use strict";s.r(e);var r={props:{value:Boolean},data:function(){return{open:!1,form:{name:"",dni:"",email:"",password:"",estado:"activo",roles:[],permissions:[]},errors:{},items_roles:[],items_permissions:[]}},created:function(){this.getRoles(),this.getPermissions()},methods:{Submit:function(){var t=this;axios.post("/usuarios",this.form).then((function(e){t.$parent.getData(),t.open=!1,t.$swal("Mensaje de operación","Datos registrados correctamente.","success"),t.resetInputs()})).catch((function(e){t.errors=e.response.data.errors}))},getRoles:function(){var t=this;axios.get("/getRoles").then((function(e){t.items_roles=e.data.roles})).catch((function(t){return console.log(t)}))},getPermissions:function(){var t=this;axios.get("/getPermissions").then((function(e){t.items_permissions=e.data.permissions})).catch((function(t){return console.log(t)}))},resetInputs:function(){this.form.name="",this.form.dni="",this.form.email="",this.form.password="",this.form.estado="activo",this.form.roles=[],this.form.permissions=[],this.errors={}},show:function(){this.open=!0},close:function(){this.open=!1,this.resetInputs()}}},o=s(6),a={data:function(){return{open:!1,hidePassword:!0,form:{id:"",name:"",dni:"",email:"",password:"",estado:"activo",roles:[],permissions:[]},errors:{},items_roles:[],items_permissions:[]}},created:function(){this.getRoles(),this.getPermissions()},methods:{Submit:function(){var t=this;axios.put("/usuarios/".concat(this.form.id),this.form).then((function(e){t.$parent.getData(),t.$swal("Mensaje de operación","Datos editados correctamente.","success")})).catch((function(e){t.errors=e.response.data.errors}))},show:function(){this.open=!0,this.errors={}},getRoles:function(){var t=this;axios.get("/getRoles").then((function(e){t.items_roles=e.data.roles})).catch((function(t){return console.log(t)}))},getPermissions:function(){var t=this;axios.get("/getPermissions").then((function(e){t.items_permissions=e.data.permissions})).catch((function(t){return console.log(t)}))},showPassword:function(){this.hidePassword=!this.hidePassword}}},i={components:{ModalAgregar:Object(o.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-dialog",{attrs:{persistent:"",small:"",width:"800px"},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}},[s("v-card",[s("form",{on:{submit:function(e){return e.preventDefault(),t.Submit(e)}}},[s("v-card-title",{staticClass:"blue-grey darken-2 white--text",attrs:{wrap:""}},[s("v-flex",{attrs:{xs11:""}},[s("span",{staticClass:"headline"},[t._v("Registrar usuario")])]),t._v(" "),s("v-flex",{staticClass:"d-flex justify-end",attrs:{xs1:""}},[s("v-btn",{attrs:{color:"error"},on:{click:function(e){return t.close()}}},[s("v-icon",[t._v("$vuetify.icons.close")])],1)],1)],1),t._v(" "),s("v-card-text",[s("v-container",{attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-text-field",{attrs:{label:"Nombre completo",required:"","error-messages":t.errors.name},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-text-field",{attrs:{label:"El DNI",required:"",maxlength:"8","error-messages":t.errors.dni},model:{value:t.form.dni,callback:function(e){t.$set(t.form,"dni",e)},expression:"form.dni"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-text-field",{attrs:{label:"Correo Electrónico",required:"","error-messages":t.errors.email},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-text-field",{attrs:{label:"Contraseña",required:"",type:"password","error-messages":t.errors.password},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("div",{staticClass:"body-2"},[t._v("Estado del usuario")]),t._v(" "),s("v-radio-group",{attrs:{row:"","error-messages":t.errors.estado},model:{value:t.form.estado,callback:function(e){t.$set(t.form,"estado",e)},expression:"form.estado"}},[s("v-radio",{attrs:{label:"Activo",value:"activo",color:"success"}}),t._v(" "),s("v-radio",{attrs:{label:"Inactivo",value:"inactivo",color:"error"}})],1)],1)],1),t._v(" "),s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h4",[t._v("Asignar Roles")]),t._v(" "),s("v-select",{attrs:{items:t.items_roles,"item-text":"name","return-object":"",chips:"",label:"Roles",multiple:""},model:{value:t.form.roles,callback:function(e){t.$set(t.form,"roles",e)},expression:"form.roles"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("h4",[t._v("Asignar Permisos Especiales")]),t._v(" "),s("v-select",{attrs:{items:t.items_permissions,"item-text":"name","return-object":"",chips:"",label:"Permisos",multiple:""},model:{value:t.form.permissions,callback:function(e){t.$set(t.form,"permissions",e)},expression:"form.permissions"}})],1)],1)],1),t._v(" "),s("small",[t._v("Ingrese los campos obligatorios.")])],1),t._v(" "),s("v-card-actions",[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{color:"error"},on:{click:function(e){return t.close()}}},[t._v("Cancelar")]),t._v(" "),s("v-btn",{attrs:{color:"success",type:"submit"}},[t._v("Guardar")])],1)],1)])],1)],1)}),[],!1,null,null,null).exports,ModalEditar:Object(o.a)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{attrs:{row:"","justify-center":""}},[s("v-dialog",{attrs:{persistent:"",small:"",width:"800px"},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}},[s("v-card",[s("form",{on:{submit:function(e){return e.preventDefault(),t.Submit(e)}}},[s("v-card-title",{staticClass:"blue-grey darken-2 white--text",attrs:{wrap:""}},[s("v-flex",{attrs:{xs11:""}},[s("span",{staticClass:"headline"},[t._v("Editar usuario")])]),t._v(" "),s("v-flex",{staticClass:"d-flex justify-end",attrs:{xs1:""}},[s("v-btn",{attrs:{color:"error"},on:{click:function(e){t.open=!1}}},[s("v-icon",[t._v("$vuetify.icons.close")])],1)],1)],1),t._v(" "),s("v-card-text",[s("v-container",{attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-text-field",{attrs:{label:"Nombre completo",required:"","error-messages":t.errors.name},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-text-field",{attrs:{label:"El DNI",required:"",maxlength:"8","error-messages":t.errors.dni},model:{value:t.form.dni,callback:function(e){t.$set(t.form,"dni",e)},expression:"form.dni"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-text-field",{attrs:{label:"Correo Electrónico",required:"",type:"email","error-messages":t.errors.email},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:"",sm6:""}},[s("v-btn",{attrs:{color:"primary"},on:{click:t.showPassword}},[t._v("Cambiar Contraseña")]),t._v(" "),s("div",{class:{"d-none":t.hidePassword}},[s("v-text-field",{attrs:{label:"Contraseña",type:"password","error-messages":t.errors.password},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1)],1),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("div",{staticClass:"body-2"},[t._v("Estado del usuario")]),t._v(" "),s("v-radio-group",{attrs:{row:"","error-messages":t.errors.estado},model:{value:t.form.estado,callback:function(e){t.$set(t.form,"estado",e)},expression:"form.estado"}},[s("v-radio",{attrs:{label:"Activo",value:"activo",color:"success"}}),t._v(" "),s("v-radio",{attrs:{label:"Inactivo",value:"inactivo",color:"error"}})],1)],1)],1),t._v(" "),s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("h4",[t._v("Asignar Roles")]),t._v(" "),s("v-select",{attrs:{items:t.items_roles,"item-text":"name","return-object":"",chips:"",label:"Roles",multiple:""},model:{value:t.form.roles,callback:function(e){t.$set(t.form,"roles",e)},expression:"form.roles"}})],1),t._v(" "),s("v-flex",{attrs:{xs12:""}},[s("h4",[t._v("Asignar Permisos")]),t._v(" "),s("v-select",{attrs:{items:t.items_permissions,"item-text":"name","return-object":"",chips:"",label:"Permisos",multiple:""},model:{value:t.form.permissions,callback:function(e){t.$set(t.form,"permissions",e)},expression:"form.permissions"}})],1)],1)],1),t._v(" "),s("small",[t._v("Ingrese los campos obligatorios.")])],1),t._v(" "),s("v-card-actions",[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{color:"error"},on:{click:function(e){t.open=!1}}},[t._v("Cancelar")]),t._v(" "),s("v-btn",{attrs:{color:"success",type:"submit"}},[t._v("Guardar")])],1)],1)])],1)],1)}),[],!1,null,null,null).exports},data:function(){return{search:"",loading:!1,loadingData:!1,pagination:{},RowsPerPageItems:[9,15,25,{text:"Todos",value:-1}],selected:[],headers:[{text:"DNI",align:"left",sortable:!1,value:"dni"},{text:"Nombre completo",value:"name"},{text:"Correo Electrónico",value:"email"},{text:"Roles",value:"roles.name"},{text:"Estado",value:"estado"}],usuarios:[]}},created:function(){this.$auth.can("users.index")||this.$auth.isAdmin()?(document.title="Lista de Usuarios",this.getData()):this.$router.push("/admin/403")},mounted:function(){this.$root.agregarUsuario=this.$refs.agregarUsuario,this.$root.editarUsuario=this.$refs.editarUsuario},methods:{getData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/usuarios";this.loadingData=!0,axios.get(e).then((function(e){t.usuarios=e.data.usuarios,t.loadingData=!1})).catch((function(e){console.log(e),403==e.response.status&&t.$router.push("/admin/403")}))},modalAgregar:function(){this.$root.agregarUsuario.show()},modalEditar:function(t){this.$root.editarUsuario.show(),this.$root.editarUsuario.form.id=t.id,this.$root.editarUsuario.form.dni=t.dni,this.$root.editarUsuario.form.name=t.name,this.$root.editarUsuario.form.email=t.email,this.$root.editarUsuario.form.roles=t.roles,this.$root.editarUsuario.form.permissions=t.permissions,this.$root.editarUsuario.form.estado=t.estado},deleteData:function(t){var e=this;this.$swal({title:"¿Está seguro de cambiar el estado?",text:"Esta operación va a cambiar el estado del registro",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"Cancelar",confirmButtonText:"Sí, cambiar"}).then((function(s){s.value&&axios.delete("/usuarios/".concat(t.id)).then((function(t){e.$swal("Mensaje de operación","Estado cambiado correctamente","success"),e.getData()})).catch((function(t){console.log(t),403==t.response.status&&e.$router.push("/403")}))}))}},computed:{pages:function(){return null==this.pagination.rowsPerPage||null==this.pagination.totalItems?0:Math.ceil(this.pagination.totalItems/this.pagination.rowsPerPage)}}},n=Object(o.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-layout",{staticClass:"mb-3",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-card",[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"",sm9:"",md9:""}},[s("span",{staticClass:"headline"},[t._v("Lista de usuarios")])]),t._v(" "),t.$auth.can("users.create")||t.$auth.isAdmin()?s("v-flex",{attrs:{xs12:"",sm3:"",md3:"","justify-end":"",flexbox:""}},[s("v-btn",{attrs:{color:"primary"},on:{click:function(e){return e.stopPropagation(),t.modalAgregar(e)}}},[s("v-icon",[t._v("$vuetify.icons.add")]),t._v("Agregar usuario\n              ")],1)],1):t._e()],1)],1),t._v(" "),s("v-container",{staticStyle:{"padding-bottom":"0","padding-top":"0"},attrs:{fluid:""}},[s("v-text-field",{attrs:{clearable:"",label:"Buscar",type:"text"},scopedSlots:t._u([{key:"prepend",fn:function(){return[s("v-icon",[t._v("$vuetify.icons.search")])]},proxy:!0},{key:"append",fn:function(){return[s("v-fade-transition",{attrs:{"leave-absolute":""}},[t.loading?s("v-progress-circular",{attrs:{size:"24",color:"info",indeterminate:""}}):t._e()],1)]},proxy:!0}]),model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)],1)],1),t._v(" "),s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.usuarios,search:t.search,loading:t.loadingData,"rows-per-page-text":"Mostrar","no-data-text":"No hay registros","no-results-text":"No hay registros encontrados",pagination:t.pagination,"rows-per-page-items":t.RowsPerPageItems},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[s("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.dni))]),t._v(" "),s("td",[t._v(t._s(e.item.name))]),t._v(" "),s("td",[t._v(t._s(e.item.email))]),t._v(" "),e.item.roles.length>0?[s("td",t._l(e.item.roles,(function(e,r){return s("v-chip",{key:r,staticClass:"text-capitalize",attrs:{"text-color":"white",color:"info",small:""}},[t._v(t._s(e.name))])})),1)]:[s("td",{staticClass:"text-xs-center"},[t._v("N/A")])],t._v(" "),"activo"===e.item.estado?[s("td",[s("v-chip",{staticClass:"text-capitalize",attrs:{"text-color":"white",color:"success",small:""}},[t._v(t._s(e.item.estado))])],1)]:t._e(),t._v(" "),"inactivo"===e.item.estado?[s("td",[s("v-chip",{staticClass:"text-capitalize",attrs:{"text-color":"white",color:"error",small:""}},[t._v(t._s(e.item.estado))])],1)]:t._e(),t._v(" "),s("td",[t.$auth.can("users.edit")||t.$auth.isAdmin()?s("v-tooltip",{attrs:{bottom:""}},[s("v-btn",{attrs:{slot:"activator",color:"info",fab:"",small:""},on:{click:function(s){return t.modalEditar(e.item)}},slot:"activator"},[s("v-icon",[t._v("$vuetify.icons.edit")])],1),t._v(" "),s("span",[t._v("Editar registro")])],1):t._e(),t._v(" "),t.$auth.can("users.destroy")||t.$auth.isAdmin()?s("v-tooltip",{attrs:{bottom:""}},[s("v-btn",{attrs:{slot:"activator",color:"error",fab:"",small:""},on:{click:function(s){return t.deleteData(e.item)}},slot:"activator"},[s("v-icon",[t._v("$vuetify.icons.delete")])],1),t._v(" "),s("span",[t._v("Cambiar estado")])],1):t._e()],1)]}}])},[s("v-progress-linear",{attrs:{color:"error",indeterminate:""},scopedSlots:t._u([{key:"progress",fn:function(){},proxy:!0}])})],1),t._v(" "),s("div",{staticClass:"text-xs-center pt-2"},[s("v-pagination",{attrs:{length:t.pages},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)],1)],1),t._v(" "),s("modal-agregar",{ref:"agregarUsuario"}),t._v(" "),s("modal-editar",{ref:"editarUsuario"})],1)}),[],!1,null,null,null);e.default=n.exports}}]);