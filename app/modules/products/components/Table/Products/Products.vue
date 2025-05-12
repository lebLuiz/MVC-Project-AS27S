<script setup lang="ts">
    import type ProductList from '~/modules/products/entities/Product/ProductList';
    import { currencyFormatBRL } from '@/libs/currency/format';
    import { formatDateToBrazilian } from '@/libs/date/format'

    const emit = defineEmits<{
        (e: 'edit', data: ProductList): void,
        (e: 'remove', data: ProductList)
    }>();

    const props = defineProps<{
        products: ProductList[]
    }>();
</script>

<template>
    <DataTable :value="props.products" table-class="min-width: 40rem" size="large">
        <Column field="name" header="Nome" />
        <Column field="description" header="Descrição"/>
        <Column header="Preço" field="price">
            <template #body="{ data }">
                {{ currencyFormatBRL(data.price) }}
            </template>
        </Column>
        <Column field="stock" header="Estoque"/>
        <Column field="category.name" header="Categoria"/>

        <Column header="Data de criação" field="createdAt">
            <template #body="{ data }">
                {{ formatDateToBrazilian(data.createdAt) }}
            </template>
        </Column>

        <Column header="Ações">
            <template #body="{ data }">
                <div class="flex items-center gap-1">
                    <Button
                        size="small"
                        class="md:w-auto"
                        icon="pi pi-pencil"
                        severity="help"
                        @click="() => emit('edit', data)" />

                    <Button
                        size="small"
                        class="md:w-auto"
                        icon="pi pi-trash"
                        severity="danger"
                        @click="() => emit('remove', data)" />
                </div>
            </template>
        </Column>
    </DataTable>
</template>
