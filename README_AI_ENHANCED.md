# AI-Enhanced ChurchTools Extension Boilerplate

This enhanced version of the ChurchTools extension boilerplate is specifically designed for AI-assisted development with tools like Ona and other AI coding assistants.

## 🚀 Quick Start for AI Development

### 1. Initial Setup
```bash
git clone https://github.com/bwl21/extension-boilerplate.git -b feature/ai-development-support your-extension
cd your-extension
npm install
cp .env-example .env
# Edit .env with your ChurchTools instance details
```

### 2. AI Assistant Integration
When working with AI assistants, always start by sharing these key files:
- `.ona-context.md` - Complete development context and API patterns
- `.ona-commands.md` - Pre-defined commands for common tasks
- `docs/AI_DEVELOPMENT_GUIDE.md` - Comprehensive AI development guide

### 3. Development Server
```bash
npm run dev
# Use exec_preview with port 5173 for AI assistants
```

## 🎯 Key Features for AI Development

### Comprehensive Context Documentation
- **`.ona-context.md`**: Critical ChurchTools API patterns, common pitfalls, and development guidelines
- **Session protocols**: Real development session documentation with lessons learned
- **API documentation**: Correct usage patterns for ChurchTools client

### Ready-to-Use Components
- **BaseCard**: Consistent card layout for dashboard components
- **ColorPicker**: ChurchTools-compatible color selection
- **Toast**: Modern notification system
- **Composables**: Reusable logic for tables, search, sorting

### AI-Optimized Structure
```
src/
├── components/
│   ├── common/           # Shared components ready for extension
│   └── [your-modules]/   # Feature-specific components
├── composables/          # Reusable Vue composition functions
├── services/            # ChurchTools API integration
└── types/              # TypeScript definitions
```

## 🤖 AI Development Workflow

### Phase 1: Planning
Use AI to analyze requirements and plan architecture:
```
I want to create a ChurchTools extension for [purpose]. 
Based on the boilerplate structure in .ona-context.md, help me plan:
- Component architecture
- Required ChurchTools API endpoints  
- Data flow patterns
```

### Phase 2: Implementation
Leverage provided components and patterns:
```
Create a new component that extends BaseCard and implements [functionality].
Use the patterns from .ona-context.md and follow the existing code style.
```

### Phase 3: Integration
Test and refine with AI assistance:
```
Help me debug this ChurchTools API integration issue:
[error details]
Reference the API patterns in .ona-context.md for correct usage.
```

## 📚 Critical API Patterns

### ChurchTools Client Usage
```typescript
// ✅ Correct
churchtoolsClient.get('/api/endpoint', { param1: 'value1' })

// ❌ Wrong  
churchtoolsClient.get('/api/endpoint', { params: { param1: 'value1' } })
```

### HTTP Methods
```typescript
churchtoolsClient.get()       // GET
churchtoolsClient.post()      // POST
churchtoolsClient.put()       // PUT
churchtoolsClient.deleteApi() // DELETE (NOT .delete()!)
churchtoolsClient.patch()     // PATCH
```

## 🛠️ Available Tools

### Components
- `BaseCard` - Consistent dashboard card layout
- `ColorPicker` - ChurchTools color selection
- `Toast` - Notification system

### Composables
- `useToast` - Toast notifications
- `useTableSearch` - Table search functionality
- `useTableSorting` - Table sorting with custom comparators
- `useTableResize` - Responsive table handling

### Services
- `churchtools.ts` - ChurchTools API integration with examples

## 🎨 Example Usage

```vue
<template>
  <BaseCard title="My Extension" :loading="loading" :error="error">
    <p>Extension content here</p>
    <ColorPicker v-model="selectedColor" />
    <button @click="showSuccess" type="button">Show Toast</button>
  </BaseCard>
  <Toast />
</template>

<script setup lang="ts">
import BaseCard from './components/common/BaseCard.vue'
import ColorPicker from './components/common/ColorPicker.vue'
import Toast from './components/common/Toast.vue'
import { useToast } from './composables/useToast'

const { showToast } = useToast()
const showSuccess = () => showToast('Success!', 'Operation completed', 'success')
</script>
```

## 📖 Documentation

- **`.ona-context.md`** - Complete development context
- **`.ona-commands.md`** - Common development commands
- **`docs/AI_DEVELOPMENT_GUIDE.md`** - Comprehensive AI development guide

## 🚀 Deployment

```bash
npm run build      # Build for production
npm run deploy     # Package for ChurchTools
```

Upload the generated `.zip` file to ChurchTools Admin > Extensions.

## 🤝 AI Collaboration Tips

1. **Always reference context**: Share `.ona-context.md` with AI assistants
2. **Use specific prompts**: Reference existing patterns and components
3. **Iterative development**: Build features incrementally
4. **Test frequently**: Use development server with `exec_preview`
5. **Follow patterns**: Maintain consistency with boilerplate structure

---

**This boilerplate accelerates ChurchTools extension development through AI assistance while maintaining code quality and consistency.**