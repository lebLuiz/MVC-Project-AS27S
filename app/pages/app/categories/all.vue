<script setup lang="ts">
    import Categories from '@/modules/categories/screens/Categories/Categories.vue';

    useHead({
        title: 'Categorias | ⚖️ Baanbal',
    })

    definePageMeta({
        layout: 'admin',
        middleware: ['auth'],
    })
</script>

<template>
    <Categories />
</template>
