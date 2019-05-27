<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <span class="headline">Dashboard</span>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <span class="headline">Dashboard</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  mounted() {
    console.log(this.$vuetify.breakpoint);
  }
};
</script>

<style>
</style>
