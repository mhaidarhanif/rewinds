import { z } from "zod";

export const schemaEnv = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  APP_ENV: z.string().optional(),
  VERCEL: z.boolean().optional(),

  IMAGEKIT_URL_ENDPOINT: z.string().url().optional(),
  IMAGEKIT_FOLDER_NAME: z.string().optional(),
  IMAGEKIT_PUBLIC_KEY: z.string().optional(),
  MAPBOX_PUBLIC_TOKEN: z.string().optional(),
  GA_MEASUREMENT_ID: z.string().optional(),
  SENTRY_BROWSER_DSN: z.string().optional(),
  POSTHOG_API_HOST: z.string().url().optional(),
  POSTHOG_API_KEY: z.string().optional(),
});

export const schemaEnvPrivate = z.object({
  DATABASE_URL: z.string().url(),

  REMIX_SESSION_SECRET: z.string(),

  REMIX_APP_NAME: z.string(),
  REMIX_APP_EMAIL: z.string().email(),
});
