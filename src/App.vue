<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
  @font-face
  {
    font-family: myFirstFont;
    src: url('font/dongqing.otf')
  }
  html{
    height: 100%;
  }
  body {
    margin:0 auto;
    height: 100%;
  font-family:myFirstFont;
  /*font-family:'微软雅黑';*/
  font-size: 16px;
  color:#f0c37a;
  background-color: #000000;
  -webkit-font-smoothing: antialiased;
}
  #app{
    height: 100%;
  }
</style>
