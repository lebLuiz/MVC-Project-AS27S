export default interface Product {
  id?: string;
  name: string;
  description: string | null;
  price: string | number;
  stock: number;
  categoryId: string;
}
