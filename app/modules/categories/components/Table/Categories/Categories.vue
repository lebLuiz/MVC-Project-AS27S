<script setup lang="ts">
    import type { CategoryList } from '~/modules/categories/entities/CategoryList';

    const emit = defineEmits<{
        (e: 'edit', data: CategoryList): void,
        (e: 'remove', data: CategoryList)
    }>();

    const props = defineProps<{
        categories: CategoryList[]
    }>();
</script>

<template>
    <DataTable :value="props.categories" table-class="min-width: 40rem" size="large">
        <Column field="name" header="Nome" />
        <Column field="description" header="Descrição"/>

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
