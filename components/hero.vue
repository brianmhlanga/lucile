<template>
  <div class="block-content">
  <div class="">
    <div class="relative p-8 overflow-hidden">
      <img src="/images/banner.png" alt="Image" class="absolute top-0 left-0 w-auto h-full block md:w-full">
      <div class=" my-6 relative">
        <TabView class="tabview-custom">
    <TabPanel class="panells">
        <template #header>
            <div class="flex align-items-center gap-2">
                <span class="font-bold white-space-nowrap">For Sale</span>
            </div>
        </template>
        <div class="surface-card p-4 shadow-2 border-round p-fluid">
  <div class="grid formgrid p-fluid">
    <div class="field mb-4 col-12 md:col-3">
      <label for="company_name" class="font-medium text-900">Location</label>
      <InputText class="p-inputtext p-component" placeholder="Search Location" />
    </div>
    <div class="field mb-4 col-12 md:col-3">
      <label for="invoice_id" class="font-medium text-900">Property Types</label>
      <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="invoice_id" type="text">
    </div>
    <div class="field mb-4 col-12 md:col-2">
      <label for="customer_name" class="font-medium text-900">Refrence Code</label>
      <InputText class="p-inputtext p-component" placeholder="Ref Code" />
    </div>
    <div  class="topbuttons field mb-4 col-12 md:col-4">
      <ToggleButton v-model="checked" onLabel="Advanced Options" offLabel="Advanced Options" onIcon="pi pi-lock" 
            offIcon="pi pi-lock-open" class="w-12rem lockbtn" aria-label="Advanced Options" />
      <button class="p-button p-component w-auto" type="button" aria-label="Create Invoice" data-pc-name="button" data-pc-section="root" data-pd-ripple="true">
        <span class="p-button-icon p-button-icon-left pi pi-search" data-pc-section="icon"></span>
        <span class="p-button-label" data-pc-section="label">Search</span>
        <!---->
        <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
      </button>
    </div>
    <div v-if="checked" class="field mb-4 col-12 md:col-3">
      <label for="customer_email" class="font-medium text-900">Min Price</label>
      <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_email" type="text">
    </div>
    <div v-if="checked" class="field mb-4 col-12 md:col-3">
      <label for="customer_email" class="font-medium text-900">Max Price</label>
      <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_email" type="text">
    </div>
    <div v-if="checked" class="field mb-4 col-12 md:col-3">
      <label for="customer_email" class="font-medium text-900">Beds</label>
      <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_email" type="text">
    </div>
    <div v-if="checked" class="field mb-4 col-12 md:col-3">
      <label for="customer_email" class="font-medium text-900">Baths</label>
      <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_email" type="text">
    </div>
  </div>
  
</div>
    </TabPanel>
    <TabPanel>
        <template #header>
            <div class="flex align-items-center gap-2">
                <span class="font-bold white-space-nowrap">For Rent</span>
            </div>
        </template>
        <div class="surface-card p-4 shadow-2 border-round p-fluid">
        <div class="grid formgrid p-fluid">
          <div class="field mb-4 col-12 md:col-3">
            <label for="company_name" class="font-medium text-900">Location</label>
            <InputText class="p-inputtext p-component" placeholder="Search Location" />
          </div>
          <div class="field mb-4 col-12 md:col-3">
            <label for="invoice_id" class="font-medium text-900">Property Types</label>
            <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="invoice_id" type="text">
          </div>
          <div class="field mb-4 col-12 md:col-2">
            <label for="customer_name" class="font-medium text-900">Refrence Code</label>
            <InputText class="p-inputtext p-component" placeholder="Ref Code" />
          </div>
          <div  class="topbuttons field mb-4 col-12 md:col-4">
            <ToggleButton v-model="checked" onLabel="Advanced Options" offLabel="Advanced Options" onIcon="pi pi-lock" 
                  offIcon="pi pi-lock-open" class="w-12rem lockbtn" aria-label="Advanced Options" />
            <button class="p-button p-component w-auto" type="button" aria-label="Create Invoice" data-pc-name="button" data-pc-section="root" data-pd-ripple="true">
              <span class="p-button-icon p-button-icon-left pi pi-search" data-pc-section="icon"></span>
              <span class="p-button-label" data-pc-section="label">Search</span>
              <!---->
              <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
            </button>
          </div>
          <div v-if="checked" class="field mb-4 col-12 md:col-3">
            <label for="customer_email" class="font-medium text-900">Min Price</label>
            <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_email" type="text">
          </div>
          <div v-if="checked" class="field mb-4 col-12 md:col-3">
            <label for="customer_email" class="font-medium text-900">Max Price</label>
            <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_email" type="text">
          </div>
          <div v-if="checked" class="field mb-4 col-12 md:col-3">
            <label for="customer_email" class="font-medium text-900">Beds</label>
            <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_email" type="text">
          </div>
          <div v-if="checked" class="field mb-4 col-12 md:col-3">
            <label for="customer_email" class="font-medium text-900">Baths</label>
            <input class="p-inputtext p-component" data-pc-name="inputtext" data-pc-section="root" id="customer_email" type="text">
          </div>
        </div>
        
      </div>
    </TabPanel>
</TabView>
      </div>
    </div>
  </div>
  <!---->
</div>
</template>
<script lang="ts" setup>
const checked = ref(false);
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
.topbuttons {
    margin-top: 19px !important;
}
.lockbtn {
    margin-right: 10px !important;
    width: 212px !important;
}
.p-tabview .p-tabview-panels {
    background: #00000000 !important;
}
.p-tabview .p-tabview-nav {
    background: #ffffff00 !important;
    border: none !important;
    border-width: 0px !important;
    padding-left: 21px !important;
}
.p-tabview-nav-link p-tabview-header-action {
    background-color: #ecc36b;
    color: white !important;
    font-weight: 100 !important;
    margin-left: 5px !important;
}
.p-tabview .p-tabview-nav li .p-tabview-nav-link {
    background-color: #000000;
    color: white !important;
    font-weight: 100 !important;
    margin-left: 5px !important;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, outline-color 0.2s;
}
.p-tabview-nav-link p-tabview-header-action {
    background-color: #27303d !important;
    color: white !important;
}
li.p-tabview-ink-bar {
    color: red !important;
    height: 5px !important;
    background-color:#ecc36b !important
}
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
.topbuttons {
    padding-top: 8px !important;
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

.p-tabview .p-tabview-panels {
    /* background: #ffffff; */
    padding: 0.875rem 1.125rem 1.125rem 1.125rem;
    border: 0 none;
    color: #334155;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
}
}
</style>