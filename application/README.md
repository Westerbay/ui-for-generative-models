# Generative Models UI application

This directory contains the React, TypeScript, and Vite frontend. See the [repository README](../README.md) for setup, the backend contract, current behavior, and the bundled Docker demo.

Run these commands from this directory with Node.js 22 and npm:

```bash
npm ci
npm run start
```

The interface opens at **http://localhost:5173**. Start a compatible backend on `http://localhost:7050`; `vite.config.ts` forwards `/api` requests to it.

Available development commands:

- `npm run dev`: start the Vite development server.
- `npm run build`: check TypeScript and write the production bundle to `dist/`.
- `npm run lint`: run ESLint.
- `npm run preview`: preview the built frontend locally. Vite inherits the configured API proxy, so the backend must still be running.

A production deployment must provide the `/api` route separately. Model inference is handled by the backend, not by the browser.
