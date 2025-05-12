<script setup lang="ts">
const emit = defineEmits<{
    (e: 'wants-be-seller'): void
}>();
</script>

<template>
    <section class="w-full h-full flex flex-col items-center justify-center">
        <h1 class="font-[Inter] text-balance mb-4 text-3xl lg:text-5xl text-center font-extrabold text-black">
            Encontre contatos que comprem seu produto/serviço
        </h1>
        <p class="font[Inter] text-balance mb-8 text-xl lg:text-3xl text-center text-black">
            Encontre contatos que comprem seu produto/serviço. Serviços precisam de outros serviços 🤝
        </p>
        <div class="flex flex-col justify-center items-center">
            <Button label="Continuar como vendedor" icon-pos="right" icon="pi pi-arrow-right"
                @click="() => emit('wants-be-seller')" />
        </div>
    </section>
</template>
