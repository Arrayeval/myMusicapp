<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <my-header></my-header>
    <tab> </tab>
    <router-view></router-view>
  </div>
</template>


<script>
import myHeader from './components/header/myheader.vue'
import Tab from './components/tab/tab'
export default {
  name: 'app',
  components:{
    myHeader,
    Tab
  }
}
</script>

<style>


</style>
