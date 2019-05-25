<template>
  <transition>
    <router-view :key="$route.fullPath"/>
  </transition>
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