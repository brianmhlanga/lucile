<template>
<div class="block-content">
  <div class="">
    <div class="surface-section px-4 py-4 md:px-6 lg:px-8">
      <div class="font-bold goTo text-3xl toptext text-center">Featured Products</div>
      <div class="text-700 text-center mb-5 line-height-3">Some of the best product selection from brands we work with</div>
    </div>
    <feed />
    <static />
    <reviews />
    <!-- <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div class="grid">
        <div class="flex flex-column lg:w-4">
          <div class="surface-card  custom-cards flex flex-column justify-content-between feature-card flex-1 border-round-bottom">
            <span class="inline-flex align-items-center justify-content-center top-icon bg-blue-500 border-circle w-5rem h-5rem mb-4"><i class="pi pi-receipt text-white text-2xl"></i></span>
            <span class="font-semibold text-2xl">Point Of Sale</span>
            <p class="mt-0 mb-6 line-height-3 text-xl text-00">Create sales receipts and continue working offline when the internet drops and get the data automatically synchronized when the internet is back online. Print receipts with your company logo and company details on a thermal printer (EPSON or StarPRNT) or A4 printer or send it as a PDF to your customer's email address or just download it on to your mobile phone or computer.</p>
            <div class="text-center">
                <button class="Hero-button" data-v-inspector="components/hero.vue:7:5">Explore</button>
            </div>
          </div>
        </div>
        <div class="flex  flex-column lg:w-4">
          <div class="surface-card  custom-cards flex flex-column justify-content-between feature-card flex-1 border-round-bottom">
            <span class="inline-flex align-items-center justify-content-center top-icon bg-blue-500 border-circle w-5rem h-5rem mb-4"><i class="pi pi-clipboard text-white text-2xl"></i></span>
            <span class="font-semibold text-2xl">Invoices</span>
            <p class="mt-0 mb-6 line-height-3 text-xl text-00">Create invoices that can be sent as a PDF with your company logo and company details to your customer's email address. These can be sent immediately or scheduled to automatically send at a later date or just downloaded onto your mobile phone or computer.</p>
            <div class="text-center">
                <button class="Hero-button" data-v-inspector="components/hero.vue:7:5">Explore</button>
            </div>
          </div>
        </div>
        <div class="flex  flex-column lg:w-4">
          <div class="surface-card  custom-cards flex flex-column justify-content-between feature-card flex-1 border-round-bottom">
            <span class="inline-flex align-items-center justify-content-center top-icon bg-blue-500 border-circle w-5rem h-5rem mb-4"><i class="pi pi-tag text-white text-2xl"></i></span>
            <span class="font-semibold text-2xl">Quotations</span>
            <p class="mt-0 mb-6 line-height-3 text-xl text-00">Create quotations that can be sent as a PDF with your company logo and company details to your customer's email address or just downloaded onto your mobile phone or computer.</p>
            <div class="text-center">
                <button class="Hero-button" data-v-inspector="components/hero.vue:7:5">Explore</button>
            </div>
          </div>
        </div>
        <div class="flex flex-column lg:w-4">
          <div class="surface-card  custom-cards flex flex-column justify-content-between feature-card flex-1 border-round-bottom">
            <span class="inline-flex align-items-center justify-content-center top-icon bg-blue-500 border-circle w-5rem h-5rem mb-4"><i class="pi pi-wave-pulse text-white text-2xl"></i></span>
            <span class="font-semibold text-2xl">Cash Flow Analysis</span>
            <p class="mt-0 mb-6 line-height-3 text-xl text-00">Get a realtime cashflow analysis based on past sales, broken down into Expenses, Purchases, Tax and Profit</p>
            <div class="text-center">
                <button class="Hero-button" data-v-inspector="components/hero.vue:7:5">Explore</button>
            </div>
          </div>
        </div>
        <div class="flex flex-column lg:w-4">
          <div class="surface-card  custom-cards flex flex-column justify-content-between feature-card flex-1 border-round-bottom">
            <span class="inline-flex align-items-center justify-content-center top-icon bg-blue-500 border-circle w-5rem h-5rem mb-4"><i class="pi pi-shopping-cart text-white text-2xl"></i></span>
            <span class="font-semibold text-2xl">Product Management</span>
            <p class="mt-0 mb-6 line-height-3 text-xl text-00">Keep track of product quantities and generate reports that allow you to see past sales of each product on a day to day, week to week, month to month, quarter to quarter and year to year basis.</p>
            <div class="text-center">
                <button class="Hero-button" data-v-inspector="components/hero.vue:7:5">Explore</button>
            </div>
          </div>
        </div>
        <div class="flex flex-column lg:w-4">
          <div class="surface-card  custom-cards flex flex-column justify-content-between feature-card flex-1 border-round-bottom">
            <span class="inline-flex align-items-center justify-content-center top-icon bg-blue-500 border-circle w-5rem h-5rem mb-4"><i class="pi pi-users text-white text-2xl"></i></span>
            <span class="font-semibold text-2xl">Customer Management</span>
            <p class="mt-0 mb-6 line-height-3 text-xl text-00">Keep a detailed database of all customers that you can use to auto-populate forms in the system for faster productivity.</p>
            <div class="text-center">
                <button class="Hero-button" data-v-inspector="components/hero.vue:7:5">Explore</button>
            </div>
          </div>
        </div>
        <div class="flex flex-column lg:w-4">
          <div class="surface-card  custom-cards flex flex-column justify-content-between feature-card flex-1 border-round-bottom">
            <span class="inline-flex align-items-center justify-content-center top-icon bg-blue-500 border-circle w-5rem h-5rem mb-4"><i class="pi pi-volume-up text-white text-2xl"></i></span>
            <span class="font-semibold text-2xl">Stock Alerts</span>
            <p class="mt-0 mb-6 line-height-3 text-xl text-00">Create stock alerts that will send you or your team an email when the quantity of a particular product gets to a certain amount.</p>
            <div class="text-center">
                <button class="Hero-button" data-v-inspector="components/hero.vue:7:5">Explore</button>
            </div>
          </div>
        </div>
        <div class="flex flex-column lg:w-4">
          <div class="surface-card  custom-cards flex flex-column justify-content-between feature-card flex-1 border-round-bottom">
            <span class="inline-flex align-items-center justify-content-center top-icon bg-blue-500 border-circle w-5rem h-5rem mb-4"><i class="pi pi-user-plus text-white text-2xl"></i></span>
            <span class="font-semibold text-2xl">Invite Team Members</span>
            <p class="mt-0 mb-6 line-height-3 text-xl text-00">You can have upto 10 users as Team members in your company for no extra cost. You can set which permissions each Team member will have and restrict which permissions they wont have e.g you can allow a Team member to only use the Point of Sale but restrict them from creating any Invoices.</p>
            <div class="text-center">
                <button class="Hero-button" data-v-inspector="components/hero.vue:7:5">Explore</button>
            </div>
          </div>
        </div>
        <div class="flex flex-column lg:w-4">
          <div class="surface-card  custom-cards flex flex-column justify-content-between feature-card flex-1 border-round-bottom">
            <span class="inline-flex align-items-center justify-content-center top-icon bg-blue-500 border-circle w-5rem h-5rem mb-4"><i class="pi pi-address-book text-white text-2xl"></i></span>
            <span class="font-semibold text-2xl">Activity Logs (Trail)</span>
            <p class="mt-0 mb-6 line-height-3 text-xl text-00">The system automatically keeps a detailed log of all the activities performed on the system and the user that performed them. This forms a detailed audit trail of activity that you can go over and query.</p>
            <div class="text-center">
                <button class="Hero-button" data-v-inspector="components/hero.vue:7:5">Explore</button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</div>
