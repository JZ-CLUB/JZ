<template>
  <div>
    <div id="calendar" class="calendar">
      <div class="calendar__showcalender">
        <img src="./mod/img/ShowCalendar.jpg">
      </div>
    </div>
    <div id="calendar2" class="calendar"></div>
  </div>
</template>
<script>
  import {sig} from '../../common/weixin'
  import './mod/css/calendar.css';





  (function ($, window, document, undefined) {

    var Calendar = function (elem, options) {
      this.$calendar = elem;

      this.defaults = {
        ifSwitch: false,
        hoverDate: false,
        backToday: false
      };

      this.opts = $.extend({}, this.defaults, options);

      console.log(this.opts);
    };

    Calendar.prototype = {
      showHoverInfo: function (obj) { // hover 时显示当天信息
        var _dateStr = $(obj).attr('data');
        var offset_t = $(obj).offset().top + (this.$calendar_today.height() - $(obj).height()) / 2;
        var offset_l = $(obj).offset().left + $(obj).width();
        var changeStr = addMark(_dateStr);
        var _week = changingStr(changeStr).getDay();
        var _weekStr = '';

        //this.$calendar_today.show();

        this.$calendar_today
          .css({left: offset_l + 30, top: offset_t})
          .stop()
          .animate({left: offset_l + 16, top: offset_t});

        switch(_week) {
          case 0:
            _weekStr = 'Sunday';
            break;
          case 1:
            _weekStr = 'Monday';
            break;
          case 2:
            _weekStr = 'Tuesday';
            break;
          case 3:
            _weekStr = 'Wednesday';
            break;
          case 4:
            _weekStr = 'Thursday';
            break;
          case 5:
            _weekStr = 'Friday';
            break;
          case 6:
            _weekStr = 'Saturday';
            break;
        }

        this.$calendarToday_date.text(changeStr);
        this.$calendarToday_week.text(_weekStr);
      },

      showCalendar: function () { // 输入数据并显示

        var self = this;
        var year = this.opts.eyear;
        var month = this.opts.emonth;
        var dateStr = this.opts.eyear.toString()+this.opts.emonth.toString()+"01";
        var firstDay = new Date(year, month - 1, 1); // 当前月的第一天
        console.log(dateObj.getDate());
        console.log(this.opts.eyear.toString()+this.opts.emonth.toString()+"01")
        this.$calendarTitle_text.text(year + '年' + dateStr.substr(4, 2)+'月');

        this.$calendarDate_item.each(function (i) {
          // allDay: 得到当前列表显示的所有天数
          var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
          var allDay_str = returnDateStr(allDay);

          $(this).text(allDay.getDate()).attr('data', allDay_str);

          if (returnDateStr(new Date()) === allDay_str) {
            $(this).attr('class', 'item');
          } else if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
            $(this).attr('class', 'item');
          } else {
            $(this).attr('class', 'item');
          }
        });

        // 已选择的情况下，切换日期也不会改变
        if (self.selected_data) {
          var selected_elem = self.$calendar_date.find('[data='+self.selected_data+']');

          selected_elem.addClass('item-selected');
        }
      },

      renderDOM: function () { // 渲染DOM
        this.$calendar_title = $('<div class="calendar-title"></div>');
        this.$calendar_week = $('<ul class="calendar-week"></ul>');
        this.$calendar_date = $('<ul class="calendar-date"></ul>');
        this.$calendar_today = $('<div class="calendar-today"></div>');


        var _titleStr = '<a href="#" class="title"></a>'+
          '<a href="javascript:;" id="backToday">T</a>'+
          '<div class="arrow">'+
          '<span class="arrow-prev"><</span>'+
          '<span class="arrow-next">></span>'+
          '</div>';
        var _weekStr = '<li class="item">SUN</li>'+
          '<li class="item">MON</li>'+
          '<li class="item">TUE</li>'+
          '<li class="item">WED</li>'+
          '<li class="item">THU</li>'+
          '<li class="item">FIR</li>'+
          '<li class="item">SAT</li>';
        var _dateStr = '';
        var _dayStr = '<i class="triangle"></i>'+
          '<p class="date"></p>'+
          '<p class="week"></p>';

        for (var i = 0; i < 6; i++) {
          _dateStr +=
            '<a><li class="item" >26</li></a>'+
            '<a><li class="item" >26</li></a>'+
            '<a><li class="item" >26</li></a>'+
            '<a><li class="item" >26</li></a>'+
            '<a><li class="item" >26</li></a>'+
            '<a><li class="item" >26</li></a>'+
            '<a><li class="item" >26</li></a>';
        }

        this.$calendar_title.html(_titleStr);
        this.$calendar_week.html(_weekStr);
        this.$calendar_date.html(_dateStr);
        this.$calendar_today.html(_dayStr);

        this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today);
        this.$calendar.show();
      },

      inital: function () { // 初始化
        var self = this;

        this.renderDOM();

        this.$calendarTitle_text = this.$calendar_title.find('.title');
        this.$backToday = $('#backToday');
        this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
        this.$arrow_next = this.$calendar_title.find('.arrow-next');
        this.$calendarDate_item = this.$calendar_date.find('.item');
        this.$calendarToday_date = this.$calendar_today.find('.date');
        this.$calendarToday_week = this.$calendar_today.find('.week');

        this.selected_data = 0;

        this.showCalendar();

        if (this.opts.ifSwitch) {
          this.$arrow_prev.bind('click', function () {
            var _date = dateObj.getDate();

            dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));

            self.showCalendar();
          });

          this.$arrow_next.bind('click', function () {
            var _date = dateObj.getDate();

            dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));

            self.showCalendar();
          });
        }

        if (this.opts.backToday) {
          var cur_month = dateObj.getDate().getMonth() + 1;

          this.$backToday.bind('click', function () {
            var item_month = $('.item-curMonth').eq(0).attr('data').substr(4, 2);
            var if_lastDay = (item_month != cur_month) ? true : false;

            if (!self.$calendarDate_item.hasClass('item-curDay') || if_lastDay) {
              dateObj.setDate(new Date());

              self.showCalendar();
            }
          });
        }

        /*this.$calendarDate_item.hover(function () {
          self.showHoverInfo($(this));
        }, function () {
          self.$calendar_today.css({left: 0, top: 0}).hide();
        });*/

        this.$calendarDate_item.click(function () {
          var _dateStr = $(this).attr('data');
          var _date = changingStr(addMark(_dateStr));
          var $curClick = null;

          self.selected_data = $(this).attr('data');

          dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));

          if (!$(this).hasClass('item-curMonth')) {
            self.showCalendar();
          }

          $curClick = self.$calendar_date.find('[data='+_dateStr+']');
          console.log(_dateStr)
          //$curDay = self.$calendar_date.find('.item-curDay');
          if (!$curClick.hasClass('item-selected')) {
            self.$calendarDate_item.removeClass('item-selected');

            $curClick.addClass('item-selected');
          }
        });
      },

      constructor: Calendar
    };

    $.fn.calendar = function (options) {
      var calendar = new Calendar(this, options);

      return calendar.inital();
    };


    // ========== 使用到的方法 ==========

    var dateObj = (function () {
      var _date = new Date();

      return {
        getDate: function () {
          return _date;
        },

        setDate: function (date) {
          _date = date;
        }
      }
    })();

    function returnDateStr(date) { // 日期转字符串
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();

      month = month <= 9 ? ('0' + month) : ('' + month);
      day = day <= 9 ? ('0' + day) : ('' + day);

      return year + month + day;
    };

    function changingStr(fDate) { // 字符串转日期
      var fullDate = fDate.split("-");

      return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
    };

    function addMark(dateStr) { // 给传进来的日期字符串加-
      return dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6);
    };

    // 条件1：年份必须要能被4整除
    // 条件2：年份不能是整百数
    // 条件3：年份是400的倍数
    function isLeapYear(year) { // 判断闰年
      return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }


  })(jQuery, window, document);
    export default {
      name: "calendar",
      created: function() {
        sig()
      },
      created: function() {
        this.send(this);
      },
      methods:{
        send:function (e) {
          let date=new Date;
          let year=date.getFullYear()  ;
          let month=date.getMonth()+1;
          let day=date.getDate();
          let monthn = month + 1;
          let yearn;




          if(monthn>12){
            monthn = 1;
            yearn = year + 1;
          }else{
            yearn = year;
          }
          month =(month<10 ? "0"+month:month);
          monthn =(monthn<10 ? "0"+monthn:monthn);


          day = year.toString()+month.toString()+day.toString();
          let ym = year+"-"+month;
          //console.log(day);
          function add0(m){return m<10?'0'+m:m }
          function format(shijianchuo)
          {
            let time = new Date(shijianchuo);
            let y = time.getFullYear();
            let m = time.getMonth()+1;
            let d = time.getDate();
            /*var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();*/
            return y+add0(m)+add0(d);
          }

          Ajax.post('target/product/goodsActivityTime', {
            //Ajax.post('http://rap.taobao.org/mockjsdata/31603/get', {
            goodsClass:"31",
            activityMonth:ym,
          }).then(function (response) {
            console.log(response.data.data);
            let days = response.data.data;
            $('#calendar').calendar({
              ifSwitch: true, // 是否切换月份
              hoverDate: false, // hover是否显示当天信息
              backToday: false, // 是否返回当天
              emonth:month,
              eyear:year
            });
            $('#calendar2').calendar({
              ifSwitch: true, // 是否切换月份
              hoverDate: false, // hover是否显示当天信息
              backToday: false, // 是否返回当天
              emonth:monthn,
              eyear:yearn
            });
            let a ={};
            for(let d in days){
              let ad =  format(days[d].startTime);
              let goodsId =  days[d].goodsId;
              if(parseInt(ad)>=parseInt(day)){
                a[ad]= goodsId;

              }else{

              }

            }
            //console.log(a);
            var test = window.location.host;
            for (let b in a){
              $(".item[data="+b+"]").addClass("item-curMonth");
              //console.log(test+"/#/activityGoods/155")
              let url = "http://"+test+"/h5/#/activityGoods/"+a[b];
              $(".item[data="+b+"]").parent(a).attr("href",url)
              //console.log($(".item[data="+b+"]").parent(a))
            }
            //$("li[tid='"+d+"']")
            //$(".item-curMonth").each(function (index,e) {
              //console.log($(e).attr('data'))
            //});
            //let v = this.$el;
          })
        }
      }

    }

