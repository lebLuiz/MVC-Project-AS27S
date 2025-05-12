import type Signin from "@/modules/auth/entities/Signin/Signin";
import type Signup from "@/modules/auth/entities/Signup/Signup";
import { useStorage } from "@vueuse/core";

export function useSession() {
  const toast = useToast();
  const { logAndTrack } = useLogger();
  const userToken = useStorage("auth_token", "", undefined, {
    initOnMounted: true,
  });

  const services = useServices();
  const router = useRouter();

  const isLogged = () => !!userToken.value;

  const signin = async ({ email, password }: Signin) => {
    try {
      const response = await services.auth.signin({ email, password });

      userToken.value = response.accessToken;
      toast.add({
        severity: "info",
        summary: "Sucesso!",
        detail: "Login efetuado com sucesso",
        life: 2000,
      });

      return true;
    } catch {
      toast.add({
        severity: "error",
        summary: "Erro!",
        detail: "Algo inesperado aconteceu",
        life: 2000,
      });
      return false;
    }
  };

  const signup = async ({ name, email, password }: Signup) => {
    try {
      const response = await services.auth.signup({ name, email, password });

      userToken.value = response.accessToken;
      toast.add({
        severity: "info",
        summary: "Sucesso!",
        detail: "Cadastro efetuado com sucesso",
        life: 2000,
      });
    } catch (error) {
      const msg = error?.message || "Algo inesperado aconteceu";
      toast.add({
        severity: "error",
        summary: "Erro!",
        detail: msg,
        life: 2000,
      });
      logAndTrack(msg);
    }
  };

  const logout = () => {
    userToken.value = "";
    router.replace("/");
  };

  return {
    userToken,
    isLogged,
    signin,
    signup,
    logout,
  };
}
