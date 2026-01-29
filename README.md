# UI Store - Reusable Section-Based Component Registry + CLI

A production-ready component library and CLI tool for installing beautifully designed, accessible UI sections into React and Next.js projects.

## 🎯 Overview

UI Store provides:
- **15+ production-ready components** across 5 sections (Hero, About, Contact, Booking, Footer)
- **CLI tool** for seamless installation into any React/Next.js project
- **TypeScript-first** with full type safety
- **Variant-based API** to avoid prop explosion
- **Accessible** components with ARIA labels and semantic HTML
- **Responsive** mobile-first design
- **Theme support** (light/dark modes)

## 🚀 Quick Start

### Install a Section
```bash
# Initialize in your project
npx ui-store init

# Add a specific section
npx ui-store add hero

# Add all sections at once
npx ui-store add all
```

### Use in Your App
```tsx
import { HeroCentered } from '@/components/hero';

export default function Home() {
  return (
    <HeroCentered
      variant="centered"
      heading="Welcome to Our Platform"
      subheading="Build amazing things with our tools"
      ctas={[
        { label: 'Get Started', variant: 'primary', href: '/signup' },
        { label: 'Learn More', variant: 'outline', href: '/about' },
      ]}
    />
  );
}
```

## 📦 What's Included

### Sections & Variants

| Section | Variants | Use Case |
|---------|----------|----------|
| **Hero** | Centered, Split, FullWidth | Landing page headers |
| **About** | TextHeavy, ImageFocused, Values | Company information |
| **Contact** | Simple, WithInfo, CTA | Contact forms |
| **Booking** | Minimal, DateFocused, WithInfo | Reservations & scheduling |
| **Footer** | Minimal, MultiColumn, Newsletter | Site-wide navigation |

### Features

✅ **Type-Safe** - Full TypeScript support with discriminated unions
✅ **Accessible** - WCAG compliant with proper ARIA labels
✅ **Responsive** - Mobile-first design with Tailwind CSS
✅ **Validated Forms** - Client-side validation on contact/booking forms
✅ **Theme Support** - Light and dark mode variants
✅ **Zero Dependencies** - Components only require React
✅ **Extensible** - Easy to add new sections and variants

## 🏗️ Project Structure
```
ui-section-registry/
├── packages/
│   ├── registry/              # Component library
│   │   ├── src/
│   │   │   ├── sections/
│   │   │   │   ├── hero/
│   │   │   │   ├── about/
│   │   │   │   ├── contact/
│   │   │   │   ├── booking/
│   │   │   │   └── footer/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── cli/                   # CLI tool
│       ├── src/
│       │   ├── commands/
│       │   │   ├── init.ts
│       │   │   └── add.ts
│       │   ├── utils/
│       │   │   ├── projectDetector.ts
│       │   │   ├── fileManager.ts
│       │   │   └── logger.ts
│       │   └── index.ts
│       └── package.json
│
├── examples/                  # Example implementations
└── README.md
```

## 🛠️ CLI Commands

### `init`
Initialize UI Store in your project.
```bash
npx ui-store init
```

**What it does:**
- Detects project type (React/Next.js)
- Detects TypeScript usage
- Creates components directory
- Creates config file
- Validates dependencies

### `add [section]`
Add a specific section or all sections.
```bash
# Interactive mode - prompts for section selection
npx ui-store add

# Add specific section
npx ui-store add hero

# Add all sections
npx ui-store add all
```

**What it does:**
- Shows variant selection
- Copies component files
- Creates/updates index files
- Updates config file
- Shows usage examples

## 💻 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd ui-section-registry

# Install dependencies
npm install

# Build registry package
cd packages/registry
npm run build
cd ../..

# Build CLI package
cd packages/cli
npm install
npm run build
cd ../..

# Link CLI for local testing
cd packages/cli
npm link
cd ../..
```

### Testing the CLI
```bash
# Create a test Next.js app
cd examples
npx create-next-app@latest test-app --typescript --tailwind --app

# Navigate to test app
cd test-app

# Test CLI commands
ui-store init
ui-store add hero
```

## 🎨 Component Examples

### Hero Section - Centered Variant
```tsx
import { HeroCentered } from '@/components/hero';

<HeroCentered
  variant="centered"
  heading="Welcome to the Future"
  subheading="Innovation starts here"
  alignment="center"
  backgroundImage="/hero-bg.jpg"
  theme="dark"
  ctas={[
    { label: 'Get Started', variant: 'primary', href: '/start' },
  ]}
