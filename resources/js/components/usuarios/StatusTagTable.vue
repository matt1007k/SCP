<template>
    <td v-if="user.estado === 'activo'">
        <v-chip
            text-color="white"
            color="success"
            class="text-capitalize"
            small
            >{{ user.estado }}</v-chip
        >
    </td>
    <td v-else>
        <v-chip
            text-color="white"
            color="error"
            class="text-capitalize"
            small
            >{{ user.estado }}</v-chip
        >
    </td>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>