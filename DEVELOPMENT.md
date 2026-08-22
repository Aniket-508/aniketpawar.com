# Development

This guide provides instructions on how to set up and run the project locally.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Aniket-508/aniketpawar.com.git
```

2. Navigate to the project directory:

```bash
cd aniketpawar.com
```

3. Install dependencies:

```bash
pnpm install
```

4. Configure Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Then, update the necessary environment variables inside `.env.local`.

5. Start the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
pnpm build
```

After building, start the application with:

```bash
NODE_ENV=production pnpm start
```

## Before pushing

CI runs these on every push and PR. Run them locally first:

```bash
pnpm check
pnpm build
pnpm typecheck
```

## Commands

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Start development server     |
| `pnpm build`     | Build for production         |
| `pnpm start`     | Start production server      |
| `pnpm fix`       | Fix linting issues           |
| `pnpm check`     | Check for lint errors        |
| `pnpm typecheck` | Run TypeScript type checking |
