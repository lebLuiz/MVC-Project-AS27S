// import type Order from "~/modules/orders/entities/Order";

export default interface Customer<T_id = string | undefined> {
  id: T_id;
  name: string;
  email: string;
  phone: string;
  //   orders: Pick<Order, "id">[];
}
