<style lang="less">
  @import "../../common/common";
  .goodTitle{
    color: @white;
    width: 100%;
    height: 4.18rem;
    position: relative;
    /*background: url("../../images/goodsAct_bg_02.jpg") no-repeat center;*/
    /*background-size: cover;*/
    overflow-y: hidden;
    img{
      display: flex;
      justify-content: center;
      max-width: 100%;
      //height: 4.18rem;
      margin: 0 auto;
    }
    >div{
      position: absolute;
      bottom: 0;
      width: 100%;
      //height: 0.9rem;
      background: rgba(0,0,0,0.4);
      color: #FFFFFF;
      font-size: 0.3rem;
      padding: 0.2rem 0.4rem;
      line-height: 0.35rem;
      display: flex;
      justify-content: space-between;
      .title{
        max-width: 5rem;
        //text-overflow:ellipsis; white-space:nowrap; overflow:hidden;
      }
      .price{
        color: #F93B48;
        font-size: 0.3rem;
        .pre{
          font-size: 0.24rem;
        }
        .text{
          font-size: 0.24rem;
          color: #ffffff;
        }
      }
    }
    /*.first_tit{
      font-size: 0.5rem;
      color:#efc181;
      text-shadow:2px 5px 4px #000;
      text-align: center;
      padding-top: 1.2rem;
      font-weight: 800;
    }
    .second_tit{
      font-size: 0.32rem;
      color:#efc181;
      text-shadow:2px 5px 4px #000;
      text-align: center;
      font-weight: 600;
      padding-top:0.1rem;
    }*/
  }
  .goods {
    background-color: #1a1a1a;
    padding: 0 20px 50px 20px;
    font-size: 14px;
    color: @white;
    img{
      width: 100%;
    }
    .gtitle{
      width: 5.3rem;
      float: left;
      .goodsName{
        font-size: 0.24rem;;
      }
    }
    .gprice{
      float: left;
      color: #F93B48;
      font-size: 0.3rem;
      .pre{
        font-size: 0.24rem;
      }
      .text{
        font-size: 0.24rem;
        color: #ffffff;
      }
    }
    .tips{
      color: @red;
      font-size: 0.24rem;
    }
    .intru{
      color: @yellow;
      padding: 0.4rem 0.4rem 0.4rem 0;
      font-size: 0.28rem;
      line-height: 0.28rem;
      display: flex;
      &:before{
        content: '';
        display: inline-block;
        width:0.04rem;
        height:0.28rem;
        background:rgba(190,44,54,1);
        margin-right: 0.2rem;
      }

    }
    h1,h2,h3,h4,h5,h6{
      color: #d25454;
      font-weight: bold;
      line-height: 30px;
    }
    p{
      line-height: 24px;
    }

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



    .van-hairline--bottom::after{
      border-bottom: 1px solid #070d1a;
    }
    .van-sku-row{
      &__title {
        font-size: 12px;
      }
    }
    .van-sku{
      &-header__goods-info{
        min-height: 24px;
        padding-right: 10px;
      }
      &__goods-name{
        font-size: 14px;
        text-align: center;
      }
      &-row__item{
        min-width: 45%;
        color: @white;
        text-align: center;
        border: 1px solid @white;
      }
      &-row__item.van-sku-row__item--active{
        color: @yellow;
        border: 1px solid @yellow;
        background: transparent;
      }
      &__quota{
        color: #be2c36;
      }
      &-row__item--disabled{
        background: transparent;
        border-color: @gray;
        color: @gray;
      }

    }
    .van-button--bottom-action.van-button--primary{
      background-color: #be2c36;
    }
    .van-popup--bottom{
      .van-sku-layout{
        background: #262626;
      }
    }
    .van-button--bottom-action.van-button--default {
      color: #999;
      background-color: #353535;
    }
    .van-stepper{
      &__stepper{
        background-color: #f0c37a;
        border-color: #282828;
        color: #000;
      }
      &__minus--disabled,&__plus--disabled{
        background-color: #8b7550;
        border-color: #282828;
        color: #453a28;
      }
      &__input{
        background-color: #666666;
        border-color: #282828;
        color: #fff;
        font-size: 12px;
        font-weight: bold;
      }
    }

  }
  .van-sku-container{
    background: #262626;
  }
  .van-sku-messages{
    padding-bottom: 0;
    background: #262626;
    &.van-hairline--top-bottom::after{
      border: none;
    }
  }



</style>
<template>
  <div style="background: #1a1a1a">
    <div class="goodTitle">
      <img :src="comPath.imgPath+imgBan" alt="">

    </div>
    <div class="goods">
      <div >
        <div class="gtitle">
          <p class="title">{{goods.title}}</p>
          <p class="goodsName">{{goodsSubtitle}}</p>
        </div>

        <div class="gprice">
          <p class="price"><span class="pre">¥</span> {{priceArr | priceMin}} <span class="text">起</span></p>
        </div>
      </div>
      <div class="intru clear">演出介绍</div>
      <div>
        <div v-html="goodsBody">
        </div>
        <p class="tips">也可进行现场购票，票价{{priceArr | priceMin}}起</p>
      </div>
      <van-goods-action v-show="goodsShow">
        <van-goods-action-big-btn primary @click="showShu">
          {{goodsShowtit}}
        </van-goods-action-big-btn>
      </van-goods-action>

      <van-goods-action v-show="goodsShow_two">
        <van-goods-action-big-btn disabled >
          {{goodsShowtit}}
        </van-goods-action-big-btn>
      </van-goods-action>

      <van-sku
        :close-on-click-overlay="true"
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
              <div class="van-sku__goods-price" style="display: none"><span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ price }}</span></div>
              <span class="van-sku__close-icon" style="display: none" @click="props.skuEventBus.$emit('sku:close')" />
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
  </div>
