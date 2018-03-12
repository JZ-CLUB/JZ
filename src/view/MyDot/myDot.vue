<template>
    <div>
        <div v-if="no_con">
           <div class="bean_tit">
               <ul class="bean_tit_con">
                   <li class="first_tit_con">爵士豆</li>
                   <li class="second_tit_con">0</li>
               </ul>
           </div>
           <div class="bean_con">
               <img src="../../images/bean_05.png">
           </div>
        </div>
        <div v-if="con_con">
            <div class="bean_tit">
               <ul class="bean_tit_con">
                   <li class="first_tit_con">爵士豆</li>
                   <li class="second_tit_con">0</li>
               </ul>
           </div>
           <div class="con_bean_con">
               <div class="con_bean_con_con" v-for="(item, index) in items" :key="index">
                    <div class="con_bean_con_con_li">
                        <span v-if=' item.zhi > 0 ' class="con_bean_con_icon"></span>
                        <span v-if=' item.zhi < 0 ' class="con_bean_con_icon_active"></span>
                        <div class="con_bean_con_p">
                            <p class="con_bean_con_tit">{{ item.title }}</p>
                            <p class="con_bean_con_data">{{ item.riqi }}</p>
                        </div>
                        <span v-if=' item.zhi > 0 ' class="con_bean_con_num">{{ item.zhi }}</span>
                        <span v-if=' item.zhi < 0 ' class="con_bean_con_num_fu">{{ item.zhi }}</span>
                    </div>
               </div>
           </div>
           <div class="no_more">
               <p>———— 没有更多消费记录 ————</p>
           </div>
        </div>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup, Field, Button} from 'vant';
    export default {
        name: "my-dot",
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Button.name]: Button
        },
        data(){
            return {
                formData: {
                phoneNum: this.phoneNum,
                yzCode:this.yzCode,
                },
                no_con: false,
                con_con: true,
                items:[]
            }
        },
        created() {
            // Toast.loading({mask: true, duration: 0});
            let vm = this
            this.doudou();
        },
        methods:{
            doudou: function (res) {
                let that = this
                Ajax.get('/static/myDot.json')
                // Ajax.post('target/orderapi/orderdetail', {orderid: that.$route.params.orderId})
                .then(function (res) {
                    that.items = res.data.data;
                })
                .catch(function (error) {
                    // console.log(error)
                    // Toast('加载失败error')
                });
            },
        }
    }

</script>

<style lang="less" scoped>
    .bean_tit{
        width: 100%;
        height: 2.21rem;
        background: url("../../images/bean_icon_02.jpg") no-repeat center;
        background-size: contain;
        .bean_tit_con{
            width: 23.4%;
            padding-left: 6.14%;
            vertical-align: middle;
            display: table-cell;
            padding-top: 0.27rem;
            li{
                padding-top: 0.23rem;
            }
           .first_tit_con{
               color:#d1515a;
               font-size: 0.32rem;
           }
           .second_tit_con{
               color:#f0c37a;
               font-size: 0.8rem;
           }
        }
    }
    .bean_con{
        width: 32%;
        margin: 0 auto;
        margin-top: 1.6rem;
    }
    .con_bean_con{
        background: #1a1a1a;
        .con_bean_con_con{
            width:90%;
            height: 1.4rem;
            background: #1a1a1a;
            margin-left: 6%;
            border-bottom: 1px solid #000;
            .con_bean_con_con_li{
                   width: 88.4%;
                   margin:0 auto;
                   position: relative;
               }
           li{
               margin-left: 6%;
               border-bottom: 1px solid #000;
               padding-right: 6%;
               height: 1.4rem;   
           }
           .con_bean_con_icon{
               width: 7.4%;
               height: 0.46rem;
               background: url("../../images/bean_icon_05.png") no-repeat center;
               background-size: contain;
               display: inline-block;
           }
           .con_bean_con_icon_active{
               width: 7.4%;
               height: 0.46rem;
               background: url("../../images/bean_icon_08.png") no-repeat center;
               background-size: contain;
               display: inline-block;
           }
           .con_bean_con_num{
               height: 1.4rem;
               line-height: 1.4rem;
               font-size: 0.32rem;
               color:#f0c37a;
               right: 0;
               position: absolute;
           }
           .con_bean_con_num_fu{
               height: 1.4rem;
               line-height: 1.4rem;
               font-size: 0.32rem;
               color:#666666;
               right: 0;
               position: absolute;
           }
           .con_bean_con_p{
                padding-left: 0.5rem;
                height: 1.5rem;
                vertical-align: middle;
                top:50%;
                left:0.45rem;
                display: inline-block;
                .con_bean_con_tit{
                    color: #f0c37a;
                    margin-top: 0.23rem;
                    font-size: 0.28rem;
                }
                .con_bean_con_data{
                    color: #666666;
                    font-size: 0.24rem;
                }
           }
        }
    }
    .no_more{
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
        text-align: center;
        white-space: nowrap;
        color:#4c4c4c;
        margin-top: 20px;

    }
</style>
