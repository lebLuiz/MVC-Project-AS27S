<script setup lang="ts">
import OrdersTableLoader from '@/modules/orders/components/Table/Orders/Loader.vue';
import OrdersTable from '@/modules/orders/components/Table/Orders/Orders.vue';
import OrderForm from '@/modules/orders/components/Form/OrderForm.vue'

import { myselfKey } from '@/modules/users/composables/useMyself/useMyself';
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types';
import type Order from '../../entities/Order';
import type OrderList from '../../entities/OrderList';

import { useOrdersList } from '~/modules/orders/composables/useOrdersList/useOrdersList';

type PropsModelType = {
    visible: boolean;
    data: Order
}

const { user } = inject(myselfKey) as MyselfContextProvider;

const {
    loading,
    orders,
    fetchOrders,
    session,
    services,
    logAndTrack,
    fecthCustomersList,
    customersList,
    fecthProductsList,
    productsList,
} = useOrdersList({
    userId: user.value!.id
})

const titleForm = ref<string>('Cadastrar pedido')
const orderForm = ref<PropsModelType>({
    visible: false,
    data: {
        id: undefined,
        customerId: '',
        orderItems: [],
        total: '',
        userId: undefined
    }
})

const handleAddOrder = async () => {
    await Promise.all([
        fecthCustomersList(),
        fecthProductsList(),
    ]);
    formOrderVisibleTrue();
}

const handleEditOrder = async (orderList: OrderList) => {
    orderForm.value.data = {
        id: orderList.id,
        customerId: orderList.customer.id || '',
        orderItems: orderList.orderItems.map((v) => ({ price: v.product.price, productId: v.productId, quantity: v.quantity })) || [],
        total: orderList.total,
        userId: user.value!.id
    }
    titleForm.value = 'Editar pedido'

    formOrderVisibleTrue();
}

const handleSaveOrder = () => {
    if (!orderForm.value.data.id) {
        registerOrder();
        return;
    }
    editOrder();
}

const registerOrder = async () => {
    try {
      await services.orders.create(session.userToken.value, orderForm.value.data);
      fetchOrders();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
      resetFormOrder()
    }
}

const editOrder = async () => {
    try {
      await services.orders.update(session.userToken.value, orderForm.value.data);
      fetchOrders();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
      resetFormOrder()
    }
}

const handleRemoveOrder = async ({ id }: OrderList) => {
    try {
      await services.orders.delete(session.userToken.value, id);
      fetchOrders();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
}

const resetFormOrder = () => {
    orderForm.value.data = {
        id: undefined,
        customerId: '',
        orderItems: [],
        total: '',
        userId: undefined
    }
    orderForm.value.visible = false;
}

const formOrderVisibleTrue = () => {
    orderForm.value.visible = true;
}
</script>

<template>
    <div class="flex gap-2 mb-2">
        <Button
            :loading="loading"
            class="mt-5 w-full md:w-auto"
            label="Cadastrar pedido"
            icon="pi pi-plus"
            icon-pos="right"
            @click="handleAddOrder" />
    </div>
    <WidgetDefault title="Listagem de pedidos"
        v-if="!!orders.length">
        <OrdersTableLoader :loading="loading">
            <OrdersTable :orders="orders" @edit="handleEditOrder" @remove="handleRemoveOrder" />
        </OrdersTableLoader>
    </WidgetDefault>

    <OrderForm v-model="orderForm" :title="titleForm" :customers="customersList" :products="productsList" @save="handleSaveOrder" @close="resetFormOrder" />
</template>
