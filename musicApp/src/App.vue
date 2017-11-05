<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <my-header></my-header>
    <tab> </tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

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
