<script setup lang="ts">
import CustomersTableLoader from '@/modules/customers/components/Table/Customers/Loader.vue';
import CustomersTable from '@/modules/customers/components/Table/Customers/Customers.vue';
import CustomerForm from '@/modules/customers/components/Form/CustomerForm.vue'

import { myselfKey } from '@/modules/users/composables/useMyself/useMyself';
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types';
import type Customer from '../../entities/Customer';
import type { CustomerList } from '../../entities/CustomerList';

import { useCustomersList } from '~/modules/customers/composables/useCustomersList/useCustomersList';

type PropsModelType = {
    visible: boolean;
    data: Customer
}

const { user } = inject(myselfKey) as MyselfContextProvider;

const {
    loading,
    customers,
    fetchCustomers,
    session,
    services,
    logAndTrack,
} = useCustomersList({
    userId: user.value!.id
})

const titleForm = ref<string>('Cadastrar cliente')
const customerForm = ref<PropsModelType>({
    visible: false,
    data: {
        id: undefined,
        name: '',
        email: '',
        phone: '',
        // orders: [],
    }
})

const handleAddCustomer = async () => {
    formCustomerVisibleTrue();
}

const handleEditCustomer = async (customerList: CustomerList) => {
    customerForm.value.data = {
        id: customerList.id,
        name: customerList.name,
        email: customerList.email,
        phone: customerList.phone,
        // orders: customerList.orders,
    }
    titleForm.value = 'Editar cliente'

    formCustomerVisibleTrue();
}

const handleSaveCustomer = () => {
    if (!customerForm.value.data.id) {
        registerCustomer();
        return;
    }
    editCustomer();
}

const registerCustomer = async () => {
    try {
      await services.customers.create(session.userToken.value, customerForm.value.data);
      fetchCustomers();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
      resetFormCustomer()
    }
}

const editCustomer = async () => {
    try {
      await services.customers.update(session.userToken.value, customerForm.value.data);
      fetchCustomers();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
      resetFormCustomer()
    }
}

const handleRemoveCustomer = async ({ id }: CustomerList) => {
    try {
      await services.customers.delete(session.userToken.value, id);
      fetchCustomers();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
}

const resetFormCustomer = () => {
    customerForm.value.data = {
        id: undefined,
        name: '',
        email: '',
        phone: '',
        // orders: [],
    }
    customerForm.value.visible = false;
}

const formCustomerVisibleTrue = () => {
    customerForm.value.visible = true;
}
</script>

<template>
    <div class="flex gap-2 mb-2">
        <Button
            :loading="loading"
            class="mt-5 w-full md:w-auto"
            label="Cadastrar cliente"
            icon="pi pi-plus"
            icon-pos="right"
            @click="handleAddCustomer" />
    </div>
    <WidgetDefault title="Listagem de clientes"
        v-if="!!customers.length">
        <CustomersTableLoader :loading="loading">
            <CustomersTable :customers="customers" @edit="handleEditCustomer" @remove="handleRemoveCustomer" />
        </CustomersTableLoader>
    </WidgetDefault>

    <CustomerForm v-model="customerForm" :title="titleForm" @save="handleSaveCustomer" @close="resetFormCustomer" />
</template>
