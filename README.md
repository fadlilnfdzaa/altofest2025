This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Database Setup

This project uses Vercel Postgres for storing click statistics. To set up the database:

1. Create a Postgres database in your Vercel dashboard:
   - Go to the [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to Storage tab
   - Create a new Postgres database

2. Copy the environment variables from Vercel:
   - After creating the database, Vercel will provide you with environment variables
   - Copy these variables to your `.env.local` file (use `.env.local.example` as a template)

3. Run the migration script to set up the database schema:
   ```bash
   npx tsx src/scripts/migrate.ts
   ```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

When deploying to Vercel, make sure to:
1. Set up the Postgres database as described above
2. Link the database to your project in the Vercel dashboard
3. The environment variables will be automatically added to your project

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
