/**
 * Public functionality that will expose all selected variables within global ENV
 * The values are only used for client-side env
 * Never expose the REMIX_SESSION_SECRET or any server/node/non-browser env
 */

// TODO: use Zod schema

export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV || "development", // development | test | production
    APP_ENV: process.env.APP_ENV || "unknown", // local | development | staging | production
    VERCEL: process.env.VERCEL || false,

    // REMIX variables are mostly private

    IMAGEKIT_URL_ENDPOINT:
      process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io",
    IMAGEKIT_FOLDER_NAME: process.env.IMAGEKIT_FOLDER_NAME || "not-set",
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY || "not-set",
    // IMAGEKIT private key obviously private

    MAPBOX_PUBLIC_TOKEN: process.env.MAPBOX_PUBLIC_TOKEN || "not-set",

    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID || "not-set",
    SENTRY_BROWSER_DSN: process.env.SENTRY_BROWSER_DSN || "not-set",
    POSTHOG_API_HOST: process.env.POSTHOG_API_HOST,
    POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
  };
}

/**
 * Only use for server-side env
 */

// to bypass the required condition for just inital setup
// REMIX variables are mostly private, this is just a bypass
export const envServer = {
  NODE_ENV: process.env.NODE_ENV || "development", // development | test | production
  REMIX_SESSION_SECRET: process.env.REMIX_SESSION_SECRET || "",
};

export function getEnvServer(key: string) {
  return getEnvRequired(process.env, key);
}

export function getEnvRequired(
  obj: Record<string, string | undefined>,
  key: string
) {
  const envVal = obj[key];

  if (!envVal) {
    throw new Error(`${key} is a required env variable`);
  }

  return envVal;
}
