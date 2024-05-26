<template>
    <NuxtLayout name="main" >
        <div class="block-content">
    <div class="">
      <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div class="surface-ground">
  <div class="grid -mr-3 -ml-3">
    <div class="col-12 lg:col-9">
        <div class="sort-by">
        <h4>Properties: <span>{{ properties ? properties.length : 0 }}</span></h4>
        <div class="form-group xyx">
            <div>
                <Dropdown @change="getAllShowProperties()" v-model="selected_sort_option" :options="sort_options" />
            </div>
        </div>
       </div>
        <div class="grid formgrid p-fluid border-round ">
    <div class="border-round surface-border col-12">
        <ul class="list-none p-0 m-0">
            <li v-for="property in properties" class="surface-border flex">
                <div class="grid col-12 surface-card mb-5 border-round shadow-2">
                    <div class="col-4">
                        <img :src="getLink(property?.images[0]?.image_url)" alt="Image" class="border-round-left" style="height: auto; width: 100%;">
                    </div>
                    <div class="col-8 p-4">
                        <div class="flex justify-content-between mb-3">
                            <span class="text-orange-500 font-medium">{{ property?.name }}</span>
                            <span><i class="pi pi-calendar" style="font-size: 1rem;font-weight: 900;margin-right: 10px;"></i>{{ formatDate(property?.showDate) }}</span>
                            
                            <!-- <span class="text-500 sale text-lg font-medium" style="white-space: nowrap;">FOR RENT</span> -->
                        </div>
                        <div class="font-medium text-900 mb-3 line-height-3"><i class="pi pi-map-marker" style="font-size: 1rem;font-weight: 900;margin-right: 10px;"></i>{{ property?.address }}, {{ property?.suburb?.suburb_name }}, {{ property?.location?.location_name }}</div>
                        <span><i class="pi pi-clock" style="font-size: 1rem;font-weight: 900;margin-right: 10px;"></i>{{property?.showStartTime ? formatTime(property?.showStartTime) : "" }} - {{property?.showEndTime ? formatTime(property?.showEndTime) : "" }} </span>
                        <p class="line-height-3 text-lg text-900 mb-3 descriptionn" v-html="property?.description"></p>
                        <div class="flex justify-content-between border-top-1 surface-border mb-4 pt-4"><span class="text-xl text-900 font-bold text-3xl">{{ property?.amount ? formatCurrency(property?.amount) : formatCurrency(0) }}</span><Button class="w-4 ghf" @click="navigateTo(`/detail-${property.id}`)" label="Details" /></div>
                    </div>
                </div>
            </li>
            <Paginator  @page="getAllShowProperties()" v-model:first="first" v :rows="items_per_page" :totalRecords="number_of_records ? number_of_records : 0"></Paginator>
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
            <div @click="navigateTo(`/search_by_suburb-${suburb.id}`)" v-for="suburb in suburbs" class="cursor-pointer text-900 font-medium mb-2">{{suburb?.suburb_name}} ({{ suburb?.property ? suburb?.property.length : 0 }})</div>
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
import type { RefSymbol } from '@vue/reactivity';

const adminStore = useAdminStore()
const properties = ref()
const suburbs = ref()
const selected_sort_option = ref('DEFAULT')
const first = ref(0)
const items_per_page = ref(10)
const number_of_records = ref(0)
const sort_options = ref(['DEFAULT','MOST RECENT',"HIGHEST PRICE","LOWEST PRICE"])
const getAllShowProperties = async() => {
    let data = {
      sort: selected_sort_option.value,
      first: 0,
      last: items_per_page.value
    }
    let result = await adminStore.getShowProperties(data).then((data) => {
      properties.value = data?.data?.properties
      number_of_records.value = data?.data?.total
    })
}
onMounted(async() => {
    let data = {
      sort: selected_sort_option.value,
      first: 0,
      last: items_per_page.value
    }
    let result = await adminStore.getShowProperties(data).then((data) => {
      properties.value = data?.data?.properties
      number_of_records.value = data?.data?.total
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
const formatDate = (dateString:any) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date(dateString);
    date.setUTCHours(date.getUTCHours() + 3); // Add 3 hours
    const dayOfWeek = days[date.getUTCDay()];
    const dayOfMonth = date.getUTCDate().toString().padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
}
const formatTime = (utcDateString:any) => {
    const utcDate = new Date(utcDateString);
    const catDate = new Date(utcDate.valueOf() + 2 * 60 * 60 * 1000); // Add 2 hours for CAT

    let hours = catDate.getUTCHours();
    const minutes = catDate.getUTCMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be displayed as 12

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
    return formattedTime;
}
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
div#descriptionContainer {
    max-height: calc(1.2em* 8);
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 10px;
    white-space: pre-line;
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
.sort-by {
    display: flex;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
</style>