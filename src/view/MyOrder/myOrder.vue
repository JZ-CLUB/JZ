<template>
  <div class="user">
    <van-row class="user-links">
      <van-col span="8" v-for="(item,index) in tabList" :key="index">
        <div @click="tabFun(item.list,index)" :class="{cur:activity===index}">
          <van-icon :name="item.icon" />
          {{item.name}}
        </div>
      </van-col>
    </van-row>
    <scroller :on-infinite="infinite" ref="my_scroller">
      <div style="height: 58px;"></div>
      <van-card v-for="(it, index) in getItemList"
                :key="index"
                :title="it.goodsName"
                :desc="it.specInfo"
                :thumb="imageURL"
      >
        <div slot="footer">
          <van-button size="mini" @click="$router.push({ name: 'activityGoods', params: { id:it.goodsId }})">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </div>
      </van-card>
    </scroller>
  </div>
</template>
<script>
  import {
    Tab, Tabs, Card, Toast, Button, Row, Col, Icon, Waterfall
  } from 'vant';
  export default {
    components: {
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [Card.name]: Card,
      [Toast.name]: Toast,
      [Button.name]:Button,
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon
    },
    data () {
      return {
        bottom: [],
        flag:true,
        imageURL:'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        allList:[],
        unPayList:[],
        payedList:[],
        tabList:[],
        activity:0
      }
    },
    created () {
      Toast.loading({ mask: true,duration:0 });
      let vm = this
      vm.initList()
    },
    computed: {
      getStateList(){
        return this.$store.state.myOrder.stateList
      },
      getItemList(){
        return this.$store.state.myOrder.items
      }
    },
    mounted() {
      this.bottom=0
    },
    methods: {
      initList() {
        let that=this
        let url='/static/test.json'
        let data={
          memberId:'',
          status:'',
          pageNo:'',
          pageSize:''
        }
        // Ajax.get(url)
        Ajax.post('target/orderapi/orderlist',data)
          .then(function (response) {
            let res=response.data;
            if(res.data.length!==0){
              res.data.map(function (item,index) {
                that.allList=that.allList.concat(item)
                if(item.evaluationStatus===1){
                  that.unPayList=that.unPayList.concat(item)
                }else if(item.evaluationStatus===2){
                  that.payedList=that.payedList.concat(item)
                }
                that.$store.commit('allOrder',that.allList)
              })
              that.tabList=[
                {icon:'pending-payment',name:'全部',list:that.allList},
                {icon:'pending-orders',name:'待付款',list:that.unPayList},
                {icon:'pending-deliver',name:'已出票',list:that.payedList}
              ]
              Toast.clear()
            }else{
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
            Toast('加载失败error')
          });
      },
      tabFun(data,i) {
        let that=this
        that.activity=i
        that.items=[]
        that.bottom=10
        that.$store.commit('allOrder',data)
        that.$store.commit('itemShow',{data:that.$store.state.myOrder.stateList.slice(0,10),type:0})
        // this.$refs.my_scroller.$el.childNodes[0].style='transform:translate3d(0px, 0px, 0px) scale(1)'
      },
      infinite(done) {
        let that=this
        if (that.bottom >= that.$store.state.myOrder.stateList.length) {
          setTimeout(() => {
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          console.log('start===='+that.bottom)
          let start = that.bottom
          that.$store.commit('itemShow',{data:that.$store.state.myOrder.stateList.slice(start,start+10),type:1})
          that.bottom = that.bottom + 10;
          setTimeout(() => {
            done()
          })
        }, 1000)
      }
    }
  }
</script>
<style lang="less">
  .plugin-name {
    margin: 0;
    padding-top: 60px;
    text-align: center;
    color: #666;
    font-style: normal;
    font-variant-ligatures: normal;
    font-variant-caps: normal;
    font-variant-numeric: normal;
    font-weight: normal;
    font-stretch: normal;
    font-size: 48px;
    line-height: 48px;
    margin-bottom: 10px;
  }

  .for-vue-js {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
  }

  .plugin-name, .for-vue-js {
    font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
  }

  .row {
    display: block;
    width: 100%;
    height: 50px;
    padding: 10px 0 10px 15px;
    font-size: 16px;
    line-height: 30px;
    color: #444;
    background-color: #fff;
  }

  .grey-bg {
    background-color: #eee;
  }

  .arrow-right {
    width: 8px;
    height: 16px;
    float: right;
    margin-top: 7px;
    margin-right: 15px;
  }
  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

  .user {
    &-links {
      position: relative;
      z-index: 22222;
      padding: 5px 0;
      font-size: 12px;
      text-align: center;
      background-color: #fff;

      .van-icon {
        display: block;
        font-size: 24px;
      }
      .cur{
        color: #f40;
      }
    }
  }
</style>
