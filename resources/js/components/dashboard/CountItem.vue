<template>
  <v-card>
    <div class="d-flex">
      <div class="padding-small d-flex align-center" :class="color">
        <v-icon dark medium>{{icon}}</v-icon>
      </div>
      <div class="padding-small">
        <span class="title">{{total}}</span>
        <div class="subheading">{{label}}</div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["color", "icon", "label", "total"]
};
</script>
