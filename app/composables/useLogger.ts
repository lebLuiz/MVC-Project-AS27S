export function useLogger() {
  const config = useRuntimeConfig();
  const isProd = config.public.nodeEnv === "production";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const logAndTrack = (...args: any[]) => {
    if (isProd) {
      // @TODO: Send to sentry
      return;
    }

    console.log(...args);
  };
  return { logAndTrack };
}
