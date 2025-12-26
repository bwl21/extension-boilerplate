<template>
  <div id="app">
    <div class="container">
      <h1>ChurchTools Extension Boilerplate</h1>
      <p>Welcome {{ user?.firstName }} {{ user?.lastName }}!</p>
      
      <!-- Example usage of boilerplate components -->
      <div class="components-demo">
        <BaseCard title="Example Card" :loading="loading">
          <p>This is an example of the BaseCard component from the boilerplate.</p>
          <button @click="showExampleToast" type="button" class="btn btn-primary">
            Show Toast Example
          </button>
        </BaseCard>

        <BaseCard title="ColorPicker Example" class="mt-3">
          <div class="mb-3">
            <label class="form-label">Select a color:</label>
            <ColorPicker v-model="selectedColor" />
          </div>
          <p v-if="selectedColor">Selected color: {{ selectedColor }}</p>
        </BaseCard>
      </div>
    </div>

    <!-- Toast container -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseCard from './components/common/BaseCard.vue'
import ColorPicker from './components/common/ColorPicker.vue'
import Toast from './components/common/Toast.vue'
import { useToast } from './composables/useToast'
import { churchtoolsClient } from './services/churchtools'
import type { Person } from './ct-types'

const { showToast } = useToast()
const loading = ref(false)
const user = ref<Person | null>(null)
const selectedColor = ref('')

const showExampleToast = () => {
  showToast('Success!', 'This is an example toast notification from the boilerplate.', 'success')
}

onMounted(async () => {
  try {
    loading.value = true
    user.value = await churchtoolsClient.get<Person>('/whoami')
  } catch (error) {
    console.error('Failed to load user:', error)
    showToast('Error', 'Failed to load user information', 'error')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.components-demo {
  margin-top: 20px;
}

.mt-3 {
  margin-top: 1rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}
</style>