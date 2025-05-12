<script setup lang="ts">
    import Orders from '@/modules/orders/screens/Orders/Orders.vue';

    useHead({
        title: 'Pedidos | ⚖️ Baanbal',
    })

    definePageMeta({
        layout: 'admin',
        middleware: ['auth'],
    })
</script>

<template>
    <Orders />
</template>
