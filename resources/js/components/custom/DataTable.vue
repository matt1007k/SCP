<template>
    <div style="overflow: auto;">
        <table class="table">
            <thead
                :class="
                    `${$vuetify.theme.dark ? 'secondary' : 'grey lighten-4'}`
                "
            >
                <tr>
                    <td v-for="(header, i) in headers" :key="i">
                        {{ header.text }}
                    </td>
                </tr>
            </thead>
            <tbody>
                <slot name="body"></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        headers: {
            type: Array,
            required: true
        }
    }
};
</script>
