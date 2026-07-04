# CO — Carbon Monoxide Scientific Report

An interactive, evidence-based scientific report on Carbon Monoxide (CO) — covering properties, sources, health effects, diagnosis, treatment, and prevention.

Built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, **shadcn/ui**, **Framer Motion**, and **Recharts**.

## Features

- **17 comprehensive report sections** with evidence-based scientific content
- **Interactive severity chart** — Recharts bar chart showing symptom progression by COHb level
- **Educational risk calculator** — assess household CO risk factors
- **CO-Hemoglobin binding animation** — visual demonstration of CO's mechanism of toxicity
- **Source risk comparison table** — filterable, expandable table of 17 CO sources
- **Body effects grid** — interactive organ system impact cards
- **DNS recovery timeline** — visual timeline of delayed neurological syndrome phases
- **Myths vs Evidence** — clearly categorized claims (Established / Possible / Unsupported / Myth)
- **Historical case studies** — documented cases of CO causing neurological symptoms
- **Dark/Light mode** with system preference detection
- **Responsive design** — works on mobile, tablet, and desktop
- **Sidebar navigation** with scroll-spy active section tracking
- **Scroll progress indicator**
- **Section search** functionality
- **Glossary & FAQ** with tabbed interface
- **20+ scientific references** from WHO, CDC, NIOSH, and peer-reviewed journals

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| shadcn/ui | Component library |
| Framer Motion | Animations |
| Recharts | Data visualization |
| Lucide React | Icons |
| next-themes | Dark/light mode |

## Deploy to Vercel

1. **Fork or clone** this repository
2. **Import** the project in [Vercel](https://vercel.com/new)
3. Vercel will auto-detect Next.js and configure the build
4. Click **Deploy** — no environment variables needed
5. Your site will be live at `your-project.vercel.app`

### Manual Deployment

```bash
# Install dependencies
npm install
# or: bun install

# Build for production
npm run build
# or: bun run build

# Start production server
npm start
# or: bun run start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page (all sections)
│   ├── globals.css         # Global styles & theme variables
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/
│   ├── co-sidebar.tsx      # Sidebar navigation with scroll-spy
│   ├── scroll-progress.tsx # Scroll progress indicator
│   ├── theme-provider.tsx  # next-themes wrapper
│   ├── sections/
│   │   └── report-sections.tsx  # All 15 report section components
│   ├── interactive/
│   │   └── charts.tsx      # Charts, calculator, animation, tables
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── co-data.ts          # All scientific content data
│   └── utils.ts            # Utility functions
public/
└── robots.txt              # Search engine directives
```

## Content Sources

All medical and scientific content is based on:
- World Health Organization (WHO) guidelines
- Centers for Disease Control and Prevention (CDC)
- National Institute for Occupational Safety and Health (NIOSH)
- Peer-reviewed journals (NEJM, JAMA, AJRCCM, etc.)
- Systematic reviews and meta-analyses

## Disclaimer

This report is for **educational and informational purposes only**. It does not constitute medical advice. If you suspect CO poisoning, immediately move to fresh air and contact emergency services (911).

## License

See [LICENSE](LICENSE) for details.