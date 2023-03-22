# ⏪ Rewinds

# Introduction

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Remix](https://img.shields.io/badge/Remix-000000?style=flat-square&logo=remix&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-111111?style=flat-square&logo=framer&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=planetscale&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

Rewinds is a web app starter kit with Remix and Tailwind family of libraries, interactive UI components, and the TypeScript ecosystem. The core stack includes TypeScript, Remix & Remix Auth, React, Tailwind CSS, Radix UI, Zod, Conform, Prisma ORM, PlanetScale, and Vercel.

Check out the code and the demo:

- [mhaidarhanif/rewinds](https://github.com/mhaidarhanif/rewinds)
- [rewinds.mhaidarhanif.com](https://rewinds.mhaidarhanif.com)
- [rewinds.vercel.app](https://rewinds.vercel.app)
- [rewinds.dev](https://rewinds.dev) (Sooner or later)

Included example features:

- [x] Light and dark mode theme
- [x] Register, log in, log out
- [x] Admin dashboard
  - [x] Manage users and notes
- [x] User dashboard, profile, settings
  - [ ] Manage notes
- [x] Various others
  - [x] Search data
  - [ ] Image assets
  - [ ] Map viewer

Included setup:

- [x] Full stack type safety with Remix
  - [x] Enabled for HMR/HDR (hot module/data reload)
  - [x] v2 future flags
- [x] UI components with React and Radix UI, ready to use and 100% customizable
- [x] Styles, colors, fonts, icons, and responsive design with Tailwind CSS
- [x] Database with Prisma ORM and PlanetScale
- [x] Auth with Remix Auth using a session cookie
- [x] Form and data validation with Conform and Zod
- [x] SEO functions with meta tags, `robots.txt`, `sitemap.xml`, `canonical`
- [x] Various utilities with external libraries
- [x] Lighthouse/Pagespeed optimized
- [x] pnpm, Prettier, ESLint, Stylelint, and much more

You can use this to build any web app. Also what I'm using Rewinds for.

- Todo List
- Learning Platform
- Content Management System
- E-Commerce
- Social Media
- Gallery
- Inventory

As for now, this README is the only main documentation.

## Some Screenshots

<div style="max-width: 720px;">

[![Dark](public/assets/screenshots/rewinds-screenshot-dark.png)](https://rewinds.mhaidarhanif.com)
[![Light](public/assets/screenshots/rewinds-screenshot-light.png)](https://rewinds.mhaidarhanif.com)

</div>

## Some Details

This repo is kind of over-engineered to have high flexibility and cover a lot of use cases for different applications/projects/products (especially what I'm working with several other people). Currently includes the Remix HMR & HDR setup with both Vercel config and Express server on development as per Remix `v1.14`. The config is just combining the templates from Remix with Express and Vercel based on the environment.

Compared to [the older `rewinds`](https://github.com/mhaidarhanif/rewinds-legacy), this newer version uses [`shadcn/ui`](https://github.com/shadcn/ui) as the base components style and setup for full stack app development inspired by [T3 Stack](https://create.t3.gg). The main adaptation reason is that this repo uses Remix, not Next.js as the full-stack framework.

## Some Background

Why create this? Well, because I had a lot of recent projects with this same stack.

# Table of Contents

- [⏪ Rewinds](#-rewinds)
- [Introduction](#introduction)
  - [Some Screenshots](#some-screenshots)
  - [Some Details](#some-details)
  - [Some Background](#some-background)
- [Table of Contents](#table-of-contents)
- [Tech Stack](#tech-stack)
  - [Primary](#primary)
  - [Complete](#complete)
  - [Extra](#extra)
- [Development](#development)
  - [Install Dependencies](#install-dependencies)
  - [Setup Environment Variables](#setup-environment-variables)
  - [Prisma ORM and Database Connection](#prisma-orm-and-database-connection)
  - [Run Development Server](#run-development-server)
  - [TypeScript and ESLint Server](#typescript-and-eslint-server)
- [Deployment](#deployment)
  - [Vercel](#vercel)
- [Important Notes](#important-notes)
  - [Tailwind CSS Config](#tailwind-css-config)
  - [Remix Entry Files](#remix-entry-files)
  - [HMR Workaround](#hmr-workaround)
  - [References](#references)
    - [Remix](#remix)
    - [React](#react)
    - [Tailwind CSS](#tailwind-css)
    - [Rewinds in the Wild](#rewinds-in-the-wild)

# Tech Stack

Listed here are only the most important parts in the stack.️ Some setup might haven't done yet or still in progress.

More details and references can also be checked from [`catamyst/stack`](https://a.catamyst.com/stack).

## Primary

- Rewinds: Remix Tailwind Stack
- TRIP: TypeScript/Tailwind Remix/React/Radix Interface Prisma

## Complete

- Core
  - [Node.js](https://nodejs.org)
    - [pnpm](https://pnpm.io)
  - [TypeScript](https://typescriptlang.org)
  - [React](https://beta.reactjs.org)
  - [Remix](https://remix.run/docs)
- Styling
  - [Tailwind CSS](https://tailwindcss.com)
  - [Fontsource](https://fontsource.org)
  - [Radix UI](https://radix-ui.com)
- Form
  - [Zod](https://zod.dev)
  - [Conform](https://conform.guide)
- Database
  - [Prisma ORM](https://prisma.io)
  - [PlanetScale](https://planetscale.com)
- Auth
  - [Remix Auth](https://github.com/sergiodxa/remix-auth)
- Testing
  - [Vitest](https://vitest.dev)
  - [Testing Library](https://testing-library.com)
  - [Playwright](https://playwright.dev)
- Tooling
  - [Prettier](https://prettier.io)
  - [ESLint](https://eslint.org)
  - [Doppler](https://doppler.com)
- Deployment
  - [Vercel](https://vercel.com)

## Extra

(Not included in Rewinds) If you need separate backend/server/service:

- Core
  - GraphQL
    - [GraphQL](https://graphql.org)
    - [GraphQL Yoga](https://github.com/dotansimha/graphql-yoga)
      - [Express](https://expressjs.com)
    - [Pothos](https://github.com/hayes/pothos)
  - tRPC
    - [tRPC](https://trpc.io)
- Database
  - [Prisma ORM](https://prisma.io)
- Auth
  - [Passport](https://passportjs.org)
- Payment
  - [Lemon Squeezy](https://lemonsqueezy.com)
  - [Stripe](https://stripe.com)

# Development

## Install Dependencies

Before running your Remix app locally, make sure your project's local dependencies are installed using your preferred package manager agent:

```sh
npm i
yarn i
pnpm i
```

Or if using [`ni`](https://github.com/antfu/ni) which can autodetect the agent:

```sh
pnpm add -g @antfu/ni  # install once
ni                     # can auto choose npm/yarn/pnpm
```

## Setup Environment Variables

Use plain `.env` file for local development:

```sh
cp -i .env.example .env
# `-i` or `--interactive` will prompt before overwrite
# then edit `.env` as you prefer
```

Or use [Doppler](https://doppler.com) CLI to manage them:

```sh
doppler secrets download --no-file --format env > .env
```

> ⚠️ Make sure to setup the environment variables here, on Vercel, or on your preferred deployment target. Otherwise the app will break on production. That's why Doppler is recommended and there are some preset strings in the `.env.example` which you can copy directly.

## Prisma ORM and Database Connection

It's up to you which database/DBMS you want to use with the app. This repo recommends using MySQL on PlanetScale. But avoid using SQLite because it doesn't have `model`.createMany()` function. For example:

```sh
DATABASE_URL='mysql://username:pscale_pw_password@region.connect.psdb.cloud/name?sslaccept=strict'
```

While in development, you can also visualize the schema with [Prismaliser](https://prismaliser.app).

## Run Development Server

Afterward, start the Remix development server like so:

```sh
nr dev
```

This will run both the Remix server and Express server with HMR enabled. Then wait until you see this info on the terminal:

```sh
📀 Remix on Express server listening on port :3000
Loading environment variables from .env
💿 Built in 0s
```

Open up [localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

## TypeScript and ESLint Server

When you update some significant changes in the TypeScript config, ESLint config, or just generated a new Prisma schema, you can restart.

```sh
> TypeScript: Restart TS Server
> ESLint: Restart ESLint Server
> Prisma: Restart Language Server
```

# Deployment

## Vercel

As this repo was made after having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

Just keep in mind to set up the environment variables, especially:

```sh
REMIX_APP_NAME=
REMIX_APP_EMAIL=
REMIX_ADMIN_EMAIL=
REMIX_ADMIN_PASSWORD=
REMIX_SESSION_SECRET=
DATABASE_URL=
```

Or if using Doppler, there's the auto sync integration.

- <https://doppler.com/integrations/vercel>
- <https://vercel.com/integrations/doppler>

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
ni -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

# Important Notes

## Tailwind CSS Config

Use [uicolors.app](https://uicolors.app/create) to generate the color tokens easily. Then replace what's inside `tailwind.config.js`.

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f9fd",
          100: "#e5f1f9",
          200: "#c5e2f2",
          300: "#92cae7",
          400: "#57aed9",
          500: "#3399cc",
          600: "#2277a7",
          700: "#1d6087",
          800: "#1b5171",
          900: "#1c445e",
        },
        surface: {
          50: "#f4f8f9",
          100: "#dce7eb",
          200: "#b8ced7",
          300: "#8dacbb",
          400: "#65899c",
          500: "#4b6e81",
          600: "#3a5667",
          700: "#324653",
          800: "#2b3944",
          900: "#0a0d0f",
        },
      },
    },
  },
};
```

## Remix Entry Files

Since Remix v1.14, you might notice that the entry files are implicitly defined. At the moment, if you need to deploy a Remix app I still suggest revealing or explicitly defining the entry files to make it work smoothly. Although this repo already has the entry files.

```sh
npx remix reveal
```

## HMR Workaround

> This setup has been done in this Rewinds template.

To enable HMR and HDR, at least as per Remix v1.14, when not primarily using Express server only (like using Vercel and another server), we have to do this in the `package.json` scripts.

```json
{
  "dev": "run-p dev:*",
  "dev:remix": "cross-env NODE_ENV=development remix dev",
  "dev:serve": "cross-env NODE_ENV=development nodemon --require dotenv/config ./server-express.js --watch ./server-express.js"
}
```

If you don't need the HMR, simply run `dev:remix` script only as this will run without using the Express server:

```sh
nr dev:remix
```

If using pnpm, you also have to install `react-refresh` to resolve the HMR dependency:

```sh
ni -D react-refresh
```

When running locally in development mode, use either the Express server or Vercel. This by default does not understand the Vercel lambda module format, so we fall back to the standard build output.

```js
const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  server: isDevelopment ? undefined : "./server-vercel.js",
  serverBuildPath: isDevelopment ? "build/index.js" : "api/index.js",
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",

  future: {
    unstable_dev: true,
    unstable_tailwind: true,
  },
};
```

## References

### Remix

- [Remix Docs](http://remix.run)
- [Remix Blog Tutorial](http://remix.run/docs/en/main/tutorials/blog)
- [Up and Running with Remix - Kent C. Dodds - egghead.io](https://egghead.io/courses/up-and-running-with-remix-b82b6bb6)
- [Build a Fullstack App with Remix and Prisma - Prisma YouTub Playlist](https://www.youtube.com/watch?v=4tXGRe5CDDg&list=PLn2e1F9Rfr6kPDIAbfkOxgDLf4N3bFiMn)
- [Build a Fullstack App with Remix and Prisma - Prisma Blog](https://prisma.io/blog/fullstack-remix-prisma-mongodb-1-7D0BfTXBmB6r)

### React

- [Bulletproof React - A simple, scalable, and powerful architecture for building production-ready React applications](https://github.com/alan2207/bulletproof-react)

### Tailwind CSS

- [Why we use Tailwind CSS as our primary framework | Clean Commit](https://cleancommit.io/blog/why-we-use-tailwind-css-as-our-primary-framework)
- [An Honest Look at Tailwind as an API for CSS | thoughtbot, inc.](https://thoughtbot.com/blog/an-honest-look-at-tailwind-as-an-api-for-css)
- [Styling Best Practices I Use With Tailwind CSS | theodorusclarence.com](https://theodorusclarence.com/blog/tailwindcss-best-practice)

### Rewinds in the Wild

Some other projects using Rewinds:

- [M Haidar Hanif Website](https://github.com/mhaidarhanif/mhaidarhanif-web)
- [Catamyst](https://github.com/catamyst/catamyst-web)
- [Super Duper Gallery](https://github.com/jonathannicolasdev/superduper)
