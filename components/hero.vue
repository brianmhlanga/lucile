<template>
<div class="hero heroheight">
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectCreative,SwiperNavigation,SwiperPagination]"
    :slides-per-view="1"
    :loop="true"
    :effect="'creative'"
    :navigation="true"
    :autoplay="{
      delay: 4000,
      disableOnInteraction: true,
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    }"
  >
  <SwiperSlide v-for="(image, index) in images" :key="index">
      <img :src="image?.image" />
    </SwiperSlide>
  </Swiper>
<!-- <Carousel :value="products" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
            <template #item="slotProps">
                <div class="border-1 surface-border border-round m-2  p-3">
                    <div class="mb-3">
                        <div class="relative mx-auto">
                            <img :src="slotProps.data.image"  class="w-full border-round" />
                        </div>
                    </div>
                </div>
            </template>
</Carousel> -->
</div>

</template>
<script lang="ts" setup>
const images = ref(
  [
    {
      image: 'https://tmpnponline.co.zw/wp-content/uploads/2022/08/The-Perfect-Platters-scaled.jpg'
    },
    {
      image: 'https://tmpnponline.co.zw/wp-content/uploads/2022/08/Butcheries-Best-cuts-scaled.jpg'
    },
    {
      image: 'https://tmpnponline.co.zw/wp-content/uploads/2021/11/Fresh-of-the-Farm-scaled.jpg'
    },
    {
      image: 'https://tmpnponline.co.zw/wp-content/uploads/2022/08/Liquor-best-buys-new.png'
    }
  ]
);
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);
</script>
<style>
.heroheight {
    padding: 0;
    border-top: 0 none;
    margin-top: 100px;
}
.swiper-button-prev, .swiper-button-next {
  color:#231f20
}
.swiper-button-prev:after, .swiper-button-next:after {
    font-family: swiper-icons;
    font-size: 20px !important;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
}
.hero {
  /* height: 600px; */
  overflow: hidden;
}

.hero .swiper-container {
  height: 100%;
}

.hero .swiper-slide img {
  width: 100%;
  height: auto;
}
span.tagline {
    background-color: #0052ff;
    padding: 10px;
    color: white;
    font-size: 15px;
    border-radius: 21px;
    width: 250px;
}
.border-1 {
  border-style: none !important;
}
.p-carousel .p-carousel-indicators .p-carousel-indicator.p-highlight button {
    background-color: #d41f0c !important;
}
/* .hero {
    display: flex;
    height: 100vh;
    background-color: #121c2d;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
} */

.hero-left {
  flex: 1;
  padding: 0px 0px 60px 0; /* Remove padding on the left */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 80px;
}

.TagLine {
    font-size: 3em;
    margin-bottom: 15px;
    color: white;
}

.Heading-tag {
  color: #fd8d14;
}

.Hero-paragraph {
    font-size: 1em;
    margin-bottom: 20px;
    color: #ececec;
    max-width: 400px;
}

.Hero-button {
    /* height: 50px; */
    border-radius: 10px;
    border: none;
    /* width: 9rem; */
    /* background-color: #0052ff; */
    background-image: linear-gradient(to right, #0052ff, #8960ff) !important;
    font-family: poppins, sans-serif;
    font-size: 1em;
    /* font-weight: bold; */
    padding: 10px 15px;
    border: none;
    width: 200px;
    height: 53px;
    /* background-color: #4c4b4b; */
    color: #ffffff;
    /* border-radius: 5px; */
    cursor: pointer;
    transition: background-color 0.3s;
    align-self: start;
}

.Hero-button:hover {
    background-color: #f2f3f7;
    border: 1px solid #231f20;
    color: #313131;
}
.avatar-section {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.avatar-group {
  display: flex;
  gap: -20px;
}

.avatar-group img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: transform 0.3s;
  margin-left: -5px;
}

.avatar-text {
  margin-left: 20px;
  font-size: 1em;
  color: #777;
}

.avatar-num{
 color: #fd8d14;
   font-size: 1em;
  font-weight:bold;
}

.hero-right {
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-right img {
    width: auto;
    height: 500px;
    border-radius: 20px;
}
/* Responsive styles for smaller devices */
@media only screen and (max-width: 768px) {
  .hero {
    flex-direction: column;
  }

  .hero-left {
    margin-top: 5rem;
    text-align: center;
     margin-left: 0px;
  }

  .hero-right img {
    display: none;
  }

  .Hero-paragraph {
    text-align: center;
    max-width: 100%;
    margin-top: 20px;
  }

  .Hero-button {
    width: 100%;
    margin-top: 20px;
  }

  .avatar-section {
    justify-content: center;
    flex-direction: column;
    gap: 20px;
  }

  .avatar-text {
    text-align: center;
  }
  
  .avatar-num{
 color: #fd8d14;
   font-size: 1em;
  font-weight:bold;
    
}

}
</style>