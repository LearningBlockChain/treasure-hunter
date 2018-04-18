<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style>
.container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
body {
    font-family: 'Do Hyeon', sans-serif;
}
</style>
