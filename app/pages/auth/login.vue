<script setup lang="ts">
import Login from '@/modules/auth/screens/Login/Login.vue';

useHead({
    title: 'Entrar | ⚖️ Baanbal',
})

definePageMeta({
    layout: 'default',
})
</script>

<template>
    <Login />
</template>
