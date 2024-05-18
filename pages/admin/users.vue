<template>
    <NuxtLayout name="dashboard">
        <div class="container-fluid">

<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">User Management</h1>
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-body">
        <div class="table-responsive">
            <DataTable  :value="users" paginator showGridlines :rows="10" dataKey="id" :loading="loading">
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-plus" label="Add User" @click="addUserDialog = true" />
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <template #empty> No users found. </template>
            <template #loading> Loading users data. Please wait. </template>
            <Column field="first_name" header="Full Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.first_name }} {{ data.surname }}
                </template>
            </Column>
            <Column field="username" header="Username" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.username }}
                </template>
            </Column>
            <Column field="role" header="Role" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.role }}
                </template>
            </Column>
            <Column field="phone_number" header="Phone Number" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.phone_number }}
                </template>
            </Column>
            <Column field="whatsapp_number" header="WhatsApp Number" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.whatsapp_number }}
                </template>
            </Column>
        </DataTable>
        </div>
    </div>
</div>

</div>
<Dialog v-model:visible="addUserDialog" modal header="Add New User" :style="{ width: '55rem' }">
    <span class="p-text-secondary block mb-5">Create new system user.</span>
    <div class="p-dialog-content" data-pc-section="content">
  <form class="flex flex-column gap-3 mt-3">
    <div>
      <label for="cardholder" class="block mb-1 text-color text-base">Username</label>
      <InputText v-model="username" class="w-full" />
     </div>
     <div class="flex gap-3">
      <div class="w-full">
        <label for="cvc" class="block mb-1 text-color text-base">First Name</label>
        <InputText v-model="first_name" class="w-full" />
      </div>
      <div class="w-full">
        <label for="expiration" class="block mb-1 text-color text-base">Last Name</label>
        <InputText v-model="last_name" class="w-full" />
      </div>
    </div>
    <div>
      <label for="credit-card" class="block mb-1 text-color text-base">Email Address</label>
      <InputText v-model="email" class="w-full" />
    </div>
    <div class="flex gap-3">
      <div class="w-full">
        <label for="cvc" class="block mb-1 text-color text-base">Phone Number</label>
        <InputText v-model="phone" placeholder="+263779698568" class="w-full" />
      </div>
      <div class="w-full">
        <label for="expiration" class="block mb-1 text-color text-base">WhatsApp Number</label>
        <InputText v-model="whatsapp" placeholder="263779698568" class="w-full" />
      </div>
    </div>
    <div class="flex gap-3">
      <div class="w-full">
        <label for="cvc" class="block mb-1 text-color text-base">Role</label>
        <Dropdown v-model="selectedRole" class="w-full" :options="roles" />
      </div>
      <div class="w-full">
        <label for="expiration" class="block mb-1 text-color text-base">Password</label>
        <InputGroup>
            <InputText v-model="password" class="w-full" placeholder="Enter Password" />
            <Button @click="generateRandomPassword()" icon="pi pi-sync" label="Generate" />
        </InputGroup>
      </div>
    </div>
    <div class="mb-4">
        <label for="visibility" class="block font-normal text-900 mb-2">Share Credentials</label>
        <div class="flex align-items-center">
            <Checkbox v-model="is_send_credentials" :binary="true" />
            <span class="ml-2 font-normal text-base text-color-primary">Send Credentials to the new user</span>
        </div>
    </div>
  </form>
</div>
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="addUserDialog = false"></Button>
        <Button type="button" label="Save" @click="addUser()"></Button>
    </div>
</Dialog>
    </NuxtLayout>
</template>
<script setup>
import { CustomerService } from '@/service/CustomerService';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useAuthStore } from '~/stores/auth';
import { useToast } from "primevue/usetoast";
import { useAdminStore } from '~/stores/admin';
const authStore = useAuthStore()
const adminStore = useAdminStore()
const toast = useToast()
const customers = ref();
const addUserDialog = ref(false)
const filters = ref();
const username = ref()
const first_name = ref()
const last_name = ref()
const email = ref()
const password = ref()
const phone = ref()
const whatsapp = ref()
const selectedRole = ref()
const users = ref()
const roles = ref(["AGENT", "USER", "ADMIN", "REALTOR","USER"])
const is_send_credentials = ref(false)
const loading = ref(true);
const generateRandomPassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let passwordd = "";
    for (let i = 0; i < 12; ++i) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        passwordd += charset[randomIndex];
    }
    password.value = passwordd
    return password;
}
const addUser = async () => {
    let data = {
        username: username.value,
        first_name: first_name.value,
        last_name: last_name.value,
        role: selectedRole.value,
        password: password.value,
        phone: phone.value,
        whatsapp: whatsapp.value,
        email: email.value,
        is_send_credentials: is_send_credentials.value
    }
    let results = await authStore.register(data).then( async(data) => {
        if(data?.data?.success) {
            addUserDialog.value = false
            toast.add({ severity: 'success', summary: 'Success', detail: 'User succesfully created', life: 3000 });
            username.value = null,
            first_name.value = null,
            last_name.value = null,
            selectedRole.value = null,
            password.value = null,
            phone.value = null,
            whatsapp.value = null,
            email.value = null,
            is_send_credentials.value = false
            await getUsers()
        }
    })
}
const getUsers = async () => {
    let result = await adminStore.getUsers().then((data) => {
        users.value = data?.data?.users
        loading.value = false
    })
}

onMounted(async() => {
    loading.value = true
    await getUsers()
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