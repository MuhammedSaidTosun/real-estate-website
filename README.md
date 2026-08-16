# MIRA Estate

![MIRA Estate hero](first-app_01-hello-world/src/assets/hero-bosphorus-villa.png)

A refined real estate discovery experience for exceptional homes across Istanbul, the Aegean, and the Mediterranean. MIRA combines editorial art direction with a practical search and property-detail flow.

## Highlights

- Responsive, editorial landing page with a custom MIRA identity
- Live search by city, district, or listing name
- Property-type filtering and an intentional empty state
- Curated property cards with Turkish price formatting
- Dedicated detail pages with automatic scroll restoration
- Accessible navigation, keyboard-friendly controls, and reduced-motion support
- Local hero artwork with no runtime dependency for the primary visual

## Tech

- Angular 19
- TypeScript 5.7
- Standalone components and Angular Router
- Component-scoped responsive CSS

## Run locally

```bash
npm run setup
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Production build

```bash
npm run build
```

The optimized output is written to `first-app_01-hello-world/dist/first-app`.

## Project structure

```text
first-app_01-hello-world/
├── src/app/        Angular components, routing, and property data
├── src/assets/     Brand and photography assets
└── src/styles.css  Global design tokens and baseline styles
```

---

Designed and built as a portfolio-grade Angular experience.
