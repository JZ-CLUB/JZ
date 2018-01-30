<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />

  </div>
</template>



<script>
  import {AddressList} from 'vant';
  import {Toast} from 'vant';

  export default {
    components: {
      [AddressList.name]: AddressList,
      [Toast.name]: Toast,
    },
    data() {
      return {
        chosenAddressId: '1',
        list: [
          {
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ]
      }
    },

    methods: {
      onAdd() {
        Toast('新增收货地址');
      },
      onEdit(item, index) {
        Toast('编辑收货地址:' + index);
      }
    }
  }

</script>

<style lang="less">

  .van-address-list__add.van-cell{
    background-color: #f44;
    font-size: 16px;
    color: #fff;
    height: 50px;
    line-height: 50px;
    padding: 0;
    text-align: center;

    &__right-icon{
      display: none;
    }
    .van-icon{
      display: none;
    }
  }




</style>
