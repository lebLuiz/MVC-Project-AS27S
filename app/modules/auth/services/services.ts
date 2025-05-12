import type { AxiosInstance } from "axios";
import type Signin from "../entities/Signin/Signin";
import type Signup from "../entities/Signup/Signup";

export default (httpClient: AxiosInstance) => ({
  async signin({ email, password }: Signin) {
    const response = await httpClient.post("/auth/signin", { email, password });
    return response.data;
  },

  async signup({ name, email, password }: Signup) {
    const response = await httpClient.post("/auth/signup", {
      name,
      email,
      password,
    });
    return response.data;
  },
});
