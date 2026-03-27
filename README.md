# CareerHub

A career portal web application built with React, TypeScript, and Express.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Backend:** Express (Node.js)
- **Package Manager:** pnpm

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/installation) — install with `npm install -g pnpm`

## Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/B37Z0/careerhub.git
   cd careerhub
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the dev server**

   ```bash
   pnpm dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000). The port will automatically increment if 3000 is already in use.

## Building for Production

1. **Build the app**

   ```bash
   pnpm build
   ```

   This compiles the React frontend into `dist/public/` and bundles the Express server into `dist/index.js`.

2. **Start the production server**

   ```bash
   pnpm start
   ```

