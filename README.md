# ⏪ Rewinds Stack

![The Rewinds Stack](https://raw.githubusercontent.com/mhaidarhanif/rewinds/main/public/assets/screenshots/rewinds-screenshot-dark.png)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Remix](https://img.shields.io/badge/Remix-000000?style=flat-square&logo=remix&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-111111?style=flat-square&logo=framer&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=planetscale&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
[![Better Uptime](https://betteruptime.com/status-badges/v1/monitor/enmd.svg)](https://uptime.mhaidarhanif.com/?utm_source=status_badge)

## Introduction

Rewinds is a web app starter kit with mainly Remix and Tailwind CSS. The goal is to be as productive as possible to ship things fast. So it is a highly opinionated collection of software engineering and web development workflow, interactive UI components, functionality hooks and utilities.

Visit the demo at [rewinds.mhaidarhanif.com](https://rewinds.mhaidarhanif.com). Follow the progress on [GitHub @mhaidarhanif](https://github.com/mhaidarhanif) and [Twitter @mhaidarhanif](https://twitter.com/mhaidarhanif).

## Goals

Use this to build any web apps:

- Personal Website
- Company Profile
- Interactive Form
- Todo List
- Blog or News
- Social Media
- Community Forum
- Support Desk
- Art Gallery
- Job Board
- Hiring or Recruitment
- Applicant Tracking System (ATS)
- Inventory Management
- Events Management
- Knowledge Management
- Admin Panel or Dashboard
- E-Commerce or Storefront
- Product or Project Management
- Content Management System (CMS)
- Learning Management System (LMS)

## Quick start

Starting new? [Use this template to generate the repository](https://github.com/mhaidarhanif/rewinds/generate).

Clone?

```sh
git clone git@github.com:mhaidarhanif/rewinds.git
```

Use `npx`?

```sh
npx create-remix@latest --template mhaidarhanif/rewinds
```

Deploy quickly?

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmhaidarhanif%2Frewinds&env=DATABASE_URL,REMIX_SESSION_SECRET,REMIX_APP_NAME,REMIX_APP_EMAIL&project-name=my-rewinds-app&repository-name=my-rewinds-app&demo-title=Rewinds&demo-description=A%20starter%20kit%20with%20Remix%2C%20Tailwind%20CSS%2C%20and%20the%20TypeScript%20ecosystem.&demo-url=https%3A%2F%2Frewinds.mhaidarhanif.com&demo-image=https%3A%2F%2Frewinds.mhaidarhanif.com%2Fassets%2Fimages%2Fcat-study-dark.png)

Then make sure to explore the repo to rename and replace the contents along the way. As this is a template, not a blank repo generator.

## Tech Stack

### Primary Tech Stack

The main prerequisites to learn, understand, and use with the stack.

1. [TypeScript](https://typescriptlang.org): typed language
2. [React](https://react.dev): UI library
3. [Remix](https://remix.run): web framework
4. [Tailwind CSS](https://tailwindcss.com): styling
5. [Radix UI](https://radix-ui.com): interactive components
6. [Prisma](https://prisma.io): database ORM
7. [PlanetScale](https://planetscale.com): database management system
8. [Vercel](https://vercel.com): deployment

(Architecture diagram can help later on here)

If you work as a team, I recommend to:

1. Use [Doppler](https://doppler.com) or [Dotenv](https://dotenv.org) as secrets management platform to share the environment variables. So you can optionally use `.env` file. If you need to share quickly [EnvShare](https://envshare.dev) is good.
2. Use [Vercel Pro](https://vercel.com/docs/concepts/payments-and-billing/pro) to make code review with preview deployments easier.

### Complete Tech Stack

The complete stack are Node.js, TypeScript, Remix, Remix Auth, React, Tailwind CSS, Radix UI, Zod, Conform, Prisma ORM, PlanetScale, and Vercel. [Check the GUIDE.md](GUIDE.md) if you need more info on the project setup, structure, and files.

Legends:

- 🧰 = required or should not be changed
- 🧩 = optional or interchangeable
- 🎉 = 3rd party service or platform
- 🚧 = still in development or not available

#### Core

- [Node.js](https://nodejs.org): runtime 🧰
  - [pnpm](https://pnpm.io): package manager 🧩
- [TypeScript](https://typescriptlang.org): typed language 🧰
- [React](https://react.dev): UI library 🧰
- [Remix](https://remix.run): web framework 🧰

#### Styling and Components

- [Tailwind CSS](https://tailwindcss.com): styling 🧰
- [Fontsource](https://fontsource.org): web fonts 🧰
- [Radix UI](https://radix-ui.com): unstyled UI components 🧰🧩
  - [Headless UI](https://headlessui.dev) 🧩
  - [Ariakit](https://ariakit.org) 🧩
- [Icones](https://icones.js.org): icon search
  - [Lucide](https://lucide.dev): icon set
  - [Iconoir](https://iconoir.com): icon set
- [React Email](https://react.email): email styling 🚧🧩
- [TanStack Table](https://tanstack.com/table): unstyled table grid component 🚧🧩

#### Form Handling and Data Validation

- [Conform](https://conform.guide): form handling 🧰
- [Zod](https://zod.dev): data validation 🧰
  - [Zodix](https://github.com/rileytomasek/zodix) 🧩
  - [zod-form-data](https://npmjs.com/package/zod-form-data) 🧩

#### Database and ORM

- [Prisma ORM](https://prisma.io): database ORM 🧰
- [MySQL on PlanetScale](https://planetscale.com): database management system 🧩🎉

#### Auth Provider

- [Remix Auth](https://github.com/sergiodxa/remix-auth) 🧰
  - [Lucia](https://lucia-auth.com) 🧩
  - [Clerk](https://clerk.dev) 🧩🎉

#### Tools: Code Quality

- [Prettier](https://prettier.io): code formatter 🧰
- [ESLint](https://eslint.org): code linter 🧰
- [Stylelint](https://stylelint.io): styling linter 🧰

#### Tools: Deployment

- [Vercel](https://vercel.com) 🧰🧩🎉
- [Fly](https://fly.io) 🧩🎉
- [Render](https://render.com) 🧩🎉
- [Railway](https://railway.app) 🧩🎉
- [Google Cloud](https://cloud.google.com) 🧩🎉
- [Amazon Web Services (AWS)](https://aws.amazon.com) 🧩🎉

#### Tools: Domain and DNS and SSL/TLS

- [Cloudflare](https://cloudflare.com) 🧩🎉

#### Tools: Environment Variable/Secret

- [Doppler](https://doppler.com) 🧩🎉
- [Dotenv](https://dotenv.org) 🧩🎉

#### Tools: Analytics

- [Vercel Analytics](https://vercel.com/docs/concepts/analytics) 🧩🎉
  - Enable it on your Vercel projects dashboard
- [Jitsu](https://jitsu.com): data pipeline and ingestion 🚧🧩🎉

#### Tools: Cache and Rate Limiter

- [Upstash](https://upstash.com) 🚧🧩🎉

#### Tools: Image

- [Uploadcare](https://uploadcare.com) 🧩🎉
- [ImageKit](https://imagekit.io) 🚧🧩🎉
- [Cloudinary](https://cloudinary.com) 🚧🧩🎉

#### Tools: Transactional Email 🚧

- [Mailjet](https://mailjet.com) 🚧🧩🎉
- [Resend](https://resend.com) 🚧🧩🎉

#### Tools: Marketing Email 🚧

- [ConvertKit](https://convertkit.com) 🚧🧩🎉
- [Bento](https://bentonow.com) 🚧🧩🎉

#### Tools: Payment 🚧

- [Lemon Squeezy](https://lemonsqueezy.com) 🚧🧩🎉
- [Paddle](https://paddle.com) 🚧🧩🎉
- [Stripe](https://stripe.com) 🚧🧩🎉

#### Tools: Testing 🚧

- [Vitest](https://vitest.dev) 🚧🧩
- [Testing Library](https://testing-library.com) 🚧🧩
- [MSW](https://msw.io) 🚧🧩
- [Playwright](https://playwright.dev) 🚧🧩
- [Ladle](https://ladle.dev) 🚧🧩

#### Tools: Container

- [Docker](http://www.docker.com)
  - [Docker Compose](https://docs.docker.com/compose)
  - [Docker Hub](https://hub.docker.com)

### Extra Tech Stack

Although these are not included in Rewinds, if you need a separate backend/server/service, here are the recommendations:

#### REST API

- [NestJS](https://nestjs.com)
  - [Express](https://expressjs.com)
  - [Fastify](https://fastify.io)

#### GraphQL

- [GraphQL](https://graphql.org)
- [GraphQL Yoga](https://github.com/dotansimha/graphql-yoga)
  - [Express](https://expressjs.com)
- [Pothos](https://github.com/hayes/pothos)

#### tRPC

- [tRPC](https://trpc.io)

#### Auth

- [Passport](https://passportjs.org)

## Roadmap

Included features for the end users:

- [x] Premade contents
- [x] Light and dark mode theme
- [x] Site layout and routes/pages
- [x] Admin dashboard and metrics/statistics
- [x] Register, log in, log out
  - [x] Data validation and check availability
  - [ ] Send welcome or verification email
- [x] Public pages and search
- [x] User dashboard, profile, settings
  - [x] Manage notes (create, read, update, delete, search)
  - [x] Change profile and avatar image
  - [x] Change email
  - [x] Change and reset password
  - [ ] Notification
- [x] Admin dashboard and search
  - [x] Manage users, notes, etc
- [x] Various others
  - [x] Share image (open graph)
  - [x] Add to home screen as app on mobile
  - [x] Search data
  - [x] Upload image assets
  - [ ] Map viewer

Included setup for the developers:

- [x] Full stack type safety with Remix and TypeScript
  - [x] Follow the practices from the official docs and Remix Stacks
  - [x] v2 future flags while still in v1
    - [x] v2 flat routes
    - [x] v2 error boundary
    - [x] v2 meta data management
    - [x] v2 route convention
    - [x] v2 normalized form method
    - [x] Tailwind CSS support
    - [x] New dev server with config for HMR/HDR (hot module/data reload)
- [x] More than 50 of ready to use and 100% customizable UI components
  - [x] Layouts and demo examples
  - [ ] Rich text or WYSIWYG editor with TipTap
  - [ ] Keyboard shortcuts with cmdk
- [x] Preselected styles, colors, fonts, icons, and responsive design
  - [x] Customize in Tailwind Config, for brand (primary) and surface (secondary) colors
  - [x] Default avatar image with Dicebear API
  - [x] Icon set system to avoid name conflict
    - [x] Lucide
    - [x] Iconoir
    - [ ] Bring your own favorite
- [x] Database with Prisma ORM and MySQL on PlanetScale
  - [x] tRPC-style or GraphQL-style data models file structure
- [x] Auth with Remix Auth using a session cookie
- [x] Data validation with Zod for general and Zodix for Remix loader/action
- [x] Form handling with Conform
  - [x] Check for unallowed usernames
  - [x] Upload file to Uploadcare
  - [ ] Redirect to previous route
  - [ ] Password strength meter
- [ ] Image hosting integration
- [ ] Email delivery system
  - [ ] Transactional email with Mailjet/Resend and React Email
  - [ ] Marketing email with ConvertKit/Bento
- [x] SEO functions with meta tags
  - [x] `robots.txt`
  - [x] `canonical` tag
  - [x] `sitemap.xml` generator
  - [x] Open Graph and Twitter card
- [x] Various utilities with external libraries
  - [x] Root loader data for env, theme, user, etc
  - [x] Cache control header
- [x] No need for CLS loading screens/skeletons, only loading bar on top and loading button state
- [x] Lighthouse or [Pagespeed Insights](https://pagespeed.web.dev/analysis/https-rewinds-mhaidarhanif-com/hbkn7kmahh?form_factor=desktop) optimized
- [x] pnpm, Prettier, ESLint, Stylelint, and many more

Recommended external setup:

- Monitoring
  - [Better Uptime](https://betteruptime.com)
  - [Hyperping](https://hyperping.io)
  - [Instatus](https://instatus.com)
- Log management
  - [Axiom](https://axiom.co)
- Error reporting and analysis
  - [Highlight](https://highlight.io)
- SEO
  - [Google Search Console](https://search.google.com/search-console/about) to check the sitemap and SERP-related stuffs.

Recommended extra development workflow setup:

- Install [Kodiak](https://github.com/marketplace/kodiakhq) to automate your GitHub pull requests.
- Install [Socket Security](https://github.com/marketplace/socket-security) to prevent malicious open source dependencies from infiltrating your apps.

### More Details

This repo is kind of over-engineered to have high flexibility and cover a lot of use cases for different applications/projects/products, especially what I'm working with several other people.

The components initialized using [shadcn UI](https://github.com/shadcn/ui) as the base components style. And the setup for full stack app development is mostly inspired by [T3 Stack](https://create.t3.gg). The main difference is this repo uses Remix by default, not Next.js like those two.

Currently includes the Remix HMR and HDR optional setup with both Vercel config and Express server on development as per Remix `v1.14`. The config is just combining the templates from Remix with Express and Vercel based on the environment. With separated Express server, you are also able to debug the process from code editor like VS Code much easier.

## Development

### Install Dependencies

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

### Setup Environment Variables/Secrets

These are the main environment variables you need to set up on your own for developing locally:

- `DATABASE_URL`
  - Used with Prisma ORM. Get it from local database or [PlanetScale](https://planetscale.com/docs/concepts/connection-strings)
- `UPLOADCARE_PUBLIC_KEY`
  - Used with Uploadcare's file uploader widget. Get it from [Uploadcare](https://uploadcare.com/docs/start/settings)

To manage the environment variables, you can either use:

1. Plain `.env` file
2. Secrets management platform such as Doppler

#### If using `.env` fie

```sh
cp -i .env.example .env
# -i or --interactive will ask before overwrite
```

Then edit `.env` as you need.

#### If using secrets management platform

Alternatively, it's recommended to use [Doppler](https://doppler.com), or
[Dotenv](https://dotenv.org), or something similar to manage the credentials.

```sh
doppler login
doppler setup
```

To use the secrets directly:

```sh
doppler -- pnpm <command>
```

To download the secrets into the `.env` file:

```sh
doppler secrets download --no-file --format env > .env
```

> ⚠️ Make sure to setup the environment variables/secrets here, on Vercel, or on your preferred deployment target. Otherwise the app will break on production. That's why a secrets management platform is recommended to manage them easily. There are also some preset strings in the `.env.example` which you can copy directly.

### Prisma ORM and Database Connection

It's up to you which database/DBMS you want to use with the app that supported by Prisma ORM. This repo is suited to use either your own MySQL instance or MySQL on PlanetScale. But don't use SQLite because it doesn't have `@db.Text` annotation and `model.createMany()` function.

Once you have the database URL connection string from PlanetScale MySQL instance, for example:

#### If using PlanetScale

1. [Create a PlanetScale account](https://planetscale.com) which you can [sign up for free](https://auth.planetscale.com/sign-up).
2. [Create a database](https://planetscale.com/docs) and get the database URL connection string as `DATABASE_URL` from there.
3. Put the `DATABASE_URL` to the environment variables.

```sh
DATABASE_URL='mysql://username:pscale_pw_password@region.connect.psdb.cloud/name?sslaccept=strict'
```

#### If using local database

Run Docker service and run [Docker Compose script](./docker-compose.yml):

```sh
docker compose up
```

While in development, you can:

- Generate Prisma types for `@prisma/client` with `nr prisma:generate` (it runs `prisma generate`)
- Check generated Prisma documentation with `nr docs:prisma` (it runs `prisma-docs-generator serve`) then open <http://localhost:5858>
- Visualize the schema with [Prisma Editor](https://github.com/mohammed-bahumaish/prisma-editor) or [Prismaliser](https://prismaliser.app)
- Push Prisma schema changes for PlanetScale with `nr prisma:push` (it runs `prisma db push`)
  - Notice that with [PlanetScale](https://planetscale.com/docs/tutorials/prisma-quickstart) approach with [Prisma](https://prisma.io/docs/guides/database/using-prisma-with-planetscale), we don't need migration files in our repo, but rather managed in their platform.
- Read the [official Prisma docs](https://prisma.io/docs) and [How to Prisma](https://howtoprisma.com)
  - Follow the [PlanetScale & Prisma happy practices](https://planetscale.com/docs/prisma/prisma-best-practices)
  - Can also try [PrismaGPT](https://gpt.howtoprisma.com) to help learn the query.

### File upload with Uploadcare

This repo using [Uploadcare](https://uploadcare.com) to primarily upload and host the uploaded images and files. If you want the upload component to run, you need to:

and paste your [Public API key](https://uploadcare.com/docs/start/settings/#keys-public) to `UPLOADCARE_PUBLIC_KEY` env var.

1. [Create an Uploadcare account](https://uploadcare.com).
2. Go to the Dashboard and get the public key string.
3. Put it as `UPLOADCARE_PUBLIC_KEY` to the environment variables.

### Run Development Server

Make sure you've generated the latest Prisma schema with `nr prisma:generate`.

Afterward, start the Remix development server like so based on your preference:

- Run without HMR: `nr dev`
- Run with HMR: `nr dev-hmr`

Without HMR, it will just run `remix dev`, the Remix server on development. Then wait until you see this:

```sh
Loading environment variables from .env
Remix App Server started at http://localhost:3000
```

Open up <http://localhost:3000> and you should be ready to go!

Alternatively, you can enable/disable HMR by changing this in the `remix.config.js`. By default we're not using it.

```js
const isUsingHMR = false;
```

With HMR, it will run both `dev:remix` and `dev:express`, the Remix server and the Express server with HMR enabled. Then wait until you see this:

```sh
📀 Remix on Express server port :3000
Loading environment variables from .env
💿 Built in 0s
```

Open up <http://localhost:3000> and you should be ready to go!

### TypeScript and ESLint Server

When you update some significant changes in the TypeScript config, ESLint config, or just generated a new Prisma schema, you can restart the language server as needed:

```sh
> TypeScript: Restart TS Server
> ESLint: Restart ESLint Server
> Prisma: Restart Language Server
```

### Customize some contents

Look up for these comments:

- `EDITME`: You can edit them based on your need
- `TODO`: You can see that they are in progress

## Deployment

### Vercel

As this repo was made after having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed. Alternatively you can just use the "Deploy to Vercel" button above.

Just keep in mind to set up the environment variables/secret that preferably differentiated for each server environments such as local/development, staging/preview, and production.

Required for the app to run:

```sh
# Primary database that connects to Prisma ORM
DATABASE_URL=

# Session secret for cookie after authenticated or logged in
REMIX_SESSION_SECRET=

# Application name
REMIX_APP_NAME=

# Application transactional email
REMIX_APP_EMAIL=

# Upload image assets solution
UPLOADCARE_PUBLIC_KEY=
```

The session secret for `REMIX_SESSION_SECRET` can be generated more securely using either Node.js crypto module (JS) or OpenSSL (shell):

```sh
$ node scripts/generate-secret.js
1234567890abcdefghijklmnopqrstuvwxyz1234567890

$ sh scripts/generate-secret.sh
yjudrrKv/W4jxzmQqXze9T7DEANxStDtg4YCdfgs/4E=
```

When managing environment variables/secrets using Doppler, there's the auto sync integration to Vercel:

- <https://doppler.com/integrations/vercel>
- <https://vercel.com/integrations/doppler>

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
ni -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

To make it automatic for Vercel CI to push the database schema changes (especially to PlanetScale) while building for Preview and Production, you can setup the build command to use the `build:ci` script instead of regular `build`.

Put this into the Build Command in the Project Settings:

```sh
pnpm build:ci
```

(Change `pnpm` to your package manager of choice)

## Important Notes

### Tailwind CSS Config

Use [uicolors.app](https://uicolors.app/create) or [tints.dev](https://tints.dev) to generate the color tokens easily. Then replace what's inside `tailwind.config.js`.

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f9fd",
          // ...
          950: "#0c1c27",
        },
        surface: {
          50: "#f4f8f9",
          // ...
          950: "#040506",
        },
      },
    },
  },
};
```

### Remix Entry Files

This repo already has the entry files. Since Remix `v1.14`, you might notice that the entry files might be able to be implicitly defined. At the moment, I still suggest revealing or explicitly defining them to make it work smoothly.

```sh
npx remix reveal
```

### Remix SEO Configuration

As there's no official way yet to handle SEO related output for metadata and sitemap, here are the options ordered by preference:

1. [`balavishnuvj/remix-seo`](https://github.com/balavishnuvj/remix-seo): Collection of SEO utilities like sitemap, robots.txt, etc. for a Remix Application
2. [`chaance/remix-seo`](https://github.com/chaance/remix-seo): A package for easily managing SEO meta and link tags in Remix
3. [`fedeya/remix-sitemap`](https://github.com/fedeya/remix-sitemap): Sitemap generator for Remix applications

### Database backup

Syntax to backup using PlanetScale's `pscale` CLI:

```sh
pscale db dump database_name branch --output database_name.dump
```

For example:

```sh
pscale db dump rewinds main --output rewinds.dump
```

## References

### General

- [web.dev](https://web.dev)
- [Rewinds Stack](https://rewinds.mhaidarhanif.com)
- [Catamyst Stack](https://a.catamyst.com/stack)
  - [Catamyst Stack All](https://a.catamyst.com/stack-all)
- [The Web’s Next Transition - Epic Web Dev by Kent C. Dodds](https://epicweb.dev/the-webs-next-transition)
- [Infra I'm Building On In 2023 - T3](https://t3.gg/blog/post/2023-infra)
  - [The Infra That Saved Me From AWS - My 2023 Stack](https://youtube.com/watch?v=v-9AZKp-Ljo)

### Remix

- [Remix Docs](http://remix.run)
- [Remix Blog Tutorial](http://remix.run/docs/en/main/tutorials/blog)
- [Up and Running with Remix - Kent C. Dodds - egghead.io](https://egghead.io/courses/up-and-running-with-remix-b82b6bb6)
- [Build a Fullstack App with Remix and Prisma - Prisma YouTub Playlist](https://youtube.com/watch?v=4tXGRe5CDDg&list=PLn2e1F9Rfr6kPDIAbfkOxgDLf4N3bFiMn)
- [Build a Fullstack App with Remix and Prisma - Prisma Blog](https://prisma.io/blog/fullstack-remix-prisma-mongodb-1-7D0BfTXBmB6r)

### React

- [React](https://react.dev)
- [Rethinking React best practices - Frontend Mastery](https://frontendmastery.com/posts/rethinking-react-best-practices)
- [Bulletproof React - A simple, scalable, and powerful architecture for building production-ready React applications](https://github.com/alan2207/bulletproof-react)

### Tailwind CSS

- [Tailwind CSS](https://tailwindcss.com)
- [Why we use Tailwind CSS as our primary framework | Clean Commit](https://cleancommit.io/blog/why-we-use-tailwind-css-as-our-primary-framework)
- [An Honest Look at Tailwind as an API for CSS | thoughtbot, inc.](https://thoughtbot.com/blog/an-honest-look-at-tailwind-as-an-api-for-css)
- [Styling Best Practices I Use With Tailwind CSS | theodorusclarence.com](https://theodorusclarence.com/blog/tailwindcss-best-practice)

### Inspirations

- [Design System Checklist](https://designsystemchecklist.com)
- [Remix Stacks](https://remix.run/stacks)
  - [Remix Directory](https://remix.directory)
  - [Epic Stack by Kent C. Dodds](https://github.com/epicweb-dev/epic-stack)
  - [Spacewave Stack by Kent C. Dodds](https://github.com/epicweb-dev/spacewave-stack)
  - [Synthwave Stack by I4O Open Source](https://github.com/i4o-oss/synthwave-stack)
  - [Stripe Stack by Daniel Kanem](https://github.com/dev-xo/stripe-stack)
- [T3 Stack by T3 Community / Theo Browne](https://create.t3.gg)
- [shadcn UI](https://github.com/shadcn/ui)
  - [Taxonomy](https://tx.shadcn.com)
- [Precedent](https://precedent.dev)
- [Reshaped](https://reshaped.so)
- [neorepo - Remix/Next.js production-ready starter kit](https://neorepo.com)
- [SaasRock - The One-Man SaaS Framework](https://saasrock.com)
- [MakerKit - SaaS Starter Kits based on React](https://makerkit.dev)
- [Saas UI - The React component library for Startups](https://saas-ui.dev)
- [Rewind-UI - React component library using Tailwind CSS](https://github.com/rewindui/rewindui)
- [saasui.design](https://saasui.design)
- [saasinterface.com](https://saasinterface.com)

Also attempt to learn from others like Next.js, NestJS, Passport, tRPC, GraphQL, Swagger (OpenAPI), etc.

### Rewinds in the wild

Some other public repos/projects using Rewinds:

- [🧊 M Haidar Hanif Website](https://github.com/mhaidarhanif/mhaidarhanif-web): Personal Website
- [🐱 Catamyst](https://github.com/catamyst/catamyst-web): Learning Management System (LMS)
- [🎨Super Duper Gallery](https://github.com/jonathannicolasdev/superduper): Art Gallery in Philippines
- [🕌 Kawal Masjid](https://github.com/zainfathoni/kawalmasjid): Mosque Directory in Indonesia

## Credits

### Author

M Haidar Hanif (@mhaidarhanif)

### License

[The MIT License](LICENSE)

### Reminder

> "Software is a just a tool to help accomplish something for people - many programmers never understood that. Keep your eyes on the delivered value, and don’t over focus on the specifics of the tools" — John Carmack

---

<a aria-label="Logo" href="https://rewinds.mhaidarhanif.com">
  <img src="https://flat.badgen.net/badge/Made%20by/M%20Haidar%20Hanif?color=black&labelColor=blue">
</a>