</script>
<style lang="less">
  body{
    background-color: #000;
  }
  .calendar{
    background-color: #000;
    padding: 0;
    margin: 0;
    #backToday{
      display: none;
    }
    &__showcalender{
    }
    .calendar-week{
      border: none;
      padding: 0;
      background-color: #1a1a1a;
      & .item{
        width: 14%;
      }
    }
    .calendar-date{
      & .item.item-curDay{
        background-color: transparent;
        color: #f0c37a;
        font-weight: bold;
      }
    }
    .calendar-title{
      height: 50px;
      & .arrow{
        display: none;
        width: 100%;
      }
      & .arrow-prev{
        margin-left: 10px
      }
      & .arrow-next{
        margin-right: 10px
      }
      & a.title{
        font-size: 18px;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        display: block;
        color: #ebb975;
        font-weight: bold;
      }
    }
    .calendar-date{
      & .item.item-curMonth{
        color: #f0c37a;
      }
      & .item{
        width: 14%;
        height: 70px;
        line-height: 70px;
        color: #fff;
      }
    }

  }
  .calendar-date .item-selected, .calendar-date .item-selected:hover{
    background-color: transparent;
  }
  .calendar-date .item:hover, .calendar-date .item-curMonth:hover {
    background-color: transparent;
  }
</style>
