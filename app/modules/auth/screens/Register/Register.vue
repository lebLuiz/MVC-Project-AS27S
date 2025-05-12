<script setup lang="ts">
import RegisterForm from '@/modules/auth/components/RegisterForm/RegisterForm.vue';
import { useSignup } from '@/modules/auth/composables/useSignup/useSignup';

const { signupData, register, loading, errors, safeParse } = useSignup()

const handleRegister = async () => {
    const isValid = safeParse().success;
    if (!isValid) return
    await register()
}
</script>

<template>
    <Toast />
    <section class="w-full h-screen flex flex-col items-center justify-center gap-5 bg-gray-50">
        <Logo />
        <RegisterForm  v-model="signupData" :errors />
        <div class="flex gap-2">
            <Button
                :loading="loading"
                class="mt-5 w-full md:w-auto"
                label="Cadastrar"
                icon-pos="right"
                severity="success"
                @click="handleRegister"
            />
        </div>
    </section>
</template>
