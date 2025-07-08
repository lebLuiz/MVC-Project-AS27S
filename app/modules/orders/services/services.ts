import type { AxiosInstance } from "axios";
import type Order from "../entities/Order";

export default (httpClient: AxiosInstance) => ({
  async findAll(token: string) {
    const response = await httpClient.get("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async create(token: string, { id, ...data }: Order) {
    const response = await httpClient.post("/orders", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async update(token: string, { id, ...data }: Order) {
    const response = await httpClient.put(`/orders/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async delete(token: string, id: string) {
    const response = await httpClient.delete(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  async sendToEmail(token: string, id: string) {
    const response = await httpClient.post(
      `/orders/${id}/finalize`,
      undefined,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
});
