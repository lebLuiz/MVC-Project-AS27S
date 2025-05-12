<script setup lang="ts">
import type Signin from '../../entities/Signin/Signin';
import type { ZodFormattedError } from 'zod';

const props = defineProps<{
    errors?: ZodFormattedError<Signin>
}>()

const signin = defineModel<Signin>({
    required: true,
    default: {
        email: '',
        password: ''
    }
})
</script>

<template>
    <div class="flex flex-col md:flex-row gap-2">
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