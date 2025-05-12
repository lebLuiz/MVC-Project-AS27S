<script setup lang="ts">
import SocialForm from '@/modules/auth/components/SocialForm/SocialForm.vue';
import { useSignin } from '@/modules/auth/composables/useSignin/useSignin';

const { signinData, login, loading, errors, safeParse } = useSignin()
const router = useRouter();

const handleRedirectSignup = () => {
    router.push('/auth/register')
}
const handleLogin = async () => {
    const isValid = safeParse().success;
    if (!isValid) return
    await login()
}
</script>

<template>
    <Toast />
    <section class="w-full h-screen flex flex-col items-center justify-center gap-5 bg-gray-50">
        <Logo />
        <SocialForm  v-model="signinData" :errors />
        <div class="flex gap-2">
            <Button
                :loading="loading"
                class="mt-5 w-full md:w-auto"
                label="Cadastrar"
                icon="pi pi-plus"
                icon-pos="right"
                @click="handleRedirectSignup"
            />

            <Button
                :loading="loading"
                class="mt-5 w-full md:w-auto"
                label="Entrar"
                icon-pos="right"
                severity="success"
                @click="handleLogin"
            />
        </div>
    </section>
</template>
