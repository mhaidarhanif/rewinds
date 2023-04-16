/**
 * EDITME: Dev Config
 *
 * Mostly for development purpose
 */

export const configDev = {
  isDevelopment: process.env.NODE_ENV === "development",
  features: {
    debugScreens: true, // dev and tailwind indicator
    debugComponent: true, // debug component button and code
  },
};
