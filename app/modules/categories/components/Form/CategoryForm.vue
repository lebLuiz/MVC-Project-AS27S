<script setup lang="ts">
import type Category from '../../entities/Category';

type PropsModelType = {
    visible: boolean;
    data: Category
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
            <InputText id="name" class="flex-auto" autocomplete="off" v-model="vModel.data.name" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="description" class="font-semibold w-24">Descrição</label>
            <InputText id="description" class="flex-auto" autocomplete="off" v-model="vModel.data.description" />
        </div>
        <template #footer>
            <Button label="Cancelar" text severity="secondary" @click="emit('close')" autofocus />
            <Button label="Salvar" outlined severity="secondary" @click="emit('save')" autofocus />
        </template>
    </Dialog>
</template>


