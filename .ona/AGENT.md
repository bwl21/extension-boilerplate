# ChurchTools Extension Development Agent

This repository is a Vue 3 + TypeScript boilerplate for building ChurchTools extensions.

## Quick Reference

### Technology Stack
- Vue 3 with Composition API (`<script setup>`)
- TypeScript (strict mode)
- Vite for build tooling
- ChurchTools API client

### Key Files
- `src/services/churchtools.ts` - API client usage examples
- `src/components/common/` - Shared components (BaseCard, ColorPicker, Toast)
- `src/composables/` - Reusable composition functions
- `src/ct-types.d.ts` - ChurchTools type definitions

## Critical Patterns

### API Calls
```typescript
// Parameters go directly, NOT nested in "params"
churchtoolsClient.get('/api/endpoint', { key: 'value' })

// DELETE uses deleteApi(), not delete()
churchtoolsClient.deleteApi('/api/endpoint/123')
```

### Components
```vue
<BaseCard title="Title" :loading="loading" :error="error">
  <button type="button" @click="action">Always use type="button"</button>
</BaseCard>
```

### Module Creation
```bash
mkdir -p src/components/your-module
# Create YourModuleCard.vue and YourModuleAdmin.vue
```

## Development Server

```bash
npm run dev  # Port 5173
```

Use `exec_preview` with port 5173 for preview URLs.

## Deployment

```bash
npm run deploy  # Creates .zip in releases/
```

Upload to ChurchTools Admin > Extensions.
