<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{ goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop" is-link>
        <template slot="title">
          <span class="van-cell-text">JZ官方商店</span>
          <van-tag type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location" is-link />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link />
    </van-cell-group>

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
          <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">立即购买</van-button>
        </div>
      </template>
    </van-sku>


  </div>
</template>

<script>
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
        quota: 0,
        goodsId: 123,
        quotaUsed: 0,
        imgShow: false,
        price: 100,
        initialSku: {
          price: '1.00', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2270, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
          ],
          hide_stock: true // 是否隐藏剩余库存
        },
        goods: {
          title: '美国伽力果（约680g/3个）',
          price: 2680,
          express: '免运费',
          remain: 19,
          thumb: [
            'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
          ]
        },
        showCustomAction: false,
        sku: {
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
            {
              k: '门票类型', // skuKeyName：规格类目名称
              v: [
                {
                  id: '1', // skuValueId：规格值 id
                  name: '预售票', // skuValueName：规格值名
                },
                {
                  id: '2',
                  name: 'xxxx',
                }
              ],
              k_s: 's1'
              // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            },
            {
              k: '演出时间', // skuKeyName：规格类目名称
              v: [
                {
                  id: '3', // skuValueId：规格值 id
                  name: '2018年01月09日', // skuValueName：规格值名
                },
                {
                  id: '4',
                  name: '2018年01月10日',
                }
              ],
              k_s: 's2'
              // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: 2259, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '3', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              stock_num: 4 // 当前 sku 组合对应的库存
            },
            {
              id: 2260, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '4', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              stock_num: 3 // 当前 sku 组合对应的库存
            },
            {
              id: 2261, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              s1: '2', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '3', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              stock_num: 1 // 当前 sku 组合对应的库存
            },
            {
              id: 2262, // skuId，下单时后端需要
              price: 100, // 价格（单位分）
              s1: '3', // 规格类目 k_s 为 s1 的对应规格值 id
              s2: '4', // 规格类目 k_s 为 s2 的对应规格值 id
              s3: '0', // 最多包含3个规格值，为0表示不存在该规格
              stock_num: 10 // 当前 sku 组合对应的库存
            }
          ],
          price: '1.00', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2270, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
          ],
          hide_stock: true // 是否隐藏剩余库存
        },

        goods_con: {
          // 商品标题
          title: '测试商品',
          Img: 'https://img.yzcdn.cn/1.jpg'
        },



      };
    },

    methods: {
      formatPrice() {
        return '¥' + (this.goods.price / 100).toFixed(2);
      },
      showShu() {
        return this.showCustomAction= true;
      },
      handleBuyClicked(e){
        console.log(e)
      }
    }
  };
</script>

<style lang="less">
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
