import type Customer from "~/modules/customers/entities/Customer";
import type User from "~/modules/users/entities/User/User";

export default interface OrderList {
  id: string;
  customer: Customer;
  user: User;
  total: string;
  orderItems: Array<{
    id: string;
    productId: string;
    product: { name: string; price: string };
    quantity: number;
  }>;
  createdAt: string;
  updatedAt: string;
}
