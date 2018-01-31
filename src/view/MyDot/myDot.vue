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
               <ul class="con_bean_con_con">
                   <li>
                    <van-row>
                        <van-col span="2" class="con_bean_con_icon"></van-col>
                        <van-col span="18" class="con_bean_con_p">
                            <p class="con_bean_con_tit">爵士上海就睡消费</p>
                            <p class="con_bean_con_data">2018-2-1</p>
                        </van-col>
                        <van-col span="3" class="con_bean_con_num">+75</van-col>
                    </van-row>
                   </li>
                   <li>
                    <van-row>
                        <van-col span="2" class="con_bean_con_icon_active"></van-col>
                        <van-col span="18" class="con_bean_con_p">
                             <p class="con_bean_con_tit">爵士上海就睡消费</p>
                            <p class="con_bean_con_data">2018-2-1</p>
                        </van-col>
                        <van-col span="3" class="con_bean_con_num">+75</van-col>
                    </van-row>
                   </li>
                   <li>
                    <van-row>
                        <van-col span="2" class="con_bean_con_icon"></van-col>
                        <van-col span="18" class="con_bean_con_p">
                            <p class="con_bean_con_tit">爵士上海就睡消费</p>
                            <p class="con_bean_con_data">2018-2-1</p>
                        </van-col>
                        <van-col span="3" class="con_bean_con_num">+75</van-col>
                    </van-row>
                   </li>
               </ul>
           </div> 
           <div class="no_more">
               <p>------------ 没有更多消费记录 -----------</p>
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
                con_con: true
            }
        },
        methods:{
            
        }
    }
    
</script>

<style lang="less">
    .bean_tit{
        width: 100%;
        height: 2.21rem;
        background: url("../../images/bean_02.jpg") no-repeat center;
        background-size: contain;
        .bean_tit_con{
            width: 23.4%;
            padding-left: 8%;
            height: 2.21rem;
            vertical-align: middle;
            display: table-cell;
            li{
                height: 0.8rem;
                line-height: 0.8rem;
            }
           .first_tit_con{
               color: red;
               font-size: 24px;
           }
           .second_tit_con{
               color: white;
               font-size: 36px;
           }
        }
    }
    .bean_con{
        width: 32%;
        margin: 0 auto;
        margin-top: 1.6rem;
    }
    .con_bean_con{
        .con_bean_con_con{
           li{
               width: 80%;
               height: 1.5rem;
               margin: 0 auto;
               border-bottom: 1px solid #ccc;
               position: relative;
           } 
           .con_bean_con_icon{
               width: 10%;
               height: 1.5rem;
               background: url("../../images/bean_icon_03.png") no-repeat center;
               background-size: contain;
           }
           .con_bean_con_icon_active{
               width: 10%;
               height: 1.5rem;
               background: url("../../images/bean_icon_06.png") no-repeat center;
               background-size: contain;
           }
           .con_bean_con_num{
               height: 1.5rem;
               line-height: 1.5rem;
               font-size: 26px;
               color:#666;
               position: absolute;
               right: 0;
           }
           .con_bean_con_p{
                padding-left: 0.5rem;
                height: 1.5rem;
                vertical-align: middle;
                position: absolute;
                top:50%;
                margin-top: -0.4rem;
                left:0.5rem; 
                // padding-top: 0.2rem;
                .con_bean_con_tit{
                    color: #666;
                    font-size: 18px;
                }
                .con_bean_con_data{
                    color: #ccc;
                    font-size: 16px;
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
        color:#ccc;
        margin-top: 20px;
    }
</style>
