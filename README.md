# SportyClaw - Landing Page Template

A modern, high-performance landing page template for SportyClaw - an AI-powered sports betting prediction bot. Built with Next.js, TypeScript, and cutting-edge UI components.

## 🎯 Overview

SportyClaw is a sleek landing page designed to showcase a Telegram bot that delivers data-driven sports betting predictions. The template features smooth animations, interactive elements, and a professional design optimized for conversion.

### Key Features

- **Hero Section** - Stunning hero with interactive spotlight effects and glow orbs
- **How It Works** - Step-by-step guide showing the bot workflow (Join → Receive → Bet)
- **Value Propositions** - Highlights key benefits like data-driven predictions, fast delivery, and transparent results
- **Telegram Integration** - Direct link to join the Telegram community
- **Testimonials** - Social proof section for user reviews
- **Performance Metrics** - Display statistics and achievements
- **Responsive Design** - Mobile-first approach with full responsiveness
- **Visual Effects** - Starfield background, ambient lighting, cursor glow, and smooth animations

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) - High-quality, accessible component library
- **Forms**: [@hookform/resolvers](https://react-hook-form.com/) - Efficient form management
- **Analytics**: [@vercel/analytics](https://vercel.com/analytics) - Built-in analytics
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Theme**: [Next Themes](https://github.com/pacocoursey/next-themes) - Dark/light mode support

## 📁 Project Structure

```
.
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with theme provider
│   └── page.tsx                 # Home page (landing page)
│
├── components/                   # React components
│   ├── navbar.tsx               # Navigation bar
│   ├── hero.tsx                 # Hero section with spotlight effects
│   ├── how-it-works.tsx         # 3-step process section
│   ├── why-sporty-claw.tsx      # Value propositions section
│   ├── telegram-section.tsx     # Telegram CTA section
│   ├── testimonials.tsx         # User testimonials
│   ├── performance.tsx          # Statistics and metrics
│   ├── final-cta.tsx            # Final call-to-action
│   ├── footer.tsx               # Footer section
│   ├── cursor-glow.tsx          # Interactive cursor effect
│   ├── starfield.tsx            # Animated starfield background
│   ├── ambient-lights.tsx       # Ambient light effects
│   ├── glow-orbs.tsx            # Glowing orb animations
│   ├── theme-provider.tsx       # Theme configuration
│   └── ui/                      # Shadcn UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       └── ... (40+ UI components)
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notifications
│
├── lib/                          # Utility functions
│   └── utils.ts                 # Helper utilities (cn, formatters, etc.)
│
├── public/                       # Static assets
│
├── styles/                       # CSS files
│   └── globals.css
│
├── next.config.mjs              # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── components.json              # Shadcn UI config
└── package.json                 # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **pnpm** (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Sportyclaw
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the landing page.

## 📝 Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## 🎨 Customization

### Update Project Information

Edit [app/page.tsx](app/page.tsx) to modify the page structure or add/remove sections.

### Modify Component Content

- **Hero**: [components/hero.tsx](components/hero.tsx) - Update headline and CTA text
- **How It Works**: [components/how-it-works.tsx](components/how-it-works.tsx) - Modify the 3-step process
- **Value Props**: [components/why-sporty-claw.tsx](components/why-sporty-claw.tsx) - Update key benefits
- **Testimonials**: [components/testimonials.tsx](components/testimonials.tsx) - Add user reviews
- **Statistics**: [components/performance.tsx](components/performance.tsx) - Update metrics
- **Footer**: [components/footer.tsx](components/footer.tsx) - Add links and info

### Tailwind CSS Configuration

Customize colors, fonts, and responsive breakpoints in [tailwind.config.ts](tailwind.config.ts):

```typescript
theme: {
  colors: {
    primary: '#...',
    secondary: '#...',
    // ... more colors
  },
  font: {
    // Custom fonts
  }
}
```

### Theme Customization

The project supports light/dark mode. Configure it in [components/theme-provider.tsx](components/theme-provider.tsx).

### Visual Effects

- **Cursor Glow**: [components/cursor-glow.tsx](components/cursor-glow.tsx)
- **Starfield**: [components/starfield.tsx](components/starfield.tsx)
- **Ambient Lights**: [components/ambient-lights.tsx](components/ambient-lights.tsx)
- **Glow Orbs**: [components/glow-orbs.tsx](components/glow-orbs.tsx)

## 📱 Responsive Design

The template is fully responsive and mobile-optimized:
- Mobile-first CSS approach
- Responsive grid and flex layouts
- Mobile detection via `use-mobile` hook
- Optimized navigation on smaller screens

## 🔍 SEO & Analytics

- Vercel Analytics integration ready ([components/theme-provider.tsx](components/theme-provider.tsx))
- Meta tags optimizable in [app/layout.tsx](app/layout.tsx)
- Open Graph support for social sharing

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click

```bash
# Or use Vercel CLI
vercel
```

### Deploy to Other Platforms

The project can be deployed to any Node.js hosting:

```bash
pnpm build
pnpm start
```

Then deploy the `.next` folder and `package.json` to your hosting service.

### Environment Variables

Create a `.env.local` file if needed (currently uses build-time configuration):

```bash
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 🎯 Key Sections Breakdown

### Page Sections (in order)

1. **Starfield + Ambient Lights** - Background effects
2. **Navbar** - Navigation with branding
3. **Hero** - Main headline and call-to-action
4. **How It Works** - 3-step process introduction
5. **Why SportyClaw** - 4 key value propositions
6. **Telegram Section** - Direct bot link
7. **Testimonials** - User social proof
8. **Performance** - Statistics and metrics
9. **Final CTA** - Last conversion opportunity
10. **Footer** - Links and contact info

## 🔧 Development Tips

### Adding New Components

1. Create a new file in `components/`
2. Use TypeScript with proper types
3. Import in [app/page.tsx](app/page.tsx)
4. Add to the main export

### Modifying Shadcn UI Components

Update components in `components/ui/`:

```bash
# Add new Shadcn component
npx shadcn-ui@latest add componentname
```

### Performance Optimization

- Images use Next.js Image component (already configured)
- CSS is minified and optimized via Tailwind
- No external font downloads by default
- Analytics integration is minimal

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Docs](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## ⚙️ Configuration Files

- **next.config.mjs** - Next.js settings (ignores build errors, unoptimized images)
- **tsconfig.json** - TypeScript compiler options
- **tailwind.config.ts** - Tailwind CSS theme and plugins
- **postcss.config.mjs** - PostCSS configuration for Tailwind
- **components.json** - Shadcn UI component configuration

## 📄 License

This is a template project. Feel free to modify and use it for your own projects.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

For issues or questions, please check the project repository or create an issue.

---

**Built with ❤️ for SportyClaw** | Powered by Next.js + React + Tailwind CSS
