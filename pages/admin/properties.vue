<template>
    <NuxtLayout name="dashboard">
        <div class="container-fluid">

<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Property Management</h1>
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-body">
        <div class="table-responsive">
            <DataTable  :value="properties" paginator showGridlines :rows="10" dataKey="id" :loading="loading">
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-plus" label="Add Property" @click="addPropertyDialog = true" />
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No properties found. </template>
            <template #loading> Loading properties data. Please wait. </template>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
            </Column>
            <Column field="name" header="Property Image" style="min-width: 12rem">
                <template #body="slotProps">
                <img :src="getLink(slotProps.data.images[0].image_url)" class="w-6rem border-round" />
            </template>
            </Column>
            <Column field="property_type" header="Property Type" style="min-width: 12rem">
                <template #body="slotprops">
                    {{ slotprops.data?.prop_type?.name }}
                </template>
            </Column>
            <Column field="property_type" header="Property Type" style="min-width: 12rem">
                <template #body="slotprops">
                    {{ slotprops.data?.listing_status }}
                </template>
            </Column>
            <Column field="property_type" header="Main Features" style="min-width: 12rem">
                <template #body="slotprops">
                    <table>
            <tr class="kt">
                <td class="ky">Bedrooms</td>
                <td class="kyy">{{ slotprops.data?.features[0]?.total ?  slotprops.data?.features[0]?.total  :0 }}</td>
            </tr>
            <tr class="kt">
                <td class="ky">Bathrooms</td>
                <td class="kyy">{{ slotprops.data?.features[1]?.total ?  slotprops.data?.features[1]?.total  :0 }}</td>
            </tr>
            <tr class="kt">
                <td class="ky">Area</td>
                <td class="kyy">{{ slotprops.data?.features[2]?.total ? slotprops.data?.features[2]?.total :0 }}</td>
            </tr>
            <tr class="kt">
                <td class="ky">Lounges</td>
                <td class="kyy">{{ slotprops.data?.features[3]?.total ?  slotprops.data?.features[3]?.total  :0 }}</td>
            </tr>
            <tr class="kt">
                <td class="ky">Garages</td>
                <td class="kyy">{{ slotprops.data?.features[4]?.total ?  slotprops.data?.features[4]?.total  :0 }}</td>
            </tr>
        </table>
                </template>
            </Column>
            <Column field="address" header="Address" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.address }}
                </template>
            </Column>
            <Column field="name" header="Reference Code" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.refrence_code }}
                </template>
            </Column>
            <Column field="owner_name" header="Owner Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.owner_name }}
                </template>
            </Column>
            <Column field="owner_email" header="Owner Email" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.owner_email }}
                </template>
            </Column>
            <Column field="owner_phone" header="Owner Phone" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.owner_phone }}
                </template>
            </Column>
            <Column field="status" header="Status" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.status }}
                </template>
            </Column>
            <Column header="Agent Name" style="min-width: 12rem">
                <template #body="slotprops">
                    {{ slotprops.data?.agent.first_name }} {{ slotprops?.data?.agent.surname }}
                </template>
            </Column>
            <Column field="location" header="Location" style="min-width: 12rem">
                <template #body="slotprops">
                    {{ slotprops.data?.location?.location_name }}
                </template>
            </Column>
            <Column field="location" header="Date Listed" style="min-width: 12rem">
                <template #body="slotprops">
                    {{ formatDate(slotprops.data?.created_at)  }}
                </template>
            </Column>
        </DataTable>
        </div>
    </div>
</div>

