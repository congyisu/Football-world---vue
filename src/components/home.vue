<template>
<div class='container'>
<div class="navIn">
	<ul>
		<li><i class="iconfont">&#xe790;</i></li>
	<li><p id="ps"><span v-for='(val,index) in data2' :class='index==cur1?"bg":""' @click=addTab1(index)>{{val.name}}</span></p></li>
		<li><i class="iconfont">&#xe60c;</i></li>
	</ul>
</div>
<div class="centers">
 <div class="swiper-container2" id="swiper-container2">
        <div class="swiper-wrapper" id="swiper">
            <div class="swiper-slide" id="swiper-slide">
					<div class="nav">
						<ul id="move">
							 <li v-for='(val,index) in data1' :class='index==cur?"le":""' @click="addTab(index)">{{val.name}}</li>
						</ul>
					</div>
					<div class="content">
							<div class="swiper-container1" id="swiper-container1">
						        <div class="swiper-wrapper" id="swiper1">
							            <div class="swiper-slide" id="scroll">
							            <div>
							             <div id="pullDown" class=""><div class="pullDownLabel"></div></div>  
        								 <div class="pulldown-tips">下拉刷新</div>  
							          	  <div class="dls" id="dls">
												 <ul v-for='val in arr'>
													<router-link :to="{path:'/details',query:{id:val[0].id,arr:val[0]}}" tag='li'>
													<img :src='val[0].img'>
													<b>{{val[0].title}}</b>
													</router-link>
													<li></li>	
													<li>
														<router-link v-if='val[1]':to="{path:'/details',query:{id:val[1].id,arr:val[1]}}">
															<img  :src='val[1].img'>
															<b>{{val[1].title}}</b>
														</router-link>
													</li>
												</ul>
												</div>
										     <div id="pullUp" class="">  
										        <div class="pullUpLabel">加载更多</div>  
										      </div>   
											</div>
											</div>
										 <div class="swiper-slide">Slide 2</div>
							             <div class="swiper-slide">Slide 3</div>
						         </div>
						    </div>
						</div>
					</div>
            <div class="swiper-slide">Slide 2</div>
        </div>
    </div>
</div>
</div>
</template>
<script>
	var mySwiper=null,
		mySwiper1=null,
		myScroll;
	export default{
		name:"home",
		data(){
			return {
				arr:[],
				cur:0,
				cur1:0,
				text:"松手刷新数据",
				data1:[
					{"name":"足球现场"},
					{"name":"足球宝贝"},
					{"name":"足球直播"}
				],
				data2:[
					{"name":"热点"},
					{"name":"关注"}
				],
				arr1:["sdds"]
			}
		},
		methods:{
			addTab(index){
				mySwiper.slideTo(index,500)
			},
			addTab1(index){
				mySwiper1.slideTo(index,500)
			},
			dataFormat(data){
			    var tempArr = [];
			    for(var i=0,len=Math.ceil(data.length/2);i<len;i++){ // 0 1 2
			        tempArr[i] = [];
			        tempArr[i].push(data[i*2]);
			        data[i*2+1] && tempArr[i].push(data[i*2+1]);
			    }
			    return tempArr;
			}
		},
		mounted(){
			var that=this;
			var pullDown = $("#pullDown"),  
		        pullUp = $("#pullUp"),  
		        pullDownLabel = $(".pullDownLabel"),  
		        pullUpLabel = $(".pullUpLabel"),  
		        container = $('#dls'),
	        	loadingStep = 0; 
				pullDown.hide();
				pullUp.hide();
			this.$http.get("./static/livelist.json")
				.then((res) =>{
							that.arr=that.dataFormat(res.data.data)
							that.arr1=res.body.data
							},(res) => {
							console.log("Error")
						}
					)
				setTimeout(function(){
					mySwiper=new Swiper(".swiper-container1",{
						onSlideChangeStart:function(){
								that.cur=mySwiper.activeIndex
							}
						})
					mySwiper1=new Swiper(".swiper-container2",{
						onSlideChangeStart:function(){
								that.cur1=mySwiper1.activeIndex
							}
						})
						myScroll=new IScroll("#scroll",{
				                probeType: 2,
				                click:true
						}) 	   
							function onScroll() {
							    if (this.y > 40 && loadingStep == 0) {
							        $(".pulldown-tips").hide();
							        pullDown.addClass("refresh").show();
							        pullDownLabel.text("松手刷新数据");
							        loadingStep = 1;
							        myScroll.refresh();
							    } else if (this.y < (this.maxScrollY - 40) && loadingStep == 0) {
							        $(".pullup-tips").hide();
							        pullUp.addClass("loading").show();
							        pullUpLabel.text("松手载入数据");
							        loadingStep = 1;
							        myScroll.refresh();
							    }
							}

							function onScrollEnd() {
							    if (loadingStep == 1 && pullDown.hasClass("refresh")) {
							        //下拉刷新操作
							        pullDown.removeClass("refresh");
							        pullDownLabel.text("正在刷新");
							        loadingStep = 2;
							        pullDownAction();
							    } else if (loadingStep == 1 && pullUp.hasClass("loading")) {
							        pullUp.removeClass("loading");
							        pullUpLabel.text("正在加载");
							        loadingStep = 2;
							        pullUpAction();
							         myScroll.refresh();
							    }
							}
							myScroll.on("scroll", onScroll);
							myScroll.on("scrollEnd", onScrollEnd);
					 function pullDownAction(){
							 		setTimeout(function(){
							        	that.$http.get("./static/livelist.json")
										.then((res) =>{
												that.arr1=res.body.data.concat(that.arr1)
												that.arr=that.dataFormat(that.arr1)
													},(res) => {
													console.log("Error")
												}
											)
			   						 pullDown.attr('class','').hide();  
								     myScroll.refresh();
								     loadingStep = 0;
								     $(".pulldown-tips").show();
							 	},1000)
							 }
					function pullUpAction(){
							setTimeout(function(){
								that.$http.get("./static/livelist1.json")
										.then((res) =>{
													that.arr1=that.arr1.concat(res.body.data)
													console.log(that.arr1)
													that.arr=that.dataFormat(that.arr1)
													},(res) => {
													console.log("Error")
												}
											)
							    	 pullUp.attr('class','').hide();
	               					 loadingStep = 0;
							 		 myScroll.refresh();
               					  },1000)  
							 }
					},200)	
			}
		}

</script>