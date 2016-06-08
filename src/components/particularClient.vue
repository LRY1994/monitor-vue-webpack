<template>
	<div>
	<h1 class="page-header">您所查询的客户:</h1>
  <from>
  <input type="text"  id="singleId" placeholder="输入chientId..." >  
  <button type="button" class="btn btn-primary" v-on:click="getMessageList">查询</button>
  </from>
  
    <div class="table-responsive" id="tableContainer" style="display:none">
        <table class="table table-hover" >
            <thead>
            <tr>
                <th>clientId</th>
                <th>status</th>
                <th>timestamp</th>

            </tr>
            </thead>
            <tbody class="message">
              
            </tbody>
        </table>
      </div>
      <div class="alertMessage"></div>
   </div>
</template>

   <script type="text/javascript">
   	   import getData from '../services/getData.js';
   	   
   	   export default{
         
         
   	   	  methods:{
   	   	  	getMessageList:function(){
            
   	   	  		var url='http://172.16.38.169:8089/client/statusList/'+$('#singleId').val();
               //var  url="src/data/data2.json";
   	   	  		 var ret=getData.httpGet(url,true);
               //console.log(ret);
               var item=$('.alertMessage');
               $('#tableContainer').show();
   	   	  		if(ret){               
   	   	  		  $('.message').html('<tr><td>'+ret['clientId']+'</td><td>'+ret['status']+'</td><td>'+ret['timestamp']+'</td></tr>');
   	   	  	                        
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

