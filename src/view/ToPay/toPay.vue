<template>
  <div class="van-address-list">
    <van-cell-group>
      <van-cell v-for="(item, index) in list" :key="item.id" is-link>
          <div class="van-address-list__name">{{ item.name }}，{{ item.tel }}</div>
          <div class="van-address-list__address">{{ item.address }}</div>
        <van-icon slot="right-icon" name="arrow" class="van-address-list__edit" @click="" />

      </van-cell>
      <div class="aa"></div>
    </van-cell-group>
    <div class="itemInfo">
      <h1 class="">cell三重奏</h1>
      <van-cell-group>
        <van-cell title="门票类型" value="预售门票" />
        <van-cell title="演出时间" value="2018年01月10日" />
        <van-cell title="区域位置" value="前排" />
        <van-cell title="数量" value="1" />
      </van-cell-group>
    </div>

    <van-submit-bar
      :price="3050"
      label="总金额："
      button-text="立即购买"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
  import {AddressList,Toast,Cell,CellGroup,Icon,SubmitBar} from 'vant';

  export default {
    components: {
      [AddressList.name]: AddressList,
      [Toast.name]: Toast,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Icon.name]: Icon,
      [SubmitBar.name]: SubmitBar
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
          }
        ]
      }
    },

    methods: {
      onSubmit() {
        Toast('立即购买')
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
  .aa{
    width: 100%;
    height: 2px;
    background-image:url("../../images/lineBg.png");
    background-size: cover;
  }
  .itemInfo .van-cell__value{
    padding-right: 0;
  }



</style>
