# Generative Models UI

[![UI CI](https://github.com/Westerbay/ui-for-generative-models/actions/workflows/ci.yml/badge.svg)](https://github.com/Westerbay/ui-for-generative-models/actions/workflows/ci.yml)

A React, TypeScript, and Vite interface for watching image generation progress through successive diffusion steps.

The model runs on a separate backend. This frontend is used by [StyleGAN & Cheap DiT](https://github.com/Westerbay/StyleGan-and-Cheap-DiT) and was also developed for [DiT-B Image](https://gitlab.com/Westerbay/dit-b-image).

## What it does

- Generate a batch of one to four images.
- Update the image previews after each denoising step.
- Show progress and stop requesting further steps with Cancel.
- Download the latest previews as individual PNG files, including during generation.

Generation proceeds automatically after selecting Generate. The interface does not run a model in the browser or accept text prompts.

## Run locally

Requirements: Node.js 22, npm, and a compatible backend listening on `http://localhost:7050`.

For the reference backend, follow the [StyleGAN & Cheap DiT installation instructions](https://github.com/Westerbay/StyleGan-and-Cheap-DiT#local-installation), then run `python api_ldm.py` from that repository's root.

In another terminal:

```bash
git clone git@github.com:Westerbay/ui-for-generative-models.git
cd ui-for-generative-models/application
npm ci
npm run start
```

Open **http://localhost:5173**. Vite forwards `/api` requests to `http://localhost:7050` and removes the `/api` prefix. Change [`application/vite.config.ts`](application/vite.config.ts) if your backend uses another address.

For the bundled frontend, backend, and pretrained models, use the [StyleGAN & Cheap DiT Docker demo](https://github.com/Westerbay/StyleGan-and-Cheap-DiT#try-the-docker-demo).

## Backend contract

The client sends these requests through the Vite proxy:

| Request | Reference backend response |
| --- | --- |
| `GET /api/start?batch_size=1` | JSON containing `time_steps` and `batch_size` |
| `GET /api/step` | JSON containing `step` and an `images` array of base64-encoded PNG strings, or a `message` when generation finishes |

After a successful start response, the client requests one step at a time until it receives a response containing `message` or the user selects Cancel. The PNG strings should contain the encoded image data without a `data:` prefix; the client adds that prefix.

Current behavior to account for when using another backend:

- Progress is fixed at **1,000 steps** in `application/src/api/LDMClient.ts`. The client does not read `time_steps` from the start response.
- Cancel stops the request loop after any request already in flight completes. It does not send a server-side cancellation request.
- The reference backend shares one in-memory generation session across clients. This interface is intended for local demonstrations.

## Development

From the repository root:

```bash
cd application
npm ci
npm run dev
npm run build
npm run lint
```

`npm run build` checks TypeScript and writes the Vite production bundle to `application/dist/`. The configured Vite proxy is not part of the static bundle; serving that bundle through another web server requires an equivalent `/api` backend route or reverse proxy.

GitHub Actions installs the locked dependencies and runs the TypeScript and Vite production build on pushes and pull requests. Linting is available locally but is not part of the current CI workflow.

## Repository layout

```text
application/src/api/           Generation client and progress state
application/src/ui/generate/   Batch, generation, cancellation, and download controls
application/src/ui/images/     Image previews
application/src/ui/progress/   Progress bar
application/vite.config.ts    Development API proxy
.github/workflows/ci.yml       Node.js 22 build check
```

The project history was migrated from GitLab without rewriting commits. The frontend remains in its own repository; the model container pins a frontend commit for reproducible source selection.
