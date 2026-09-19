# Generative Models UI

[![UI CI](https://github.com/Westerbay/ui-for-generative-models/actions/workflows/ci.yml/badge.svg)](https://github.com/Westerbay/ui-for-generative-models/actions/workflows/ci.yml)

A lightweight React, TypeScript, and Vite interface for visualizing image generation one diffusion step at a time.

This frontend requires a compatible backend. It is used by [StyleGAN & Cheap DiT](https://github.com/Westerbay/StyleGan-and-Cheap-DiT) and was also developed for [DiT-B Image](https://gitlab.com/Westerbay/dit-b-image).

## Run locally

Requirements: Node.js 22, npm, and a backend listening on `http://localhost:7050`.

```bash
git clone git@github.com:Westerbay/ui-for-generative-models.git
cd ui-for-generative-models/application
npm ci
npm run start
```

Open **http://localhost:5173**. Vite proxies `/api` to port 7050; change `application/vite.config.ts` if your backend uses another address.

For the bundled frontend, backend, and pretrained models, use the [StyleGAN & Cheap DiT Docker demo](https://github.com/Westerbay/StyleGan-and-Cheap-DiT#try-the-docker-demo).

## Backend contract

| Request | Expected response |
| --- | --- |
| `GET /api/start?batch_size=1` | JSON containing `time_steps` and `batch_size` |
| `GET /api/step` | JSON containing `step` and base64 PNG `images`, or a completion message |

The reference backend shares one generation session across clients. This interface is intended for local demonstrations.

## Development

```bash
cd application
npm ci
npm run dev
npm run build
```

GitHub Actions installs the locked dependencies and runs the TypeScript and Vite production build on pushes and pull requests. `npm run lint` is available for additional static checks.

The project history was migrated from GitLab without rewriting commits. The frontend remains in its own repository; the model container pins a frontend commit for reproducible source selection.
