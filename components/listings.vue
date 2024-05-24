<template>
    <div class="topcurated  px-4 py-4 md:px-6 lg:px-8">
      <div class="font-bold goTo text-3xl toptext text-center">Featured Properties</div>
      <div class="text-700 text-center mb-5 line-height-3">Curated list of the best real estate listings available</div>
    </div>
    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <div class="grid -mt-3 -ml-3 -mr-3">
  <div v-for="property in properties" class="col-12 md:col-4 lg:col-3">
    <div class="p-2">
      <div class="shadow-2 p-4 surface-card border-round">
        <div class="relative mb-3">
          <span v-if="property?.listing_status === 'FOR_SALE'" class=" for_sale surface-card listing_type text-900 shadow-2 px-3 py-2 absolute" style="border-radius: 1.5rem; left: 1rem; top: 1rem;">FOR SALE</span>
          <span v-if="property?.listing_status === 'FOR_RENT'"  class="for_rent surface-card listing_type text-900 shadow-2 px-3 py-2 absolute" style="border-radius: 1.5rem; left: 1rem; top: 1rem;">FOR RENT</span>
          <Galleria :value="property?.images" :showThumbnails="false" :showIndicators="true" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px"
            :circular="true" :autoPlay="true" :transitionInterval="2000">
            <template #item="slotProps">
                <img :src="getLink(slotProps.item.image_url)" style="width: 100%; display: block" />
            </template>
        </Galleria>
        </div>
        <div class="flex justify-content-between align-items-center mb-3">
          <span class="text-900 font-medium text-xl">{{ property?.name }}<br><span class="location"><i class="pi pi-map-marker"></i>{{ property?.address }}</span></span>
          <span>
            <span class="font-medium">{{ property?.location?.location_name }}</span>
          </span>
        </div>
        <p class="mt-0 mb-3 text-600 line-height-3">{{ property?.description }}</p>
        <div class="flex align-items-center mb-3">
          <div class="tyy">
              <span>Bedrooms</span>
              <div><i class="pi pi-objects-column ttut"></i><span>{{ property?.features[0].total ? property?.features[0].total : 0 }}</span></div>
            </div>
            <div class="tyy">
              <span>Bathrooms</span>
              <div><i class="pi pi-hourglass ttut"></i><span>{{ property?.features[1].total ? property?.features[1].total : 0 }}</span></div>
            </div>
            <div class="tyy">
              <span>Area</span>
              <div>
                <i class="pi pi-expand ttut"></i><span>{{ property?.features[2].total ? property?.features[2].total : 0 }}<span> Sq Mtrs</span></span>
              </div>
            </div>
       </div>
        <span class="text-primary text-xl font-medium">{{ formatCurrency(property?.amount) }}</span>
        <Button @click="navigateTo(`/detail-${property?.id}`)" class="p-component detail-button cursor-pointer p-3 surface-900 hover:surface-800 border-none text-0 w-full transition-all transition-duration-300 text-center p-ripple" label="Details" />
       </div>
    </div>
  </div>
</div>
    </div>
</template>
<script lang="ts" setup>
const adminStore = useAdminStore()
let properties = ref()

onMounted(async() => {

  let results = await adminStore.getLiveProperties().then((data) => {
    properties.value = data?.data?.properties
  })
})
const formatCurrency = (value:any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const getLink = (link:any) => {
    let new_link = `/images/${link}`
    return new_link
}
const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);
</script>
<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #eee;
}
.topcurated {
    margin-top: 60px !important;
}
.ttut {
    font-weight: 300;
    font-size: 16px;
    margin-right: 8px;
}
span.text-900.font-medium.text-xl {
    font-size: 23px !important;
    font-weight: 800 !important;
}
span.location {
    font-size: 15px;
    font-weight: 600;
    font-style: oblique;
}
span.for_rent {
    background-color: #ecc36b !important;
    color: white !important;
}
span.for_sale {
    background-color: #27303d !important;
    color: white !important;
}
.detail-button {
    background-color: #27303d !important;
    margin-top: 5px;
}
.container {
    width: 1100px;
    margin-top: 10px !important;
    margin: 100px auto;
    display: flex;
    justify-content: space-between;
}
.tyy {
    margin-right: 35px;
}

.listing_type {
  border-radius: 8px !important;
  z-index: 1 !important;
}
.container .box {
  width: calc((100% / 3) - 20px);
  background-color: white;
  position: relative;
}

.container .box:before {
  content: "Featured";
  background-color: #ecc36b;
  color: white;
  font-size: 13px;
  padding: 4px 10px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
}

.container .box:first-of-type:after {
  content: "";
  border-width: 12px;
  border-style: solid;
  border-color: transparent transparent transparent #ecc36b;
  position: absolute;
  left: 72px;
  top: 0;
  transform: translateY(-50%);
}

.container .box .top {
  position: relative;
  background-color: red;
}

.container .box .top:before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: rgba(43, 187, 175, 0.829);
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.3s;
  opacity: 0;
}

.container .box .top:hover:before {
  opacity: 1;
}

.container .box .top:after {
  content: "View Property";
  color: white;
  font-size: 12px;
  padding: 10px;
  border: 1px solid white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.3s;
  opacity: 0;
}

.container .box .top:hover:after {
  opacity: 1;
}

.container .box .top img {
  width: 100%;
  margin-bottom: -4px;
}

.container .box .top span {
  position: absolute;
  right: 20px;
  bottom: 15px;
  color: white;
  font-size: 20px;
}

.container .box .top span i {
  margin-left: 5px;
}

.container .box .bottom {
    padding: 20px 15px;
    box-shadow: 0 5px 10px 0 rgba(41, 61, 102, .2);
    position: relative;
    border-radius: 10px;
}

.container .box:not(:last-of-type) .bottom:before {
  content: "Hot";
  background-color: #ea723d;
  color: white;
  font-size: 11px;
  padding: 4px 7px;
  position: absolute;
  left: 20px;
  top: -40px;
  z-index: 1;
}

.container .box .bottom h3 {
  font-size: 15px;
}

.container .box .bottom > p {
  margin: 15px 0;
  font-size: 13px;
  line-height: 1.4;
  color: #777;
}

.container .box .bottom .advants {
  display: flex;
}

.container .box .bottom .advants > div {
  margin-right: 15px;
}

.container .box .bottom .advants > div > span {
  font-weight: bold;
  font-size: 12px;
}

.container .box .bottom .advants > div > div {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.container .box .bottom .advants > div > div i {
  color: #777;
  font-size: 22px;
}

.container .box .bottom .advants > div > div > span {
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
}

.container .box .bottom .advants > div > div > span > span {
  color: #777;
  font-weight: normal;
  margin-left: 5px;
}

.container .box .bottom .price {
  margin-top: 20px;
}

.container .box .bottom .price span:first-of-type {
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
}

.container .box .bottom .price span:last-of-type {
  color: #3eaba1;
  font-size: 22px;
}

</style>