

<template>
	<div>
	  <h1>上线 vs 下线客户数量对比</h1>
	  <div id="container"></div>
	  
    <div class="alertMessage"></div>
  </div>
   
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
   	   	  		onlineClinets:[],
                onlineClinetNum:0,
                offlineClinets:[],
                offlineClinetNum:0,
   	   	  		totalSize:0 	   	  		
   	   	  		
   	   	  	}
   	   	  },
   	   	  components:{
   	           
               highcharts 	   	  	
   	   	  },
   	   	   // route: {
           //     activate: function (transition) {              
           //       transition.next();
           //       this.getMessageList();
           //     }
           // },
   	   	  methods:{
   	   	  	getMessageList:function(){
   	   	  		var url='http://172.16.38.169:8089/client/statusList';
              //var url="src/data/data.json";
   	   	  		var ret=getData.httpGet(url,true);
   	   	  		 var item=$('.alertMessage');
   	   	  		if(ret){
                this.msgList=ret.data;
                this.totalSize=ret.total;
                    
                    for(var h=0;h<this.totalSize;h++){
                         if(this.msgList[h]['status']=='online') {
                            this.onlineClinetNum++;
                            this.onlineClinets.push(this.msgList[h]);
                        }        
                        else{
                        	this.offlineClinetNum++;
                            this.offlineClinets.push(this.msgList[h]);
                        }                                     
                    }   

                 $('#container').highcharts({
                   chart: {
		               plotBackgroundColor: null,
		               plotBorderWidth: null,
		               plotShadow: false
		           },
		           title: {
		               text: '上线、下线客户对比'
		           },
		           subtitle: {
		               text: 'online：'+this.onlineClinetNum+' offline:'+this.offlineClinetNum
		           },

		           tooltip: {
		               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		           },
		           plotOptions: {
		               pie: {
		                   allowPointSelect: true,
		                   cursor: 'pointer',
		                   dataLabels: {
		                       enabled: true,
		                       color: '#000000',
		                       connectorColor: '#000000',
		                       format: '<b>{point.name}</b>:{point.percentage:.1f} %'
		                   },
		                   events:{
		                       click:function(e){
		                          if(e.point.name=='online')   router.go('/onlineClients');
		                           if(e.point.name=='offline')  router.go('/offlineClients');
		                       }
		                   }
		               }
		           },
		           credits:{
		               enabled:false // 禁用版权信息
		           },
		           series: [{
		               type: 'pie',		             
		               data: [
		                   {
		                       name: 'offline',
		                       y: this.offlineClinetNum/this.totalSize,
		                       sliced: true,
		                       selected: true,
		                       color:'#EAC7CD'

		                   },
		                   {
		                       name:'online',
		                       y:this.onlineClinetNum/this.totalSize

		                   }


		               ]
		           }]
		       });

              }
              else {
              this.alertmessagetip(item,"请求失败");
              }
   	   	  	},

           

             alertmessagetip:function(item,msg){
                item.html(msg).css("dispaly","block").fadeIn("fast");               
            },

            // seeonline:function(){
            // 	$('#tableContainer').show();
            //      getData.gotoPage(1,onlineClinets);
            //      $('#callBackPager').extendPagination({
            //       totalCount:  onlineClinetNum,
            //       showCount: onlineClinetNum/pageSize,
            //       limit: pageSize,

            //       callback: function (curr, limit, totalCount) {
            //         getData.gotoPage(curr,onlineClinets);
            //       }
            //    });
            // },

            // seeoffline:function(){
            // 	$('#tableContainer').show();
            // 	getData.gotoPage(1,offlineClinets);
            //      $('#callBackPager').extendPagination({
            //       totalCount: offlineClinetNum,
            //       showCount: offlineClinetNum/pageSize,
            //       limit: pageSize,

            //       callback: function (curr, limit, totalCount) {
            //         getData.gotoPage(curr,offlineClinets);
            //       }
            //    });
            // }


            

            
   	   	  }
   	   	  
   	   }
    

    

</script>