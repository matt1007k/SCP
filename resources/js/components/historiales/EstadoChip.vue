<template>
  <span>
    <template v-if="estado === 'creado'">
      <v-chip text-color="white" color="success" class="text-capitalize" small>{{ estado }}</v-chip>
    </template>
    <template v-if="estado === 'eliminado'">
      <v-chip text-color="white" color="error" class="text-capitalize" small>{{ estado }}</v-chip>
    </template>
  </span>
</template>
<script>
export default {
  props: ["estado"]
};
</script>