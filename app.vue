<template>
  <div>
    <ConfirmDialog></ConfirmDialog>
    <ConfirmDialog group="templating">
            <template #message="slotProps">
                <div class="flex p-4">
                    <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
                    <p class="pl-2">{{slotProps.message.message}}</p>
                </div>
            </template>
    </ConfirmDialog>
    <ConfirmDialog group="positionDialog"></ConfirmDialog>
    <Toast/>
    <NuxtPage />
  </div>
</template>
<script>
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import  "~/public/assets/primeblocks.css"
// import "~/public/assets/flags.css"


</script>
<style>
@import url('https://fonts.cdnfonts.com/css/br-cobane');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");
.layout-wrapper, body {
    background-color: #ffffff;
    font-family: Poppins,Roboto,Helvetica,Arial,sans-serif !important;
}
</style>
