<style lang="less">
  #findDif {
    .poSt {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      background: #0E0E0E;
      img{
        width: 100%;
      }
      .tab{
        height: 0.94rem;
        background: #0E0E0E;
        &-links {
          position: relative;
          z-index: 22222;
          font-size: 12px;
          text-align: center;
          background: url("../../images/titleBg.jpg");
          background-size: cover;
          height: 0.9rem;
          padding: 0 0.4rem;

          .van-icon {
            display: block;
            font-size: 24px;
          }
          .tabItem{
            height: 100%;
            line-height: 0.9rem;
            color: #666666;
            font-size: 0.32rem;
            &.van-col-8{
              margin: 0 4.16667%;
            }
            .cur{
              color: #ffffff;
              border-bottom: 0.04rem solid #BE2C36;

            }
          }
        }
      }
    }
    .musicList {
      .musicItem {
        position: relative;
        background: #dddddd;
        margin-top: 0.2rem;
        a{
          color: #F0C37A;
        }
        img {
          display: block;
          margin: 0 auto;
          width: 7.5rem;
          height: 3.3rem;
        }
        p {
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          text-overflow:ellipsis; white-space:nowrap; overflow:hidden;
          font-size: 0.28rem;
          background: rgba(0, 0, 0, 0.6);
          color: #ffffff;
          padding: 0 0.3rem;
          position: absolute;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          span:first-child{
            width: 6rem;
            text-overflow:ellipsis; white-space:nowrap; overflow:hidden;
          }
          span:last-child{
            font-size: 0.24rem;
          }
        }
        .play {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1.09rem;
          height: 1.09rem;
          background: url("../../images/playIcon.png") no-repeat center center;
          -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          background-size: cover;
        }
      }
    }

  }
</style>

<template>
  <div id="findDif">
    <div class="poSt">
      <img src="../../images/clubBg.jpg" alt="">
      <div class="tab">
        <van-row class="tab-links">
          <van-col class="tabItem" span="2"> </van-col>
          <van-col class="tabItem" span="8" v-for="(item,index) in tabList" :key="index">
            <div @click="tabFun(index,item.comp)" :class="{cur:activity===index}">
              <!--<van-icon :name="item.icon" />-->
              {{item.name}}
            </div>
          </van-col>
          <van-col class="tabItem" span="2"> </van-col>
        </van-row>
      </div>
    </div>
    <div class="">
      <div style="height: 4.96rem;"></div>
      <keep-alive>
        <div :is="currentTab"></div>
      </keep-alive>
    </div>

  </div>
</template>

<script>
  import {
    Toast,Cell,Row, Col, Icon
  } from 'vant';
  import TabMusic from '@/view/find/subCom/tabMusic'
  import TabOther from '@/view/find/subCom/tabOther'

  export default {
    name: "jz-man",
    components: {
      [Toast.name]: Toast,
      [Cell.name]: Cell,
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon,
      TabMusic,TabOther
    },
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        currentTab:'tabMusic',
        imageURL:'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        tabList:[
          {icon:'',name:'音乐节',comp:'tabMusic'},
          {icon:'',name:'其它',comp:'tabOther'}
        ],
        activity:0
      }
    },
    methods: {
      tabFun(i,e) {
        this.activity = i
        this.currentTab = e;  // tab 为当前触发标签页的组件名
      }
    }
  }
</script>