</template>

<script>
  import {sig} from '../../common/weixin'
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
    Sku,
    Toast
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
      [button.name]: button,
      [Toast.name]: Toast
    },

    data() {
      return {
        comPath: PublicPath,
        quota: 0,
        goodsId: 1,
        quotaUsed: 0,
        imgShow: false,
        goodsShow: false,
        goodsShow_two: true,
        goodsShowtit:"我要购票",
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
        goodsName:'',
        goodsSubtitle:'',
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
          title: '',
          Img: ''
        },
        priceArr:[],
        imgBan:''
      };
    },
    created: function() {
      let that=this
      Toast.loading({mask: true, duration: 0});
      //that.send(that)
      sig(true).then(function () {
        that.send(that)
      })
    },
    computed:{
    },
    methods: {
      formatPrice() {
        return '¥' + (this.goods.price / 100).toFixed(2);
      },
      showShu() {
        let that = this
        that.showCustomAction= true;
      },
      handleBuyClicked(e){
        Toast.loading({mask: true, duration: 0});
        let that = this
        // console.log(e);
        let oData = this.sku;
        let goodsId = e.goodsId;
        let specId="";
        let vue = this;
        let tree = this.sku.tree;

        let datalist = {};
        // console.log(tree);
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

        // console.log(datalist);
        localStorage.setItem("datalist", JSON.stringify(datalist));


        var data = {
          goodsId:this.$route.params.id,
          memberId:sessionStorage.getItem('memberId'),
          specId:specId,
          count:e.selectedNum
        };
        Ajax.post('target/cartapi/addCart', data)
          .then(
            function (response) {
              if(response.data.result==1){
                localStorage.setItem('cartIds',response.data.data[0].cartIds)
                localStorage.setItem('goodsTitle',that.goods.title)
                localStorage.setItem('imgBan',that.imgBan)
                Toast.clear();
                vue.$router.push({ name: 'toPay'})
              }else{
                Toast(response.data.msg)
              }
            }
          );
      },
      send:function (e) {
        let  that=this
        Ajax.post('target/goods/api/goodsdetail', {
          goodsId: e.$route.params.id
        })
          .then(function (response) {
            //console.log(response)
            if(response.data.data[0].goodsShow == "1"){
              e.goodsShow = true;
              e.goodsShow_two = false;
            }else if(response.data.data[0].goodsShow == "2"){
              let ad =  format(response.data.data[0].startTime);
              //console.log(ad)
              ad = ad+"开始售卖";
              e.goodsShow_two = true;
              e.goodsShowtit = ad;
            }else{
              e.goodsShow_two = true;
              e.goodsShowtit = "商品已下架"
            }
            if(response.statusText=="OK"){
              //console.log("ee:"+e.$route.params.id);
              let nData = response.data.data[0];
              that.imgBan = nData.goodsCallyList[0]
              let oData = e.sku;
              let i = 0;
              let j = 0;
              let o = 0;
              e.goodsBody = nData.goodsBody;
              e.goodsName = nData.goodsName;
              e.goodsSubtitle = nData.goodsSubtitle;
              e.goodsId = nData.goodsId;
              e.goods.title = nData.goodsName;
              e.price = nData.goodsStorePrice;
              e.sku.stock_num = nData.goodsTotalStorage;
              e.collection_id = nData.goodsId;
              //e.initialSku.price = nData.goodsStorePrice;
              //e.initialSku.collection_id = nData.goodsId;
              //e.initialSku.stock_num = nData.goodsTotalStorage;
              localStorage.setItem("goodstype", nData.goodsType);
              // console.log(nData);
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
                that.priceArr.push(goodsSpecList.specGoodsPrice)
                Data = {
                  id: goodsSpecList.goodsSpecId, // skuId，下单时后端需要
                  price: goodsSpecList.specGoodsPrice, // 价格（单位分）
                  stock_num: goodsSpecList.specGoodsStorage // 当前 sku 组合对应的库存
                };
                oData.list.push(Data);
              }

              let b;
              function aaa(e,a) {
                //console.log("a"+a);
                //console.log(oData);
                let len = oData.tree[a].v.length - 1;
                for(let j in oData.tree[a].v){

                  //console.log(e +"===="+oData.tree[a].v[j].id);
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
                  //console.log(b+":"+z);
                  //a++;
                }
                o++;
              }
              //console.log(oData);
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
            function add0(m){return m<10?'0'+m:m }
            function format(shijianchuo)
            {
              let time = new Date(shijianchuo);
              let y = time.getFullYear();
              let m = time.getMonth()+1;
              let d = time.getDate();
              let h = time.getHours();
              let mm = time.getMinutes();
              let s = time.getSeconds();
              return add0(m)+"月"+add0(d)+"日"+h+":"+mm+":"+s;
            }
            Toast.clear()
          })
          .catch(function (error) {
            Toast('加载失败')
            console.log(error);
          });
      }
    },
    filters:{
      priceMin(val,i) {
        if(val.length!==0){
          return Math.min.apply(Math, val);
        }else{
          return 0
        }
      },
    }
  };


</script>

