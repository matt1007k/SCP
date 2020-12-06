<template>
  <v-navigation-drawer
    mobile-breakpoint="960"
    :value="toggle"
    @input="$emit('input', $event)"
    fixed
    app
  >
    <v-container>
      <template v-if="$vuetify.theme.dark">
        <img src="/img/logo-scp-dark.png" />
      </template>
      <template v-else>
        <img src="/img/logo-scp-light.png" />
      </template>
    </v-container>
    <v-list dense nav>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $auth.user.user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $auth.user.user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-container fluid>
          <!-- <v-spacer></v-spacer> -->
          <v-btn color="info" small style="margin-left: 0;" class="rounded-md" @click="goToPerfil()">
            Perfil
          </v-btn>
          <v-switch
            v-model="dark"
            inset
            :label="`${dark ? 'Modo claro' : 'Modo oscuro'}`"
          ></v-switch>
      </v-container>

      <v-divider></v-divider>

      <v-subheader>MANTENIMIENTO</v-subheader>

      <template v-for="(item, index) in itemsMenu">
        <template v-if="item.group">
          <v-list-group
            v-if="$auth.can(item.permission) || $auth.isAdmin()"
            :prepend-icon="item.icon"
            :value="subIsActive([item.url])"
            :key="index"
            color="primary"
          >
            <template v-slot:activator>
              <!-- <v-list-item> -->
              <v-list-item-title>{{item.title}}</v-list-item-title>
              <!-- </v-list-item> -->
            </template>

            <template v-for="(submenu, i) in item.submenu">
              <v-list-item
                :key="i"
                router
                :to="submenu.url"
                v-if="$auth.can(submenu.permission) || $auth.isAdmin()"
                link
              >
                <v-list-item-action></v-list-item-action>
                <v-list-item-title v-text="submenu.title"></v-list-item-title>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item
            v-if="$auth.can(item.permission) || $auth.isAdmin()"
            router
            :to="item.url"
            :exact="item.exact"
            active-exact-class="primary"
            :key="index"
            :prepend-icon="item.icon"
          >
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { listItemsSidebar } from "../../services/listItemsSidebar";
export default {
  props: {
    toggle: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    drawer: true,
    itemsMenu: listItemsSidebar,
    dark: false 
  }),
  methods: {
    goTo(url) {
      this.$router.push(url);
    },
    goToPerfil() {
      this.$router.push("/admin/perfil");
    },
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    },
  },
  created(){
    this.dark = localStorage.getItem('dark') ? true : false;
    this.$vuetify.theme.dark = localStorage.getItem('dark') ? true : false;
    console.log(localStorage.getItem('dark'))
  },
  watch: {
    dark(inputValue){
      if(inputValue){
        console.log('dark')
        this.$vuetify.theme.dark = inputValue;
        localStorage.setItem('dark', inputValue.toString());
        console.log(localStorage.getItem('dark'));
      } else{
        console.log('light')
        this.$vuetify.theme.dark = inputValue;
        localStorage.removeItem('dark');
        console.log(localStorage.getItem('dark'));
      }
    }
  }
};
</script>

<style>
.v-list .v-list-item--active, .v-list .v-list-item--active .v-icon{
  color: #039be5 !important;
}
</style>

