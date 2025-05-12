<script setup lang="ts">
    import Customers from '@/modules/customers/screens/Customers/Customers.vue';

    useHead({
        title: 'Clientes | ⚖️ Baanbal',
    })

    definePageMeta({
        layout: 'admin',
        middleware: ['auth'],
    })
</script>

<template>
    <Customers />
</template>