/>
```

### Contact Section - With Info Variant
```tsx
import { ContactWithInfo } from '@/components/contact';

<ContactWithInfo
  variant="withInfo"
  title="Get in Touch"
  description="We'd love to hear from you"
  companyName="Acme Corp"
  contactInfo={[
    { icon: '📧', label: 'Email', value: 'hello@acme.com', href: 'mailto:hello@acme.com' },
    { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  ]}
  onSubmit={async (data) => {
    // Handle form submission
    console.log(data);
  }}
/>
```

### Booking Section - Date Focused Variant
```tsx
import { BookingDateFocused } from '@/components/booking';

<BookingDateFocused
  variant="dateFocused"
  title="Reserve Your Table"
  guestCountOptions={[1, 2, 3, 4, 5, 6]}
  onSubmit={async (data) => {
    // Handle booking
    console.log(data);
  }}
/>
```

## 🧩 Architecture Decisions

### 1. Monorepo Structure
**Why:** Separates concerns between components (registry) and tooling (CLI) while keeping them in sync.

### 2. TypeScript Discriminated Unions
**Why:** Provides type safety for variant-based APIs. Each variant gets only its relevant props, preventing invalid prop combinations.
```typescript
type HeroProps = HeroCenteredProps | HeroSplitProps | HeroFullWidthProps;
```

### 3. Variant-Based API
**Why:** Avoids prop explosion. Instead of 20 optional props, each variant has a focused set of required/optional props.

**Bad:**
```tsx
<Hero centered split fullWidth imageUrl imagePosition ... />
```

**Good:**
```tsx
<Hero variant="split" imageUrl imagePosition ... />
```

### 4. Registry System
**Why:** Single source of truth for component metadata. CLI imports from registry to stay in sync.

### 5. File Copying vs Package Installation
**Why:** Gives users full control over components. They can modify them as needed without dealing with package updates.

### 6. Tailwind CSS
**Why:** Utility-first styling, easy customization, production-ready with purging, industry standard.

## 🔒 Type Safety Examples

### Exhaustiveness Checking
```typescript
export const Hero: React.FC<HeroProps> = (props) => {
  switch (props.variant) {
    case 'centered':
      return <HeroCentered {...props} />;
    case 'split':
      return <HeroSplit {...props} />;
    case 'fullwidth':
      return <HeroFullWidth {...props} />;
    default:
      const _exhaustive: never = props; // TypeScript error if we miss a variant
      return _exhaustive;
  }
};
```

### Prop Validation
```typescript
// ✅ Valid - TypeScript knows imageUrl is required for split variant
<Hero variant="split" heading="Title" imageUrl="photo.jpg" imageAlt="Hero" />

// ❌ Error - TypeScript catches missing required prop
<Hero variant="split" heading="Title" />

// ❌ Error - TypeScript catches invalid prop for variant
<Hero variant="centered" imageUrl="photo.jpg" />
```

## 📊 Scalability

### Adding a New Section

1. Create section folder: `packages/registry/src/sections/newsection/`
2. Create types: `types.ts`
3. Create variants: `NewSectionVariant1.tsx`, `NewSectionVariant2.tsx`
4. Create index: `index.tsx`
5. Create registry: `registry.ts`
6. Export in main index: `packages/registry/src/index.ts`

**That's it!** The CLI automatically picks it up.

### Adding a New Variant

1. Add type to `types.ts`
2. Create component: `SectionNewVariant.tsx`
3. Add to switch in `index.tsx`
4. Add to registry in `registry.ts`

## 🎯 What This Project Demonstrates

✅ **System Design** - Scalable component architecture
✅ **TypeScript Mastery** - Advanced typing patterns
✅ **Developer Tooling** - Building CLIs with Node.js
✅ **API Design** - Clean, intuitive component APIs
✅ **Monorepo Management** - Multi-package coordination
✅ **Documentation** - Clear technical writing
✅ **Production Thinking** - Accessibility, validation, error handling

## 📝 License

MIT

## 👤 Author

Athul Krishna - [GitHub](https://github.com/athul21eb/ui-store) | [LinkedIn](https://www.linkedin.com/in/athulkrishna-e-b-369053249/)

---

Built as a technical interview project to demonstrate expertise in React, TypeScript, component architecture, and developer tooling.