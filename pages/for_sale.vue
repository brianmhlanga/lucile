<template>
    <NuxtLayout name="main" >
        <div class="block-content">
    <div class="">
      <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      
        <div class="surface-ground">
  <div class="grid -mr-3 -ml-3">
    <div class="col-12 lg:col-9">
        <div class="grid formgrid p-fluid border-round ">
    <div class="border-round surface-border border-1 col-12">
        <ul class="list-none p-0 m-0">
            <li v-for="property in properties" class="surface-border flex">
                <div class="grid col-12 surface-card mb-5 border-round shadow-2">
                    <div class="col-6">
                        <img :src="getLink(property?.images[0]?.image_url)" alt="Image" class="border-round-left" style="height: auto; width: 100%;">
                    </div>
                    <div class="col-6 p-4">
                        <div class="flex justify-content-between mb-3">
                            <span class="text-orange-500 font-medium">{{ property?.name }}</span>
                            <span class="text-500 sale text-lg font-medium" style="white-space: nowrap;">FOR SALE</span>
                        </div>
                        <div class="font-medium text-900 mb-3 line-height-3"><i class="pi pi-map-marker" style="font-size: 1rem;font-weight: 900;margin-right: 10px;"></i>{{ property?.address }}, {{ property?.suburb?.suburb_name }}, {{ property?.location?.location_name }}</div>
                        <div class="line-height-3 text-lg text-900 mb-3">{{ property?.description }}</div>
                        <div class="detail_button">
                            <Button class="w-4 ghf" @click="navigateTo(`/detail-${property.id}`)" label="Details" />
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>

    </div>
    <div class="col-12 lg:col-3">
      <div class="surface-card border-round shadow-2 p-5">
        <div class="flex justify-content-between align-items-center border-bottom-1 pb-3 surface-border">
          <span class="text-900 font-medium text-lg lg:text-xl">
            <i class="pi pi-home text-xl mr-2"></i>Search By Suburb</span>
        </div>
        <div class="py-2 mt-3  surface-border">
          <div v-for="suburb in suburbs" class="text-900 font-medium mb-2">{{suburb?.suburb_name}} ({{ suburb?.property ? suburb?.property.length : 0 }})</div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
    <!---->
  </div>
    </NuxtLayout>
 
</template>
<script lang="ts" setup>
const adminStore = useAdminStore()
const properties = ref()
const suburbs = ref()
onMounted(async() => {
    let data = {
      status: "FOR_SALE"
    }
    let result = await adminStore.getFilteredProperties(data).then((data) => {
      properties.value = data?.data?.properties
    })
    let subbs = await adminStore.getSuburbTotals(data).then((data) => {
     console.log("datatat",data?.data?.properties)
     suburbs.value = data?.data?.properties

    })
})
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

const callAgent = async (pn:any) => {
  console.log("pn",pn)
  navigateTo(`tel:${pn}`,{
    external: true
  })
}

const formatCurrency = (value:any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const getLink = (link:any) => {
    let new_link = `/images/${link}`
    return new_link
}
</script>
<style>
.pnames {
    font-size: 30px !important;
    font-weight: 600 !important;
}
span.location.wises {
    font-size: 20px;
    font-weight: 200;
}
span.text-500.sale.text-lg.font-medium {
    background-color: #ecc36b;
    color: white !important;
    padding: 5px;
    border-radius: 2px;
}
span.text-orange-500.font-medium {
    color: black !important;
    font-size: 25px;
}
.ghf {
    float: right;
    background-color: #27303d;
    border: none;
    height: 45px;
    justify-content: space-between;
}
</style>