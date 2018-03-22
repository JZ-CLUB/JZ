<template>
  <div class="checkcode" v-if="load">
    <div class="checkResult">
      <i class="s" v-if="flag"></i>
      <i class="f" v-if="!flag"></i>
      <p>{{tips}}</p>
      <p class="error">{{error}}</p>
    </div>

    <div class="itemInfo" v-if="flag">
      <h1 class="">{{dataInfo.goodsName}}</h1>
      <van-cell-group>
        <van-cell title="演出时间" :value="specInfo"/>
        <van-cell title="购买数量" :value="dataInfo.goodsNum"/>
        <van-cell class="price" title="总金额" :value="goodsPrice"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import {sig, UrlSearch} from '../common/weixin'
  import {Toast, Icon, Cell, CellGroup} from 'vant';

  export default {
    name: "checkcode",
    components: {
      [Toast.name]: Toast,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    data() {
      return {
        load: false,
        tips: '验票成功!',
        flag:true,
        error:'',
        dataInfo:'',
        specInfo:'',
        goodsPrice:0
      }
    },
    created() {

    },
    computed: {},
    beforeMount:function () {
      let vm = this
      sig(true).then(function () {
        vm.checkcode()
      })
    },
    mounted() {

    },
    methods: {
      checkcode() {
        let that = this
        Ajax.post('target/orderapi/checkticket', {
          openid: sessionStorage.getItem('openId'),
          ticket: UrlSearch('ticket'),
          sign: 'aaaaa'
        })
          .then(function (response) {
            that.load = true
            let res = response.data;
            if(res.result !=='1' ){
              that.flag = false
              that.error = res.msg
              that.tips = '验票失败!'
            }else{
              that.dataInfo = res.data[0]
              that.specInfo = res.data[0].specInfo.split(';')[0].split(':')[1]
              that.goodsPrice = '¥'+res.data[0].goodsPrice
              that.flag = true
              that.tips = '验票成功!'
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      }
    }
  }
</script>

<style lang="less">
  .checkcode {
    .checkResult {
      text-align: center;
      padding: 0.35rem;
      background: #1a1a1a;
      i {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        background-size: cover;
        &.s{
          background-image: url("../images/success.png");
        }
        &.f{
          background-image: url("../images/fail.png");
        }
      }
      p {
        text-align: center;
        color: #f0c37a;
        font-size: 0.34rem;
        &.error{
          font-size: 0.28rem;
          color: #666;
        }
      }
    }
    .itemInfo {
      margin: 0.2rem 0;
      background: #1a1a1a;
      padding: 0 0.4rem 0.15rem;
      h1 {
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.32rem;
      }
      .van-cell-group {
        background: #1a1a1a;
      }
      .van-hairline--bottom::after,
      .van-hairline--top-bottom::after,
      .van-hairline::after {
        border: none;
      }
      .van-cell {
        padding: 0;
        line-height: 0.6rem;
        background: #1a1a1a;
        color: #666666;
        &:not(:last-child)::after {
          border: 0;
        }
        &.price{
          .van-cell__value{
            font-size: 0.34rem;
            color: #bf2b39;
          }
        }

      }
      .van-cell__value {
        padding-right: 0;
      }
    }
  }

</style>
