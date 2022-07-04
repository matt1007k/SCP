<template>
    <v-card-title wrap>
        <v-flex xs11>
            <span class="h6 font-weight-bold">{{ title }}</span>
        </v-flex>
        <v-flex xs1 class="d-flex justify-end">
            <slot name="close" />
        </v-flex>
    </v-card-title>
</template>

<script>
export default {
    props: ["title"]
};
</script>
