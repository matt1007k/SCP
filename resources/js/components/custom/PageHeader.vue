<template>
    <v-layout class="mb-3">
        <v-flex xs12>
            <div class="py-10 px-6 rounded-xl header-page bg-header">
                <div class="d-flex flex-column">
                    <div class="display-2 font-weight-bold text-white">
                        {{ title }}
                    </div>
                    <div class="text-white body-1 mb-5">
                        {{ subtitle }}
                    </div>
                    <slot name="action" />
                </div>
                <div class="header-img">
                    <img :src="img" :alt="title" />
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ["title", "subtitle", "img"]
};
</script>
