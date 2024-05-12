
<template>
    <div class="card">
        <Carousel :value="products" :numVisible="6" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
            <template #item="slotProps">
                <div class="border-1 surface-border border-round m-2  p-3">
                    <div class="mb-3">
                        <div class="relative mx-auto" style="height: 200px;">
                            <img :src="slotProps.data.images[0]" :alt="slotProps.data.title" class="w-full h-full object-cover border-round" />
                            <Tag :value="slotProps.data.category" class="absolute" style="left:5px; top: 5px"/>
                        </div>
                    </div>
                    <div class="mb-3 font-medium nametext">{{ addEllipsis(slotProps.data.title) }}</div>
                    <div class="flex justify-content-between align-items-center">
                        <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
                        <span>
                            <Button icon="pi pi-eye" @click="toggle" severity="secondary" class="whishlist" outlined />
                            <Button icon="pi pi-shopping-cart" class="ml-2 cart"/>
                        </span>
                    </div>
                </div>
            </template>
        </Carousel>
        <OverlayPanel ref="op" appendTo="body">
            <DataTable  :value="products" selectionMode="single" :paginator="true" :rows="5">
                <Column field="title" header="Name" sortable style="min-width: 12rem"></Column>
                <Column header="Image">
                    <template #body="slotProps">
                        <img :src="slotProps.data.images[0]" :alt="slotProps.data.images[0]" class="w-4rem shadow-1" />
                    </template>
                </Column>
                <Column field="price" header="Price" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        $ {{ slotProps.data.price }}
                    </template>
                </Column>
            </DataTable>
        </OverlayPanel>
    </div>
</template>

<script lang="ts" setup>
const op = ref();

onMounted(async () => {
    // https://fakestoreapi.com/products
    // https://dummyjson.com/products
    let result = await fetch('https://dummyjson.com/products')
    // console.log('resultltltlt', await result.json())
    let prods = await result.json()
    products.value = prods?.products
})
const toggle = (event:any) => {
    op.value.toggle(event);
};
const products = ref();
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

const  addEllipsis = (str:string) => {
    return str.length > 19 ? str.slice(0, 19) + '...' : str;
}

</script>
<style>
.p-tag {
    background: #003e95;
    color: #ffffff;
    text-transform: uppercase;
}
button.p-button.p-component.p-button-icon-only.ml-2.cart {
    background-color: #003e95;
    border-color: #003e95;
}
button.p-button.p-component.p-button-icon-only.p-button-secondary.p-button-outlined.whishlist {
    background-color: #d6200e;
    color: white
}
</style>
