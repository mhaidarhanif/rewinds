# ⏪ Rewinds Stack

# Introduction

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Remix](https://img.shields.io/badge/Remix-000000?style=flat-square&logo=remix&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-111111?style=flat-square&logo=framer&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=planetscale&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
[![Better Uptime](https://betteruptime.com/status-badges/v1/monitor/enmd.svg)](https://uptime.mhaidarhanif.com/?utm_source=status_badge)

Rewinds Stack is a web app starter kit with Remix and Tailwind family of libraries, interactive UI components, and the TypeScript ecosystem.

The core stack includes TypeScript, Remix & Remix Auth, React, Tailwind CSS, Radix UI, Zod, Conform, Prisma ORM, PlanetScale, and Vercel.

Learn more about [Remix Stacks](https://remix.run/stacks).

Demo and examples: [rewinds.mhaidarhanif.com](https://rewinds.mhaidarhanif.com)

## Quick start

```sh
npx create-remix@latest --template mhaidarhanif/rewinds
```

## Screenshots

<a href="https://rewinds.mhaidarhanif.com" target="_blank">
<div style="max-width: 720px;">

[![Dark](public/assets/screenshots/rewinds-screenshot-dark.png)](https://rewinds.mhaidarhanif.com)
[![Light](public/assets/screenshots/rewinds-screenshot-light.png)](https://rewinds.mhaidarhanif.com)

</div>
</a>

## Code repository and links

- [mhaidarhanif/rewinds](https://github.com/mhaidarhanif/rewinds)
- [rewinds.mhaidarhanif.com](https://rewinds.mhaidarhanif.com)
- [rewinds.vercel.app](https://rewinds.vercel.app)
- [rewinds.dev](https://rewinds.dev) (sooner or later)

# Tech Stack

Listed here are only the most important parts in the stack.️ Some setup mostly finished, but some might haven't done yet or still in progress. More details and references can also be checked from [`catamyst/stack`](https://a.catamyst.com/stack).

As a reminder:

> "Software is a just a tool to help accomplish something for people - many programmers never understood that. Keep your eyes on the delivered value, and don’t over focus on the specifics of the tools" — John Carmack

## Primary Tech Stack

- Rewinds: Remix Tailwind Stack
- TRIP: TypeScript/Tailwind Remix/React/Radix Interface Prisma
  - VPS: Vercel PlanetScale

These are also the primary prerequisites for you to learn, understand, and use with this Rewinds stack. (Architecture diagram can help later on here)

## Complete Tech Stack

- Core
  - [Node.js](https://nodejs.org)
    - [pnpm](https://pnpm.io)
  - [TypeScript](https://typescriptlang.org)
  - [React](https://react.dev)
  - [Remix](https://remix.run)
- Styling
  - [Tailwind CSS](https://tailwindcss.com)
  - [Fontsource](https://fontsource.org)
  - [Radix UI](https://radix-ui.com)
  - [React Email](https://react.email) 🚧
- Form Handling
  - [Conform](https://conform.guide)
- Data Validation
  - [Zod](https://zod.dev) and [Zodix](https://github.com/rileytomasek/zodix)
- Database and ORM
  - [Prisma ORM](https://prisma.io)
  - [PlanetScale](https://planetscale.com)
- Auth
  - [Remix Auth](https://github.com/sergiodxa/remix-auth)
- Tooling
  - [Prettier](https://prettier.io)
  - [ESLint](https://eslint.org)
  - [Stylelint](https://stylelint.io)
  - [Doppler](https://doppler.com) / [Dotenv](https://dotenv.org)
- Deployment
  - [Vercel](https://vercel.com)
- Domain/DNS
  - [Cloudflare](https://cloudflare.com)
- Testing 🚧
  - [Vitest](https://vitest.dev) 🚧
  - [Testing Library](https://testing-library.com) 🚧
  - [MSW](https://msw.io) 🚧
  - [Playwright](https://playwright.dev) 🚧
  - [Ladle](https://ladle.dev) 🚧

[Check the GUIDE.md](./GUIDE.md) if you need some guide into the project setup, structure, and files. If marked as 🚧 means it's still not there yet or still in development.

## Extra Tech Stack

(Not included in Rewinds)

If you need separate backend/server/service:

- Core/API
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
- Misc
  - [Inngest](https://inngest.com)

# Some Details

## Some Ideas

You can use this to build any web app. Also what I'm using Rewinds for.

- Personal Website
- Company Profile
- Todo List
- Blog or News
- Social Media
- Community Forum
- Support Desk
- Art Gallery
- E-Commerce
- Inventory Management
- Events Management
- Knowledge Management
- Content Management System (CMS)
- Learning Management System (LMS)

## Some Checklists

Included features for the users:

- [x] Site layout and routes/pages
- [x] Light and dark mode theme
- [x] Register, log in, log out
  - [x] Data validation and check availability
  - [ ] Send welcome or verification email
- [x] Public pages and search
- [x] User dashboard, profile, settings
  - [x] Manage notes (create, read, update, delete, search)
  - [ ] Profile and avatar image
  - [ ] Reset and change email
  - [ ] Notification
- [x] Admin dashboard and search
  - [x] Manage users, notes, etc
- [x] Various others
  - [x] Add to home screen as app on mobile
  - [x] Search data
  - [ ] Image assets
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
- [x] Ready to use and 100% customizable UI components with React, Tailwind CSS, Radix UI
  - [ ] Rich text or WYSIWYG editor with TipTap
  - [ ] Keyboard shortcuts with cmdk
- [x] Preselected styles, colors, fonts, icons, and responsive design
  - [x] Default avatar image with Dicebear API
  - [x] Icon set system to avoid name conflict
    - [x] Lucide
    - [x] Iconir
    - [ ] Bring your own favorite
- [x] Database with Prisma ORM and MySQL on PlanetScale
  - [x] GraphQL/tRPC-style file models structure
- [x] Data validation with Zod for general and Zodix for Remix loader/action
- [x] Form handling with Conform
  - [x] Check for unallowed usernames
  - [ ] Redirect to previous route
  - [ ] Password strength meter
- [x] Auth with Remix Auth using a session cookie
- [ ] Image hosting integration with ImageKit
- [ ] Email delivery system
  - [ ] Transactional email with Mailjet/Resend and React Email
  - [ ] Marketing email with ConvertKit/Bento
- [x] SEO functions with meta tags, `robots.txt`, `sitemap.xml`, `canonical`
- [x] Various utilities with external libraries
  - [x] Root loader data for env, theme, user, etc
  - [x] Cache header
- [x] No need for CLS loading screens/skeletons, only loading bar on top and loading button state
- [x] Lighthouse or [Pagespeed Insights](https://pagespeed.web.dev/analysis/https-rewinds-mhaidarhanif-com/hbkn7kmahh?form_factor=desktop) optimized
- [x] pnpm, Prettier, ESLint, Stylelint, and much more
  - [x] No lint and type errors!
  - [x] Organize import order

Recommended extra setup:

- Connect to monitoring service such as Better Uptime, Instatus, or Pulsetic.
- Connect Vercel project to Axiom for better log management.
- Connect to Highlight to report and analyze errors.
- Use [Google Search Console](https://search.google.com/search-console/about) to check the sitemap and SERP-related stuffs.
- Use [Clerk](https://clerk.com) to [replace Remix Auth](https://clerk.com/docs/quickstarts/get-started-with-remix) if you need more than this.

## Some Details

This repo is kind of over-engineered to have high flexibility and cover a lot of use cases for different applications/projects/products, especially what I'm working with several other people.

This template uses [`shadcn/ui`](https://github.com/shadcn/ui) as the base components style and setup for full stack app development inspired by [T3 Stack](https://create.t3.gg). The main reason is this repo uses Remix, not Next.js like those two inspirations.

Currently includes the Remix HMR and HDR optional setup with both Vercel config and Express server on development as per Remix `v1.14`. The config is just combining the templates from Remix with Express and Vercel based on the environment. With separated Expresss you are also able to debug the process from code editor like VS Code much easier.

## Some Background

Why create this? Well, because I had a lot of recent projects with this same stack.

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

## Setup Environment Variables/Secrets

Use plain `.env` file for local development:

```sh
cp -i .env.example .env
# `-i` or `--interactive` will prompt before overwrite
# then edit `.env` as you
```

Alternatively, it's recommended to use [Doppler](https://doppler.com), or [Dotenv](https://dotenv.org), or somethin similar to manage the credentials.

For example if using Doppler:

```sh
doppler login
doppler setup
doppler secrets download --no-file --format env > .env
```

> ⚠️ Make sure to setup the environment variables/secrets here, on Vercel, or on your preferred deployment target. Otherwise the app will break on production. That's why Doppler or Dotenv are recommended to manage them easily. There are also some preset strings in the `.env.example` which you can copy directly.

## Prisma ORM and Database Connection

It's up to you which database/DBMS you want to use with the app. This repo is suited to use either your own MySQL instance or MySQL on PlanetScale. But don't use SQLite because it doesn't have `@db.Text` annotation and `model.createMany()` function.

For example:

```sh
DATABASE_URL='mysql://username:pscale_pw_password@region.connect.psdb.cloud/name?sslaccept=strict'
```

While in development, you can:

- Generate Prisma types for `@prisma/client` with `nr prisma:generate` (it runs `prisma generate`)
- Check generated Prisma documentation with `nr docs:prisma` (it runs `prisma-docs-generator serve`) then open <http://localhost:5858>
- Visualize the schema with [Prismaliser](https://prismaliser.app)
- Push Prisma schema changes for PlanetScale with `nr prisma:push` (it runs `prisma db push`)
  - You might notice that with [PlanetScale](https://planetscale.com/docs/tutorials/prisma-quickstart) approach with [Prisma](https://prisma.io/docs/guides/database/using-prisma-with-planetscale), we don't need migration files in our repo, rather managed in their platform.

## Run Development Server

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

With HMR, it will run both `dev:remix` and `dev:express`, the Remix server and Express server with HMR enabled. Then wait until you see this:

```sh
📀 Remix on Express server port :3000
Loading environment variables from .env
💿 Built in 0s
```

Open up <http://localhost:3000> and you should be ready to go!

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

Just keep in mind to set up the environment variables/secret that preferably differentiated for each server environments (local/development, staging/preview, production), especially:

```sh
# Primary database that connects to Prisma ORM
DATABASE_URL=
# Session secret for cookie after authenticated or logged in
REMIX_SESSION_SECRET=
# Application name
REMIX_APP_NAME=
# Application name for transactional email
REMIX_APP_EMAIL=
# Default admin email
REMIX_ADMIN_EMAIL=
# Default admin password
REMIX_ADMIN_PASSWORD=
```

The session secret for `REMIX_SESSION_SECRET` can be generated more securely using:

```sh
node scripts/generate-secret.js # using Node.js crypto module
1234567890abcdefghijklmnopqrstuvwxyz1234567890
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

# Important Notes

## Icons

This template provide at least 2 icon set with SVG assets:

- [Lucide](https://lucide.dev)
- [Iconoir](https://iconoir.com)

Recommended to use [Icones](https://icones.js.org) to search the icon names easily.

## Tailwind CSS Config

Use [uicolors.app](https://uicolors.app/create) or [tints.dev](https://tints.dev) to generate the color tokens easily. Then replace what's inside `tailwind.config.js`.

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

Since Remix `v1.14`, you might notice that the entry files are implicitly defined. At the moment, if you need to deploy a Remix app I still suggest revealing or explicitly defining the entry files to make it work smoothly. Although this repo already has the entry files.

```sh
npx remix reveal
```

## Remix SEO Configuration

As there's no official way to handle SEO related output for metadata and sitemap, here are the options ordered by stability and realibility:

1. [`balavishnuvj/remix-seo`](https://github.com/balavishnuvj/remix-seo): Collection of SEO utilities like sitemap, robots.txt, etc. for a Remix Application
2. [`chaance/remix-seo`](https://github.com/chaance/remix-seo): A package for easily managing SEO meta and link tags in Remix
3. [`fedeya/remix-sitemap`](https://github.com/fedeya/remix-sitemap): Sitemap generator for Remix applications

## HMR Workaround

> This setup has been done in this Rewinds template.

To enable HMR, at least as per Remix `v1.14`, when not primarily using Express server only (like using Vercel and another server), we have to a separate Express server.

If using pnpm, you also have to install `react-refresh` to resolve the HMR dependency:

```sh
ni -D react-refresh
```

When running locally in development mode, use either the Express server or Vercel. This by default does not understand the Vercel lambda module format, so we fall back to the standard build output.

## References

### General

- [web.dev](https://web.dev)
- [Catamyst Stack](https://a.catamyst.com/stack)
  - [Catamyst Stack All](https://a.catamyst.com/stack-all)
- [The Web’s Next Transition - Epic Web Dev by Kent C. Dodds](https://www.epicweb.dev/the-webs-next-transition)
- [Infra I'm Building On In 2023](https://t3.gg/blog/post/2023-infra)
  - [The Infra That Saved Me From AWS - My 2023 Stack](https://youtube.com/watch?v=v-9AZKp-Ljo)

### Remix

- [Remix Docs](http://remix.run)
- [Remix Blog Tutorial](http://remix.run/docs/en/main/tutorials/blog)
- [Up and Running with Remix - Kent C. Dodds - egghead.io](https://egghead.io/courses/up-and-running-with-remix-b82b6bb6)
- [Build a Fullstack App with Remix and Prisma - Prisma YouTub Playlist](https://www.youtube.com/watch?v=4tXGRe5CDDg&list=PLn2e1F9Rfr6kPDIAbfkOxgDLf4N3bFiMn)
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

### Setup Inspirations

- [shadcn UI](https://github.com/shadcn/ui)
  - [Taxonomy](https://tx.shadcn.com)
- [Spacewave Stack by Kent C. Dodds](https://github.com/epicweb-dev/spacewave-stack)
- [Synthwave Stack by I4O Open Source](https://github.com/i4o-oss/synthwave-stack)
- [Stripe Stack by Daniel Kanem](https://github.com/dev-xo/stripe-stack)
- [T3 Stack by T3 Community via Theo Browne](https://create.t3.gg)
- [neorepo - Remix/Next.js production-ready starter kit](https://neorepo.com)
- [SaasRock - The One-Man SaaS Framework](https://saasrock.com)
- [MakerKit - SaaS Starter Kits based on React](https://makerkit.dev)
- [Saas UI - The React component library for Startups](https://saas-ui.dev)

### Design Inspirations

- [saasui.design](https://saasui.design)
- [saasinterface.com](https://saasinterface.com)

### Rewinds in the wild

Some other projects using Rewinds:

- [M Haidar Hanif Website](https://github.com/mhaidarhanif/mhaidarhanif-web): Personal Website
- [Catamyst](https://github.com/catamyst/catamyst-web): Learning Management System (LMS)
- [Super Duper Gallery](https://github.com/jonathannicolasdev/superduper): Art Gallery

### What's next for the future?

Repackage this as [@catamyst/ui] or [@catamyst/rewinds-ui]
