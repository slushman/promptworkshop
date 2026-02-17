# promptwork.shop

A clean, minimalistic website for AI workshop services built with Astro and Tailwind CSS.

## Features

- **One-Pager Homepage**: All essential information on a single, scrollable page
- **Industry-Specific Pages**: Dedicated pages for different industries (starting with Education)
- **Content Collections**: Type-safe content management with Astro's Content Collections
- **Responsive Design**: Mobile-first design that works beautifully on all devices
- **SEO Optimized**: Built-in sitemap generation, meta tags, and Open Graph support
- **Performance**: Zero JavaScript by default, fast loading times
- **Clean Design**: Minimalistic aesthetic with professional blue color palette

## Project Structure

```
/
├── public/
│   └── robots.txt              # SEO robots file
├── src/
│   ├── components/
│   │   ├── AboutSection.astro        # Reusable about section
│   │   ├── BookingButton.astro       # CTA button component
│   │   ├── Footer.astro              # Site footer
│   │   ├── Header.astro              # Site header (logo + CTA)
│   │   ├── Hero.astro                # Homepage hero
│   │   └── IndustryHero.astro        # Industry page hero
│   ├── content/
│   │   ├── config.ts                 # Content Collections schema
│   │   └── industries/
│   │       └── education.md          # Education industry content
│   ├── layouts/
│   │   ├── BaseLayout.astro          # Base layout with SEO
│   │   └── IndustryLayout.astro      # Industry page layout
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   └── education.astro           # Education industry page
│   └── styles/
│       └── global.css                # Global styles & Tailwind
├── astro.config.mjs                  # Astro configuration
├── tailwind.config.mjs               # Tailwind configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit `http://localhost:4321`

### Build for Production

```bash
npm run build
npm run preview
```

## Customization Guide

### 1. Update Site Content

#### Homepage Content
Edit `src/pages/index.astro` to customize:
- Hero headline and subheadline
- Problem/Solution section
- How It Works steps
- Industries served
- About section (or edit `src/components/AboutSection.astro`)

#### Industry Pages
Add new industry pages by:
1. Creating a new markdown file in `src/content/industries/` (e.g., `small-business.md`)
2. Creating a new page in `src/pages/` (e.g., `small-business.astro`)
3. Use the `education.astro` file as a template

### 2. Configure Calendly Integration

To enable actual booking with Calendly:

1. Open `src/components/ContactSection.astro`
2. Replace the `calendlyUrl` default value with your actual Calendly link
3. Uncomment the Calendly embed code (lines marked with `<!-- Alternative: Uncomment below... -->`)
4. Remove or comment out the placeholder content

### 3. Update Brand Colors

Edit `tailwind.config.mjs` to customize the color palette:

```javascript
colors: {
  brand: {
    primary: {
      DEFAULT: '#YOUR_COLOR', // Update to your brand color
      // ... other shades
    }
  }
}
```

### 4. Update Contact Information

- Email: Search for `hello@promptwork.shop` and replace with your email
- Logo/Brand name: Edit `src/components/Header.astro`

### 5. Add Your Logo

Replace the text logo in `src/components/Header.astro` with an image:

```astro
<a href="/" class="...">
  <img src="/logo.svg" alt="Your Company" class="h-8" />
</a>
```

Place your logo file in the `public/` directory.

### 6. Update SEO Meta Tags

Edit the default values in `src/layouts/BaseLayout.astro`:
- Site title
- Meta description
- Open Graph image (add your image to `public/` directory)

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add your custom domain in Netlify settings

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Vercel will auto-detect Astro settings
4. Add your custom domain in Vercel settings

## Updating Content

### Adding a New Industry Page

1. **Create content file**: `src/content/industries/your-industry.md`

```markdown
---
title: "AI Workshops for Your Industry"
industry: "your-industry"
headline: "Your Industry Headline"
# ... other fields (see education.md as reference)
---

Your industry-specific content here...
```

2. **Create page file**: `src/pages/your-industry.astro`

```astro
---
import { getEntry } from 'astro:content';
import IndustryLayout from '../layouts/IndustryLayout.astro';

const entry = await getEntry('industries', 'your-industry');
// ... rest follows education.astro pattern
---
```

3. **Update homepage**: Add your new industry to the "Industries Served" section in `src/pages/index.astro`

## Development Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Language**: TypeScript
- **Icons**: Heroicons (inline SVG)
- **Fonts**: Inter (Google Fonts)
- **Integrations**:
  - @astrojs/sitemap
  - @tailwindcss/vite

## Performance

This site is optimized for performance:
- ✅ Zero JavaScript by default
- ✅ Optimized images with Astro's Image component
- ✅ Minimal CSS (Tailwind purges unused styles)
- ✅ Static site generation for fast loading
- ✅ Target: 95+ Lighthouse scores

## Support

For questions or issues:
- Check the [Astro documentation](https://docs.astro.build)
- Check the [Tailwind CSS documentation](https://tailwindcss.com/docs)

## License

This project is proprietary and confidential.
