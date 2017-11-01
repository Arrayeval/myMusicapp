<template>
  <div class="">

    recommend
  </div>
</template>

<script type="text/ecmascript-6">

  import {getRecommend} from '../../api/recommend'
  import { ERR_OK } from '../../api/config'

  export default {
    name: ' ',
    created(){
      this._getRecommend();
    },
    methods:{
      _getRecommend(){
          getRecommend().then((res)=>{
              if(res.code===ERR_OK){
                  console.log(res.data.slider);
              }
          });
      }
    },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
