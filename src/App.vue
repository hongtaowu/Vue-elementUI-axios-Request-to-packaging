<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'',
  mounted(){
    window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
        this.$router.push(currentPath)
      }
    }, false)
  }
}
</script>
