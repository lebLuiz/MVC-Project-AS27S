<script setup lang="ts">
import CategoriesTableLoader from '@/modules/categories/components/Table/Categories/Loader.vue';
import CategoriesTable from '@/modules/categories/components/Table/Categories/Categories.vue';
import CategoryForm from '@/modules/categories/components/Form/CategoryForm.vue'

import { myselfKey } from '@/modules/users/composables/useMyself/useMyself';
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types';
import type Category from '../../entities/Category';
import type { CategoryList } from '../../entities/CategoryList';

import { useCategoriesList } from '~/modules/categories/composables/useCategoriesList/useCategoriesList';

type PropsModelType = {
    visible: boolean;
    data: Category
}

const { user } = inject(myselfKey) as MyselfContextProvider;

const {
    loading,
    categories,
    fetchCategories,
    session,
    services,
    logAndTrack,
} = useCategoriesList({
    userId: user.value!.id
})

const titleForm = ref<string>('Cadastrar categoria')
const categoryForm = ref<PropsModelType>({
    visible: false,
    data: {
        id: undefined,
        name: '',
        description: '',
    }
})

const handleAddCategory = async () => {
    formCategoryVisibleTrue();
}

const handleEditCategory = async (categoryList: CategoryList) => {
    categoryForm.value.data = {
        name: categoryList.name,
        description: categoryList.description,
        id: categoryList.id
    }
    titleForm.value = 'Editar categoria'

    formCategoryVisibleTrue();
}

const handleSaveCategory = () => {
    if (!categoryForm.value.data.id) {
        registerCategory();
        return;
    }
    editCategory();
}

const registerCategory = async () => {
    try {
      await services.categories.create(session.userToken.value, categoryForm.value.data);
      fetchCategories();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
      resetFormCategory()
    }
}

const editCategory = async () => {
    try {
      await services.categories.update(session.userToken.value, categoryForm.value.data);
      fetchCategories();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
      resetFormCategory()
    }
}

const handleRemoveCategory = async ({ id }: CategoryList) => {
    try {
      await services.categories.delete(session.userToken.value, id);
      fetchCategories();
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
}

const resetFormCategory = () => {
    categoryForm.value.data = {
        id: undefined,
        name: '',
        description: '',
    }
    categoryForm.value.visible = false;
}

const formCategoryVisibleTrue = () => {
    categoryForm.value.visible = true;
}
</script>

<template>
    <div class="flex gap-2 mb-2">
        <Button
            :loading="loading"
            class="mt-5 w-full md:w-auto"
            label="Cadastrar categoria"
            icon="pi pi-plus"
            icon-pos="right"
            @click="handleAddCategory" />
    </div>
    <WidgetDefault title="Listagem de categorias"
        v-if="!!categories.length">
        <CategoriesTableLoader :loading="loading">
            <CategoriesTable :categories="categories" @edit="handleEditCategory" @remove="handleRemoveCategory" />
        </CategoriesTableLoader>
    </WidgetDefault>

    <CategoryForm v-model="categoryForm" :title="titleForm" @save="handleSaveCategory" @close="resetFormCategory" />
</template>
