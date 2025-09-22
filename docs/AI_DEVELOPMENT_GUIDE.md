# AI-Assisted ChurchTools Extension Development Guide

This guide provides comprehensive instructions for developing ChurchTools extensions with AI assistance using this boilerplate.

## Getting Started

### 1. Initial Setup
```bash
# Clone this boilerplate
git clone https://github.com/bwl21/extension-boilerplate.git your-extension-name
cd your-extension-name

# Install dependencies
npm install

# Create environment file
cp .env-example .env
# Edit .env with your ChurchTools instance URL and extension key
```

### 2. AI Assistant Setup
When starting a new development session with an AI assistant:

1. **Share the context file**: Always reference `.ona-context.md`
2. **Provide project overview**: Explain what your extension should do
3. **Set expectations**: Mention you're using this boilerplate for ChurchTools

**Example initial prompt:**
```
I'm developing a ChurchTools extension using this boilerplate. Please read the .ona-context.md file to understand the project structure and API patterns. 

My extension should [describe your extension's purpose].

Let's start by [specific first task].
```

## Development Workflow

### Phase 1: Planning and Architecture
1. **Define requirements** with AI assistance
2. **Plan component structure** based on boilerplate patterns
3. **Identify API endpoints** needed from ChurchTools
4. **Create development roadmap**

**AI Prompt Template:**
```
Help me plan a ChurchTools extension for [purpose]. Based on the boilerplate structure, suggest:
- Component architecture
- Required API endpoints
- Data flow patterns
- User interface design
```

### Phase 2: Component Development
1. **Start with BaseCard** for dashboard components
2. **Use provided composables** for common functionality
3. **Follow TypeScript patterns** from existing code
4. **Implement error handling** consistently

**AI Prompt Template:**
```
Create a new [ComponentName] component that:
- Extends BaseCard from the boilerplate
- Implements [specific functionality]
- Uses ChurchTools API endpoint [endpoint]
- Follows the existing code patterns
- Includes proper TypeScript types
```

### Phase 3: Integration and Testing
1. **Test with development server** using `exec_preview`
2. **Verify ChurchTools API integration**
3. **Check responsive design**
4. **Validate error handling**

**AI Prompt Template:**
```
Help me test and debug this component:
[paste component code]

Please check for:
- ChurchTools API usage correctness
- Error handling completeness
- TypeScript type safety
- Vue 3 best practices
```

## Common Development Patterns

### Creating Dashboard Cards
```typescript
// Use this pattern for dashboard cards
<template>
  <BaseCard
    title="Your Card Title"
    :loading="loading"
    :error="error"
  >
    <!-- Your content here -->
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '../common/BaseCard.vue'
import { ref } from 'vue'

const loading = ref(false)
const error = ref<string | null>(null)
</script>
```

### API Integration
```typescript
// Use this pattern for API calls
import { churchtoolsClient } from '@/services/churchtools'

try {
  loading.value = true
  const response = await churchtoolsClient.get('/api/endpoint', {
    param1: 'value1',
    param2: 'value2'
  })
  // Handle response
} catch (err) {
  error.value = 'Error message'
  console.error('API Error:', err)
} finally {
  loading.value = false
}
```

### Using Composables
```typescript
// Use provided composables for common functionality
import { useToast } from '@/composables/useToast'

const { showToast } = useToast()

// Show success message
showToast('Success!', 'Operation completed successfully', 'success')
```

## AI Prompt Library

### Code Generation
```
Generate a Vue 3 component for [feature] that:
- Uses TypeScript with strict typing
- Follows the boilerplate patterns
- Integrates with ChurchTools API
- Includes error handling and loading states
- Is responsive and accessible
```

### Code Review
```
Review this code for ChurchTools extension best practices:
[paste code]

Check for:
- Correct ChurchTools API usage
- Vue 3 Composition API patterns
- TypeScript type safety
- Error handling
- Performance considerations
```

### Debugging
```
I'm getting this error: [error message]

Context:
- Component: [component name]
- ChurchTools API endpoint: [endpoint]
- Expected behavior: [description]
- Actual behavior: [description]

Please help debug using ChurchTools extension patterns.
```

### Documentation
```
Create documentation for this component:
[paste component code]

Include:
- Purpose and functionality
- Props and events
- Usage examples
- Integration notes
- Common issues
```

## Best Practices for AI Collaboration

### 1. Be Specific
- Provide exact requirements and constraints
- Reference existing patterns and components
- Specify ChurchTools API endpoints and data structures

### 2. Iterative Development
- Start with basic functionality
- Add features incrementally
- Test each change before proceeding

### 3. Context Sharing
- Always reference the `.ona-context.md` file
- Share relevant existing code for patterns
- Provide error messages and logs when debugging

### 4. Code Quality
- Request TypeScript types for all data
- Ask for error handling in all API calls
- Ensure responsive design considerations

## Common Pitfalls and Solutions

### ChurchTools API Issues
**Problem**: API calls failing with unexpected errors
**Solution**: Check `.ona-context.md` for correct API patterns

**Problem**: Data not loading correctly
**Solution**: Verify API endpoint and parameter structure

### Vue 3 Integration Issues
**Problem**: Component not rendering correctly
**Solution**: Check import paths and component registration

**Problem**: Reactivity not working
**Solution**: Ensure proper use of `ref()` and `computed()`

### TypeScript Errors
**Problem**: Type errors in development
**Solution**: Use proper interfaces and type definitions

**Problem**: Build failing due to type issues
**Solution**: Check `src/ct-types.d.ts` for ChurchTools types

## Testing Strategy

### Manual Testing
1. **Development server**: Use `npm run dev` with `exec_preview`
2. **Browser testing**: Check console for errors
3. **Responsive testing**: Test on different screen sizes
4. **ChurchTools integration**: Test in actual ChurchTools environment

### AI-Assisted Testing
```
Create a testing checklist for this component:
[paste component code]

Include:
- Functionality tests
- Error scenarios
- Edge cases
- Integration points
```

## Deployment Process

### 1. Pre-deployment
```bash
# Format code
npm run prettier:write

# Build extension
npm run build

# Package for deployment
npm run deploy
```

### 2. ChurchTools Upload
1. Go to ChurchTools Admin > Extensions
2. Upload the generated `.zip` file
3. Configure extension settings
4. Test in production environment

### 3. AI-Assisted Deployment
```
Help me prepare this extension for deployment:
- Review code for production readiness
- Check for security issues
- Verify build configuration
- Create deployment checklist
```

## Advanced Topics

### Custom Composables
Create reusable logic with composables following the existing patterns in `src/composables/`.

### Complex API Integration
For complex API workflows, study the patterns in `src/services/churchtools.ts`.

### Performance Optimization
Use AI assistance to optimize components for large datasets and complex operations.

### Accessibility
Ensure all components meet accessibility standards with AI review and suggestions.

---

**Remember**: This boilerplate provides a solid foundation, but every extension is unique. Use AI assistance to adapt patterns to your specific needs while maintaining consistency with ChurchTools standards.