</div>
<Dialog v-model:visible="addPropertyDialog" modal header="Add New Property" :style="{ width: '70rem' }">
    <span class="p-text-secondary block mb-5">Create new system property type.</span>
    <div class="p-dialog-content" data-pc-section="content">
  <div class="grid formgrid p-fluid">
    <div class="field mb-4 col-12 md:col-6">
      <label for="company_name" class="font-medium text-900">Property Name</label>
      <InputText v-model="property_name" />
    </div>
    <div class="field mb-4 col-12">
      <label for="notes" class="font-medium text-900">Description</label>
      <textarea v-model="description" class="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable" data-pc-name="textarea" data-pc-section="root" id="notes" rows="5" style="height: 120px; overflow: hidden;" data-lt-tmp-id="lt-488940" spellcheck="false" data-gramm="false"></textarea>
    </div>
    <div class="field mb-4 col-6 md:col-6">
      <label for="invoice_id" class="font-medium text-900">Address</label>
      <textarea v-model="address" class="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable" data-pc-name="textarea" data-pc-section="root" id="notes" rows="5" style="height: 120px; overflow: hidden;" data-lt-tmp-id="lt-488940" spellcheck="false" data-gramm="false"></textarea>
    </div>
    <div class="field mb-4 col-6 md:col-6">
      <label for="customer_name" class="font-medium text-900">Owner Name</label>
      <InputText v-model="owner_name" />
    </div>
    <div class="field mb-4 col-4 md:col-4">
      <label for="customer_email" class="font-medium text-900">Owner Email</label>
      <InputText v-model="owner_email" />
    </div>
    <div class="field mb-4 col-4 md:col-4">
      <label for="customer_email" class="font-medium text-900">Owner Phone</label>
      <InputText v-model="owner_phone" />
    </div>
    <div class="field mb-4 col-4 md:col-4">
      <label for="customer_email" class="font-medium text-900">Location</label>
      <Dropdown v-model="selected_location" :options="locations" optionLabel="location_name" optionValue="id" />
    </div>
    <div class="field mb-4 col-4 md:col-4">
      <label for="customer_email" class="font-medium text-900">Suburb</label>
      <Dropdown v-model="selected_suburb" :options="suburbs" optionLabel="suburb_name" optionValue="id" />
    </div>
    <div class="field mb-4 col-4 md:col-4">
      <label for="customer_email" class="font-medium text-900">Property Types</label>
      <Dropdown v-model="selected_type" :options="property_types" optionLabel="name" optionValue="id" />
    </div>
    <div class="field mb-4 col-4 md:col-4">
      <label for="customer_email" class="font-medium text-900">Listing Type</label>
      <Dropdown v-model="selected_listing_type" :options="listing_types" />
    </div>
    <div class="field mb-4 col-4 md:col-4">
      <label for="customer_email" class="font-medium text-900">Amount</label>
      <InputText v-model="amount" type="number"/>
    </div>
    <div class="field mb-4 col-4 md:col-4">
        <InputGroup>
            <Button label="Bedrooms" />
            <InputText v-model="bedrooms" placeholder="Number of Bedrooms" type="number"/>
        </InputGroup>
    </div>
    <div class="field mb-4 col-4 md:col-4">
        <InputGroup>
            <Button label="Bathrooms" />
            <InputText v-model="bathrooms" placeholder="Number of Bathrooms" type="number"/>
        </InputGroup>
    </div>
    <div class="field mb-4 col-4 md:col-4">
        <InputGroup>
            <Button label="Lounges" />
            <InputText v-model="lounges" placeholder="Number of Lounges" type="number"/>
        </InputGroup>
    </div>
    <div class="field mb-4 col-4 md:col-4">
        <InputGroup>
            <Button label="Garages" />
            <InputText v-model="garages" placeholder="Number of Garages" type="number"/>
        </InputGroup>
    </div>
    <div class="field mb-4 col-4 md:col-4">
        <InputGroup>
            <Button label="Square Area" />
            <InputText v-model="area" placeholder="Area Size" type="number" />
        </InputGroup>
    </div>
    <div class="field mb-4 col-12 md:col-12">
      <label for="customer_email" class="font-medium text-900">Other Ammenities</label>
      <Chips v-model="other_ammenities" separator="," variant="filled" />
    </div>
    <div class="field mb-4 col-12 md:col-12">
      <label for="customer_email" class="font-medium text-900">Image Upload</label>
      <FileUpload :auto="true" mode="basic" style="width: fit-content;" name="photo" url="/images/upload" @upload="onAdvancedUpload($event)"  accept="image/*" :maxFileSize="5000000"/>
        <Carousel v-if="uploaded_images.length > 0 && complete" :value="uploaded_images" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
            <template #item="slotProps">
                <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
                    <div class="mb-3">
                        <img :src="getLink(slotProps.data.image_url)" class="w-6 shadow-2" />
                    </div>
                    <div class="col-12">
                        <i class="pi pi-trash" @click="deleteImage(slotProps.index)" style="color: red"></i>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
    <div class="field mb-4 col-12 flex align-items-center">
      <Checkbox v-model="is_available_on_show" :binary="true" />
      <span class="ml-2 text-900">Check if you want the Property available on Showday</span>
    </div>
    
    <div v-if="is_available_on_show" class="field mb-4 col-6 md:col-6">
      <label for="invoice_date" class="font-medium text-900">Showday Date</label>
      <Calendar v-model="showdate" showIcon iconDisplay="input" />
    </div>
 
  </div>
</div>
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="addPropertyDialog = false"></Button>
        <Button type="button" label="Save" @click="addProperty()"></Button>
    </div>
