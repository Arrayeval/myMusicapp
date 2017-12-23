<template>
  <div class="singer">
    <list-view  @select="selectSinger" :data="singers" v-if="singers.length>0"></list-view>

    <router-view ></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList}  from '../../api/singer';
  import {ERR_OK} from '../../api/config';
  import Singer  from 'common/js/singer'

  import ListView from "base/listview/listview"

  import {mapMutations} from "vuex"

  const HOT_NAME = "热门推荐";
  const HOT_SINGER_LEN = 10;

  export default {
    name: ' ',
    data () {
      return {
        singers: {
          type: Array,
          default: []
        }
      }
    },
    created(){
      this._getSingerList();
    },
    methods: {
      selectSinger(singer){
          this.$router.push({
            path:`/singer/${singer.id}`
          });
          //vux(点击歌手，set state[状态])，所以如果我么直接在歌手详情页刷新是获取不到数据this.singer
          this.setSinger(singer)
      },

      _getSingerList(){
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.data.list);
            this.singers = res.data.list;
            this.singers = this._normalizeSinger(this.singers);
          //  console.log(this._normalizeSinger(this.singers));
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      _normalizeSinger (list) {
        let map = {
          hot: {//热门数据
            title: HOT_NAME,
            items: [],
          }
        };
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {//默认前十为“热门推荐”
            /*   map.hot.items.push({
             name:Fother_name,
             id: item.Fsinger_id,
             avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
             ////y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000
             });
             */
            map.hot.items.push(new Singer({
              name: item.Fother_name,
              id: item.Fsinger_id,
              mid: item.Fsinger_mid
            }));
          }
          const key = item.Findex;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            };
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_id,
            mid: item.Fsinger_mid
          }));

        });
        // console.log(map);
        //为了得到有序列表
        let hot = [];//非热门数据
        let ret = [];//热门数据
        for (let key in map) {
          let val = map[key];
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val);
          }
          else if (val.title === HOT_NAME) {
            hot.push(val);
          }
        }
        //排序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        return hot.concat(ret);
      },

      ...mapMutations({
        setSinger:'SET_SINGER'
      })
    },
    components: {
      ListView
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
