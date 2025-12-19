# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
bun install
```

## Local Development

```bash
bun start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
bun run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```
bun run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for reusable UI components. Components are styled with Tailwind CSS and located in `src/components/ui/`.

### Adding New Components

To add a new shadcn/ui component, find the [component you want](https://ui.shadcn.com/docs/components), and run:

```bash
bunx --bun shadcn@latest add <component-name>
```

For example, to add a card component:

```bash
bunx --bun shadcn@latest add card
```

This will install the component to `src/components/ui/` and add any required dependencies.

### Customizing components

When you run the commands above, component definitions are copied directly into the codebase, so you can freely modify them in `src/components/ui/` to match your design requirements.

In general, you will need to customize the shadcn components to look and behave the way you want. For example, the default shadcn button doesn't have the `cursor-pointer` Tailwind class, so we added that ourselves.

### Using Components

Import components from the `@/components/ui` alias:

```tsx
import { Button } from "@/components/ui/button";

export function MyComponent() {
  return <Button variant="outline">Click me</Button>;
}
```
