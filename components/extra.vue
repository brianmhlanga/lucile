<template>
    <div class="container">
        <div class="row">
            <div style="page-break-after: auto; padding: 0;" class="invoice-4 invoice-content mb-4">
                <div class="col-lg-12">
                    <div style="min-width: 800px; height: 1100px;" class="invoice-inner position-relative" :class="{ 'shadow': shadow }" id="invoice_wrapper">
                        <div class="invoice-top">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="logo">
                                        <img :src="logo.includes('null') ? '/images/no-image.jpg' : logo" class="logo_invoice" alt="logo">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="invoice text-end">
                                        <h1>Invoice</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="order-summary">
                            <div class="table-responsive">
                                <table class="table invoice-table">
                                    <thead class="bg-active">
                                    <tr>
                                        <th><strong>Item</strong></th>
                                        <th class="text-center"><strong>Unit Price ({{ currency.symbol }})</strong></th>
                                        <th class="text-center"><strong>Quantity</strong></th>
                                        <th class="text-center"><strong>Discount ({{ currency.symbol }})</strong></th>
                                        <th class="text-right"><strong>Amount ({{ currency.symbol }})</strong></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in items" :key="index">
                                            <td>
                                                <div class="item-desc-1">
                                                    <small>{{ item.name }}</small>
                                                </div>
                                            </td>
                                            <td class="text-center">{{ (Number(item.selling_price * currency.exchange_rate)).toFixed(2) }}</td>
                                            <td class="text-center">{{ item._quantity }}</td>
                                            <td class="text-center">{{ (Number(item._discount ?? 0)).toFixed(2) }}</td>
                                            <td class="text-right">{{ calculateAmount(items, index) }}</td>
                                        </tr>
                                        <tr v-if="(items.length < max_extra_page - table_row_offset) || items.length === 0">
                                            <td colspan="4" class="text-end">Sub Total</td>
                                            <td class="text-right">{{ (calculateGrandTotal()).toFixed(2) }}</td>
                                        </tr>
                                        <tr v-if="(items.length < max_extra_page - table_row_offset) || items.length === 0 && tax">
                                            <td colspan="4" class="text-end">Tax ({{ tax }}%)</td>
                                            <td class="text-right">{{ ((tax / 100) * calculateGrandTotal()).toFixed(2) }}</td>
                                        </tr>
                                        <tr v-if="(items.length < max_extra_page - table_row_offset) || items.length === 0">
                                            <td colspan="4" class="text-end fw-bold">Amount Due</td>
                                            <td class="text-right fw-bold">{{ (calculateGrandTotal() + ((tax / 100) * calculateGrandTotal())).toFixed(2) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div v-if="items.length < max_extra_page || items.length === 0" class="invoice-informeshon mt-4">
                            <div class="row">
                                <div v-if="payment_information" class="col-sm-6">
                                    <div class="payment-info">
                                        <h3 class="inv-title-1"><strong>Payment Info</strong></h3>
                                        <p v-if="payment_information.split('\n').length === 1" class="mb-0">{{ payment_information }}</p>
                                        <div v-else>
                                            <p v-for="(value, index) in payment_information.split('\n')" :key="index" class="mb-0">{{ value }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="terms_n_conditions" class="col-sm-6">
                                    <div class="terms-and-conditions">
                                        <h3 class="inv-title-1"><strong>Terms and Conditions</strong></h3>
                                        <p v-if="terms_n_conditions.split('\n').length === 1" class="mb-0">{{ terms_n_conditions }}</p>
                                        <div v-else>
                                            <p v-for="(value, index) in terms_n_conditions.split('\n')" :key="index" class="mb-0">{{ value }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="invoice-contact clearfix position-absolute bottom-0" style="width: 100%;">
                            <div class="row g-0">
                                <div class="col-md-12">
                                    <div class="d-flex justify-content-center contact-info">
                                        <a :href="`tel:${ company_phone_number }`"><i class="mdi mdi-phone"></i> {{ company_phone_number }}</a>
                                        <a :href="`mailto:${ company_email }`"><i class="mdi mdi-email"></i> {{ company_email }}</a>
                                        <a v-if="company_website" :href="company_website"><i class="mdi mdi-earth"></i> {{ company_website }}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const  { data, items, all_items, max_front_page, max_extra_page, table_row_offset, shadow = false } = defineProps<{
        data: any,
        items: any[],
        all_items: any[],
        max_front_page: number,
        max_extra_page: number,
        table_row_offset: number,
        shadow: boolean
    }>();

    const { logo, invoice_number, customer_name, customer_email, invoice_items, customer_address, currency, _discount, _quantity, tax, company_name, company_email, company_address, company_website, due_date, payment_information, terms_n_conditions, company_phone_number } = data;
    
    const calculateAmount = (arr: any[], index: number) => {
        const { selling_price, _quantity, _discount } = arr[index];
        return (((selling_price * currency.exchange_rate) * _quantity) - _discount).toFixed(2);
    }

     const calculateGrandTotal = () => {
        return all_items.reduce((sum, _, k, arr) => sum + parseFloat(calculateAmount(arr, k)), 0)
    }
</script>

<style scoped>
    @import "~/public/css/bootstrap.min.css";
    @import "~/public/css/file-template.css";
</style>