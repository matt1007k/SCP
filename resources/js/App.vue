<template>
  <router-view :key="$route.path"></router-view>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>