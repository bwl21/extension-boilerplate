<template>
  <div class="flyer-form">
    <div class="form-group">
      <label for="title" class="form-label">Titel *</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        class="form-input"
        placeholder="z.B. Weihnachtsgottesdienst"
        required
      />
    </div>

    <div class="form-group">
      <label for="datetime" class="form-label">Datum / Uhrzeit</label>
      <input
        id="datetime"
        v-model="formData.datetime"
        type="text"
        class="form-input"
        placeholder="z.B. 24.12.2025, 10:00 Uhr"
      />
    </div>

    <div class="form-group">
      <label for="location" class="form-label">Ort</label>
      <input
        id="location"
        v-model="formData.location"
        type="text"
        class="form-input"
        placeholder="z.B. Ev. Kirche Korntal"
      />
    </div>

    <div class="form-group">
      <label for="speaker" class="form-label">Prediger / Sprecher</label>
      <input
        id="speaker"
        v-model="formData.speaker"
        type="text"
        class="form-input"
        placeholder="z.B. Pfarrer Müller"
      />
    </div>

    <div class="form-group">
      <label for="desc" class="form-label">Beschreibung</label>
      <textarea
        id="desc"
        v-model="formData.desc"
        class="form-textarea"
        rows="4"
        placeholder="Herzliche Einladung zum Gottesdienst..."
      ></textarea>
    </div>

    <div class="form-group">
      <label for="qr" class="form-label">QR-Inhalt (z.B. URL)</label>
      <input
        id="qr"
        v-model="formData.qr"
        type="text"
        class="form-input"
        placeholder="https://gemeinde.example/anmeldung"
      />
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="loadExample">
        Beispieldaten laden
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { FlyerData } from '../../types/flyer'

const emit = defineEmits<{
  update: [data: FlyerData]
}>()

const formData = reactive<FlyerData>({
  title: '',
  datetime: '',
  location: '',
  speaker: '',
  desc: '',
  qr: '',
})

// Emit updates when form data changes
watch(
  formData,
  (newData) => {
    emit('update', { ...newData })
  },
  { deep: true, immediate: true }
)

const loadExample = () => {
  formData.title = 'Weihnachtsgottesdienst'
  formData.datetime = '24.12.2025, 10:00 Uhr'
  formData.location = 'Ev. Kirche Korntal'
  formData.speaker = 'Pfarrer Müller'
  formData.desc =
    'Herzliche Einladung zum festlichen Weihnachtsgottesdienst mit Krippenspiel der Kinder und anschließendem Kirchenkaffee.'
  formData.qr = 'https://gemeinde.example/weihnachten'
}

// Load example data on mount for demo
loadExample()

// Expose method to set data externally
defineExpose({
  setData: (data: Partial<FlyerData>) => {
    Object.assign(formData, data)
  },
  getData: () => ({ ...formData }),
})
</script>

<style scoped>
.flyer-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: #374151;
}

.form-input,
.form-textarea {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}
</style>
