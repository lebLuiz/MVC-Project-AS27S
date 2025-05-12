import { useSession } from "@/modules/auth/composables/useSession/useSession";
import type { CustomerList } from "~/modules/customers/entities/CustomerList";
import type OrderList from "~/modules/orders/entities/OrderList";
import type ProductList from "~/modules/products/entities/Product/ProductList";

interface UseOrdersListOptions {
  userId: string;
}

export function useOrdersList({ userId }: UseOrdersListOptions) {
  const { logAndTrack } = useLogger();
  const services = useServices();
  const session = useSession();
  const loading = ref<boolean>(true);
  const orders = ref<OrderList[]>([]);
  const customersList = ref<CustomerList[]>([]);
  const productsList = ref<ProductList[]>([]);

  const fecthCustomersList = async () => {
    if (!userId) return;

    loading.value = true;

    try {
      const response = await services.customers.findAll(
        session.userToken.value
      );
      customersList.value = response;
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
  };

  const fecthProductsList = async () => {
    if (!userId) return;

    loading.value = true;

    try {
      const response = await services.products.findAll(session.userToken.value);
      productsList.value = response;
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchOrders = async () => {
    if (!userId) return;

    loading.value = true;

    try {
      const response = await services.orders.findAll(session.userToken.value);
      orders.value = response;
    } catch (e) {
      logAndTrack(e);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchOrders();
  });

  return {
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
  };
}
