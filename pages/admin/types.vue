<template>
    <NuxtLayout name="dashboard">
        <div class="container-fluid">

<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Property Types</h1>
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-body">
        <div class="table-responsive">
            <DataTable  :value="property_types" paginator showGridlines :rows="10" dataKey="id" :loading="loading">
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-plus" label="Add Type" @click="addTypeDialog = true" />
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No property_types found. </template>
            <template #loading> Loading property_types data. Please wait. </template>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
            </Column>
        </DataTable>
        </div>
    </div>
</div>

</div>
<Dialog v-model:visible="addTypeDialog" modal header="Add New Type" :style="{ width: '55rem' }">
    <span class="p-text-secondary block mb-5">Create new system property type.</span>
    <div class="p-dialog-content" data-pc-section="content">
  <form class="flex flex-column gap-3 mt-3">
    <div>
      <label for="cardholder" class="block mb-1 text-color text-base">Location Name</label>
      <InputText v-model="name" class="w-full" />
     </div>
     
  </form>
</div>
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="addTypeDialog = false"></Button>
        <Button type="button" label="Save" @click="addType()"></Button>
    </div>
</Dialog>
    </NuxtLayout>
</template>
<script setup>
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
const addTypeDialog = ref(false)
const filters = ref();
const property_types = ref()
const name = ref()
const loading = ref(true);
const token = useCookie('token')
const addType = async () => {
    let data = {
        name: name.value,
        token: token.value
    } 
    let results = await adminStore.addPropertyTypes(data).then( async(data) => {
        if(data?.data?.success) {
            addTypeDialog.value = false
            toast.add({ severity: 'success', summary: 'Success', detail: 'Type succesfully created', life: 3000 });
            name.value = null,
            await getPropertyTypes()
        }
    })
}
const getPropertyTypes = async () => {
    let result = await adminStore.getPropertyTypes().then((data) => {
        property_types.value = data?.data?.types
        loading.value = false
    })
}

onMounted(async() => {
    loading.value = true
    await getPropertyTypes()
});


const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
       
    };
};

initFilters();

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const clearFilter = () => {
    initFilters();
};

</script>