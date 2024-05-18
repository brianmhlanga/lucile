<template>
    <NuxtLayout  name="auth">
        <div class="container">
<!-- Outer Row -->
<div class="row justify-content-center">

    <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-login"></div>
                    <div class="col-lg-6">
                        <div class="p-5">
                            <div class="text-center">
                                <NuxtImg class="loginlogo" src="/images/logo.png"></NuxtImg>
                            </div>
                            <form class="user">
                                <div class="form-group">
                                    <InputText v-model="email" placeholder="Enter your email address" class="w-12" />
                                </div>
                                <div class="form-group">
                                    <InputText v-model="password" placeholder="Enter Password" type="password" class="w-12" />
                                </div>
                                <div class="form-group">
                                    <div class="custom-control custom-checkbox small">
                                        <input type="checkbox" class="custom-control-input" id="customCheck">
                                        <label class="custom-control-label" for="customCheck">Remember
                                            Me</label>
                                    </div>
                                </div>
                                <Button :loading="isLoading" @click="login()" class="w-12 signin" label="Sign In" />
                            </form>
                            <hr>
                            <div class="text-center">
                                <a class="small">Forgot Password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

</div>
</NuxtLayout>
</template>
<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore()
const email = ref()
const isLoading = ref(false)
const password = ref()
definePageMeta({
        middleware: ["not-auth"]
});
const login = async () => {
    isLoading.value = true;
    let data = {
        email: email.value,
        password: password.value
    }
    let result = await authStore.login(data).then((data:any) => {
        if(data?.data?.success)  {
            isLoading.value = false
            if(process.client){
                navigateTo("/admin/dashboard");
            }
        }
    })
}
</script>
<style>
.bg-login {
    background: url(/images/loginhouse.png);
    background-position: center;
    background-size: cover;
}
input.p-inputtext.p-component.p-password-input {
    width: 100% !important;
}
img.loginlogo {
    height: 100px !important;
}
.signin {
    background-color: #080505;
    border: none;
    border-radius: 5px;
}
</style>