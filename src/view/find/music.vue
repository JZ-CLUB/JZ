<template>
  <div id="music" v-show="musicshow">


    <div class='jAudio--player'>

      <audio autoplay></audio>

      <div class='jAudio--ui'>

        <div class='jAudio--thumb'></div>

        <div class='jAudio--status-bar'>

          <div class='jAudio--details'></div>
          <div class='jAudio--volume-bar'></div>

          <div class='jAudio--progress-bar'>
            <div class='jAudio--progress-bar-wrapper'>
              <div class='jAudio--progress-bar-played'>
                <span class='jAudio--progress-bar-pointer'></span>
              </div>
            </div>
          </div>

          <div class='jAudio--time'>
            <span class='jAudio--time-elapsed'>00:00</span>
            <span class='jAudio--time-total'>00:00</span>
          </div>

        </div>

      </div>


      <div class='jAudio--playlist'>
      </div>

      <div class='jAudio--controls'>
        <ul>
          <li><button class='btn' data-action='prev' id='btn-prev'><span></span></button></li>
          <li><button class='btn' data-action='play' id='btn-play'><span></span></button></li>
          <li><button class='btn' data-action='next' id='btn-next'><span></span></button></li>
        </ul>
      </div>

    </div>


  </div>

</template>
<script>

  import "./mod/js/jaudio"
  import Vue from 'vue'
  import {
    Toast
  } from 'vant';



  export default {
    components: {
      [Toast.name]: Toast
    },
    name: "music",
    created: function() {
      this.send(this)
    },
    data() {
      return {
        musicshow:false,
        comPath: PublicPath,
        t:{
          playlist:[
            {
              file: "./mod/tracks/jq22com1.mp3",
              thumb: "./mod/thumbs/01.jpg",
              trackName: "Dusk",
              trackArtist: "Tobu & Syndec",
              trackAlbum: "Single",
            },
            {
              file: "./mod/tracks/jq22com2.mp3",
              thumb: "thumbs/02.jpg",
              trackName: "Blank",
              trackArtist: "Disfigure",
              trackAlbum: "Single",
            },
            {
              file: "./mod/tracks/jq22com3.mp3",
              thumb: "./mod/thumbs/03.jpg",
              trackName: "Fade",
              trackArtist: "Alan Walker",
              trackAlbum: "Single",
            }
          ],
          autoPlay:true
        }

        }


      },
    methods:{
      send:function (e) {
        Toast.loading({ mask: true,duration:0 });
        Ajax.post('target/music/musicList', {
          musicShow: "1"
        })
          .then(function (response) {
            //console.log(response.data.playlist);
            e.musicshow = true;
            e.t.playlist = response.data.playlist;
            //console.log(e.t.playlist)"http://47.104.183.132"+
            for (let i in e.t.playlist){
              e.t.playlist[i].file = e.comPath.imgPath+e.t.playlist[i].file;
              //e.t.playlist[i].file = "http://audio.xmcdn.com/group18/M01/21/30/wKgJJVeF0OXTd52JACbG6HVeP8k020.m4a"
              e.t.playlist[i].thumb = e.comPath.imgPath+e.t.playlist[i].thumb;
              e.t.playlist[i].trackArtist = e.t.playlist[i].musicTime;
              console.log(e.comPath.imgPath+e.t.playlist[i])
            }
            $(".jAudio--player").jAudio(e.t);
            Toast.clear();
          })
          .catch(function (error) {
            Toast('加载失败');
            console.log(error);
          });
      }

    }

  }





