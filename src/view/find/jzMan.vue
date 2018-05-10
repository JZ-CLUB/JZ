<style lang="less" scoped>
  @import "../../common/common";

  #jzMan {
    .poSt {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      background: #000000;
      img {
        width: 100%;
      }
      .sort {
        height: 0.68rem;
        line-height: 0.68rem;
        text-align: right;
        padding: 0 0.34rem;
        position: relative;
        > span {
          cursor: pointer;
          display: inline-block;
          font-size: 0.28rem;
          margin-left: 0.3rem;
          i {
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.1rem;
            width: 0.28rem;
            height: 0.28rem;
            background: url("../../images/sortUp.png") no-repeat center center;
            background-size: cover;
          }
          &:last-child {
            i {
              background-image: url("../../images/select.png");
            }
          }
        }
        > div {
          position: absolute;
          top: 0.68rem;
          right: 0;
          height: 8.48rem;
          background: rgba(0, 0, 0, 0.5);
          div{
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;
            padding: 0.19rem;
            background: #000000;
          }
          p {
            width: 1.68rem;
            text-align: center;
            height: 0.5rem;
            line-height: 0.5rem;
            border: 0.02rem solid #828282;
            color: #828282;
            font-size: 0.28rem;
            margin: 0.1rem 0.05rem;
            &.cur {
              background: #e9d08e;
              color: #1a1a1a;
              border: 0.02rem solid #e9d08e;
            }
          }
        }
      }
    }
    .list {
      ol {
        li {
          padding: 0 0.3rem;
          &:nth-child(odd) {
            background: #2c2c2c;
          }
          a {
            display: block;
            padding: 0.3rem 0rem 0.3rem 2.4rem;
            color: @white;
            position: relative;
            &:visited {
              color: @yellow;
            }
            p {
              &.title {
                font-size: 0.28rem;
                line-height: 0.35rem;
                height: 0.7rem;
                word-break: break-all;
                /*text-overflow: ellipsis;*/
                display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                -webkit-line-clamp: 2; /** 显示的行数 **/
                overflow: hidden; /** 隐藏超出的内容 **/
              }
              &.timeLong {
                margin-top: 0.1rem;
                font-size: 0.2rem;
                line-height: 0.2rem;
                color: #B1ADA4;
                i {
                  width: 0.2rem;
                  height: 0.2rem;
                  margin-right: 0.1rem;
                  display: inline-block;
                  /*vertical-align: middle;*/
                  background: url("../../images/time.png") center center;
                  background-size: cover;
                }
              }
            }
            img {
              position: absolute;
              left: 0;
              top: 0.11rem;
              width: 1.38rem;
              height: 1.38rem;
            }
            span {
              position: absolute;
              vertical-align: middle;
              top: 50%;
              transform: translateY(-50%);
              &.num {
                left: 1.5rem;
                width: 0.7rem;
                text-align: center;
              }
              /*&.play {
                width: 0.5rem;
                height: 0.5rem;
                display: block;
                right: 0;
                background: url("../../images/play.png");
                background-size: cover;
              }*/
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div id="jzMan">
    <div class="poSt">
      <img src="../../images/clubBg.jpg" alt="">
      <div class="sort">
        <span @click="sort"><i></i>{{sortStr}}</span>
        <span @click="show=!show"><i></i>选集</span>
        <div v-if="show" @click="show = false">
          <div>
            <p
              v-for="(item,index) in recordCount"
              @click="selectWorks(index)" :class="{cur:act === index}">
              {{index*20+1}}~{{index*20+20}}
            </p>
            <p @click="selectWorks(recordCount)">
              {{recordCount*20+1}}~{{recordCount*20+floor}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!all" class="jzListBox">
      <div style="height: 4.96rem;"></div>
      <div class="list">
        <ol>
          <li v-for="(item,index) in list">
            <a :href="item.musicUrlId">
              <img :src="item.pathImage" alt="">
              <span class="num" v-if="param.flag === 1">{{(index+1)+param.pageNo*20}}</span>
              <span class="num" v-if="param.flag === 2">{{(20-index)+param.pageNo*20}}</span>
              <p class="title">{{item.musicName}}</p>
              <p class="timeLong"><i></i>03:09</p>
              <span class="play"></span>
            </a>
          </li>
        </ol>
      </div>
    </div>

    <scroller v-if="all" :on-infinite="refresh" :on-triggerPullToRefresh="aa" ref="my_scroller" class="jzListBox">
      <div style="height: 4.96rem;"></div>
      <div class="list">
        <ol>
          <li v-for="(item,index) in items">
            <a :href="item.musicUrlId">
              <img :src="item.pathImage" alt="">
              <span class="num">{{index+1}}</span>
              <p class="title">{{item.musicName}}</p>
              <p class="timeLong"><i></i>03:09</p>
              <span class="play"></span>
            </a>
          </li>
        </ol>
      </div>
    </scroller>
  </div>
</template>

<script>
  import {
    Toast
  } from 'vant';

  export default {
    name: "jz-man",
    data() {
      return {
        imageURL: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        comPath: PublicPath,
        items: [],
        list: [],
        flag: true,
        sortStr: '正序',
        show: false,
        aa: false,
        recordCount: 0,
        all: true,
        act: -1,
        scrollFlag: true,
        floor: 0,
        param: {
          pageNo: 0,
          pageSize: 20,
          musicShow: 1,
          flag: 1
        }
      }
    },
    methods: {
      refresh(done) {
        let that = this
        that.param.pageNo++
        if (!that.flag) {
          setTimeout(() => {
            done(true)
          }, 300)
          return;
        }
        if (that.flag) {
          Ajax.post('target/extemal/music/musicList', that.param)
            .then(function (response) {
              let res = response.data;
              if (res.datas.length !== []) {
                that.recordCount = Math.floor(res.recordCount / 20)
                that.floor = res.recordCount % 20
                that.items = that.items.concat(res.datas)
                if (res.datas.length < that.param.pageSize) {
                  that.flag = false
                }
                setTimeout(() => {
                  done()
                }, 300)
                Toast.clear()
              } else {
                Toast('数据为空')
                setTimeout(() => {
                  done(true)
                }, 0)
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        }
      },
      selectWorks(i) {
        let that = this
        if (that.act === i) {
          that.show = false
          that.all = true
          that.act = -1
          this.items = []
          that.param.pageNo = 0
        } else {
          that.all = that.show = false
          that.act = i
          that.param.pageNo = i
          that.tab()
        }
      },
      tab() {
        let that = this
        Ajax.post('target/extemal/music/musicList', that.param)
          .then(function (response) {
            let res = response.data;
            if (res.datas.length !== []) {
              that.list = res.datas
              that.scrollFlag = false
              Toast.clear()
            } else {
              Toast('数据为空')
            }
          })
          .catch(function (error) {
            console.log(error)
          });

      },
      sort() {
        if (this.all) {
          this.items = []
          this.param.pageNo = 0
        } else {
          this.list = this.list.reverse()
        }
        this.flag = true
        if (this.sortStr === '倒序') {
          this.sortStr = '正序'
          this.param.flag = 1
        } else {
          this.sortStr = '倒序'
          this.param.flag = 2
        }
        this.aa = true
      }
    }
  }
</script>
