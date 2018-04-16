<style lang="less" scoped>
.club{
  .ban{
    height: 3.3rem;
    position: relative;
    margin-bottom: 0.1rem;
    >div{
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      padding: 0 0.3rem 0 1.5rem;
      position: absolute;
      bottom: 0;
      left: 0;
      font-size:0.28rem;
      background: -webkit-linear-gradient(left, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, rgba(240,195,122,0.74) , rgba(0,0,0,0.6), rgba(0,0,0,0.6)); /* 标准的语法（必须放在最后） */
      .calender{
        position: absolute;
        left: 0;
        color: #252627;
        padding: 0.2rem 0;
        font-size: 0.18rem;
        font-weight: 500;
        p{
          line-height: 0.3rem;
          padding-left: 0.25rem;
          &:nth-child(2){
            padding-left: 0.65rem;
          }
        }
        .line{
          position: absolute;
          top: 0.15rem;
          right: 0.45rem;
          width: 0.02rem;
          height: 0.65rem;
          background: #2e2d2b;
          transform:rotate(45deg);
          -o-transform:rotate(45deg);
          -moz-transform:rotate(45deg);
          -webkit-transform:rotate(45deg);
        }
      }
    }
  }
  .title{
    display: flex;
    justify-content: space-between;
    height: 0.76rem;
    line-height: 0.76rem;
    padding: 0 0.3rem;
    border-bottom: 0.01rem solid #F0C37A;
    p{
      font-size: 0.28rem;
      span{
        font-size: 0.18rem;
      }
    }
  }
  .list{
    padding: 0 0.1rem;
    .noData{
      text-align: center;
      line-height: 0.9rem;
      color: #999999;
    }
    .card{
      height: 1.6rem;
      margin-top: 0.1rem;
      display: flex;
      justify-content: left;
      border-radius: 0.05rem;
      background:#252627 url("../images/clubBg.png") no-repeat right top;
      background-size: 2.67rem 1.88rem;
      >div{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .left{
        width: 1.2rem;
        border-top-left-radius: 0.05rem;
        border-bottom-left-bottom-radius: 0.05rem;
        background-image: url("../images/leftBg.png");
        background-size: cover;
        border-right: 0;
        p{
          text-align: center;
          color: #252627;
          font-size: 0.36rem;
          &:first-child{
            font-family: 'MicrosoftYaHei-Bold';
            font-size: 0.3rem;
            font-weight: bold;
          }
          span{
            font-size: 0.2rem;
          }
        }
      }
      .con{
        width: 6.0rem;
        padding: 0.2rem;
        p{
          font-size: 0.24rem;
          color: #F0C37A;
          height: 0.4rem;
          line-height: 0.4rem;
          text-overflow:ellipsis;
          white-space:nowrap;
          overflow:hidden;
          &:before{
            content: '';
            display: inline-block;
            vertical-align: middle;
            color: #DA0202;
            width: 0.08rem;
            height: 0.08rem;
            background: #DA0202;
            border-radius: 0.08rem;
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="club">
    <div class="ban" v-for="(item,index) in goodsMainList"
         @click="$router.push({ name: 'activityGoods', params: { id:item.goodsId }})">
      <img :src="comPath.imgPath+item.goodsImage" alt="">
      <div>
        <div class="calender">
          <p>{{item.activityStartTime | timeTrans(2)}}日</p>
          <p>{{item.activityStartTime | timeTrans(1)}}月</p>
          <div class="line"></div>
        </div>
        {{item.goodsName}}
      </div>
    </div>

    <div class="title">
      <p>推荐演出</p>
      <p>{{curDate.getMonth()+1}}<span>月</span>{{curDate.getDate()}}<span>日</span> — {{lastDate.month}}<span>月</span>{{lastDate.date}}<span>日</span></p>
    </div>

    <div class="list">
      <div class="card" v-for="(item,index) in goodsList"
           @click="$router.push({ name: 'activityGoods', params: { id:item.goodsId }})">
        <div class="left">
          <p>{{item.activityStartTime | timeTrans(1) | EnMonthTrans}}.</p>
          <p>{{item.activityStartTime | timeTrans(2)}}<span>日</span></p>
        </div>
        <div class="con">
          <p v-for="(it,ind) in item.programList">{{it}}</p>
        </div>
      </div>


      <div class="noData" v-if="noData">没有更多数据</div>

    </div>
  </div>
</template>

<script>
  import '../common/dataFormate'
  import {Toast, Icon, Cell, CellGroup} from 'vant';

  export default {
    name: "club",
    components: {
      [Toast.name]: Toast,
      [Icon.name]: Icon,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },
    data() {
      return {
        comPath: PublicPath,
        goodsMainList:[],
        goodsList:[],
        curDate:new Date(),
        lastDate:'',
        noData:false
      }
    },
    created() {
      Toast.loading({ mask: true,duration:0 });
      let that = this
      that.clubList()
      that.time()
    },
    computed: {},
    beforeMount:function () {

    },
    methods: {
      clubList() {
        let that = this
        Ajax.post('target/product/goodsActivityTime', {})
          .then(function (response) {
            let res = response.data;
            if (res.result === '1') {
              if(that.goodsList.length===0&&that.goodsMainList.length===0){
                that.noData = true
              }
              that.goodsMainList = res.goodsMainList
              res.goodsList.map(item=>{
                item.programList = item.programList.split('。')
              })
              that.goodsList=res.goodsList
              Toast.clear()
            } else {
              Toast(res.msg)
            }
          })
          .catch(function (error) {
            console.log(error)
          });
      },
      time() {
        var date = new Date();
        date.setDate(date.getDate() + 14);
        this.lastDate = {
          month:date.getMonth() + 1,
          date:date.getDate()
        }
      }
    },
    mounted() {

    },
    filters: {
      timeTrans(val,i) {
        if(val){
          let time = (new Date(val).Format("yyyy-MM-dd")).split('-')
          return time[i]
        }
      },
      EnMonthTrans(val){
        if(val){
          let str='Jan'
          if(val === '01'){
            str='Jan'
          }else if(val === '02'){
            str='Feb'
          }else if(val === '03'){
            str='Mar'
          }else if(val === '04'){
            str='Apr'
          }else if(val === '05'){
            str='May'
          }else if(val === '06'){
            str='Jun'
          }else if(val === '07'){
            str='Jul'
          }else if(val === '08'){
            str='Aug'
          }else if(val === '09'){
            str='Sep'
          }else if(val === '10'){
            str='Oct'
          }else if(val === '11'){
            str='Nov'
          }else if(val === '12'){
            str='Dec'
          }
          return str;
        }
      }
    }
  }
</script>

