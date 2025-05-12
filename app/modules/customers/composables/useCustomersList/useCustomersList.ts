import { useSession } from "@/modules/auth/composables/useSession/useSession";
import type { CustomerList } from "~/modules/customers/entities/CustomerList";

interface UseCustomersListOptions {
  userId: string;
}

export function useCustomersList({ userId }: UseCustomersListOptions) {
  const { logAndTrack } = useLogger();
  const services = useServices();
  const session = useSession();
  const loading = ref<boolean>(true);
  const customers = ref<CustomerList[]>([]);

  const fetchCustomers = async () => {
    if (!userId) return;

    loading.value = true;

    try {
      const response = await services.customers.findAll(
        session.userToken.value
      );
      customers.value = response;
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchCustomers();
  });

  return {
    loading,
    customers,
    fetchCustomers,
    session,
    services,
    logAndTrack,
  };
}
