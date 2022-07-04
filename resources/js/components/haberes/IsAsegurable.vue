<template>
    <span v-if="haber.es_imponible == '1'">
        <v-chip text-color="white" color="success" class="text-capitalize" small
            >Si</v-chip
        >
    </span>
    <span v-else>
        <v-chip text-color="white" color="info" class="text-capitalize" small
            >No</v-chip
        >
    </span>
</template>

<script>
export default {
    props: ["haber"]
};
</script>
