<style lang="less">
  @import "../../common/common";
  #address_body{
    // background: #1a1a1a;
    // font-family: 微软雅黑;
    .van-address-list{
      // width: 88.26%;
      // margin:0 auto;
      .van-address-list__group{
        padding-bottom: 0 !important;
        background:#000 !important;
        .van-cell{
          background: #1a1a1a !important;
          padding: 0 !important;
          margin-bottom: 0.3rem;
          .van-cell__value--alone{
            padding-right: 0;
            // border-bottom:1px solid red;
            .add_info{
              border-bottom: 1px solid #000;
              .add_info_con{
                width: 88.667%;
                margin: 0 auto;
                .van-address-list__name{
                  font-size: 0.28rem;
                  color: @yellow;
                  margin-top: 0.45rem;
                  margin-bottom: 0.3rem;
                  .tel_tel{
                    float: right;
                  }
                }
                .van-address-list__address{
                  font-size: 0.28rem;
                  color: @white;
                  margin-bottom: 0.3rem;
                }
              }
            }
            .nihaoa{
              padding: 0.25rem 0.4rem;
              display: flex;
              justify-content: flex-end;
              vertical-align: middle;
              p{
                color: @wgray;
                display: flex;
                justify-content: space-between;
                span{
                  height: 0.4rem;
                  line-height: 0.4rem;
                }
                .van_icon_edit{

                  width: 0.4rem;
                  height: 0.4rem;
                  background: url("../../images/icon_address_03.png") no-repeat left center;
                  background-size:  0.38rem 0.38rem;
                  margin-right: 0.2rem;
                }
                .van_icon_delete{
                  width: 0.4rem;
                  height: 0.4rem;
                  background: url("../../images/icon_address_05.png") no-repeat left center;
                  background-size: 0.32rem 0.37rem;
                  margin-left: 0.4rem;
                  margin-right: 0.2rem;
                }
              }
            }
          }
        }
        .van-cell:not(:last-child)::after{
          border:0 !important;
        }
      }
      .van-address-list__add{
        width: 100%;
        padding: 0 !important;
        height: 1rem;
        line-height: 1rem;
        z-index: 1;
        // background: #be2c36 !important;
        border:0;
        .van-button--bottom-action{
          height: 1rem !important;
          line-height: 1rem !important;
          background: #be2c36;
        }
        .van-button--normal{
          padding: 0 !important;
          font-size: 0.28rem;
        }
      }
    }
  }
</style>

<template>
  <div id="address_body">
   <div class="van-address-list">
    <van-radio-group class="van-address-list__group" v-model="radio">
      <!-- <van-cell-group> -->
        <van-cell v-for="(item, index) in list" :key="index">
          <div class="add_info" @click="onSelect(item, index)">
            <div :name="item.addressId" class="add_info_con">
              <div class="van-address-list__name">{{ item.trueName }}<span class="tel_tel">{{ item.telPhone }}</span></div>
              <div class="van-address-list__address">{{item.address}}&nbsp;&nbsp;{{ item.areaInfo }}</div>
            </div>
          </div>
          <div class="nihaoa">
            <p @click.stop="onEdit(item, index)"><span name="edit" solt="right" class="van-icon van_icon_edit"></span><span>编辑地址</span></p>
            <p @click="onDelete(item, index)"><span name="delete" class="van-icon van_icon_delete"></span><span>删除</span></p>

          <!-- <van-icon name="delete" @click="onDelete(item, index)" solt="right"/> -->
          <!-- <van-icon name="edit" v-bind:class="{'van-icon-check':indexTrue,'van-icon-checked':!indexTrue}" @click.stop="onEdit(item, index)" /> -->
          </div>
        </van-cell>
      <!-- </van-cell-group> -->
    </van-radio-group>
    <div class="van-address-list__add" @click="onAdd()">
      <van-button type="primary" bottom-action>新建收货地址</van-button>
    </div>
    <!-- <div class="van-cell van-address-list__add van-hairline--top van-hairline van-cell--clickable">
      <div class="van-cell__title" @click="onAdd()">
        <i class="van-icon van-icon-add">
          </i><span class="van-cell__text">新增收货地址</span>
          </div>
          <i class="van-icon van-cell__right-icon van-icon-arrow"></i>
      </div> -->
    </div>

  </div>
</template>


<script>
  let address_id;
  let address_id_str=[];
  import { AddressList, Radio, CellGroup, RadioGroup, Cell, Icon, CellSwipe, Button } from 'vant';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  export default {
    components: {
      [AddressList.name]: AddressList,
      [Radio.name]: Radio,
      [CellGroup.name]: CellGroup,
      [RadioGroup.name]: RadioGroup,
      [Toast.name]: Toast,
      [Cell.name]: Cell,
      [Icon.name]: Icon,
      [CellSwipe.name]: CellSwipe,
      [Button.name]: Button
    },
    data() {
      return {
        list: [],
        indexTrue: "false",
        radio: 0,
        counter: 0,
        address_str:'',
        tar:'tar',
        AddressId:''
      }
    },
    created () {
      Toast.loading({mask: true, duration: 0});
      let vm = this
      vm.getAddressList();
      vm.selAddress()
    },
    methods: {
      selAddress() {
        if(localStorage.getItem('selectAddress')!==null){
          this.radio = JSON.parse(localStorage.getItem('selectAddress')).addressId
        }
      },
      onAdd() {
        // Toast('新增收货地址');
        this.$router.push({path: '/addressEdit'});
      },
      onEdit(item, index) {
         this.$store.dispatch('editAddress',item);
          address_id = index;
          // console.log(address_id_str[index]);
        // sessionStorage.setItem("addressId", address_id_str[index]);
        this.$router.push({path: '/addressEdit', query: {tart: address_id_str[index]}});
      },
      onSelect(item, index) {
        localStorage.setItem('selectAddress', JSON.stringify(item));
        this.$router.push({path: '/toPay'});
      },
      // onClose(clickPosition, instance) {
      //   switch (clickPosition) {
      //     case 'right':
      //       Dialog.confirm({
      //         message: '确定删除吗？'
      //       }).then(() => {
      //         this.list.splice(instance, 1);
      //       });
      //     break;
      //   }
      // },
      getAddressList: function () {
        let that = this;
        // Ajax.get('/static/address.json')
        let url = 'target/address/api/addressList'
        let data = {
          memberId: sessionStorage.getItem('memberId')
        }
        // Ajax.get('/static/address.json')
        Ajax.post(url, data)
        .then(function (res) {
          that.list = res.data.data;
          for(let i = 0; i< res.data.data.length; i++){
            address_id_str[i] = res.data.data[i].addressId;
          }
          Toast.clear();
        })
        .catch(function (error) {
          Toast('加载失败');
        });
      },
      onDelete(item, index) {
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          Toast.loading({mask: true, duration: 0});
          this.list.splice(index,1);
          let url = 'target/address/api/delAddress'
          let data = {
            addressId: item.addressId
          }
          Ajax.post(url, data)
          .then(function (res) {
            Toast("删除成功");
          })
          .catch(function (error) {
            Toast("加载失败");
          });
        }).catch(() => {
          //Toast("取消");
        });
      },
    }
  }
</script>
