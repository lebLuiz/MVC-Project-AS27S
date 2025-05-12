import type { AxiosInstance } from "axios";
import type Category from "../entities/Category";

export default (httpClient: AxiosInstance) => ({
  async findAll(token: string) {
    const response = await httpClient.get("/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async create(token: string, { id, ...data }: Category) {
    const response = await httpClient.post("/categories", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async update(token: string, { id, ...data }: Category) {
    const response = await httpClient.put(`/categories/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async delete(token: string, id: string) {
    const response = await httpClient.delete(`/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
});
