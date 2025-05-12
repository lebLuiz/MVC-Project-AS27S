import type { AxiosInstance } from "axios";
import type Category from "../entities/Customer";

export default (httpClient: AxiosInstance) => ({
  async findAll(token: string) {
    const response = await httpClient.get("/customers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async create(token: string, { id, ...data }: Category) {
    const response = await httpClient.post("/customers", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async update(token: string, { id, ...data }: Category) {
    const response = await httpClient.put(`/customers/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async delete(token: string, id: string) {
    const response = await httpClient.delete(`/customers/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
});
