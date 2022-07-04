<template>
    <td v-if="roles.length > 0">
        <v-chip
            v-for="(rol, index) in roles"
            :key="index"
            text-color="white"
            color="info"
            class="text-capitalize"
            small
            >
            {{ rol.name }}
        </v-chip>
    </td>
    <td class="text-xs-center" v-else>N/A</td>
</template>

<script>
export default {
    props: {
        roles: {
            type: Array,
            required: true
        }
    }
}
</script>