# ⏪ Rewinds — Remix Tailwind Starter Kit

# Introduction

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Remix](https://img.shields.io/badge/Remix-000000?style=flat-square&logo=remix&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-111111?style=flat-square&logo=framer&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=planetscale&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

Rewinds is a Remix Tailwind Stack with Tailwind CSS family of libraries, interactive components, and the TypeScript ecosystem. The core stack as listed on the badges, includes: TypeScript, Remix & Remix Auth, React, Tailwind CSS, Radix UI, Prisma ORM, PlanetScale, and Vercel.

Check out the code and the demo:

- [mhaidarhanif/rewinds](https://github.com/mhaidarhanif/rewinds)
- [rewinds.mhaidarhanif.com](https://rewinds.mhaidarhanif.com)
- [rewinds.vercel.app](https://rewinds.vercel.app)
- [rewinds.dev](https://rewinds.dev) (Sooner or later)

As for now, this README is the only main documentation.

## Some Screenshots

<div style="max-width: 720px;">

[![Dark](public/assets/screenshots/rewinds-screenshot-dark.png)](https://rewinds.mhaidarhanif.com)
[![Light](public/assets/screenshots/rewinds-screenshot-light.png)](https://rewinds.mhaidarhanif.com)

</div>

## Some Details

Compared to the [the older `rewinds`](https://github.com/mhaidarhanif/rewinds-legacy), this newer version uses [`shadcn/ui`](https://github.com/shadcn/ui) as the base components style and setup for full stack app development is inspired by [T3 Stack](https://create.t3.gg). The main adaptation reason is that this repo uses Remix, not Next.js as the full stack framework.

This repo is kind of over-engineered to have high flexibility and cover a lot of use cases for different applications/projects/products. Currently includes the Remix HMR & HDR setup with both Vercel config and Express server on development as per Remix `v1.14`. The config is just combining the templates from Remix with Express and Vercel based on the environment.

## Some Background

Why creating this? Well, because I had a lot of recent projects with these same stack.

# Table of Contents

- [⏪ Rewinds — Remix Tailwind Starter Kit](#-rewinds--remix-tailwind-starter-kit)
- [Introduction](#introduction)
  - [Some Screenshots](#some-screenshots)
  - [Some Details](#some-details)
  - [Some Background](#some-background)
- [Table of Contents](#table-of-contents)
- [Tech Stack](#tech-stack)
- [Development](#development)
  - [Install Dependencies](#install-dependencies)
  - [Setup Environment Variables](#setup-environment-variables)
  - [Run Development Server](#run-development-server)
- [Deployment](#deployment)
  - [Vercel](#vercel)
- [Notes](#notes)
  - [Workaround Explanation](#workaround-explanation)
  - [References](#references)

# Tech Stack

> ⚠️ Some setup might haven't done yet or still in progress.

- [TypeScript](https://typescriptlang.org)
- [React](https://beta.reactjs.org)
- [Remix](https://remix.run/docs)
  - [Remix Auth](https://github.com/sergiodxa/remix-auth)
  - [Remix Validated Form](https://remix-validated-form.io)
  - [Conform](https://conform.guide)
  - [Zod](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com)
    - [`tailwindcss-radix`](https://tailwindcss-radix.vercel.app)
  - [Headless UI](https://headlessui.com)
  - [Fontsource](https://fontsource.org)
- [Prisma ORM](https://prisma.io)
- [PlanetScale](https://planetscale.com)
- [Vercel](https://vercel.com)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Playwright](https://playwright.dev)

More details and references can also be checked from [`catamyst/stack`](https://a.catamyst.com/stack)

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

Or use [Doppler](htts://doppler.com) CLI to manage them:

```sh
doppler secrets download --no-file --format env > .env
```

> ⚠️ Make sure to setup the environment variables here, on Vercel, or on your preferred deployment target. Otherwise the app will break on production. That's why Doppler is recommended and there are some preset strings in the `.env.example` which you can copy directly.

### Database Connection

It's up to you which database/DBMS you want to use with the app. This repo recommends to use MySQL on PlanetScale. For example:

```sh
DATABASE_URL='mysql://username:pscale_pw_password@region.connect.psdb.cloud/name?sslaccept=strict'
```

## Run Development Server

Afterwards, start the Remix development server like so:

```sh
nr dev
```

Open up [localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.

# Deployment

## Vercel

As this repo was made after having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
ni -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

# Notes

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

Since Remix v1.14, you might notice that the entry files are implicitly defined. At the moment, if you need to deploy a Remix app I still suggest to reveal or explicitly define the entry files to make it work smoothly.

## HMR Workaround

To enable HMR and HDR, at least as per Remix v1.14, we have to do this when not primarily using Express server.

If using pnpm, you also have to install `react-refresh` to resolve the HMR dependency:

```sh
ni -D react-refresh
```

When running locally in development mode, use either the Express server or Vercel. This by default does not understand the Vercel lambda module format, so we fallback to the standard build output.

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

### Rewinds In The Wild

Some other projects using Rewinds:

- [M Haidar Hanif Website](https://github.com/mhaidarhanif/mhaidarhanif-web)
- [Catamyst](https://github.com/catamyst/catamyst-web)
- [Super Duper Gallery](https://github.com/jonathannicolasdev/superduper)

### React

- [Bulletproof React - A simple, scalable, and powerful architecture for building production ready React applications](https://github.com/alan2207/bulletproof-react)

### Tailwind CSS

- [Why we use Tailwind CSS as our primary framework | Clean Commit](https://cleancommit.io/blog/why-we-use-tailwind-css-as-our-primary-framework)
- [An Honest Look at Tailwind as an API for CSS | thoughtbot, inc.](https://thoughtbot.com/blog/an-honest-look-at-tailwind-as-an-api-for-css)
- [Styling Best Practices I Use With Tailwind CSS | theodorusclarence.com](https://theodorusclarence.com/blog/tailwindcss-best-practice)
