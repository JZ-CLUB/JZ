<template>
  <div>
    <div class="myInfo_con_first">
      <van-row>
        <van-col span="22">
          <div class="tit_con">
            <div class="title_left">
              <div class="title_left_left">
                <img src="../../images/Info_logo.png">
              </div>
              <div class="title_left_right">
                <p class="myInfo_title">爵士之语</p>
                <img src="../../images/info_07.png">
              </div>
            </div>
          </div>
        </van-col>
        <van-col span="2">
          <div class="title_right">
              <img src="../../images/info_03.png">
            </div>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <img src="../../images/info_card.png">
        </van-col>
      </van-row>
      <van-row class="myInfo_num">
        <van-col span="12">
          <ul>
            <li>爵士豆</li>
            <li>1000</li>
          </ul>
        </van-col>
        <van-col span="12">
          <ul>
            <li>优惠券</li>
            <li>5</li>
          </ul>
        </van-col>
      </van-row>
    </div>
    <div class="myInfo_con_second">
      <van-cell-group>
        <i class="icon_bean"></i><van-cell title="我的爵士豆" is-link />
        <i class="icon_coupon"></i><van-cell title="我的优惠券" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from 'vant';
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  created () {
    let vm = this
    vm.getMyInfo()
  },
  methods: {
    getMyInfo: function () {
      let data={
        memberId:'111'
      }
      // Ajax.get('/static/test.json')
      // Ajax.post('api/app/product/goodsBody',{goodsId:3299,storeId:175})
      Ajax.post('target/memberapi/memberDetail',data)
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        // console.log(error);
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .myInfo_con_first{
    width: 88.26%;
    margin: 0 auto;
    padding-top: 45px;
    background: white;
    .title_left{
      width: 61.48%;
      float: left;
      .title_left_left{
        width: 42.27%;
        float: left;
      }
      .title_left_right{
        p{
          text-align: center;
        }
        width: 57%;
        float: right;
      }
    }
    .title_right{
      width: 80%;
      right: 0;
      // float: right;
      // text-align: -webkit-right;
    }
    .myInfo_num{
      text-align: center;
    }
  }
  .myInfo_con_second{
    width: 88.26%;
    margin: 0 auto;
    margin-top: 10px;
    background: white;
    .van-cell{
      width: 88% !important;
      display: inline-block !important;
    }
    .icon_bean{
      width: 12%;
      height: 30px;
      display: inline-block;
      vertical-align: super;
      padding-left: 5px;
      background: url("../../images/info_11.png") no-repeat center;
      background-size: contain;
    }
    .icon_coupon{
      width: 12%;
      height: 30px;
      padding-left: 5px;
      display: inline-block;
      vertical-align: super;
      background: url("../../images/info_14.png") no-repeat center;
      background-size: contain;
    }
  }
</style>
