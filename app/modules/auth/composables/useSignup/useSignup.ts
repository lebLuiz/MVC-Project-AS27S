import { z } from "zod";
import type { ZodFormattedError } from "zod";
import type Signup from "@/modules/auth/entities/Signup/Signup";
import { useSession } from "@/modules/auth/composables/useSession/useSession";

const schema = z.object({
  name: z.string({ message: "Informe o nome" }),
  email: z.string().email({ message: "Informe um e-mail válido" }),
  password: z.string().min(6, { message: "Minimo de 6 caracteres." }),
});

export function useSignup() {
  const session = useSession();
  const router = useRouter();
  const loading = ref<boolean>();
  const signupData = ref<Signup>({ name: "", email: "", password: "" });
  const errors = ref<ZodFormattedError<Signup>>();

  const safeParse = () => {
    const result = schema.safeParse(signupData.value);

    if (!result.success) {
      errors.value = result.error.format();
    }

    return result;
  };

  const register = async () => {
    if (!signupData.value) return;

    loading.value = true;

    try {
      await session.signup(signupData.value);
      router.push("/app/products/all");
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    errors,
    signupData,
    safeParse,
    register,
  };
}
