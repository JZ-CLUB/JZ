<template>
  <div class="checkcode" v-if="load">
    <div class="checkResult">
      <van-icon name="passed"/>
      <p>{{tips}}</p>
    </div>

    <div class="itemInfo">
      <h1 class="">{{goodsTitle}}活动标题</h1>
      <van-cell-group>
        <van-cell title="门票类型" :value="tickType"/>
        <van-cell v-for="(val, key, index) in carType" :key="index" :title="key" :value="val"/>
        <van-cell title="购买数量" :value="tickNum"/>
        <van-cell class="price" title="总金额" value="¥300"/>
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
        tips: '验票成功!'
      }
    },
    created() {
      let vm = this
      sig(true).then(function () {
        vm.load = true
        vm.checkcode()
      })
      //vm.checkcode()
    },
    computed: {},
    mounted() {

    },
    methods: {
      checkcode() {
        Ajax.post('target/orderapi/checkticket', {
          openid: sessionStorage.getItem('openId'),
          ticket: UrlSearch('ticket'),
          sign: 'aaaaa'
        })
          .then(function (response) {
            let res = response.data;
            Toast(res.msg)
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
        font-size: 1.05rem;
        color: #5fb951;
        font-weight: bold;
      }
      p {
        text-align: center;
        color: #f0c37a;
        font-size: 0.34rem;
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
