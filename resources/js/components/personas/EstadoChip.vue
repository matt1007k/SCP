<template>
  <span>
    <template v-if="estado === 'activo'">
      <v-chip text-color="white" color="success" class="text-capitalize" small>{{ estado }}</v-chip>
    </template>
    <template v-if="estado === 'cesante'">
      <v-chip text-color="white" color="error" class="text-capitalize" small>{{ estado }}</v-chip>
    </template>
    <template v-if="estado === 'sobreviviente'">
      <v-chip text-color="white" color="info" class="text-capitalize" small>{{ estado }}</v-chip>
    </template>
  </span>
</template>
<script>
export default {
  props: ["estado"]
};
</script>