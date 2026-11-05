# daytraderskill-site

Independent English static guide for the open-source **Claude Day Trader Skill** pack.

- Site origin: https://daytraderskill.com
- Upstream (MIT, not affiliated): https://github.com/Jakeschincariol/day-trader-skill
- Stack: Next.js 14 `output: 'export'` → `out/` for Cloudflare Pages (production branch `main`)

## Compliance

- Not financial advice
- Paper trading is the default framing
- No profit promises / no trade-on-your-behalf copy
- This repo is **not** the official upstream project

## Develop

```bash
npm install
npm run build   # writes out/
npx serve out
```

## Note

Do not commit real AdSense `ca-pub` IDs until verified. `public/ads.txt` is a commented scaffold only.
