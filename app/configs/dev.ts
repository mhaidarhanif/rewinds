/**
 * EDITME: Dev Config
 *
 * Mostly for development purpose
 */

const isDevelopment = process.env.NODE_ENV === "development";

export const configDev = {
  isDevelopment,
  enableDebugComponent: true,
};
