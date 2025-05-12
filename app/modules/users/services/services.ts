import type { AxiosInstance } from "axios";

export default (httpClient: AxiosInstance) => ({
  async me(token: string) {
    const response = await httpClient.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
});
