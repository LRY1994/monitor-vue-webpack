
<template>
	<div>
	  <h1>上线 vs 下线时间分布</h1>
	  <div id="container"></div>	 
     <div class="alertMessage"></div>           
</template>

<script type="text/javascript">
	import highcharts from '../js/highcharts.js';
  import getData from '../services/getData.js';
	export default{
     ready(){
           this.getMessageList();
         },
   	   	  data(){
   	   	  	return {
   	   	  		msgList:[],
             
   	   	  		dataon:[],
              dataoff:[],
   	   	  		totalSize:0,   	   	  		
   	   	  		pageSize:15
   	   	  	}
   	   	  },
   	   	
   	   	   // route: {
           //     activate: function (transition) {              
           //       transition.next();
           //       this.getMessageList();
           //     }
           // },
           components:{
            highcharts
           },
   	   	  methods:{
   	   	  	getMessageList:function(){
   	   	  		var url='http://172.16.38.169:8089/client/statusList';
              //var url="src/data/data.json";
   	   	  		var ret=getData.httpGet(url,true);
               var item=$('.alertMessage');
   	   	  		if(ret){
                this.msgList=ret.data;
                this.totalSize=ret.total;
                   
                     
                      for (var ii = 0; ii < this.totalSize ; ii++) {
                          var temp = this.msgList[ii]['timestamp'].split(' ');
                            var yy = parseInt(temp[1].substr(0, 2)) * 3600 + parseInt(temp[1].substr(3, 2)) * 60 + parseInt(temp[1].substr(6, 2));
                            yy = yy * 1000;

                          var arr=temp[0].split('-');
                          var d=Date.UTC(arr[0],arr[1]-1,arr[2]);
                          

                          
                          if (this.msgList[ii]['status'] == 'online') {
                              this.dataon.push([d,yy]);
                            
                          }
                          else {
                              this.dataoff.push([d,yy]);
                              
                          }
                        }
                      

                     


                      $('#container').highcharts({
                          chart: {
                              type: 'scatter',
                              zoomType: 'xy'
                          },
                          title: {
                              text: '上线/下线时间分布'
                          },
                          subtitle: {
                              text: '横坐标是日期,纵坐标是时间点'
                          },
                          xAxis: {
                              type: 'datetime',
                              
                              title: {
                                  text: '日期'
                              },

                              dateTimeLabelFormats: {
                                  millisecond: '%Y:%m:%d'
                              }
                             

                          },
                          yAxis: {
                              title: {
                                  text: '时间'
                              },
                              type: 'datetime',
                              dateTimeLabelFormats: {
                                  millisecond: '%H:%M:%S.%L'
                              }

                          },
                          legend: {
                              layout: 'horizontal',
                              align: 'left',
                              verticalAlign: 'top',
                              floating: true,
                              backgroundColor: '#FFFFFF',
                              borderWidth: 1
                          },
                          credits:{
                              enabled:false // 禁用版权信息
                          },
                          scrollBar: {
                              enabled: true
                          },

                          plotOptions: {

                              scatter: {
                                  marker: {
                                      radius: 5,
                                      states: {
                                          hover: {
                                              enabled: true,
                                              lineColor: 'rgb(100,100,100)'
                                          }
                                      }
                                  },
                                  states: {
                                      hover: {
                                          marker: {
                                              enabled: false
                                          }
                                      }
                                  },
                                  tooltip: {

                                      shared: true,
                                      headerFormat: '<b>{series.name}</b><br>',
                                      pointFormat: '{point.x:%Y-%m-%d},{point.y:%H:%M:%S} '


                                  }
                              }
                          },
                          series: [{
                              name: 'online',
                              color: 'rgba(223, 83, 83, .5)',
                              data: this.dataon


                          }, {
                              name: 'offline',
                              color: 'rgba(119, 152, 191, .5)',
                              data: this.dataoff

                          }]
                      });                
              }
              else {
              this.alertmessagetip(item,"请求失败");
              }
   	   	  	},

           

             alertmessagetip:function(item,msg){
                item.html(msg).css("dispaly","block").fadeIn("fast");               
            }   



   	   	  }
   	   	  
   	   }
    

    

</script>