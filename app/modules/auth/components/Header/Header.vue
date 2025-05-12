<script setup lang="ts">
    const emit = defineEmits<{
        (e: 'navigate-to-products'): void,
        (e: 'navigate-to-categories'): void,
        (e: 'navigate-to-orders'): void,
        (e: 'navigate-to-customers'): void,
        (e: 'logout'): void,
    }>();

    const props = defineProps<{
        nickname: string;
    }>();

    const menu = ref();
    const items = [
        {
            label: 'Produtos',
            icon: 'pi pi-objects-column',
            command: () => emit('navigate-to-products'),
        },
        {
            label: 'Categorias',
            icon: 'pi pi-box',
            command: () => emit('navigate-to-categories'),
        },
        {
            label: 'Pedidos',
            icon: 'pi pi-list',
            command: () => emit('navigate-to-orders'),
        },
        {
            label: 'Clientes',
            icon: 'pi pi-users',
            command: () => emit('navigate-to-customers'),
        },
        {
            separator: true,
        },
        {
            label: 'Sair',
            icon: 'pi pi-signout',
            command: () => emit('logout'),
        },
    ]

    const toggle = (e: Event) => {
        menu.value?.toggle(e)
    }
</script>

<template>
    <header class="w-full shadow">
        <nav class="bg-white px-4 lg:px-6 py-2.5">
            <div class="flex justify-between items-center mx-auto max-w-screen-xl">
                <div class="flex items-center">
                    <nuxt-link to="/app/products/all">
                        <Logo />
                    </nuxt-link>
                </div>

                <div class="flex items-center">
                    <button class="flex gap-2 items-center" aria-haspopup="true" aria-controls="header-auth-menu"
                        @click="toggle">
                        <span class="font-[Inter] font-regular text-lg text-gray-700">Olá, {{ props.nickname }}</span>
                    </button>
                </div>

                <Menu ref="menu" id="header-auth-menu" :model="items" :popup="true" />
            </div>
        </nav>
    </header>
</template>

