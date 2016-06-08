import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


Vue.use(VueResource)
Vue.use(VueRouter)

const router=new VueRouter()

router.map({
	'/home':{
		component:require('./components/Home.vue')
	},
	'*':{//404路由
		component:require('./components/Home.vue')
	},
	'/allClients':{
		component:require('./components/allClients.vue')
	},
	'/offlineClients':{
		component:require('./components/offlineClients.vue')
	},
	'/onlineClients':{
		component:require('./components/onlineClients.vue')
	},
	'/particularClient':{
		component:require('./components/particularClient.vue')
	},
	'/amountDistribution':{
		component:require('./components/amountDistribution.vue')
	},
	'/timeDistribution':{
		component:require('./components/timeDistribution.vue')
	}
	
	
})


router.start(App,'#app');
router.go('/allClients');