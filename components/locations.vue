<template>
<div class="block-content">
  <div class="">
    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
        <div class="topcurated  px-4 py-4 md:px-6 lg:px-8">
      <div class="font-bold goTo text-3xl toptext text-center">Locations</div>
      <div class="text-700 text-center mb-5 line-height-3">Dreaming of owning or renting a property in Zimbabwe's major cities?</div>
    </div>
      <div class="grid grid-nogutter">
        <div class="col-12 lg:col-4 p-3">
          <div class="p-3 shadow-2 border-round surface-card h-full">
            <div class="flex justify-content-between text-500">
              <span @click="navigateTo(`/search_by_location-${harare.id}`)" class="city cursor-pointer">Harare</span>
              <span @click="navigateTo(`/search_by_location-${harare.id}`)" class="inline-flex cursor-pointer">
                <i class="pi pi-home mr-2"></i>
                <span>{{ harare?.total ? harare?.total : 0 }} Properties</span>
              </span>
            </div>
            <img src="/images/harare.png" alt="Image" class="block w-full mt-5">
          </div>
        </div>
        <div class="col-12 lg:col-4 p-3">
          <div class="p-3 shadow-2 border-round surface-card h-full">
            <div class="flex justify-content-between text-500">
              <span @click="navigateTo(`/search_by_location-${bulawayo.id}`)" class="city cursor-pointer">Bulawayo</span>
              <span @click="navigateTo(`/search_by_location-${bulawayo.id}`)" class="inline-flex cursor-pointer">
                <i class="pi pi-home mr-2"></i>
                <span>{{ bulawayo?.total ? bulawayo?.total : 0 }} Properties</span>
              </span>
            </div>
            <img src="/images/bulawayo.png" alt="Image" class="block w-full mt-5">
          </div>
        </div>
        <div class="col-12 lg:col-4 p-3">
          <div class="p-3 shadow-2 border-round surface-card h-full">
            <div class="flex justify-content-between text-500">
              <span @click="navigateTo(`/search_by_location-${gweru.id}`)" class="cursor-pointer city">Gweru</span>
              <span @click="navigateTo(`/search_by_location-${gweru.id}`)" class="cursor-pointer inline-flex">
                <i class="pi pi-home mr-2"></i>
                <span>{{ gweru?.total ? gweru?.total : 0 }} Properties</span>
              </span>
            </div>
            <img src="/images/gweru.png" alt="Image" class="block w-full mt-5">
          </div>
        </div>
      </div>
    </div>
  </div>
  <!---->
</div>
  </template>
  <script lang="ts" setup>
const adminStore = useAdminStore()
const locations = ref()
const harare = ref()
const bulawayo = ref()
const gweru = ref()

onMounted(async() => {
  let subbs = await adminStore.getLocationTotals().then((data) => {
     console.log("datatat",data?.data?.harare)
     harare.value = data?.data?.harare,
     bulawayo.value = data?.data?.bulawayo,
     gweru.value = data?.data?.gweru
     locations.value = data?.data?.properties

    })
})
</script>
  <style>
  span.city {
      background-color: #ecc36b;
      padding: 10px;
      color: white !important;
      border-radius: 5px;
  }
  </style>
  
<style>
span.city {
    background-color: #ecc36b;
    padding: 10px;
    color: white !important;
    border-radius: 5px;
}
</style>