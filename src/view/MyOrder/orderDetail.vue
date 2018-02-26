<template>
  <van-cell-group>

    <van-cell value="内容">
      <div slot="title">订单号：</div>
    </van-cell>

    <van-cell v-for="(item, index) in list" :key="item.id">
      <div class="van-address-list__name">{{ item.name }}，{{ item.tel }}</div>
      <div class="van-address-list__address">{{ item.address }}</div>
    </van-cell>

    <div @click="$router.push({ name: 'activityGoods', params: { id:1 }})">
      <van-card
        title="标题"
        desc="描述"
        :thumb="imageURL"
      />
    </div>

    <div class="tips">
      【注】如有任何票务疑问，请联系JZ票务负责人 XXX ，电话：13011111111
    </div>

    <van-cell value="¥300">
      <div slot="title">订单总价：</div>
    </van-cell>

    <div class="textR van-panel__footer van-hairline--top">
      <van-button size="small" @click="checkOpr(1)">取消订单</van-button>
      <van-button size="small" type="danger">付款</van-button>
    </div>

  </van-cell-group>
</template>
<script>
  import {
    Cell, CellGroup, Toast, Card, Panel, Button,Dialog
  } from 'vant';

  export default {
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Toast.name]: Toast,
      [Card.name]: Card,
      [Panel.name]: Panel,
      [Button.name]: Button,
      [Dialog.name]:Dialog
    },
    data() {
      return {
        imageURL: 'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          }
        ]
      }
    },
    created() {
      Toast.loading({mask: true, duration: 0});
      let vm = this
    },
    computed: {},
    mounted() {
      Toast.clear()
    },
    methods: {
      checkOpr:function (id) {
        console.log(id)
        Dialog.confirm({
          message: '确定取消订单？'
        }).then(() => {
          // on confirm
          this.orderCancel(id)
        }).catch(() => {
          // on cancel
          Toast('取消')
        });
      },
      orderCancel:function (id) {
        Ajax.get('target/orderapi/cancleorder',id)
          .then(function (response) {
            let res=response.data;
            Toast(res.msg)
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
      }
    }
  }
</script>
<style lang="less" scoped>
  .textR {
    text-align: right;
  }
  .van-dialog__content{
    text-align: center;
  }
</style>
