<style lang="less" scoped>

</style>

<template>
  <div class="musicList">

    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <div class="musicItem" v-for="(item,index) in musicList" :key="index">
        <a :href="item.videoUrl">
          <img :src="comPath.imgPath+item.pathImage" alt="">
          <!--<div class="play">
            <div class="left">
              <div class="jiao"></div>
            </div>
            <div class="right">03:09</div>
            &lt;!&ndash;<div class="right">{{item.time}}</div>&ndash;&gt;
          </div>-->
          <p>{{item.videoName}}</p>
        </a>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {Toast, Cell} from 'vant';
  export default {
    name: "tab-music",
    components: {
      [Toast.name]: Toast,
      [Cell.name]: Cell
    },
    data() {
      return {
        musicList: [],
        loading: false,
        finished: false,
        list:[],
        flag:true,
        comPath: PublicPath,
        param: {
          pageNo: 1,
          pageSize: 20,
          videoShow:1,
          videoType:0
        }
      }
    },
    methods: {
      onLoad() {
        let that = this
        // let url = '/static/music.json'
        // Ajax.get(url)
        Ajax.post('target/video/videoList', that.param)
          .then(function (response) {
            let res = response.data;
            if (res.datas.length !== []) {
              that.musicList = that.musicList.concat(res.datas)
              that.loading = false;
              that.param.pageNo++
              if (res.datas.length < that.param.pageSize) {
                that.finished = true;
              }
            } else {
              Toast('数据为空')
            }
          })
          .catch(function (error) {
            console.log(error)
            // Toast('加载失败error')
          });
      }
    }
  }
</script>
