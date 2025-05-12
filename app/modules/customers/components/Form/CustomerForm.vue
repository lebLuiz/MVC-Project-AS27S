<script setup lang="ts">
import type Customer from '../../entities/Customer';

type PropsModelType = {
    visible: boolean;
    data: Customer
}

const emit = defineEmits<{
    (e: 'save'): void,
    (e: 'close'): void,
}>();

const vModel = defineModel<PropsModelType>({ required: true})
const props = defineProps<{ title: string }>()
</script>

<template>
    <Dialog v-model:visible="vModel.visible" modal :closable="false" :header="props.title" :style="{ width: '30rem' }">
        <div class="flex items-center gap-4 mb-4">
            <label for="name" class="font-semibold w-24">Nome</label>
            <InputText id="name" name="email" class="flex-auto" autocomplete="off" v-model="vModel.data.name" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="email" class="font-semibold w-24">E-mail</label>
            <InputText id="email" name="email" type="email" class="flex-auto" autocomplete="off" v-model="vModel.data.email" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="phone" class="font-semibold w-24">Telefone</label>
            <InputMask id="phone" name="phone" v-model="vModel.data.phone" mask="(99) 99999-9999" placeholder="(99) 99999-9999" fluid />
        </div>
        <template #footer>
            <Button label="Cancelar" text severity="secondary" @click="emit('close')" autofocus />
            <Button label="Salvar" outlined severity="secondary" @click="emit('save')" autofocus />
        </template>
    </Dialog>
</template>


