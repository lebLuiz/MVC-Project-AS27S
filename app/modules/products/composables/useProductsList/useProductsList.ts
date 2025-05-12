import { useSession } from "@/modules/auth/composables/useSession/useSession";
import type { CategoryList } from "~/modules/categories/entities/CategoryList";
import type ProductList from "~/modules/products/entities/Product/ProductList";

interface UseProductsListOptions {
  userId: string;
}

export function useProductsList({ userId }: UseProductsListOptions) {
  const { logAndTrack } = useLogger();
  const services = useServices();
  const session = useSession();
  const loading = ref<boolean>(true);
  const products = ref<ProductList[]>([]);
  const categoriesList = ref<CategoryList[]>([]);

  const fetchProducts = async () => {
    if (!userId) return;

    loading.value = true;

    try {
      const response = await services.products.findAll(session.userToken.value);
      products.value = response;
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchCategoriesList = async () => {
    if (!userId) return;

    loading.value = true;

    try {
      const response = await services.categories.findAll(
        session.userToken.value
      );
      categoriesList.value = response;
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchProducts();
  });

  return {
    products,
    loading,
    fetchCategoriesList,
    categoriesList,
    session,
    services,
    logAndTrack,
    fetchProducts,
  };
}
