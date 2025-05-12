<script setup lang="ts">
import ProductsTableLoader from '@/modules/products/components/Table/Products/Loader.vue';
import ProductsTable from '@/modules/products/components/Table/Products/Products.vue';
import ProductForm from '@/modules/products/components/Form/ProductForm.vue'

import { myselfKey } from '@/modules/users/composables/useMyself/useMyself';
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types';
import type Product from '../../entities/Product/Product';

import { useProductsList } from '~/modules/products/composables/useProductsList/useProductsList';
import type ProductList from '../../entities/Product/ProductList';

type PropsModelType = {
    visible: boolean;
    data: Product
}

const { user } = inject(myselfKey) as MyselfContextProvider;

const {
    loading,
    products,
    fetchCategoriesList,
    categoriesList,
    session,
    services,
    logAndTrack,
    fetchProducts,
} = useProductsList({
    userId: user.value!.id
})

const titleForm = ref<string>('Cadastrar produto')
const productForm = ref<PropsModelType>({
    visible: false,
    data: {
        categoryId: '',
        name: '',
        description: '',
        price: 0,
        stock: 0
    }
})

const handleAddProduct = async () => {
    await fetchCategoriesList()
    formProductVisibleTrue();
}

const handleEditProduct = async (productList: ProductList) => {
    await fetchCategoriesList()
    productForm.value.data = {
        categoryId: categoriesList.value.find(({ id }) => id == productList.category?.id)?.id || '',
        name: productList.name,
        description: productList.description,
        price: productList.price?.replaceAll(',', '.'),
        stock: productList.stock,
        id: productList.id
    }
    titleForm.value = 'Editar produto'

    formProductVisibleTrue();
}

const handleSaveProduct = () => {
    if (!productForm.value.data.id) {
        registerProduct();
        return;
    }
    editProduct();
}

const registerProduct = async () => {
    try {
      await services.products.create(session.userToken.value, productForm.value.data);
      fetchProducts();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
      resetFormProduct()
    }
}

const editProduct = async () => {
    try {
      await services.products.update(session.userToken.value, productForm.value.data);
      fetchProducts();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
      resetFormProduct()
    }
}

const handleRemoveProduct = async ({ id }: ProductList) => {
    try {
      await services.products.delete(session.userToken.value, id);
      fetchProducts();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
}

const resetFormProduct = () => {
    productForm.value.data = {
        categoryId: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        id: undefined
    }
    productForm.value.visible = false;
}

const formProductVisibleTrue = () => {
    productForm.value.visible = true;
}
</script>

<template>
    <div class="flex gap-2 mb-2">
        <Button
            :loading="loading"
            class="mt-5 w-full md:w-auto"
            label="Cadastrar produto"
            icon="pi pi-plus"
            icon-pos="right"
            @click="handleAddProduct" />
    </div>
    <WidgetDefault title="Listagem de produtos"
        v-if="!!products.length">
        <ProductsTableLoader :loading="loading">
            <ProductsTable :products="products" @edit="handleEditProduct" @remove="handleRemoveProduct" />
        </ProductsTableLoader>
    </WidgetDefault>

    <ProductForm v-model="productForm" :title="titleForm" :categories="categoriesList" @save="handleSaveProduct" @close="resetFormProduct" />
</template>
