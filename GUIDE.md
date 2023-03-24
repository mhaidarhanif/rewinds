# Guide

Quickstart to understand the project structure:

## `/app`

Files:

1. `entry.client.tsx`: Remix entry for client-side
2. `entry.server.tsx`: Remix entry for server-side
   - Added SEO route handlers
3. `root.tsx`: Remix root route
   - Default root document layout
   - Default meta
   - Default headers
   - Default links
   - Default or root loader
   - Theme provider setup
4. `seo-routes.server.tsx`: Remix extra route to manage SEO functionality
   - Generate `sitemap.xml` and `robots.txt`

Folders

1. `components`: React components
   - `demo`: Demo of complex components
   - `service`: External service components such as ImageKit and YouTube
   - `shared`: Shared custom project components
   - `ui`: UI components with mostly Radix UI
2. `configs`: Project configuration
3. `data`: Project initial or seed data
4. `fonts`: Project UI fonts
5. `helpers`: Project helper functions to help with the models
6. `hooks`: React hooks
7. `icons`: Project UI icons
   - Lucide icons
   - Iconoir icons
8. `libs`: Project external library setup
9. `models`: Prisma database models
10. `routes`: Remix or React Router routes
11. `schemas`: Zod schemas
12. `services`: Project custom services which use the `sessions`
13. `sessions`: Project theme and auth cookie session configuration
14. `styles`: ProjectCSS files
15. `types`: Project type definitions
16. `utils`: Project utility functions

## `/public`

(TODO)

## `/prisma`

(TODO)

## `/api`

(TODO)

## `/.github`

(TODO)

## `/.vscode`

- `extensions.json`: ...
- `launch.json`: ...
- `rewinds.code-snippets`: ...
- `settings.json`: ...

## Misc root files

- `package.json`: ...
- `pnpm-lock.yaml`: ...
- `postcss.config.js`: ...
- `prettier.config.js`: ...
- `prisma`: ...
- `public`: ...
- `remix.config.js`: ...
- `remix.env.d.ts`: ...
- `sandbox.config.json`: ...
- `server-express.js`: ...
- `server-vercel.js`: ...
- `tailwind.config.js`: ...
- `tsconfig.json`: ...
- `vercel.json`: ...

## Package dependencies

(TODO)
