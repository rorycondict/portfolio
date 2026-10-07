# rorycondict.com

yeah it's my portfolio site. that's about it.

## stack

- **[TanStack Start](https://tanstack.com/start)**
- **[React 19](https://react.dev)** and **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind CSS v4](https://tailwindcss.com)**
- **[Vite](https://vite.dev)**
- **[Biome](https://biomejs.dev)**
- **[Bun](https://bun.sh)**
- **[Cloudflare Workers](https://workers.cloudflare.com)** (deployed with [Wrangler](https://developers.cloudflare.com/workers/wrangler/))
- **[Resend](https://resend.com)** for the contact form
- **[Turnstile](https://developers.cloudflare.com/turnstile/)** and [Workers rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/) to keep spam out of it

## secrets

| name                      | where                                   | notes                                  |
| ------------------------- | --------------------------------------- | -------------------------------------- |
| `RESEND_API_KEY`          | `.dev.vars` / `wrangler secret put`     |                                        |
| `TURNSTILE_SECRET_KEY`    | `.dev.vars` / `wrangler secret put`     |                                        |
| `VITE_TURNSTILE_SITE_KEY` | `.env.local` / GitHub Actions variable  | public, baked in at build time         |

locally, Cloudflare's [test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) work: the site key falls back to the always-pass one if unset.

## scripts

```sh
bun dev              # dev server on :3000
bun build            # production build
bun preview          # serve the build locally
bun check            # biome lint + format
bun run wrangler dev # final preview (must build first)
```

automatic deploy on PR merge via GitHub Actions
