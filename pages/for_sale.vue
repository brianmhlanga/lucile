<template>
    <NuxtLayout name="main" >
        <div class="block-content">
            <div class="surface-section px-4 py-4 md:px-6 topsearch lg:px-8">
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
      <MultiSelect v-model="selectedLocations" display="chip" :options="locations" optionValue="id" optionLabel="location_name" placeholder="Select Cities or Suburbs"  class="w-full md:w-20rem" />
    </div>
    <div class="field mb-4 col-12 md:col-3">
      <label for="invoice_id" class="font-medium text-900">Property Types</label>
      <MultiSelect v-model="selectedPropertyTypes" display="chip" :options="property_types" optionValue="id" optionLabel="name" placeholder="Select Property Types"  class="w-full md:w-20rem" />
    </div>
    <div class="field mb-4 col-12 md:col-2">
      <label for="customer_name" class="font-medium text-900">Reference Code</label>
      <InputText v-model="reference_code" class="p-inputtext p-component" placeholder="Ref Code" />
    </div>
    <div  class="topbuttons field mb-4 col-12 md:col-4">
      <ToggleButton v-model="checked" onLabel="More Options" offLabel="More Options" onIcon="pi pi-lock" 
            offIcon="pi pi-lock-open" class="w-12rem lockbtn" aria-label="More Options" />
      <Button :loading="search_loader" @click="getSearchedProperties()" icon="pi pi-search" class="w-auto" label="search" />
    </div>
    <div v-if="checked" class="field mb-4 col-12 md:col-3">
      <label for="customer_email" class="font-medium text-900">Min Price</label>
      <Dropdown  :options="for_sale_values" />
    </div>
    <div v-if="checked" class="field mb-4 col-12 md:col-3">
      <label for="customer_email" class="font-medium text-900">Max Price</label>
      <Dropdown  :options="for_sale_values" />
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
    <div class="">
      <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
        <div class="surface-ground">
  <div class="grid -mr-3 -ml-3">
    <div class="col-12 lg:col-9">
        <div class="sort-by">
        <h4>Properties: <span>{{ properties ? properties.length : 0 }}</span></h4>
        <div class="form-group xyx">
            <div>
                <Dropdown @change="getAllProperties()" v-model="selected_sort_option" :options="sort_options" />
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
                            <span class="text-500 sale text-lg font-medium" style="white-space: nowrap;">FOR SALE</span>
                        </div>
                        <div class="font-medium text-900 mb-3 line-height-3"><i class="pi pi-map-marker" style="font-size: 1rem;font-weight: 900;margin-right: 10px;"></i>{{ property?.address }}, {{ property?.suburb?.suburb_name }}, {{ property?.location?.location_name }}</div>
                        <div id="descriptionContainer">
                            <!-- Your HTML content here -->
                            <div class="line-height-3 text-lg text-900 mb-3" v-html="property?.description"></div>
                        </div>
                        <div class="text-700 text-3xl mb-5">{{ property?.amount ? formatCurrency(property?.amount) : formatCurrency(0) }}</div>
                        <div class="detail_button">
                            <Button class="w-4 ghf" @click="navigateTo(`/detail-${property.id}`)" label="Details" />
                        </div>
                    </div>
                </div>
            </li>
            <Paginator  @page="getAllProperties()" v-model:first="first" v :rows="items_per_page" :totalRecords="number_of_records ? number_of_records : 0"></Paginator>
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
const checked = ref(false)
const properties = ref()
const suburbs = ref()
const property_types = ref()
const reference_code = ref()
const selectedLocations = ref()
const selected_sort_option = ref('DEFAULT')
const search_loader = ref(false)
const selectedPropertyTypes = ref()
const number_of_records = ref(0)
const for_sale_values = ref(["$15,000","$25,000","$50,000","$75,000","$100,000","$120,000","$150,000","$175,000","$200,000","$250,000","$300,000","$400,000","$500,000","$750,000","$1,000,000","$2,500,000"])
const for_rent_values = ref(["$100","$200","$400","$500","$700","$800","$1,000","$1,300","$1,500","$2,000","$3,000","$5,000","$7,000","$10,000","$15,000"])
const sort_options = ref(['DEFAULT','MOST RECENT',"HIGHEST PRICE","LOWEST PRICE"])
const first = ref(0)
const locations = ref()
const items_per_page = ref(10)
const getSearchedProperties = async () => {
    search_loader.value = true
    let data = {
        locations: selectedLocations.value,
        types: selectedPropertyTypes.value,
        reference_code: reference_code.value,
        status: "FOR_SALE",
        sort: selected_sort_option.value,
        first: 0,
        last: items_per_page.value
    }
    let searchResult = await adminStore.getSearchedProperties(data).then((data) => {
        properties.value = data?.data?.properties
        number_of_records.value = data?.data?.total
        search_loader.value = false
    })
}
const getAllProperties = async() => {
    let data = {
      status: "FOR_SALE",
      sort: selected_sort_option.value,
      first: 0,
      last: items_per_page.value
    }
    let result = await adminStore.getFilteredProperties(data).then((data) => {
      properties.value = data?.data?.properties
      number_of_records.value = data?.data?.total
    })
}
onMounted(async() => {
    let data = {
      status: "FOR_SALE",
      sort: selected_sort_option.value,
      first: 0,
      last: items_per_page.value
    }
    let result = await adminStore.getFilteredProperties(data).then((data) => {
      properties.value = data?.data?.properties
      number_of_records.value = data?.data?.total
    })
    let subuss = await adminStore.getSuburbs().then((data)=> {
        console.log("suburbs",data?.data?.locations)
        suburbs.value = data?.data?.locations
    })
    let subusss = await adminStore.getLocations().then((data)=> {
        console.log("suburbs",data?.data?.locations)
        locations.value = data?.data?.locations
    })
    let codes = await adminStore.getPropertyTypes().then((data) => {
        console.log("property type",data?.data?.types)
        property_types.value = data?.data?.types
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
.topsearch {
    background-color: #27303d !important;
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