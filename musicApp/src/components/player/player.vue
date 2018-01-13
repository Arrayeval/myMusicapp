<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="leaveEnter"
    >
      <!---正常的播放器-->
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img alt="bg" width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdCls">
                <img src="" alt="" class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange">

              </progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disabledCls">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disabledCls">
              <i :class="playIcon" @click="toggle_playing"></i>
            </div>
            <div class="icon i-right" :class="disabledCls">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>

      </div>
    </transition>

    <transition name="mini">
      <!--缩放后的播放器-->
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img alt="" width="40" height="40" :src="currentSong.image" :class="cdCls">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :radius="32" :percent="percent">
            <i :class="miniIcon" class="icon-mini" @click.stop.prevent="toggle_playing"></i>
          </progress-circle>
        </div>

        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <transition name="errMsg">
      <div class="err-msg" v-show="showErrorMessage">
        网络错误，版权信息
      </div>
    </transition>


    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  import animations from "create-keyframe-animation"

  import {prefixStyle} from 'common/js/dom'

  import ProgressBar from "base/progress-bar/progress-bar"

  import ProgressCircle from "base/progress-circle/progress-circle"

  import playMode from "common/js/config"

  import {shuffle} from "common/js/util"

  const transform = prefixStyle('transform');

  export default {
//    name: '',
    data () {
      return {
        songReady: false,//歌曲状态
        showErrorMessage: false,
        currentTime: 0,

      }
    },

    computed: {
      //用于图标的切换
      playIcon(){
        return this.playing ? "icon-pause" : "icon-play"
      },
      iconMode(){
        console.log(playMode)
        return this.mode === playMode.sequence ? "icon-sequence" : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      miniIcon(){
        return this.playing ? "icon-pause-mini" : "icon-play-mini"
      },
      cdCls(){
        return this.playing ? "play" : "play pause"
      },

      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList'
      ]),

      disabledCls(){
        return this.songReady ? '' : 'disabled'
      },
      percent(){
        return this.currentTime / this.currentSong.duration
      }

    },
    methods: {
      back(){
        this.setFullScreen(false)
        this.showErrorMessage = false
      },
      open(){
        this.setFullScreen(true)
        this.showErrorMessage = false
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayMode: 'SET_PLAY_MODE',
        setPlayList: 'SET_PLAYLIST'
      }),

      /*创建动画*/
      enter(el, done){
        const {x, y, scale} = this._getPosAndScale();
        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0，0，0 scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0 scale(1)`
          },
        };

        animations.registerAnimation({
          name: 'move',
          animation: animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }

        });
        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      afterEnter(){
        animations.unregisterAnimation('move');
        this.$refs.cdWrapper.style.animation = '';
      },
      leave(el, done){
        this.$refs.cdWrapper.style.transition = 'all 0.4s'
        const {x, y, scale} = this._getPosAndScale();
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },
      leaveEnter(){
        this.$refs.cdWrapper.style.transition = '';
        this.$refs.cdWrapper.style[transform] = ''
      },

      /*获取图片的位置信息*/
      _getPosAndScale(){
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerHeight * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = (window.innerHeight - paddingTop - width / 2 - paddingTop)
        return {
          x,
          y,
          scale,
        }

      },

      //播放状态
      changeMode(){
        const mode = (this.mode + 1) % 3;
        this.setPlayMode(mode);
        //更该变播放列表
        let list = null;
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList)
        }
        else {
          list = this.sequenceList;
        }
        this.resetCurrentIndex(list);
        this.setPlayList(list);
      },

      //暂停（播放）
      toggle_playing(tag){
        if (tag === false) {
          this.setPlayingState(tag);
          return
        }
        this.setPlayingState(!this.playing)
      },

      //歌曲播放完了
      end(){
          if(this.mode ===playMode.loop){
              this.loop();
          }
          else{
            this.next();
          }
      },

      //loop循环播放
      loop(){
          this.$refs.audio.currentTime = 0;
          this.$refs.audio.play();
      },

      //下一首
      next(){
        if (!this.songReady) {//歌曲资源未加载完毕禁止点击
          return
        }
        let index = this.currentIndex + 1;
        if (index === this.playList.length) {

          index = 0
        }
        this.setCurrentIndex(index)//改变索引值
        if (!this.playing) {
          this.toggle_playing()
        }
        this.songReady = true;
      },
      //前一首
      prev(){
        if (!this.songReady) {//歌曲资源未加载完毕禁止点击
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)//改变状态 if(!this.playing)
        if (!this.playing) {
          this.toggle_playing()
        }
        this.songReady = true;

      },
      //表明资源加载完毕
      ready(){
        this.songReady = true;
        this.showErrorMessage = false
      },
      error(){//当歌曲加载失败
        this.songReady = true;//可以点击，
        this.toggle_playing(false);//设置歌曲不播放
        //显示错误提示，“歌曲无法获取，网络或者版权问题”
        this.showErrorMessage = true;
      },
      format(interval){
        interval = interval | 0;
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },

      onProgressBarChange(percent){
        this.$refs.audio.currentTime = this.currentSong.duration * percent
        if (!this.playing) {//播放
          this.toggle_playing()
        }
      },
      //找到当前的歌曲索引
      resetCurrentIndex(list, song){
        let index = list.findIndex((item) => {
          return item.id === this.currentSong.id;
        });
        this.setCurrentIndex(index);
      },

      _pad(num, n = 2){
        let len = num.toString().length;
        while (len < 2) {
          num = "0" + num;
          len++
        }
        return num;
      },
      //设置播放时间
      updateTime(e){
        this.currentTime = e.target.currentTime
      }

    },

    watch: {
      currentSong(newSong, oldSong){
        if (newSong.id === oldSong.id) {
          return
        }
        this.$nextTick(() => {
          this.$refs.audio.play();
        })
      },
      //监听状态（播放，暂停）
      playing(newPlaying){
        this.$nextTick(() => {
          const audio = this.$refs.audio;
          newPlaying ? audio.play() : audio.pause();
        });

      }
    },
    components: {
      ProgressBar,
      ProgressCircle
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

    .err-msg
      width: 200px
      height: 150px
      line-height 150px
      position fixed
      top 50%
      left 50%
      margin-left -100px
      margin-top -75px
      background rgba(158, 158, 154, 0.6)
      border-radius 20px
      z-index 300
      text-align center
      color #d9d9c8
      &.errMsg-enter-active, &.errMsg-leave-active
        transition: all 0.4s
      &.errMsg-enter, &.errMsg-leave-to
        opacity: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
