<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>


    <div ref="shortCutWrapper" v-show="!query" class="shortcut-wrapper">
      <scroll class="shortcut" :data="shortcut" ref="shortCut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul v-show="hotkey.length>0">
              <li class="item" v-for="item in hotkey" @click="addQuery(item.k)">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <!--@click="deleteAll"-->
              <span class="clear" @click="showConfirm">
             <i class="icon-clear"></i>
           </span>
            </h1>
            <search-list @select="addQuery" @delete="deleteOne" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>


    <div ref="searchResult" v-show="query" class="search-result">
      <suggest  :query="query" @listScroll="blurInput" @select="saveSearch"  ref="suggestList"></suggest>
    </div>
    <confirm ref="confirm" title="确定清空搜索信息吗？" cancelBtnMsg="取消" sureBtnMsg="确定" @confirm="clearSearchHistory"></confirm>
    <router-view>

    </router-view>
  </div>

</template>

<script type="text/ecmascript-6">
  import SearchBox from "base/search-box/search-box"
  import {getHotKey} from "../../api/search"
  import {ERR_OK} from "../../api/config"
  import Suggest from "components/suggest/suggest"
  import SearchList from "base/search-list/search-list"
  import Confirm from "base/confirm/confirm"
  import Scroll from "base/scroll/scroll"
  import {playListMixin} from "common/js/mixin"
  import {mapActions} from "vuex"
  import {mapGetters} from "vuex"
  export default {
    // name: ' ',
    mixins:[playListMixin],
    data () {
      return {
        hotkey: [],
        query: ""
      }
    },
    computed: {
      shortcut(){
        return this.hotkey.concat(this.searchHistory);
      },
      ...mapGetters([
        "searchHistory"
      ])
    },
    created(){
      this._getHotKey()
    },
    methods: {
      _getHotKey(){
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotkey = res.data.hotkey.slice(0, 10);
          }
        })
      },
      addQuery(query){
        this.$refs.searchBox.setQuery(query);
      },
      onQueryChange(query){
        this.query = query
      },
      blurInput(){
        this.$refs.searchBox.blur()
      },
      saveSearch(){
        this.saveSearchHistory(this.query)
      },
      deleteOne(item){
        this.deleteSearchHistory(item);
      },
      deleteAll(){
        this.clearSearchHistory();
      },
      showConfirm(){
        this.$refs.confirm.show();
      },
      handelPlayList(playlist){
          const bottom  =playlist.length>0? "60px":"";
          this.$refs.shortCutWrapper.style.bottom=bottom;
          this.$refs.searchResult.style.bottom=bottom;

          this.$refs.shortCut.refresh();
          this.$refs.suggestList.refresh();

      },
      ...mapActions([
        'saveSearchHistory',
        "deleteSearchHistory",
        "clearSearchHistory"
      ])

    },
    watch: {
      query(newQuery){
         if(!newQuery){
             setTimeout(()=>{
                 this.$refs.shortCut.refresh()
             },20)
         }
      }
    },
    components: {
      SearchBox,
      Suggest, SearchList, Confirm, Scroll
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .search
    padding 0 10px
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      left 0
      right 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0


</style>