</template>
<style>
.bg-blue {
    background-color: #0052ff !important;
    color: white !important;
}
.text-xl {
    font-size: 15px !important;
}
.goTo {
    font-weight: 600 !important;
    font-size: 25px !important;
    line-height: 100% !important;
}
.toptext {
    margin-bottom: 25px;
}
span.spanC {
    background-color: #0052ff;
    border-radius: 10px;
    color: white;
    padding: 6px;
    height: 10px !important;
}
.feature-card {
    text-align: center;
}
.custom-cards {
    box-sizing: border-box;
    margin: 10px;
    padding: 3rem;
    height: 120px;
    border: solid 1px #03A9F4;
    border-radius: 10px;
    background-color: #fff;
    /* box-shadow: 0 5px 10px 0 rgba(41, 61, 102, .2); */
    cursor: pointer;
    color: #2d3040;
}
.custom-cards:hover {
    background-image: linear-gradient(to right, #0052ff, #8960ff) !important;
    color: #ffffff !important;
}
.custom-cards:hover .top-icon {
    background-color: rgb(255, 255, 255) !important;
    margin: auto;
}
.custom-cards:hover i.pi.text-white.text-2xl {
    color: #0052ff !important;
}
.custom-cards:hover .text-2xl {
    color: #ffffff !important;
}

.custom-cards:hover .Hero-button {
    color: #0052ff !important;
    background-image: linear-gradient(to right,  #fff, #fff) !important;
}

.top-icon {
    margin: auto;
}
</style>