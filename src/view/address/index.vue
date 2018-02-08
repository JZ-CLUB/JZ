<template>
  <div>
   <div class="van-address-list">
    <van-radio-group class="van-address-list__group">
      <van-cell-group>
        <van-cell v-for="(item, index) in list" :key="index">
          <van-cell-swipe :right-width="65">
          <div class="add_info">
            <van-radio v-on:click="counter += 1" :name="index+1" v-model="radio" @click="onSelect(item, index)">
              <div class="van-address-list__name">{{ item.trueName }}，{{ item.telPhone }}</div>
              <div class="van-address-list__address">{{ item.areaInfo }}{{item.address}}</div>
            </van-radio>
            <van-icon slot="right" name="edit" class="van-address-list__edit"  v-bind:class="{'van-icon-check':indexTrue,'van-icon-checked':!indexTrue}" @click="onEdit(item, index)" />
          </div>
          <!-- <div class="van-cell-swipe__right"><span>删除</span></div> -->
          <span slot="right" @click="onClose('right', index)">删除</span>
        </van-cell-swipe>
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
  import { AddressList, Radio, CellGroup, RadioGroup, Cell, Icon, CellSwipe  } from 'vant';
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
        chosenAddressId: '1',
        list: [],
        indexTrue: -1,
        radio: '1',
        counter: 0,
        address_str:''
      }  
    },
    created () {
      let vm = this
      vm.getAddressList()
    },
    methods: {
      onAdd() {
        Toast('新增收货地址');
      },
      onEdit(item, index) {
        address_id = index;
        Toast('编辑收货地址:' + index);
        sessionStorage.setItem("addressId", address_id_str[index]);
      },
      onSelect(item, index) {
        if(index+1){
          $(".van-radio").find("i").attr("class","van-icon van-icon-check");
          $(".van-radio").eq(index).find("i").attr("class","van-icon van-icon-checked");
        }
      },
      onClose(clickPosition, instance) {
        switch (clickPosition) {
          case 'right':
            Dialog.confirm({
              message: '确定删除吗？'
            }).then(() => {
              $(".van-cell").eq(instance).remove();
              // console.log("instance" + instance);
            });
            break;
        }
    },
      getAddressList: function () {
        let that = this;
        Ajax.get('/static/address.json')
        .then(function (res) {
          // console.log(res.data.data);
          that.list = res.data.data;
          for(let i = 0; i< res.data.data.length; i++){
            address_id_str[i] = res.data.data[i].addressId;
          }
        })
        .catch(function (error) {
          
        });
      }
    }
  }
</script>

<style lang="less">
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
