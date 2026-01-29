# UI Store

A CLI tool to easily add pre-built UI sections to your React/Next.js projects.

## Installation

You don't need to install the package globally. Use `npx` to run commands directly:

```bash
npx ui-store init
```

## Commands

### Initialize

Set up UI Store in your project:

```bash
npx ui-store init
```

This will:

- Detect your project type (React/Next.js)
- Create a `ui-store.config.json` configuration file
- Ensure the components directory exists
- Check for required dependencies

### Add Sections

Add UI sections to your project:

```bash
# Add a specific section
npx ui-store add hero

# Add all sections
npx ui-store add all
```

Available sections:

- **hero** - Hero sections for landing pages (centered, split, fullWidth)
- **about** - About sections (textHeavy, imageFocused, values)
- **contact** - Contact sections with forms (simple, withInfo, cta)
- **booking** - Booking and reservation sections (minimal, dateFocused, withInfo)
- **footer** - Footer sections (minimal, multiColumn, newsletter)

## Usage Example

After adding sections, import and use them in your pages:

```typescript
import { HeroCentered } from '@/components/hero';

export default function Home() {
  return (
    <HeroCentered
      heading="Welcome to My Site"
      subheading="Get started today"
    />
  );
}
```

## Project Structure

This is a monorepo containing:

- **packages/cli** - The CLI tool
- **packages/registry** - Component registry and templates

## Development

To build the CLI:

```bash
cd packages/cli
npm run build
```

## License

MIT
