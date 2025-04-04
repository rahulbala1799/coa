# B2B Wholesale Platform

A full-stack B2B wholesale application built with Next.js and PostgreSQL, deployable on Vercel.

## Features

- **Admin Dashboard**: Manage products, customers, and orders
- **Customer Portal**: Browse products and place orders
- **Authentication**: Secure login system for both admin and customers
- **PostgreSQL Database**: Robust data storage with Prisma ORM
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Deployment**: Vercel
- **State Management**: React Hooks

## Project Structure

```
b2b-app/
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── admin/      # Admin dashboard pages
│   │   ├── api/        # API routes
│   │   ├── auth/       # Authentication pages
│   │   ├── products/   # Product pages
│   │   └── ...
│   ├── components/     # Reusable React components
│   ├── lib/            # Utility functions and services
│   └── styles/         # Global styles
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd b2b-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgres://username:password@localhost:5432/b2b_app"
JWT_SECRET="your-secret-key"
```

4. Initialize the database:

```bash
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Create a Vercel account and install the Vercel CLI:

```bash
npm i -g vercel
```

2. Set up Vercel PostgreSQL:
   - Create a new PostgreSQL database in the Vercel dashboard
   - Add the database connection details to your project

3. Deploy to Vercel:

```bash
vercel
```

## License

[MIT](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
