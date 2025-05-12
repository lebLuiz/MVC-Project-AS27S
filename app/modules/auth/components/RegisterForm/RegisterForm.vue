<script setup lang="ts">
import type Signup from '../../entities/Signup/Signup';
import type { ZodFormattedError } from 'zod';

const props = defineProps<{
    errors?: ZodFormattedError<Signup>
}>()

const signin = defineModel<Signup>({
    required: true,
    default: {
        name: '',
        email: '',
        password: ''
    }
})
</script>

<template>
    <div class="flex flex-col md:flex-row gap-2">
        <div class="flex flex-col gap-2 flex-1">
            <label for="name">Nome</label>
            <InputText id="name" v-model="signin.name" name="name" fluid />
            <small v-if="props.errors?.name">{{ props.errors?.name._errors[0] }}</small>
        </div>

        <div class="flex flex-col gap-2 flex-1">
            <label for="email">E-mail</label>
            <InputText id="email" v-model="signin.email" name="email" type="email" fluid />
            <small v-if="props.errors?.email">{{ props.errors?.email._errors[0] }}</small>
        </div>

        <div class="flex flex-col gap-2 flex-1">
            <label for="password">Password</label>
            <Password id="password" v-model="signin.password" name="password" :feedback="false" />
            <small v-if="props.errors?.password">{{ props.errors?.password._errors[0] }}</small>
        </div>
    </div>
</template>