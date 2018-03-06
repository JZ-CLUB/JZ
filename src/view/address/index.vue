<template>
  <div>
   <div class="van-address-list">
    <van-radio-group class="van-address-list__group" v-model="radio">
      <van-cell-group>
        <van-cell v-for="(item, index) in list" :key="index">
          <div class="add_info" @click="onSelect(item, index)">
            <van-radio :name="item.addressId">
              <div class="van-address-list__name">{{ item.trueName }}，{{ item.telPhone }}</div>
              <div class="van-address-list__address">{{ item.areaInfo }}，{{item.address}}</div>
            </van-radio>
            <van-icon name="edit" class="van-address-list__edit" v-bind:class="{'van-icon-check':indexTrue,'van-icon-checked':!indexTrue}" @click.stop="onEdit(item, index)" />
          </div>
          <van-icon name="delete" @click="onDelete(item, index)" solt="right"/>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="van-cell van-address-list__add van-hairline--top van-hairline van-cell--clickable">
      <div class="van-cell__title" @click="onAdd()">
        <i class="van-icon van-icon-add">
          </i><span class="van-cell__text">新增收货地址</span>
          </div>
          <i class="van-icon van-cell__right-icon van-icon-arrow"></i>
      </div>
    </div>
  </div>
</template>


<script>
  let address_id;
  let address_id_str=[];
  import { AddressList, Radio, CellGroup, RadioGroup, Cell, Icon, CellSwipe } from 'vant';
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
      [CellSwipe.name]: CellSwipe
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
          memberId: 88
        }
        // Ajax.get('/static/address.json')
        Ajax.post(url, data)
        .then(function (res) {
          that.list = res.data.data;
          for(let i = 0; i< res.data.data.length; i++){
            address_id_str[i] = res.data.data[i].addressId;
          }
        })
        .catch(function (error) {

        });
      },
      onDelete(item, index) {
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          this.list.splice(index,1);
          let url = 'target/address/api/delAddress'
          let data = {
            addressId: item.addressId
          }
          Ajax.post(url, data)
          .then(function (res) { 
            Toast("成功");
          })
          .catch(function (error) {

          });
        }).catch(() => {
          Toast("取消");
        });
      },
    }
  }
</script>

<style lang="less" scoped>
.van-address-list{
  .van-cell{
    padding: 10px 0px 10px 15px !important;
    .van-address-list__add.van-cell{
      background-color: #f44;
      font-size: 16px;
      color: #fff;
      height: 50px;
      line-height:50px;
      padding: 0;
      text-align: center;
      &__right-icon{
        display: none;
      }
      .van-icon{
        display: none;
      }
    }
  }
  .van-cell__value--alone{
      padding-right: 0 !important;
      .van-cell-swipe__wrapper{
        .van-cell-swipe__right{
          background-color: #84c483;
          right: 0;
          -webkit-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);

        }
        .van-cell-swipe__left, .van-cell-swipe__right{
          top: 0;
          height: 100%;
          position: absolute;
          width: 65px;
          color: #fff;
          font-size: 16px;
          height: 40px;
          display: inline-block;
          text-align: center;
          line-height: 40px;
        }
      }
  }
}

</style>
