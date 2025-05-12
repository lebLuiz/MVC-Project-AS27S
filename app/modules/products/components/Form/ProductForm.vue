<script setup lang="ts">
import type { CategoryList } from '~/modules/categories/entities/CategoryList';
import type Product from '../../entities/Product/Product';

type PropsModelType = {
    visible: boolean;
    data: Product
}

const emit = defineEmits<{
    (e: 'save'): void,
    (e: 'close'): void,
}>();

const vModel = defineModel<PropsModelType>({ required: true})
const props = defineProps<{ title: string, categories: CategoryList[] }>()
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
        <div class="flex items-center gap-4 mb-4">
            <label for="price" class="font-semibold w-24">Preço</label>
            <InputNumber v-model="vModel.data.price" inputId="currency-br" mode="currency" currency="BRL" locale="pt-BR" fluid />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="stock" class="font-semibold w-24">Estoque</label>
            <InputNumber id="stock" class="flex-auto" autocomplete="off" v-model="vModel.data.stock" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="categoryId" class="font-semibold w-24">Categoria</label>
            <Select name="categoryId" id="categoryId" v-model="vModel.data.categoryId" :options="categories" optionLabel="name" optionValue="id" />
        </div>
        <template #footer>
            <Button label="Cancelar" text severity="secondary" @click="emit('close')" autofocus />
            <Button label="Salvar" outlined severity="secondary" @click="emit('save')" autofocus />
        </template>
    </Dialog>
</template>


