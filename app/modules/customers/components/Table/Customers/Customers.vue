<script setup lang="ts">
    import type { CustomerList } from '~/modules/customers/entities/CustomerList';

    const emit = defineEmits<{
        (e: 'edit', data: CustomerList): void,
        (e: 'remove', data: CustomerList)
    }>();

    const props = defineProps<{
        customers: CustomerList[]
    }>();
</script>

<template>
    <DataTable :value="props.customers" table-class="min-width: 40rem" size="large">
        <Column field="name" header="Nome" />
        <Column field="email" header="E-mail"/>
        <Column field="phone" header="Telefone"/>

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
