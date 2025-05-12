<script setup lang="ts">
import type { CustomerList } from '~/modules/customers/entities/CustomerList';
import type Order from '../../entities/Order';
import type ProductList from '~/modules/products/entities/Product/ProductList';

type PropsModelType = {
    visible: boolean;
    data: Order
};

const emit = defineEmits<{
    (e: 'save'): void,
    (e: 'close'): void,
}>();

const vModel = defineModel<PropsModelType>({ required: true });
const props = defineProps<{ title: string, customers: CustomerList[], products: ProductList[] }>();

const quantity = ref(1);
const selectedProduct = ref<ProductList | null>(null);


const total = computed(() =>
  vModel.value.data.orderItems.reduce((sum, item) => sum + item.quantity * parseFloat(item.price?.toString()), 0)
);

const addItem = () => {
  if (!selectedProduct.value || !quantity.value) return;

  vModel.value.data.orderItems.push({
    quantity: quantity.value,
    productId: selectedProduct.value.id,
    price: selectedProduct.value.price
  });

  selectedProduct.value = null;
  quantity.value = 1;
};

const handleSave = () => {
    vModel.value.data.total = total.value?.toString();
  emit('save')
};

</script>

<template>
    <Dialog
        v-model:visible="vModel.visible"
        modal
        :closable="false"
        :header="props.title"
        :style="{ width: '40rem' }" >
        <div class="mb-4">
            <label class="font-semibold block mb-1">Cliente</label>
            <Dropdown
                v-model="vModel.data.customerId"
                :options="customers"
                option-label="name"
                option-value="id"
                placeholder="Selecione um cliente"
                class="w-full" />
        </div>

        <!-- Adição de item -->
        <div class="mb-4 flex justify-between gap-2 items-end">
            <div>
                <label class="block mb-1">Produto</label>
                <Dropdown
                    v-model="selectedProduct"
                    :options="products"
                    option-label="name"
                    placeholder="Selecione um produto"
                    class="w-full" />
            </div>
            <div>
                <label class="block mb-1">Quantidade</label>
                <InputNumber v-model="quantity" inputId="quantity" mode="decimal" showButtons :min="0" :max="1000" fluid />
            </div>
            <Button size="small"  icon="pi pi-plus" @click="addItem" />
        </div>

        <!-- Lista de itens adicionados -->
        <div class="mb-4">
            <label class="block font-semibold mb-2">Itens do Pedido</label>
            <ul>
                <li v-for="(item, index) in vModel.data.orderItems"
                    :key="index"
                    class="flex justify-between border-b py-1" >
                    <span>{{ item.productId }} (x{{ item.quantity }})</span>
                    <span>R$ {{ item.quantity * parseFloat(item.price?.toString()) }}</span>
                </li>
            </ul>
        </div>

        <!-- Total calculado -->
        <div class="text-right font-bold text-lg mb-4">
            Total: R$ {{ total }}
        </div>

        <template #footer>
            <Button label="Cancelar" text severity="secondary" @click="emit('close')" autofocus />
            <Button label="Salvar" outlined severity="secondary" @click="handleSave" autofocus />
        </template>
    </Dialog>
</template>
