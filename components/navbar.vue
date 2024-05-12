<template>
    <div class="bg-custom p-3 col-12 flex justify-content-between row mainnav" style="height: 100px;">
                <div class="col-2">
                    <NuxtImg @click="navigateTo('/')" src="/images/logo.svg" alt="Image" height="40" class="toplogo" />
                </div>
                <div class='search col-6'>
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>

                        <input @keydown="isKeyDown = true" @keyup="searchProducts()"  v-model="search_text" class="searchinput p-inputtext p-component surface-section text-600 surface-border w-full" data-pc-name="inputtext" data-pc-section="root" type="text" placeholder="Search Product | Category | Brand">
                    </IconField>
                    <!-- v-if="search_text !== ''" -->
                      <div v-if="search_text !== ''" class="card p-3" role="dialog" aria-labelledby="pv_id_1_header" aria-modal="true" data-pc-name="dialog" data-pc-section="root" pv_id_3="" style="display: flex;flex-direction: column;pointer-events: auto;width: 60rem;border-radius: 10px;background-color: #f2f2f2;margin-top: 10px;" data-pd-focustrap="true" >
                        <DataTable v-if="isKeyDown" :value="products" :row="10">
                        <Column field="code">
                            <template #body>
                                <Skeleton></Skeleton>
                            </template>
                        </Column>
                        <Column field="name" >
                            <template #body>
                                <Skeleton></Skeleton>
                            </template>
                        </Column>
                        <Column field="category">
                            <template #body>
                                <Skeleton></Skeleton>
                            </template>
                        </Column>
                        <Column field="quantity">
                            <template #body>
                                <Skeleton></Skeleton>
                            </template>
                        </Column>
                        </DataTable>
                        <DataTable v-else :value="products"  resizableColumns columnResizeMode="expand" showGridlines rowGroupMode="subheader" groupRowsBy="Category" sortMode="single"
        sortField="Category" :sortOrder="1" scrollable scrollHeight="400px">
                        <Column field="Category" header="Category"></Column>
                        <Column field="Product" header="Product">
                            <template #body="slotProps">
                                <div class="flex align-items-center gap-2">
                                    <img :alt="slotProps.data.Product" src="https://primefaces.org/cdn/primevue/images/avatar/ivanmagalhaes.png" width="32" style="vertical-align: middle" />
                                    <span>{{ slotProps.data.Product }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column v-for="shop in stores" :field="shop" :header="shop">
                            <template #body="slotProps">
                                <span>{{ slotProps?.data?.[shop] }}</span>
                                <span class="cart" v-if="slotProps?.data?.[shop] !== '-'">BUY</span>
                            </template>
                        </Column>
                        <template #groupheader="slotProps">
                            <div class="flex align-items-center gap-2">
                                <Button icon="pi pi-folder-open" severity="secondary" text rounded outlined aria-label="Bookmark" />
                                <span class="catheaders">{{ slotProps.data.Category }}</span>
                            </div>
                        </template>
                        <template #groupfooter="slotProps">
                            <div class="flex justify-content-end font-bold w-full">Product Total: {{ calculateCategoryTotal(slotProps.data.Category) }}</div>
                        </template>
                        </DataTable>
                      <!---->
                      <span class="p-hidden-accessible p-hidden-focusable" tabindex="0" role="presentation" aria-hidden="true" data-p-hidden-accessible="true" data-p-hidden-focusable="true" data-pc-section="lastfocusableelement"></span>
                    </div>
                </div>
                <div class="col-4">
                    <Button  icon="pi pi-file"  class="first mr-2" @click="toggle" label="Catalogues" />
                    <Button icon="pi pi-tags" @click="navigateTo('/compare')" class="second" label="Price Compare" />
                </div>
    </div>
    <OverlayPanel ref="op">
    <div class="flex flex-column gap-3 w-25rem">
        <div>
            
            <Button label="View All" class=" topall w-12" />
        </div>
        <div>
            <span class="font-medium text-900 block mb-2">Catalogue Newsletter</span>
            <InputGroup>
                <InputText placeholder="Enter Email Address" label="Enter Email Address"/>
                <Button  label="Subscribe" class="subscribe" icon="pi pi-envelope"></Button>
            </InputGroup>
        </div>
        <div>
            <span class="font-medium text-900 block mb-2">Top Catalogues</span>
            <ul class="list-none p-0 m-0 flex flex-column gap-3">
                <li v-for="item in catalogues" :key="item.name" class="flex align-items-center gap-2">
                    <img :src="item?.image" style="width: 32px" />
                    <div>
                        <span class="font-medium">{{ item.name }}</span>
                        <div class="text-sm text-color-secondary">{{ item.date }}</div>
                    </div>
                    <div class="flex align-items-center gap-2 text-color-secondary ml-auto text-sm">
                        <span>Download</span>
                        <i class="pi pi-download"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</OverlayPanel>
</template>
<script lang="ts" setup>
import Button from 'primevue/button';
import productsJson from "~/products.json"
const search_text = ref('')
const op = ref();
const toggle = (event:any) => {
    op.value.toggle(event);
}
const isKeyDown = ref(false)
const products= ref()
const stores:any = ref([])
const items = ref([
    {
        label: 'Home',
        link: '/',
        root: true
    },
    {
        label: 'Features',
        link: '/#features',
        root: true
    },
    {
        label: 'Pricing',
        link: '/#pricing',
        root: true
    },
    {
        label: 'Contact Us',
        link: '#',
        root: true
    }
]);

const calculateCategoryTotal = (name:any) => {
    let total = 0;

    if (products.value) {
        for (let product of products.value) {
            if (product.Category === name) {
                total++;
            }
        }
    }

    return total;
};
const formatCurrency = (value:any) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const searchProducts = async () => {
  isKeyDown.value = false
}
const catalogues = ref([
  {
    name: 'Pick n Pay',
    link: 'https://example.com/slide1',
    image: 'https://tmpnponline.co.zw/wp-content/themes/PicknPay/img/tm-click-n-collect-logo.png',
    date: '2024-05-05',
  },
  {
    name: 'Spar',
    link: 'https://example.com/slide2',
    image: 'https://thespargroup.com/wp-content/uploads/photo-gallery/thumb/SPAR_Vertical_Logo.jpeg',
    date: '2024-05-06',
  },
  {
    name: 'Halsteds',
    link: 'https://example.com/slide3',
    image: 'https://halsteds.co.zw/media/logo/stores/1/halsted-builders-express-zim_1.png',
    date: '2024-05-07',
  },
  {
    name: 'Delta Beverages',
    link: 'https://example.com/slide4',
    image: 'https://images.africanfinancials.com/zw-dlta-2012-pr-00-200x150.jpg',
    date: '2024-05-08',
  },
  {
    name: 'OK Zimbabwe',
    link: 'https://example.com/slide5',
    image: 'data:image/jpeg;base64,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',
    date: '2024-05-09',
  },
]);
const setStores = () => {
    const uniqueShops = new Set();
    
    productsJson.Categories.forEach(category => {
        category.Products.forEach(product => {
            product.Stores.forEach(store => {
                uniqueShops.add(store.Shop);
            });
        });
    });
    
    stores.value = [...uniqueShops];
};
const getProducts = () => {
    products.value = productsJson.Categories.map(category => {
        return category.Products.map(product => {
            const productName = product?.Brand // Get the brand name from the product object
            const productShops = stores.value.reduce((acc:any, shop:any) => {
                const storeData = product.Stores.find(s => s.Shop === shop);
                acc[shop] = storeData ? storeData.Price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '-';
                return acc;
            }, {});
            
            return {
                Category: category.Name,
                Product: productName, // Use the extracted brand name
                ...productShops
            };
        });
    }).flat();
};

onMounted (async() => {
   await setStores()
   await getProducts()
})
</script>
<style>
.bg-custom {
    background-color: #003e95 !important;
}
img.toplogo {
    /* margin-top: 37px; */
    z-index: 1 !important;
    position: absolute;
    height: 120px !important;
}
button.p-button.p-component.topall.w-12 {
    background-color: #003e95;
    border-color: #003e95;
}
span.p-tag.p-component.buy {
    background-color: #003e95;
    padding: 3px;
    font-size: 9px;
    cursor: pointer;
    border-radius: 3px;
}
span.cart {
    background-color: #003e95;
    padding: 3px;
    font-size: 10px;
    color: white;
    margin-left: 13px;
    border-radius: 2px;
}
span.catheaders {
    font-weight: 600;
    font-style: oblique;
}
button.p-button.p-component.subscribe {
    background-color: #cb1400;
    border-color: #cb1400;
}
/* table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
} */
button.p-button.p-component.second {
    height: 50px;
    border-radius: 10px;
    border: none;
    width: 14rem;
    /* background-color: #0052ff; */
    background-image: linear-gradient(to right, #cb1400, #F44336) !important;
    font-family: poppins, sans-serif;
}
.catg {
    font-size: 12px;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
}
input.searchinput {
    height: 52px;
}
.p-megamenu-horizontal .p-megamenu-root-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: auto !important;
}
.menu-items {
    text-decoration: none !important;
}
button.p-button.p-component.first {
    width: 152px;
    height: 51px;
    border-radius: 10px;
    background-color: #000000;
    font-family: poppins, sans-serif;
    border: none;
    color: #fffbfb;
}
.p-megamenu-horizontal .p-megamenu-end {
    margin-left: auto;
    align-self: center;
    margin-top: 6px !important;
}
.mainnav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    margin-bottom: 10px;
    /* background-color: #ffffff; */
    box-shadow: 0 2px 4px rgba(33,51,67,.12);
    /* padding: 10px 20px; */
}
.p-megamenu-horizontal {
    height: 55px !important;
    border: none !important;
    margin: auto !important;
}
span.ml-2.menutext {
    color: #000000 !important;
    font-family: poppins, sans-serif !important;
    /* padding-bottom: 41px !important; */
    text-transform: capitalize !important;
    font-weight: 500 !important;
    font-size: 16px !important;
}
.p-megamenu .p-menuitem {
    margin-top: -4px !important;
}
@media (max-width: 768px) {
    span.ml-2.menutext {
        color: #3c3131 !important;
        font-family: poppins, sans-serif !important;
        font-weight: 500 !important;
        font-size: 16px !important;
    }
    .p-megamenu.p-megamenu-mobile .p-megamenu-button:hover {
    color: #feffff;
    background: #08090a;
    }
}
.p-megamenu.p-megamenu-horizontal .p-megamenu-root-list > .p-menuitem:not(.p-highlight):not(.p-disabled) > .p-menuitem-content:hover {
    color: #575757 !important;
    background: #f2f3f7 !important;
    border: none;
}
</style>