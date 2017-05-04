<template>
	<div class="bvs">
		<div class="detail">
			<ul>
				<router-link to='/main/home' tag='li'>返回></router-link>
				<li>详情页</li>
				<li></li>
			</ul>
		</div>
		<div class="cens">
			<img :src="arr.img" alt="">
		</div>
	</div>
</template>
<script>
	export default{
			name:"details",
			data(){
				return{
					arr:this.$route.query.arr
				}
			}
		}
</script>
