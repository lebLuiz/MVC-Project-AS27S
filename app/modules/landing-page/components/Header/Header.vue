<script setup lang="ts">
const emit = defineEmits<{
    (e: 'wants-be-seller'): void
}>();
</script>

<template>
    <header class="w-full shadow">
        <nav class="bg-white px-4 lg:px-6 py-2.5">
            <div class="flex justify-center md:justify-between items-center mx-auto max-w-screen-xl">
                <div class="flex items-center">
                    <NuxtLink to="/">
                        <Logo />
                    </NuxtLink>
                </div>

                <div class="hidden md:flex items-center">
                    <Button label="Continuar como vendedor" icon-pos="right" icon="pi pi-arrow-right"
                        @click="() => emit('wants-be-seller')" />
                </div>
            </div>
        </nav>
    </header>
</template>
