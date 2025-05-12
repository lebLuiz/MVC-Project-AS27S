<script setup lang="ts">
import Header from '@/modules/landing-page/components/Header/Header.vue';
import Hero from '@/modules/landing-page/components/Hero/Hero.vue';

const router = useRouter();
const handlerLogin = () => {
    router.push('/auth/login');
}
</script>

<template>
    <MainContent>
        <template #header>
            <Header @wants-be-seller="handlerLogin" />
        </template>

        <template #content>
            <Hero @wants-be-seller="handlerLogin" />
        </template>
    </MainContent>
</template>