</script>
<style>
  #music {
    padding: 0;
    margin: 0;
    font-weight: 300;
    box-sizing: border-box;
    font-family: "Open Sans";
    font-weight: 300;
    color: #888;
    outline: none;



  }


  .jAudio--player {
    display: table;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    /*margin: 30px auto;*/
    width: 100%;
  }
  /*.jAudio--player:after {
    content: " ";
    display: block;
    width: 100%;
    clear: both;
  }*/
  .jAudio--player .jAudio--ui {
    position: relative;
    width: 100%;
  }
  .jAudio--player .jAudio--status-bar {
    width: 100%;
    z-index: 1;
    position: relative;
    padding: 100px 0.5rem 0.1rem 0.5rem;
    display: table;
  }
  .jAudio--player .jAudio--status-bar:after {
    content: " ";
    display: block;
    width: 100%;
    clear: both;
  }
  .jAudio--player .jAudio--controls {
    width: 100%;
    display: table;
    background: #1A1A1A;
    position: fixed;
    bottom: 0;
    height: 1.2rem;
    filter:alpha(opacity:70);
    opacity:0.7;
    -moz-opacity:0.7;
    -khtml-opacity: 0.7;
    border-top: 1px solid #F0C37A ;
  }
  .jAudio--player .jAudio--controls:after {
    content: " ";
    display: block;
    width: 100%;
    clear: both;
  }
  .jAudio--player .jAudio--controls ul {
    display: table;
    overflow: hidden;
    width: 100%;
    padding-bottom: 5px;
    padding-top: 5px;
  }
  .jAudio--player .jAudio--controls ul:after {
    content: " ";
    display: block;
    width: 100%;
    clear: both;
  }
  .jAudio--player .jAudio--controls li {
    position: relative;
    width: 33.3333%;
    height: 1.2rem;
    line-height: 1.2rem;
    float: left;
  }
  .jAudio--player .jAudio--thumb {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
  }
  .jAudio--player .jAudio--time {
    display: table;
    width: 100%;
    color: #f0c37a;
  }
  .jAudio--player .jAudio--time:after {
    content: " ";
    display: block;
    width: 100%;
    clear: both;
  }
  .jAudio--player .jAudio--time * {
    width: 50%;
    display: block;
    float: left;
    color: #f0c37a;
    text-shadow: 0 1px 1px #000;
    font-size: 0.22rem;
    font-weight: bold;
  }
  .jAudio--player .jAudio--time .jAudio--time-elapsed {
    text-align: left;
  }
  .jAudio--player .jAudio--time .jAudio--time-total {
    text-align: right;
  }
  .jAudio--player .jAudio--details * {
    color: #ffffff;
    text-shadow: 0 1px 1px #000;
    font-size: 0.3rem;
  }
  .jAudio--player .jAudio--details *:first-of-type {
    font-weight: bold;
  }
  .jAudio--player .jAudio--details p {
    width: 100%;
  }
  .jAudio--player .jAudio--details p span {
    display: block;
    text-overflow:ellipsis; white-space:nowrap; overflow:hidden;
    font-size: 0.28rem;
  }
  .jAudio--player .jAudio--progress-bar {
    margin: 0.35rem 0;
  }
  .jAudio--player .jAudio--progress-bar .jAudio--progress-bar-wrapper {
    width: 100%;
    position: relative;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    /*border-radius: 10px;*/
    /*overflow: hidden;*/
  }
  .jAudio--player .jAudio--progress-bar .jAudio--progress-bar-played {
    height: 4px;
    background: #F0C37A;
    position: relative;
    border-radius: 10px;
  }
  .jAudio--player .jAudio--progress-bar .jAudio--progress-bar-pointer {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    background-color: #F0C37A;
    border: 4px solid #fff;
    margin-top: -3px;
  }
  .jAudio--player .jAudio--playlist {
    background: #1A1A1A;
  }
  .jAudio--player .jAudio--playlist:after{
    padding-bottom: 1.2rem;
    content: " ";
    display: block;
    width: 100%;
    clear: both;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-item {
    display: block;
    width: 100%;
    padding: 0.35rem 0.5rem;
    display: table;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-item:nth-of-type(2n){
    background: #2c2c2c;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-item:after {
    content: " ";
    display: block;
    width: 100%;
    clear: both;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-item.active {
    /*background: #f55c5c;
    border-bottom-color: #f55c5c;*/
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-item.active:before{
    content: " ";
    position: absolute;
    margin-left: -0.5rem;
    display: block;
    background-color: #E6211F;
    width: 3px;
    height: 38px;
    margin-top: 6px;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-item.active:after{
    content: " ";
    position: absolute;
    /* margin-left: -0.5rem; */
    display: block;
    background-color: #E6211F;
    width: 14px;
    height: 14px;
    right: 15px;
    margin-top: -32px;
    /*margin-top: 6px;*/
    background:url(mod/thumbs/y6x.png) center center no-repeat; background-size:cover;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-item.active * {
    color: #ffffff;
    font-size: 0.25rem;
  }
  /*.jAudio--player .jAudio--playlist .jAudio--playlist-item:not(.active):hover {*/
    /*background: #fafafa;*/
  /*}*/
  .jAudio--player .jAudio--playlist .jAudio--playlist-item:last-of-type {
    border: 0;
    margin-bottom: 0;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-thumb {
    float: left;
    margin-right: 0.15rem;
    display: table;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-thumb:after {
    content: " ";
    display: block;
    width: 100%;
    clear: both;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-thumb img {
    height: .9rem;
    width: .9rem;
    /*border-radius: 50%;*/
    float: left;
    margin-right: 0.12rem;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-meta-text h4 {
    font-size: 0.25rem;
    color: #ffffff;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-meta-text p {
    font-size: 0.2rem;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-meta-text p.timeLong {
    margin-top: 0.1rem;
    font-size: 0.2rem;
    line-height: 0.2rem;
    color: #65625d;
    font-weight: bold;
    font-family: 'myFirstFont';
  }

  .jAudio--player .jAudio--playlist .jAudio--playlist-meta-text p i {
    width: 0.2rem;
    height: 0.2rem;
    margin-right: 0.1rem;
    /*margin-left: 0.1rem;*/
    display: inline-block;
    /*vertical-align: middle;*/
    background: url("../../images/time.png") center center;
    background-size: cover;
  }


  .btn {
    position: relative;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border: 0;
  }
  .btn span {
    position: absolute;
    display: table;
    height: 15px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    overflow: hidden;
  }
  .btn span:before, .btn span:after {
    display: block;
    content: " ";
    height: 0;
    float: left;
    border-color: transparent;
    border-style: solid;
  }
  #btn-prev span{
    margin-left: 0.9rem;
  }
  #btn-next span{
    margin-left: -0.9rem;
  }
  .btn:active {
    /*background: #f5f5f5;*/
  }

  #btn-prev span:before, #btn-prev span:after, #btn-next span:before, #btn-next span:after, #btn-play span:before, #btn-play span:after {
    border-top: 7.5px solid transparent;
    border-bottom: 7.5px solid transparent;
  }

  #btn-prev span:before, #btn-prev span:after {
    border-right: 15px solid #ddd;
    border-left: 0;
  }
  #btn-prev:active span:before, #btn-prev:active span:after {
    border-right-color: #FF6666 !important;
  }

  #btn-next span:before, #btn-next span:after {
    border-left: 15px solid #ddd;
    border-right: 0;
  }
  #btn-next:active span:before, #btn-next:active span:after {
    border-left-color: #FF6666 !important;
  }

  #btn-play span:before {
    background:url(mod/thumbs/y4x.png) center center no-repeat; background-size:cover;
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
  }
  #btn-play span,#btn-pause span{
    width: 40px;
    height:40px;
  }
  #btn-prev span,#btn-next span{
     width: 30px;
     height:30px;
   }
  #btn-play span:after {
    display: none;
  }
  #btn-play:active span:before, #btn-play.active span:before {
    border-left-color: #FF6666 !important;
  }

  #btn-pause span:before{
    background:url(mod/thumbs/y5x.png) center center no-repeat; background-size:cover;
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
  }
  #btn-prev span:before{
    background:url(mod/thumbs/y2x.png) center center no-repeat; background-size:cover;
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
  }
  #btn-next span:before{
    background:url(mod/thumbs/y1x.png) center center no-repeat; background-size:cover;
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
  }
  #btn-pause span:before {
    margin-right: 5px;
  }
  #btn-pause span:active:before, #btn-pause span:active:after, #btn-pause span.active:before, #btn-pause span.active:after {

    margin-right: 5px;
  }

  .jAudio--player .jAudio--controls li button span:before, .jAudio--player .jAudio--controls li button span:after {
    -webkit-transition: border-color 0.3s ease 0s;
    transition: border-color 0.3s ease 0s;
  }
  .jAudio--player .jAudio--thumb {
    -webkit-transition: all 0.5s ease 0s;
    transition: all 0.5s ease 0s;
  }
  .jAudio--player .jAudio--progress-bar .jAudio--progress-bar-played {
    -webkit-transition: all 0.2s ease 0s;
    transition: all 0.2s ease 0s;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-item {
    -webkit-transition: all 0.5s ease 0s;
    transition: all 0.5s ease 0s;
  }
  .jAudio--player .jAudio--playlist .jAudio--playlist-item * {
    -webkit-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
  }

</style>
