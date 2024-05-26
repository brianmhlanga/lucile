<template>
    <NuxtLayout name="main" >
        <div class="block-content">
    <div class="">
      <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      
        <div class="surface-ground">
  <div class="grid -mr-3 -ml-3">
    <div class="col-12 lg:col-8 p-4">
      <div class="surface-card grid formgrid p-fluid border-round shadow-2 p-4">
        <div class="grid">
  <div class="col-12 lg:col-12">
    <div class="grid">
       <div class="col-12 lg:col-9">
        <div class="flex justify-content-between align-items-center mb-3">
          <span class="text-900 font-medium text-xl pnames">{{ property?.name }}<br>
            <span class="inline-flex align-items-center mb-3 loc"><span class="material-icons tex-600 mr-2">location_on</span><span class="text-600 locnames">{{ property?.address }}, {{ property?.suburb?.suburb_name }}</span></span></span>
            
        </div>
       </div>
       <div class="col-12 lg:col-3">
        <div class="flex justify-content-between align-items-center mb-3">
          <span class="text-900 font-medium text-xl pnames amount">{{property?.amount ? formatCurrency(property?.amount) : formatCurrency(0) }}<span v-if="property?.listing_status === 'FOR_RENT'">/pm</span><br><span class="location wises">{{ property?.refrence_code }}</span></span>
        </div>
      </div>
    </div>
    <Galleria :value="property?.images" :showThumbnails="false" :showIndicators="true" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 100%"
    :circular="true" :autoPlay="true" :transitionInterval="2000">
    <template #item="slotProps">
        <img :src="getLink(slotProps.item.image_url)"  style="width: 100%; display: block" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="getLink(slotProps.item.image_url)"  style="display: block" />
    </template>
</Galleria>
  </div>
  <div class="col-12 lg:col-12 py-3 lg:pl-2">
    <div id="pv_id_70_0_content" class="p-tabview-panel" role="tabpanel" aria-labelledby="pv_id_70_0_header_action" data-pc-section="content" data-pc-name="tabpanel" data-pc-index="0" data-p-active="true">
  <div class="text-900 font-medium text-3xl mb-4 mt-2">Description & Details</div>
  <div class="line-height-3 text-700 p-0 mx-0 mt-0 mb-4" v-html="property?.description"></div>
  <div class="grid">
    <div class="col-12 lg:col-6">
      <span class="text-900 block font-medium mb-3">Main Features</span>
      <ul class="py-0 pl-3 m-0 text-700 mb-3">
        <li class="mb-2">{{property?.features[0].total}} Bedrooms</li>
        <li class="mb-2">{{property?.features[1].total}} Bathrooms</li>
        <li class="mb-2">{{property?.features[2].total}} Square Metres Area</li>
        <li class="mb-2">{{property?.features[3].total}} Lounges</li>
        <li class="mb-2">{{property?.features[4].total}} Garages</li>
      </ul>
    </div>
    <div class="col-12 lg:col-6">
      <span class="text-900 block font-medium mb-3">Other Features</span>
      <ul class="py-0 pl-3 m-0 text-700 mb-3">
        <li v-for="feature in property?.other_features" class="mb-2">{{feature}}</li>
      </ul>
    </div>
  </div>
</div>
    <ol class="list-none p-0 m-0 surface-100 text-center text-900">
      <li class="line-height-3 p-3 font-bold border-bottom-1 border-300">Listing Highlights</li>
      <li v-for="feature in property?.other_features" class="line-height-3 p-3 border-bottom-1 border-300">{{ feature }}</li>
    </ol>
  </div>
