<script setup lang="ts">
    import Products from '@/modules/products/screens/Products/Products.vue';

    useHead({
        title: 'Meus produtos | ⚖️ Baanbal',
    })

    definePageMeta({
        layout: 'admin',
        middleware: ['auth'],
    })
</script>

<template>
    <Products />
</template>
