<template>
  <v-card>
    <div class="d-flex">
      <div class="d-flex align-center w-30" :class="color">
        <v-icon dark medium>{{icon}}</v-icon>
      </div>
      <div class="padding-small w-70">
        <span class="title">{{total}}</span>
        <div class="body-2">{{label}}</div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["color", "icon", "label", "total"]
};
</script>
