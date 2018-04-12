<style lang="less" scoped>
.club{
  .ban{
    height: 3.3rem;
    position: relative;
    margin-bottom: 0.1rem;
    >div{
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      padding: 0 0.3rem 0 1.5rem;
      position: absolute;
      bottom: 0;
      left: 0;
      font-size:0.28rem;
      background: -webkit-linear-gradient(left, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* 标准的语法（必须放在最后） */
      .calender{
        position: absolute;
        left: 0;
        color: #252627;
        padding: 0.2rem 0;
        font-size: 0.18rem;
        font-weight: 500;
        p{
          line-height: 0.3rem;
          padding-left: 0.25rem;
          &:nth-child(2){
            padding-left: 0.65rem;
          }
        }
        .line{
          position: absolute;
          top: 0.15rem;
          right: 0.45rem;
          width: 0.02rem;
          height: 0.65rem;
          background: #2e2d2b;
          transform:rotate(45deg);
          -o-transform:rotate(45deg);
          -moz-transform:rotate(45deg);
          -webkit-transform:rotate(45deg);
        }
      }
    }
  }
  .title{
    display: flex;
    justify-content: space-between;
    height: 0.76rem;
    line-height: 0.76rem;
    padding: 0 0.3rem;
    border-bottom: 0.01rem solid #F0C37A;
    p{
      font-size: 0.28rem;
      span{
        font-size: 0.18rem;
      }
    }
  }
  .list{
    padding: 0 0.1rem;
    .card{
      height: 1.6rem;
      margin-top: 0.1rem;
      background: #252627;
      display: flex;
      justify-content: left;
      border-radius: 0.05rem;
      >div{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .left{
        width: 1.2rem;
        border-top-left-radius: 0.05rem;
        border-bottom-left-bottom-radius: 0.05rem;
        background: #f0c37a;
        p{
          text-align: center;
          color: #252627;
          font-size: 0.36rem;
          &:first-child{
            font-family: 'MicrosoftYaHei-Bold';
            font-size: 0.3rem;
            font-weight: bold;
          }
          span{
            font-size: 0.2rem;
          }
        }
      }
      .con{
        width: 6.0rem;
        padding: 0.2rem;
        p{
          font-size: 0.24rem;
          color: #F0C37A;
          height: 0.4rem;
          line-height: 0.4rem;
          text-overflow:ellipsis;
          white-space:nowrap;
          overflow:hidden;
          &:before{
            content: '';
            display: inline-block;
            vertical-align: middle;
            color: #DA0202;
            width: 0.08rem;
            height: 0.08rem;
            background: #DA0202;
            border-radius: 0.08rem;
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="club">
    <div class="ban">
      <img src="../images/ban.jpg" alt="">
      <div>
        <div class="calender">
          <p>12日</p>
          <p>03月</p>
          <div class="line"></div>
        </div>
        RETURN TO MONGOLIA 回到蒙古
      </div>
    </div>

    <div class="title">
      <p>推荐演出</p>
      <p>08<span>月</span>05<span>日</span> — 08<span>月</span>05<span>日</span></p>
    </div>

    <div class="list">
      <div class="card">
        <div class="left">
          <p>Aug.</p>
          <p>05<span>日</span></p>
        </div>
        <div class="con">
          <p>王若琳音乐会</p>
          <p>RETURN TO MONGOLIA 回到蒙古 MON RETURN TO MONGOLIA 回到蒙古 MON </p>
          <p>王若琳音乐会</p>
        </div>
      </div>

      <div class="card">
        <div class="left">
          <p>Aug.</p>
          <p>05<span>日</span></p>
        </div>
        <div class="con">
          <p>王若琳音乐会</p>
          <p>RETURN TO MONGOLIA 回到蒙古 MON RETURN TO MONGOLIA 回到蒙古 MON </p>
          <p>王若琳音乐会</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {sig, UrlSearch} from '../common/weixin'
  import {Toast, Icon, Cell, CellGroup} from 'vant';

  export default {
    name: "club",
    components: {
      [Toast.name]: Toast,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    data() {
      return {

      }
    },
    created() {

    },
    computed: {},
    beforeMount:function () {

    },
    mounted() {

    },
    methods: {

    }
  }
</script>

