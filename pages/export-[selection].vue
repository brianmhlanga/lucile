<template>
    <Head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=yes">
        <title>Pricelyst Selection</title>
    </Head>
    <main>
        <Front class="front-page"  :items="first_arr" :all_items="all_items" :shadow="false" :max_front_page="max_front_page" :table_row_offset="table_row_offset" :max_extra_page="max_extra_page" />
        <Extra v-for="(value, index) in rest_chunked_arr" :key="index" :class="`extra-page extra-page-${ index }`"  :items="value" :all_items="all_items" :shadow="false" :max_front_page="max_front_page" :table_row_offset="table_row_offset" :max_extra_page="max_extra_page" />
    </main>
</template>

<script setup lang="ts">
    import { max_extra_page, max_front_page, table_row_offset } from "~/vendors/export";
    
    const { params: { selection, invoice_id, user_id, token } }: any = useRoute();

    

    // const { data: { value: { data:  { number, date_issued, products, payment_due, date_format, terms_n_conditions, payment_information, company, customer, currency, tax_added } } } }: any = await useAsyncData(() => {
    //     return invoiceStore.findForExport({
    //         id,
    //         invoice_id,
    //         user_id,
    //         token
    //     })
    // });

    let all_items = selection;

    


    const chunk = (arr: any[], size: number) => {  
        const chunks = []
        arr = [].concat(...arr)

        while (arr.length) {
            chunks.push(
                arr.splice(0, size)
            )
        }

        return chunks
    }

    // First Page will have a maximum of 14 items
    const first_arr = all_items.slice(0, max_front_page);

    // Subsequent pages will have a maximum of 24 items each page
    const rest_chunked_arr = chunk(all_items.slice(max_front_page), max_extra_page);

    // If the first page or nested array element has an index (n) where: n = 0 and whose number of elements inside it (k) where: 1 < k <= 6, then add the SubTotal section of the table to the next page
    const k1 = all_items.length > ( max_front_page - table_row_offset ) && rest_chunked_arr.length === 0;

    // If the last page or nested array element has an index (n) where: n > 0 and whose number of elements inside it (k) where: 6 < k <= 15, then add the SubTotal section of the table to the next page
    //@ts-ignore
    const k2 = rest_chunked_arr.at(-1)?.length > 1 && rest_chunked_arr.at(-1)?.length >= (max_extra_page - table_row_offset);

    if(k1 || k2){
        rest_chunked_arr.push([]);
    }
</script>

<style>

</style>