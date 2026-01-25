# Healing Hands Physical Therapy Website

A modern, SEO-optimized website for Healing Hands Physical Therapy Associates LLC, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern Design**: Clean, professional healthcare aesthetic with smooth animations
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ⚡ **Optimized Performance**: Fast load times with Next.js static generation
- 🔍 **SEO Ready**: Complete meta tags, structured data, sitemap, and robots.txt
- ♿ **Accessible**: ARIA labels, keyboard navigation, and proper color contrast
- 📝 **Form Validation**: Contact form with client-side validation using Zod

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx             # Home page
│   ├── about/page.tsx       # About page
│   ├── services/page.tsx    # Services page
│   ├── contact/page.tsx     # Contact page
│   ├── sitemap.ts           # Dynamic sitemap
│   └── robots.ts            # Robots.txt config
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Navigation bar
│   │   └── Footer.tsx       # Footer
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── WhyUsSection.tsx
│   │   ├── ServicesPreviewSection.tsx
│   │   ├── AboutPreviewSection.tsx
│   │   ├── CTASection.tsx
│   │   └── ...
│   └── ui/
│       ├── Button.tsx
│       ├── Section.tsx
│       └── ServiceCard.tsx
├── lib/
│   ├── config.ts            # Site configuration
│   └── utils.ts             # Utility functions
└── public/                   # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd healing-hands-mipt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Configuration

### Site Configuration

All site-wide settings (contact info, services, navigation) are centralized in `lib/config.ts`. Update this file to change:

- Company name and description
- Contact information (phone, email, address)
- Business hours
- Social media links
- Services offered
- Navigation structure

### Styling

The design system is defined in `app/globals.css`:

- Color palette (primary teal, secondary sage, accent amber)
- Typography scale
- Utility classes
- Custom animations

## Deployment

This site is ready for deployment on any platform that supports Next.js:

- **Vercel** (recommended): `vercel`
- **Netlify**: `netlify deploy`
- **Docker**: Build and run the container

### Environment Variables

No environment variables are required for basic deployment. For form submissions in production, you'll need to configure your form handling backend.

## Customization

### Updating Content

1. **Contact Information**: Edit `lib/config.ts`
2. **Services**: Edit the `services` array in `lib/config.ts`
3. **Colors**: Modify CSS custom properties in `app/globals.css`
4. **Images**: Add to `public/` directory and reference in components

### Adding Pages

1. Create a new directory in `app/` (e.g., `app/new-page/`)
2. Add a `page.tsx` file with your content
3. Update navigation in `lib/config.ts`

## License

All rights reserved. This website is property of Healing Hands Physical Therapy Associates LLC.
