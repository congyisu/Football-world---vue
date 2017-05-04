<template>
	<div class="box">
	<div class='container' id="main">
		<router-view></router-view>	
	</div>
	<footer>
		<ul>	
			<li v-for='(val,index) in listFooter' @click='changeIndex(index)'>	
				<router-link :to='val.url' :class="ind==index?'mark':''" >
					<i class='iconfont' v-html='val.icon'></i><p>{{val.name}}</p>	
				</router-link>
			</li> 
		</ul>
	</footer>
</div>
</template>
<script>
//应用vuex 参照footApp
	export default{
		data(){
			return {
				ind:0,
				listFooter:
					[
						{
							"name":"首页","icon":"&#xe751;","url":"/main/home"
						},
						{
							"name":"发现","icon":"&#xe752;","url":"/main/font"
						},
						{
							"name":"","icon":"&#xe77e;","url":""
						},
						{
							"name":"我的","icon":"&#xe746;","url":"/main/myself"
						},
						{
							"name":"退出","icon":"&#xe734;","url":"/main/back"
						}
					]
			}
		},
		methods:{
			changeIndex(index){
				this.ind=index
			}
		}
	}
</script>