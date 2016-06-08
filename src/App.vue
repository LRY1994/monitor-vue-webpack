<style>
    
.sidebar {
    display: none;
}
@media (min-width: 768px) {
    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        display: block;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
        background-color: #f5f5f5;
        border-right: 1px solid #eee;
    }
}

.nav-sidebar {
    margin-right: -21px; 
    margin-bottom: 20px;
    margin-left: -20px;
}
.nav-sidebar > li > a {
    padding-right: 20px;
    padding-left: 20px;
}
.nav-sidebar > .active > a,
.nav-sidebar > .active > a:hover,
.nav-sidebar > .active > a:focus {
    color: #fff;
    background-color: #428bca;
}



</style>
<template>
	<div class="container-fluid">
        <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
                <li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
                <li ><a v-link="'/allClients'">查询所有客户端在线状态</a></li>
                <li ><a v-link="'/onlineClients'">查看所有在线用户</a></li>
                <li ><a v-link="'/offlineClients'">查看所有下线用户</a></li>
                <li ><a v-link="'/amountDistribution'">在线/下线客户分布</a></li>
                <li ><a v-link="'/timeDistribution'">在线/下线时间分布</a></li>   
                <li ><a v-link="'/particularClient'">查询单个客户端在线状态</a></li>

               


            </ul>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 ">
            <router-view></router-view>
            
        </div>

</div>
  
</template>
