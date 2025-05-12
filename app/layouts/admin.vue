<script setup lang="ts">
import Header from '@/modules/auth/components/Header/Header.vue';
import HeaderLoader from '@/modules/auth/components/Header/Loader.vue';
import { useSession } from '@/modules/auth/composables/useSession/useSession';
import { useMyself } from '~/modules/users/composables/useMyself/useMyself';

const router = useRouter();
const session = useSession();

const { loading, user } = useMyself();
const nickname = computed(() => {
    if (!user.value?.name) {
        return 'Usuário'
    }

    const [nick] = user.value.name.split(' ')
    return nick;
})

const handleLogout = async () => {
    session.logout();
}
</script>

<template>
    <div class="w-full h-full flex flex-col items-center">
        <MainContent>
            <template #header>
                <HeaderLoader :loading="loading">
                    <Header
                        :nickname="nickname"
                        @navigate-to-products="() => router.push('/app/products/all')"
                        @navigate-to-categories="() => router.push('/app/categories/all')"
                        @navigate-to-orders="() => router.push('/app/orders/all')"
                        @navigate-to-customers="() => router.push('/app/customers/all')"
                        @logout="handleLogout" />
                </HeaderLoader>
            </template>
            <template #content>
                <Splash :loading="loading">
                    <slot />
                </Splash>
            </template>
        </MainContent>
    </div>
</template>