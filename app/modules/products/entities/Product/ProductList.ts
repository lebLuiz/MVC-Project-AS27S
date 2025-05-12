export default interface ProductList {
  id: string;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  category: {
    id: string;
    name: string;
    description: string | null;
  };
  createdAt: string | Date;
}
