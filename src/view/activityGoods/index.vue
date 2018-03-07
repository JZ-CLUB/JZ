<template>
  <div class="goods">

    <div v-html="goodsBody">{{goodsBody}}</div>

    <van-goods-action>
      <van-goods-action-big-btn primary @click="showShu">
        我要购票
      </van-goods-action-big-btn>
    </van-goods-action>

    <van-sku
      v-model="showCustomAction"
      stepper-title="数量"
      :sku="sku"
      :goods="goods_con"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      :show-add-cart-btn="false"
      :quota="quota"
      :quota-used="quotaUsed"
      :reset-stepper-on-hide="true"
      :initial-sku="initialSku"
      @buy-clicked="handleBuyClicked"
    >
      <!-- 自定义 sku header -->
      <template slot="sku-header" slot-scope="props">
        <div class="van-sku-header van-hairline--bottom">
          <div class="van-sku-header__img-wrap" v-show="imgShow">
            <img class="van-sku__goods-img" :src="goods_con.Img">
          </div>
          <div class="van-sku-header__goods-info">
            <div class="van-sku__goods-name">{{ goods.title }}</div>
            <div class="van-sku__goods-price"><span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ price }}</span></div>
            <span class="van-sku__close-icon" @click="props.skuEventBus.$emit('sku:close')" />
          </div>
        </div>
      </template>
      <!-- 隐藏 sku messages -->
      <template slot="sku-messages"></template>
      <!-- 自定义 sku actions -->
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <!--<van-button bottom-action @click="handlePointClicked">积分兑换</van-button>-->
          <!-- 直接触发 sku 内部事件，通过内部事件执行 handleBuyClicked 回调 -->
          <van-button type="primary" bottom-action  @click="props.skuEventBus.$emit('sku:buy')">立即购买</van-button>
        </div>
      </template>
    </van-sku>


  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Tag,
    Col,
    Icon,
    Cell,
    CellGroup,
    Swipe,
    SwipeItem,
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn,
    Actionsheet,
    button,
    Sku
  } from 'vant';

  export default {
    components: {
      [Tag.name]: Tag,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [GoodsAction.name]: GoodsAction,
      [GoodsActionBigBtn.name]: GoodsActionBigBtn,
      [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
      [Actionsheet.name]: Actionsheet,
      [Sku.name]: Sku,
      [button.name]: button
    },

    data() {
      return {
        quota: 1,
        goodsId: 1,
        quotaUsed: 0,
        imgShow: false,
        price: '',
        initialSku: {
        },
        goods: {
          title: '',
          price: '',
          express: '免运费',
          remain: 10,
          thumb: [
            ''
          ]
        },
        goodsBody:'',
        showCustomAction: false,
        sku: {
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [

          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
          ],
          nlist:[],
          price: '', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2270, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
          ],
          hide_stock: false // 是否隐藏剩余库存
        },
        goods_con: {// 商品标题
          title: '测试商品',
          Img: 'https://img.yzcdn.cn/1.jpg'
        },



      };
    },
    created: function() {
      this.send(this);

    },
    computed:{

    },
    methods: {
      formatPrice() {
        return '¥' + (this.goods.price / 100).toFixed(2);
      },
      showShu() {
        return this.showCustomAction= true;
      },
      handleBuyClicked(e){
        console.log(e);
        let oData = this.sku;
        let goodsId = e.goodsId;
        let specId="";
        let vue = this;
        let tree = this.sku.tree;

        let datalist = {};
        console.log(tree);
        for (let z in oData.tree){
          let a = "s"+z;
          e.selectedSkuComb[a];
          if(specId!=''){
            specId=specId+","+e.selectedSkuComb[a];
          }else{
            specId=e.selectedSkuComb[a];
          }



          for(let j in oData.tree[z].v){
            if(e.selectedSkuComb[a] == oData.tree[z].v[j].id){
              datalist[tree[z].k] = oData.tree[z].v[j].name;

            }
          }

        }

        console.log(datalist);
        localStorage.setItem("datalist", JSON.stringify(datalist));
        localStorage.setItem("goodstype", "1");

        var data = {
          goodsId:this.$route.params.id,
          memberId:88,
          specId:specId,
          selectedNum:e.selectedNum
        };

        console.log(data);
        Ajax.post('target/cartapi/addCart', data)
          .then(
            function (response) {
              console.log(vue);
              if(response.data.result==1){
                localStorage.setItem('cartIds',response.data.data[0].cartIds)
                vue.$router.push({ name: 'toPay'})
              }
            }
          );


      },
      send:function (e) {
        Ajax.post('target/goods/api/goodsdetail', {
        //Ajax.post('http://rap.taobao.org/mockjsdata/31603/get', {
          goodsId: e.$route.params.id,
          memberId:88
        })
          .then(function (response) {
            //console.log(response)
            if(response.statusText=="OK"){
              console.log("ee:"+e.$route.params.id);

              let nData = response.data.data[0];
              let oData = e.sku;
              let i = 0;
              let j = 0;
              let o = 0;
              e.goodsBody = nData.goodsBody;
              e.goodsId = nData.goodsId;
              e.goods.title = nData.goodsName;
              e.price = nData.goodsStorePrice;
              e.sku.stock_num = nData.goodsTotalStorage;
              e.collection_id = nData.goodsId;
              //e.initialSku.price = nData.goodsStorePrice;
              //e.initialSku.collection_id = nData.goodsId;
              //e.initialSku.stock_num = nData.goodsTotalStorage;
              console.log(nData);
              for (let x in nData.specName){
                let Data;
                Data = {
                  k:nData.specName[x],
                  k_s:"s"+i,
                  v:[]
                };
                oData.tree.push(Data);
                i++;
              }

              for(let z in nData.goodsSpecValueAll){
                let Data;
                let goodsSpecValueAll = nData.goodsSpecValueAll[z];
                for(let k in goodsSpecValueAll){
                  Data = {
                    id:goodsSpecValueAll[k].spValueId,
                    name:goodsSpecValueAll[k].spValueName
                  };
                  oData.tree[j].v.push(Data);
                }
                j++;
              }

              for(let k in nData.goodsSpecList){
                let Data;
                let goodsSpecList = nData.goodsSpecList[k];
                Data = {
                  id: goodsSpecList.goodsSpecId, // skuId，下单时后端需要
                  price: goodsSpecList.specGoodsPrice, // 价格（单位分）
                  stock_num: goodsSpecList.specGoodsStorage // 当前 sku 组合对应的库存
                };
                oData.list.push(Data);
              }

              let b;
              function aaa(e,a) {
                console.log("a"+a);
                console.log(oData);
                let len = oData.tree[a].v.length - 1;
                for(let j in oData.tree[a].v){

                  console.log(e +"===="+oData.tree[a].v[j].id);
                  if( e == oData.tree[a].v[j].id){
                    b = a;
                    //console.log("t");
                    break;
                  }else if(j == len){
                    a++;
                    aaa(e,a);
                  }
                }

              }

              for(let k in nData.goodsSpecList){
                let Data;
                let goodsSpecList = nData.goodsSpecList[k];
                //let a = 0;
                for(let z in goodsSpecList.specGoodsSpec){
                  aaa(z,0);
                  Data = "s"+b;
                  oData.list[o]["s"+b]=z;
                  console.log(b+":"+z);
                  //a++;
                }
                o++;
              }
              console.log(oData);
              /*数组长度*/
              /*let len = 1;//数据总长度
              let row = 0;
              let span = 0;
              let cc = 0;
              let listData = {list:[]};
              for(let k in oData.tree){
                len = len * oData.tree[k].v.length;
                span++;
              }
              function b(e) {
                let spanlen = 1;
                for(let z = span-1;z > e;z--){
                  spanlen = spanlen * oData.tree[z].v.length;
                }
                console.log("----------------------");
                if(e == span - 1){
                  spanlen = 1;
                }
                cc = spanlen;
                return spanlen;
              }

              let y = 0;
              for (let z in oData.tree){
                let  bb = b(row);//当前元素循环次数
                let dd = oData.tree[z].v.length;//当前数组的个数
                dd = len/(bb*dd);
                console.log("s"+z);
                let j = 0;
                let p = 0;
                for(let k in oData.tree[z].v){
                  y = oData.tree[z].v.length;
                  for(let a = 1; a <= dd; a++){
                    for(let i = 1; i <= bb; i++){
                      if(row == span - 1){
                        if(p >= len){
                          j++;
                          p = j;
                        }
                        //listData.list[p];
                        //oData.list[p]["s"+z]=oData.tree[z].v[k].id;
                        console.log("当前数组index:"+p);
                        console.log("属性id:"+oData.tree[z].v[k].id);
                        p = p + y;
                      }else{
                        //oData.list[p]["s"+z]=oData.tree[z].v[k].id;
                        console.log("当前数组index:"+p);
                        console.log("属性id:"+oData.tree[z].v[k].id);
                        p++;
                      }
                    }
                  }
                }
                if(row<span){
                  row++;
                }
              }*/
            }

          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };


</script>

<style lang="less" scoped>
  .goods {
    padding-bottom: 50px;

    &-swipe {
      img {
        width: 7.5rem;
        height: 7.5rem;
        display: block;
      }
    }

    &-title {
      font-size: 16px;
    }

    &-price {
      color: #f44;
    }

    &-express {
      color: #999;
      font-size: 12px;
      padding: 5px 15px;
    }

    &-cell-group {
      margin: 15px 0;

      .van-cell__value {
        color: #999;
      }
    }
  }
  .van-sku-row{
    &__title {
      font-size: 12px;
    }
  }
</style>
