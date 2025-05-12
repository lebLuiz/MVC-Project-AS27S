import { useSession } from "@/modules/auth/composables/useSession/useSession";
import type { CategoryList } from "~/modules/categories/entities/CategoryList";

interface UseCategoriesListOptions {
  userId: string;
}

export function useCategoriesList({ userId }: UseCategoriesListOptions) {
  const { logAndTrack } = useLogger();
  const services = useServices();
  const session = useSession();
  const loading = ref<boolean>(true);
  const categories = ref<CategoryList[]>([]);

  const fetchCategories = async () => {
    if (!userId) return;

    loading.value = true;

    try {
      const response = await services.categories.findAll(
        session.userToken.value
      );
      categories.value = response;
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchCategories();
  });

  return {
    loading,
    categories,
    fetchCategories,
    session,
    services,
    logAndTrack,
  };
}
