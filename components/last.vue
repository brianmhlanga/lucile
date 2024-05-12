<template>
    <div class="surface-section px-4 md:px-6 lg:px-8 last">
      <div class="py-6 flex flex-column sm:flex-row sm:align-items-center justify-content-between">
        <div>
          <NuxtImg src="/images/logo.svg" alt="Image" height="40" class="toplogo" />
        </div>
        <div>
          <div class="mt-2 line-height-3 copy">© 2024 PriceLyst, Inc. All rights reserved</div>
        </div>
        <div class="mt-3 sm:mt-0">
          <a class="cursor-pointer text-500 transition-colors transition-duration-150 hover:text-700">
            <i class="pi pi-twitter text-xl"></i>
          </a>
          <a class="cursor-pointer text-500 ml-3 transition-colors transition-duration-150 hover:text-700">
            <i class="pi pi-facebook text-xl"></i>
          </a>
          <a class="cursor-pointer text-500 ml-3 transition-colors transition-duration-150 hover:text-700">
            <i class="pi pi-github text-xl"></i>
          </a>
        </div>
      </div>
    </div>
</template>
<style scoped>
.last {
    height: 200px !important;
    background-color: #003e95 !important
}
.copy {
    color: white;
}
.text-xl {
    color: white;
    font-size: 15px !important;
}
</style>