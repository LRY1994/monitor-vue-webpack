<template>
  <div>
  <h1 class="page-header">上线客户</h1>
            <div class="table-responsive" id="tableContainer">
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
             <div class="callBackPager"></div>
            <div class="alertMessage"></div>
   </div>
</template>
   <script type="text/javascript">
       import getData from '../services/getData.js';
         import pagination from'../js/extendPagination.js';
       export default{
         ready(){
           this.getMessageList();
         },
          data(){
            return {
              msgList:[],
              
              totalSize:0,              
              pageSize:15
            }
          },
          
          // route: {
          //      activate: function (transition) {              
          //        transition.next();
          //        this.getMessageList();
          //      }
          //  },

          methods:{
            getMessageList:function(){
              var url='http://172.16.38.169:8089/client/statusList';
              //var url="src/data/data.json";
              var ret=getData.httpGet(url,true);
              var num=ret.total;
              var items=ret.data;
              var it=$('.alertMessage');
              if(ret){
                                
                for(var h=0;h<num;h++){
                      if(items[h]['status']=='online') {
                           this.totalSize++;
                           this.msgList.push(items[h]);
                        }                                             
                }
                var dataList=this.msgList;
               getData.gotoPage(1,this.msgList,this.pageSize,this.totalSize);
                $('.callBackPager').extendPagination({
                  totalCount: this.totalSize,
                  showCount:this.totalSize/this.pageSize,
                  limit: this.pageSize,
                 callback: function (curr, limit, totalCount) {
                  getData.gotoPage(curr,dataList,limit,totalCount);
                 }
                }); 
 

              }
              else {
              this.alertmessagetip(it,"请求失败");
              }
            },

            
            alertmessagetip:function(item,msg){
                $('.alertMessage').html(msg).css("dispaly","block").fadeIn("fast");               
            }
            
                    
          }
          
       }
     
   </script>
