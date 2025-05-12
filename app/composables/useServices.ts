import axios from "axios";
import AuthService from "@/modules/auth/services/services";
import UserService from "@/modules/users/services/services";
import ProductService from "@/modules/products/services/services";
import CategoryService from "@/modules/categories/services/services";
import OdersService from "@/modules/orders/services/services";
import CustomersService from "@/modules/customers/services/services";

export function useServices() {
  const config = useRuntimeConfig();

  const httpClient = axios.create({
    baseURL: config.public.apiURL,
    withCredentials: true,
  });

  return {
    auth: AuthService(httpClient),
    users: UserService(httpClient),
    products: ProductService(httpClient),
    categories: CategoryService(httpClient),
    orders: OdersService(httpClient),
    customers: CustomersService(httpClient),
  };
}
