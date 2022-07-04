<template>
  <v-card class="rounded-xl">
    <div class="pa-8">
      <div class="d-flex align-center">
        <div :class="color" class="rounded py-1 px-2">
          <v-icon dark medium>{{icon}}</v-icon>
        </div>
        <div class="body-1 ml-2 text--secondary">{{label}}</div>
      </div>
      <div class="pt-4">
        <span class="display-1 font-weight-bold">
          {{total}} 
        </span>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["color", "icon", "label", "total"],
};
</script>
