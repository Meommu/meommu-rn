import { Server, Registry } from "miragejs";
import type { AnyModels, AnyFactories } from "miragejs/-types";

declare global {
  interface Window {
    server: Server<Registry<AnyModels, AnyFactories>>;
  }
}
