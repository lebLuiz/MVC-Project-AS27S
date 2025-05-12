<script setup lang="ts">
    import type OrderList from '~/modules/orders/entities/OrderList';
    import { formatDateToBrazilian } from '@/libs/date/format'

    const emit = defineEmits<{
        (e: 'edit', data: OrderList): void,
        (e: 'remove', data: OrderList): void,
    }>();

    const props = defineProps<{
        orders: OrderList[]
    }>();
</script>

<template>
    <DataTable :value="props.orders" table-class="min-width: 40rem" size="large">
        <Column field="id" header="ID" />

        <Column header="Cliente">
        <template #body="{ data }">
            {{ data.customer?.name || 'Não informado' }}
        </template>
        </Column>

        <Column field="total" header="Total" />

        <Column header="Itens">
        <template #body="{ data }">
            {{ data.orderItems.length }} item(ns)
        </template>
        </Column>

        <Column header="Criado em">
        <template #body="{ data }">
            {{ formatDateToBrazilian(data.createdAt) }}
        </template>
        </Column>

        <Column header="Responsável">
        <template #body="{ data }">
            {{ data.user?.name || 'Automático' }}
        </template>
        </Column>

        <Column header="Ações">
        <template #body="{ data }">
            <div class="flex items-center gap-1">
            <Button icon="pi pi-pencil" severity="help" @click="() => emit('edit', data)" size="small" />
            <Button icon="pi pi-trash" severity="danger" @click="() => emit('remove', data)" size="small" />
            </div>
        </template>
        </Column>
    </DataTable>
</template>
