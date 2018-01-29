<template>
  <scroll class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
          @scrollToEnd="searchMore"
          ref="suggest" >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，没找到相关信息"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {search} from "../../api/search"
  import {ERR_OK} from '../../api/config'
  import {filterSinger} from "common/js/song"
  import Scroll from "base/scroll/scroll"
  import Loading from "base/loading/loading"
  import Singer from "common/js/singer"
  import {mapMutations} from "vuex"
  import {createSong} from "common/js/song"
  import NoResult from "base/no-result/no-result"
  import {mapActions} from "vuex"
  const TYPE_SINGER = "singer";
  const PERPAGE = 20
  export default {
    name: 'suggest',
    props: {
      query: {
        type: String,
        default: ""
      },
      showSinger: {
        type: Boolean,
        default: true,
      },

      pullup: {
        type: Boolean,
        default: true,
      }
    },
    data () {
      return {
        result: [],
        page: 1,
        hasMore: true,
        beforeScroll:true
      }
    },
    watch: {
      query(){
        this.search();
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    },
    methods: {
      search(){
        this.page = 1;
        this.$refs.suggest.scrollTo(0, 0);
        this.hasMore = true;
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data);

            //检查是否还有数据
            this._checkMore(res.data);
          }
        })
      },
      searchMore(){
        if (!this.hasMore) {
          return;
        }
        this.page++;
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data));
            this._checkMore(res.data);
          }
        })

      },
      _checkMore(data){
        const song = data.song;
        if (!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum) {
          this.hasMore = false;
        }
      },
      _genResult(data){
        let ret = [];
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list));
        }
        return ret
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach((musicDate) => {
          if (musicDate.songid && musicDate.albummid) {
            ret.push(createSong(musicDate))
          }
        })
        return ret;
      },
      getIconClass(item){
        if (item.type === TYPE_SINGER) {
          return "icon-mine"
        }
        else {
          return "icon-music"
        }
      },
      getDisplayName(item){
        if (item.type === TYPE_SINGER) {
          return item.singername;
        }
        else {
          return `${item.name}=${item.singer}`
        }
      },
      selectItem(item){
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername,
          });
          this.$router.push({
            path: `/search/${singer.id}`
          });
          this.setSinger(singer);
        }
        else {
          this.insertSong(item);
        }

        this.$emit("select")
      },
      listScroll(){
          this.$emit("listScroll");
      },
      ...mapMutations({
        setSinger: "SET_SINGER"
      }),
      ...mapActions([
        "insertSong"
      ])

    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)

</style>
