<template>
    <NuxtLayout name="dashboard">
        <div class="container-fluid">

<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Suburb Management</h1>
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-body">
        <div class="table-responsive">
            <DataTable  :value="suburbs" paginator showGridlines :rows="10" dataKey="id" :loading="loading">
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-plus" label="Add Suburb" @click="addSuburbDialog = true" />
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No locations found. </template>
            <template #loading> Loading suburb data. Please wait. </template>
            <Column field="suburb_name" header="Suburb Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.suburb_name }}
                </template>
            </Column>
        </DataTable>
        </div>
    </div>
</div>

</div>
<Dialog v-model:visible="addSuburbDialog" modal header="Add New Suburb" :style="{ width: '55rem' }">
    <span class="p-text-secondary block mb-5">Create new system location.</span>
    <div class="p-dialog-content" data-pc-section="content">
  <form class="flex flex-column gap-3 mt-3">
    <div>
      <label for="cardholder" class="block mb-1 text-color text-base">Suburb Name</label>
      <InputText v-model="name" class="w-full" />
     </div>
     <div>
      <label for="cardholder" class="block mb-1 text-color text-base">Location</label>
      <Dropdown v-model="selected_location_id" :options="locations" optionLabel="location_name" optionValue="id" class="w-12" />
     </div>
  </form>
</div>
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="addSuburbDialog = false"></Button>
        <Button type="button" label="Save" @click="addSuburb()"></Button>
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
definePageMeta({
    middleware:['auth']
})
const toast = useToast()
const customers = ref();
const addSuburbDialog = ref(false)
const filters = ref();
const selected_location_id = ref()
const locations = ref()
const suburbs = ref()
const name = ref()
const loading = ref(true);
const token = useCookie('token')
const addSuburb = async () => {
    let data = {
        name: name.value,
        selected_location_id: selected_location_id.value,
        token: token.value
    } 
    let results = await adminStore.addSuburbs(data).then( async(data) => {
        if(data?.data?.success) {
            addSuburbDialog.value = false
            toast.add({ severity: 'success', summary: 'Success', detail: 'Suburb added succesfully created', life: 3000 });
            name.value = null,
            await getSuburbs()
        }
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
    await getLocations()
    await getSuburbs()
});


const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
       
    };
};

initFilters();

const formatDate = (value:any) => {
    return value.toLocaleDateString('en-US', {
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