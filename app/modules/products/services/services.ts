import type { AxiosInstance } from "axios";
import type Product from "../entities/Product/Product";

export default (httpClient: AxiosInstance) => ({
  async findAll(token: string) {
    const response = await httpClient.get("/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async create(token: string, { id, ...data }: Product) {
    const response = await httpClient.post(
      "/products",
      {
        ...data,
        price: data.price?.toString()?.replace(".", ","),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  async update(token: string, { id, ...data }: Product) {
    const response = await httpClient.put(
      `/products/${id}`,
      {
        ...data,
        price: data.price?.toString()?.replace(".", ","),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  async delete(token: string, id: string) {
    const response = await httpClient.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
});