</div>
      </div>
    </div>
    <div class="col-12 lg:col-4 p-4">
      <div class="surface-card border-round shadow-2 p-5">
        <div class="flex justify-content-between align-items-center border-bottom-1 pb-3 surface-border">
          <span class="text-900 font-medium text-lg lg:text-xl">
            <i class="pi pi-users text-xl mr-2"></i>Contact Agent</span>
        </div>
        <div class="flex flex-column lg:flex-row flex-wrap lg:align-items-center py-3 my-3 border-bottom-1 surface-border">
          <img src="/images/logo.svg" class="w-8rem h-8rem flex-shrink-0 mb-3">
          <div class="flex-auto lg:ml-3">
            <div class="flex align-items-center justify-content-between mb-3">
              <span class="text-900 font-medium">{{ property?.agent?.first_name }} {{ property?.agent?.surname }}</span>
            </div>
            <div @click="callAgent(property?.agent?.phone_number)" class="cursor-pointer text-600 text-sm mb-3"><i class="pi pi-phone" style="font-size: 1rem"></i> {{ property?.agent?.phone_number }}</div>
            <div class="text-600 text-sm mb-3 cursor-pointer" @click="navigateTo(`https://wa.me/${property.agent.whatsapp_number}/?text=${encodeURIComponent(`Hi ${property.agent.first_name}, I wanted to enquire about ${property?.name}(${property.refrence_code}) listed on https://lucilerealestate.co.zw/detail-${property_id}, feel free to callback for a chat.`)}`,{open: {
    target: '_blank',
    windowFeatures: {
      width: 500,
      height: 500
    }
  }})"><i  class="pi pi-whatsapp" style="font-size: 1rem"></i> {{ property?.agent?.whatsapp_number }}</div>
          </div>
        </div>
        <div class="py-2 mt-3 border-bottom-1 surface-border">
          <div class="text-900 font-medium mb-2">Email Agent</div>
          <div class="text-600 text-sm line-height-3 mb-2">Send mail enquiring about this property or any other business.</div>
          <div class="p-password p-component p-inputwrapper p-input-icon-right w-full mb-2" data-pc-name="password" data-pc-section="root">
            <input class="p-inputtext p-component p-password-input w-full" data-pc-name="inputtext" data-pc-section="input" placeholder="Your name" aria-controls="pv_id_39_panel" aria-expanded="false" aria-haspopup="true">
            <!---->
            
          </div>
          <div class="p-password p-component p-inputwrapper p-input-icon-right w-full mb-2" data-pc-name="password" data-pc-section="root">
            <input class="p-inputtext p-component p-password-input w-full" data-pc-name="inputtext" data-pc-section="input" placeholder="Email Address" aria-controls="pv_id_39_panel" aria-expanded="false" aria-haspopup="true">
            <!---->
          </div>
          <div class="p-password p-component p-inputwrapper p-input-icon-right w-full mb-2" data-pc-name="password" data-pc-section="root">
            <input class="p-inputtext p-component p-password-input w-full" data-pc-name="inputtext" data-pc-section="input" placeholder="Phone Number" aria-controls="pv_id_39_panel" aria-expanded="false" aria-haspopup="true">
            <!---->
            
          </div>
          <div class="p-password p-component p-inputwrapper p-input-icon-right w-full mb-2" data-pc-name="password" data-pc-section="root">
            <Textarea v-model="message" placeholder="Your message"  rows="5" cols="50" />
            <!---->
            
          </div>
        </div>
        <button class="p-button p-component p-button-primary w-full mt-3" type="button" aria-label="Place Order" data-pc-name="button" data-pc-section="root" data-pd-ripple="true">
          <!---->
          <span class="p-button-label" data-pc-section="label">Send Message</span>
          <!---->
          <span role="presentation" aria-hidden="true" data-p-ink="true" data-p-ink-active="false" class="p-ink" data-pc-name="ripple" data-pc-section="root"></span>
        </button>
      </div>
      <div class="surface-card border-round mb-3 mt-5 shadow-2 p-5">
        <div class="flex justify-content-between align-items-center border-bottom-1 mb-3 pb-3 surface-border">
          <span class="text-900 font-medium text-lg lg:text-xl">
            <i class="pi pi-share-alt text-xl mr-2"></i>Share</span>
        </div>
        <div class="flex align-items-center mb-5">
          <div @click="shareOnWhatsapp(property?.id,property?.name,property?.listing_status,property?.location?.location_name)" class="h-2rem w-2rem sm:h-3rem sm:w-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"> <i class="pi pi-whatsapp" style="color: #00c722;font-size: 1.5rem;"></i> </div>
          <div @click="shareOnFacebook(property?.id,property?.name,property?.listing_status,property?.location?.location_name)" class="h-2rem w-2rem sm:h-3rem sm:w-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"> <i class="pi pi-facebook" style="color: #2203ff;font-size: 1.5rem;"></i> </div>
          <div @click="shareOnTwitter(property?.id,property?.name,property?.listing_status,property?.location?.location_name)" class="h-2rem w-2rem sm:h-3rem sm:w-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"> <i class="pi pi-twitter" style="color: #000000;font-size: 1.5rem;"></i> </div>
          <div @click="shareViaEmail(property?.id,property?.name,property?.listing_status,property?.location?.location_name)" class="h-2rem w-2rem sm:h-3rem sm:w-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"> <i class="pi pi-envelope" style="color: #ecc36b;font-size: 1.5rem;"></i> </div>
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
const {params:{property_id}} = useRoute()
const adminStore = useAdminStore()
const property = ref()
const message = ref()
onMounted(async() => {
    let data = {
      id: property_id
    }
    let result = await adminStore.getProperty(data).then(async (data) => {
      property.value = data?.data?.properties
      await createMessage(data?.data?.properties?.agent?.first_name,data?.data?.properties?.name, data?.data?.properties?.refrence_code)
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
const shareOnFacebook = (id:any,name:any,listingstatus:any,location:any) => {
    let text = `Hi, check out this property - ${name} ${listingstatus === 'FOR_SALE' ? "For Sale in" : "For Rent in"} ${location}, Click the link below to view it`;
    let link = `https://lucilerealestate/detail-${id}`;
    const facebookIntentURL = "https://www.facebook.com/sharer/sharer.php";
    const contentQuery = `?u=${encodeURIComponent(link)}&description=${encodeURIComponent(text)}`;
    const shareURL = facebookIntentURL + contentQuery;
    window.open(shareURL, "_blank");
};
const shareOnTwitter = (id:any,name:any,listingstatus:any,location:any) => {
        let text = `Hi, check out this property - ${name} ${listingstatus === 'FOR_SALE' ? "For Sale in" : "For Rent in"} ${location}, Click the link below to view it`
        let link = `https://lucilerealestate/detail-${id}`
        const twitterIntentURL = "https://twitter.com/intent/tweet";
        const contentQuery = `?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
        const shareURL = twitterIntentURL + contentQuery;
        window.open(shareURL, "_blank");
}
const shareViaEmail = (id:any,name:any,listingstatus:any,location:any) => {
    let subject = `Check out this property - ${name}`;
    let body = `Hi, \n\nCheck out this property - ${name} ${listingstatus === 'FOR_SALE' ? "For Sale in" : "For Rent in"} ${location}, Click the link below to view it:\n\n`;
    let link = `https://lucilerealestate/detail-${id}`;
    let email = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body + link);
    window.open(email, "_blank");
}

const shareOnWhatsapp = (id:any,name:any,listingstatus:any,location:any) => {
        let text = `Hi, check out this property - ${name} ${listingstatus === 'FOR_SALE' ? "For Sale in" : "For Rent in"} ${location}, Click the link below to view it`
        let link = `https://lucilerealestate/detail-${id}`
        const url = "https://wa.me/?text=" + encodeURIComponent(text + "\n" + link);
        window.open(url, "_blank");
}
const createMessage = async (name:any,property:any,ref:any) => {
   message.value = `Hi ${name}, can you call back about ${property}(${ref})`
}

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
span.text-600.locnames {
    font-size: 16px;
    font-weight: 600;
}
</style>