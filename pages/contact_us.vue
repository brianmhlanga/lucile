<template>
    <NuxtLayout name="main" >
        <div class="block-content">
  <div class="">
    <div class="surface-section">
      <div class="grid grid-nogutter">
        <div class="col-12 md:col-6 bg-no-repeat bg-cover p-8" style="background-image: url(&quot;/images/contact.png&quot;);">
          <div class="text-white text-2xl contacttext font-medium mb-6">Contact Us</div>
          <div class="text-gray-300 textedd line-height-3 mb-6">Get in touch with us for Property sales, rentals, management, interior design and everything property.</div>
          <a class="inline-flex align-items-center text-blue-300 font-bold no-underline cursor-pointer">
            <span class="mr-3">View Address on Google Maps</span>
            <i class="pi pi-arrow-right"></i>
          </a>
          <ul class="list-none p-0 m-0 mt-6 text-white">
            <li class="flex align-items-center mb-3">
              <i class="pi pi-phone mr-2"></i>
              <span>+263 8677189294</span>
            </li>
            <li class="flex align-items-center mb-3">
              <i class="pi pi-twitter mr-2"></i>
              <span>@lucilerealestate</span>
            </li>
            <li class="flex align-items-center">
              <i class="pi pi-inbox mr-2"></i>
              <span>info@lucilerealestate.co.zw</span>
            </li>
          </ul>
        </div>
        <div class="col-12 md:col-6">
          <div class="p-fluid formgrid grid px-4 py-8 md:px-6 lg:px-8">
            <div class="field col-12 lg:col-6 mb-4">
              <input class="p-inputtext p-component py-3 px-2 text-lg" data-pc-name="inputtext" data-pc-section="root" id="firstname" type="text" placeholder="First Name">
            </div>
            <div class="field col-12 lg:col-6 mb-4">
              <input class="p-inputtext p-component py-3 px-2 text-lg" data-pc-name="inputtext" data-pc-section="root" id="lastname" type="text" placeholder="Last Name">
            </div>
            <div class="field col-12 mb-4">
              <input class="p-inputtext p-component py-3 px-2 text-lg" data-pc-name="inputtext" data-pc-section="root" id="email" type="text" placeholder="Email">
            </div>
            <div class="field col-12 mb-4">
              <input class="p-inputtext p-component py-3 px-2 text-lg" data-pc-name="inputtext" data-pc-section="root" id="phone" type="text" placeholder="Phone">
            </div>
            <div class="field col-12 mb-4">
              <textarea class="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable py-3 px-2 text-lg" data-pc-name="textarea" data-pc-section="root" id="message" rows="3" placeholder="Message" style="height: 97px; overflow: hidden;"></textarea>
            </div>
            <div class="col-12 text-right">
              <button  class="p-button p-component ckld px-5 py-3 w-auto" type="button" aria-label="Submit" data-pc-name="button" data-pc-section="root" data-pd-ripple="true">
                <span class="p-button-icon p-button-icon-left pi pi-envelope" data-pc-section="icon"></span>
                <span class="p-button-label" data-pc-section="label">Submit</span>
                <!---->
                <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
              </button>
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
a.inline-flex.align-items-center.text-blue-300.font-bold.no-underline.cursor-pointer {
    color: white !important;
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
.text-gray-300.textedd.line-height-3.mb-6 {
    color: white !important;
}
.text-white.text-2xl.contacttext.font-medium.mb-6 {
    color: #27303d !important;
    font-size: 45px !important;
    font-weight: 800 !important;
}
span.text-orange-500.font-medium {
    color: black !important;
    font-size: 25px;
}
button.p-button.p-component.ckld.px-5.py-3.w-auto {
    border: none;
    background-color: #27303d;
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
.aboutsection {
    background-color: #27303d !important;
}
.yelloy {
    color: #ebc562 !important;
}
.text-center.text-sm.text-caption.font-medium.mt-3 {
    color: white;
}
</style>