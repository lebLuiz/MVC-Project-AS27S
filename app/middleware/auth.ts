export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;
  const isLogged = !!localStorage.getItem("auth_token");

  if (!isLogged) {
    console.log("* user not authenticated");

    if (to.path === "/auth/login") return;
    return navigateTo({ path: "/auth/login" });
  }
});
