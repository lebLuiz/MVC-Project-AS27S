import { z } from "zod";
import type { ZodFormattedError } from "zod";
import type Signin from "@/modules/auth/entities/Signin/Signin";
import { useSession } from "@/modules/auth/composables/useSession/useSession";

const schema = z.object({
  email: z.string().email({ message: "Informe um e-mail válido" }),
  password: z.string().min(6, { message: "Minimo de 6 caracteres." }),
});

export function useSignin() {
  const session = useSession();
  const router = useRouter();
  const { logAndTrack } = useLogger();
  const loading = ref<boolean>();
  const signinData = ref<Signin>({ email: "", password: "" });
  const errors = ref<ZodFormattedError<Signin>>();

  const safeParse = () => {
    const result = schema.safeParse(signinData.value);

    if (!result.success) {
      errors.value = result.error.format();
    }

    return result;
  };

  const login = async () => {
    if (!signinData.value) return;

    loading.value = true;

    const res = await session.signin(signinData.value);
    if (!res) logAndTrack("error");
    else router.push("/app/products/all");

    loading.value = false;
  };

  return {
    loading,
    errors,
    signinData,
    safeParse,
    login,
  };
}
