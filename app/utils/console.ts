import { configDev } from "~/configs";

export function consoleDev(message: any) {
  if (configDev.isDevelopment) {
    console.info({ message });
  }
}
