declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_MODE: "dev" | "prod" | "qa" | undefined;
    }
  }
}

export {};
