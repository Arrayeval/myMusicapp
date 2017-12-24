<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <my-header></my-header>
    <tab> </tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!---播放器--->
    <player></player>
  </div>
</template>


<script>
import myHeader from './components/header/myheader.vue'
import Tab from './components/tab/tab'


import Player from './components/player/player'
export default {
  name: 'app',
  components:{
    myHeader,
    Tab,
    Player
  }
}
</script>

<style>


</style>
