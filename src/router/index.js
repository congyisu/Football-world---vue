import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import guide from 'components/guide'
import main from 'components/main'
import home from 'components/home'
import font from 'components/font'
import myself from 'components/myself'
import back from 'components/back'
import details from 'components/details'
Vue.use(Router)
Vue.use(VueResource)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'guide',
      component: guide
    },
     {
      path: '/details',
      name: 'details',
      component: details
    },
    {
    	path:"/main",
    	name:"main",
    	component:main,
    	children:[
    		{
    			path:"/main/home",
    			name:"home",
    			component:home
    		},
    		{
    			path:"/main/font",
    			name:"font",
    			component:font
    		},
    		{
    			path:"/main/myself",
    			name:"myself",
    			component:myself
    		},
    		{
    			path:"/main/back",
    			name:"back",
    			component:back
    		}
    	]
    }
  ]
})
