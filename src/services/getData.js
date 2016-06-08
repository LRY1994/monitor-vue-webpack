//基础控制类
var $ = require('../js/jquery-1.12.4.min.js');

module.exports = {
    httpGet: function(url, auth) {
        var result;
        $.support.cors = true;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            async: false,           
            success: function(data) {
                result = data;
              
            },
            error:function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                }
             }

           )
        return result;
    },

    httpPost: function(url, data, auth) {
        var result;
        $.support.cors = true;        
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "json",
            async: false,
           
            success: function(data) {
                result = data;
            }
        });
        return result;
    },

     // 转到第几页
      gotoPage: function (pn,data,pageSize,totalSize){
       
         var start=(pn-1)*pageSize;
         var end=start+pageSize;
         end=Math.min(end,totalSize);
        $('.message').empty();
         var txtHtml="";

        for(var k=start;k<end;k++){
          var item=data[k];
          if(item['status']=="online") {
             txtHtml += '<tr class="success"><td>' + item['clientId'] + '</td><td>' + item['status'] + '</td><td>' + item['timestamp'] + '</td>';
           }
         else {
          txtHtml += '<tr><td>' + item['clientId'] + '</td><td>' + item['status'] + '</td><td>' + item['timestamp'] + '</td>';
           }
        }
        
      $('.message').html(txtHtml);
      }
};
