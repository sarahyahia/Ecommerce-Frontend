<template>
<v-row>
  <swiper class="swiper col-12 "  :options="swiperOption">
        <swiper-slide class="px-3" v-for="product, i in products" :key="i">
            <span class="badge display-6" style="{z-index:2; color:purple;}">{{10-i}}</span>
            <ProductBox :product="product.product" />
        </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
  
  </v-row>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import ProductBox from '@/components/ProductBox.vue';
  import 'swiper/css/swiper.css'
  export default {
    name: 'Slider',
    components: {
      Swiper,
      SwiperSlide,
      ProductBox,
    },
    props:{
        products: Array,
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 4,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }
</script>
<style scoped>
.swiper {
  height: 100%;
  width: 100%;
  color:purple;


}
.swiper-slide {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    text-align: center;
    font-weight: bold;
    background-color: #fff;
    color:purple;
}
</style>