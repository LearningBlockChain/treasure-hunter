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
  body {
      font-family: 'Do Hyeon', sans-serif;
  }
  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  .put-right {
    float: right;
  }
</style>
