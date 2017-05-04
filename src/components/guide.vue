<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
       <div class="swiper-slide"><img src="/static/img/slide1.png" alt=""></div>
       <div class="swiper-slide"><img src="/static/img/slide2.png" alt=""></div>
       <div class="swiper-slide"><img src="/static/img/slide3.png" alt=""></div>
       <div class="swiper-slide">
       <router-link to="/main/home" >
        <img src="/static/img/slide4.png" alt="">
       </router-link>
       </div>
    </div>
  </div>
</template>

<script>
 setTimeout(function(){
  new Swiper('.swiper-container');
},200)
</script>
