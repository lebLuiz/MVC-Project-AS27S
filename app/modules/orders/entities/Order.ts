import type OrderItem from "./OrderItem";

export default interface Order<T_id = string | undefined> {
  id: T_id;
  customerId: string;
  userId?: string;
  total: string;
  orderItems: OrderItem[];
}