</Dialog>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useAuthStore } from '~/stores/auth';
import { useToast } from "primevue/usetoast";
import { useAdminStore } from '~/stores/admin';
const authStore = useAuthStore()
const adminStore = useAdminStore()
const is_available_on_show = ref(false)
definePageMeta({
    middleware:['auth']
})
const toast = useToast()
const property_name = ref()
const description = ref()
const address = ref()
const owner_email = ref()
const owner_name = ref()
const owner_phone = ref()
const reference_code = ref()
const selected_location = ref()
const selected_listing_type = ref("FOR SALE")
const listing_types = ref(['FOR SALE',"FOR RENT"])
const selected_type = ref()
const bedrooms = ref()
const showdate = ref()
const garages = ref()
const lounges = ref()
const bathrooms = ref()
const area = ref()
const customers = ref();
const suburbs = ref()
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
const addPropertyDialog = ref(false)
const other_ammenities = ref()
const id = ref()
const filters = ref();
const properties = ref()
const property_types = ref()
const locations = ref();
const uploaded_images = ref<any>([])
const selected_suburb = ref()
    const complete = ref(false)
const name = ref()
const amount = ref()
const loading = ref(true);
const token = useCookie('token')
const setCompleteTrueAfterTwoSeconds = () => {
setTimeout(() => {
    complete.value = true;
}, 2000);
}
const getLink = (link:any) => {
    let new_link = `/images/${link}`
    return new_link
}
const deleteImage = (i:any) => {
    uploaded_images.value.splice(i, 1)
    toast.add({ severity: 'success', summary: 'Image Deleted', detail: "Image Removed", life: 2000 });
}
const onAdvancedUpload = async (event:any) => {
        complete.value = false
        let {upload:{image_name},success} = await JSON.parse(event.xhr.response)
        if(success){
            let new_image:any = {
                image_url: image_name
            }
            await  uploaded_images.value.push(new_image)
            toast.add({ severity: 'success', summary: 'Upload Success', detail: "Succesfully Uploaded Image", life: 2000 });
            setCompleteTrueAfterTwoSeconds()
        }else {
            toast.add({ severity: 'warn', summary: 'Upload Failed', detail: "Failed to upload image", life: 2000 });
        }
    };
const addProperty = async () => {
    let amm = [
        { name: 'Bedrooms', total: bedrooms.value ? bedrooms.value : 0},
        { name: 'Bathrooms', total: bathrooms.value ? bathrooms.value : 0},
        { name: 'Area', total: area.value ? area.value : 0},
        { name: 'Lounges', total: lounges.value ? lounges.value : 0},
        { name: 'Garages', total: garages.value ? garages.value : 0}
    ]
    let my_listing_type = selected_listing_type.value === 'FOR SALE' ? 'FOR_SALE' : 'FOR_RENT'
    let data = {
        property_name: property_name.value,
        description: description.value,
        address: address.value,
        owner_email: owner_email.value,
        owner_name: owner_name.value,
        owner_phone: owner_phone.value,
        listing_types: my_listing_type,
        reference_code: reference_code.value,
        location: selected_location.value,
        suburb: selected_suburb.value,
        type: selected_type.value,
        amount: amount.value,
        agent: id.value,
        ammenities: amm,
        other_ammenities: other_ammenities.value,
        uploaded_images: uploaded_images.value,
        is_available_on_show: is_available_on_show.value,
        showdate: showdate.value,
        token: token.value
    } 
    let results = await adminStore.addProperty(data).then( async(data) => {
        if(data?.data?.success) {
            addPropertyDialog.value = false
            toast.add({ severity: 'success', summary: 'Success', detail: 'Property succesfully created', life: 3000 });
            name.value = null,
            await getProperties()
        }
    })
}
const getProperties = async () => {
    let result = await adminStore.getProperties().then((data) => {
        properties.value = data?.data?.properties
        loading.value = false
    })
}
const getPropertyTypes = async () => {
    let result = await adminStore.getPropertyTypes().then((data) => {
        property_types.value = data?.data?.types
        loading.value = false
    })
}
const getLocations = async () => {
    let result = await adminStore.getLocations().then((data) => {
        locations.value = data?.data?.locations
        loading.value = false
    })
}
const getSuburbs = async () => {
    let result = await adminStore.getSuburbs().then((data) => {
        suburbs.value = data?.data?.locations
        loading.value = false
    })
}

onMounted(async() => {
    loading.value = true
    let userData:any = useCookie('user').value
    id.value = userData?.id
    await getProperties()
    await getPropertyTypes()
    await getLocations()
    await getSuburbs()
});


const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
       
    };
};

initFilters();

const formatDate = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const formatCurrency = (value:any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const clearFilter = () => {
    initFilters();
};

</script>
<style>
tr.kt {
    width: 100% !important;
    border: solid 1px #e6dada !important;
}
td.ky {
    color: white;
    background-color: #171c2b;
    padding: 2px;
}
td.kyy {
    color: white;
    background-color: #ebc562;
    padding: 4px;
}
</style>