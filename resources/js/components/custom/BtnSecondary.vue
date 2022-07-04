<template >
    <v-btn
        class="rounded-lg"
        color="secondary"
        :class="
                `${
                    $vuetify.theme.dark
                        ? 'white--text'
                        : 'black--text'
                }`
            "
        @click="onClick()"
        v-bind="$attrs"
    > 
        <slot/>
    </v-btn>
</template>

<script>
    export default {
        props: {
            onClick: {
                type: Function,
                required: true, 
            }
        }
        
    }
</script>