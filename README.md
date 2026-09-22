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

## scripts

```sh
bun dev              # dev server on :3000
bun build            # production build
bun preview          # serve the build locally
bun check            # biome lint + format
bun run wrangler dev # final preview (must build first)
```

automatic deploy on PR merge via GitHub Actions
