<script setup lang="ts">
const colorMode = useColorMode();

colorMode.value = 'light';

useHead({
    title: '⚖️ Baanbal',
})

useSeoMeta({
    title: '⚖️ Baanbal - E-commerce de balanças.',
    ogTitle: '⚖️ Baanbal - Venda seus itens.',
    description: 'Encontre contatos que comprem seu produto/serviço.',
    ogDescription: 'Encontre contatos que comprem seu produto/serviço. Serviços precisam de outros serviços 🤝',
})
</script>

<template>
  <NuxtLayout>
    <Toast />
    <NuxtPage  />
  </NuxtLayout>
</template>
