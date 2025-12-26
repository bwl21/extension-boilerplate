import type { Template, Schema } from '@pdfme/common'
import type { LayoutFormat, FlyerData } from '../types/flyer'

// Convert mm to points (1mm = 2.83465 points)
const mmToPt = (mm: number): number => mm * 2.83465

// Base schema fields used across all templates
const createTextSchema = (
  name: string,
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize: number,
  fontColor: string = '#000000',
  alignment: 'left' | 'center' | 'right' = 'left'
): Schema => ({
  type: 'text',
  name,
  position: { x, y },
  width,
  height,
  fontSize,
  fontColor,
  alignment,
})

const createQrSchema = (
  name: string,
  x: number,
  y: number,
  size: number
): Schema => ({
  type: 'qrcode',
  name,
  position: { x, y },
  width: size,
  height: size,
})

// A5 Portrait (148mm x 210mm)
const createA5PortraitTemplate = (): Template => {
  const width = 148
  const height = 210
  const padding = 10
  const headerHeight = 40

  return {
    basePdf: {
      width: mmToPt(width),
      height: mmToPt(height),
      padding: [0, 0, 0, 0],
    },
    schemas: [
      [
        createTextSchema('title', padding, 15, width - padding * 2, 20, 18, '#1e40af', 'left'),
        createTextSchema('datetime', padding, headerHeight + 10, width - padding * 2, 10, 10, '#374151'),
        createTextSchema('location', padding, headerHeight + 25, width - padding * 2, 10, 10, '#374151'),
        createTextSchema('speaker', padding, headerHeight + 40, width - padding * 2, 10, 9, '#6b7280'),
        createTextSchema('desc', padding, headerHeight + 60, width - padding * 2 - 45, 80, 9, '#374151'),
        createQrSchema('qr', width - padding - 35, height - padding - 35, 35),
      ],
    ],
  }
}

// A5 Landscape (210mm x 148mm)
const createA5LandscapeTemplate = (): Template => {
  const width = 210
  const height = 148
  const padding = 10
  const headerHeight = 35

  return {
    basePdf: {
      width: mmToPt(width),
      height: mmToPt(height),
      padding: [0, 0, 0, 0],
    },
    schemas: [
      [
        createTextSchema('title', padding, 12, width - padding * 2, 18, 16, '#1e40af', 'left'),
        createTextSchema('datetime', padding, headerHeight + 8, 90, 8, 9, '#374151'),
        createTextSchema('location', padding, headerHeight + 20, 90, 8, 9, '#374151'),
        createTextSchema('speaker', padding, headerHeight + 32, 90, 8, 8, '#6b7280'),
        createTextSchema('desc', padding, headerHeight + 50, width - padding * 2 - 45, 60, 8, '#374151'),
        createQrSchema('qr', width - padding - 30, height - padding - 30, 30),
      ],
    ],
  }
}

// A6 Long Portrait (105mm x 210mm)
const createA6LongPortraitTemplate = (): Template => {
  const width = 105
  const height = 210
  const padding = 6
  const headerHeight = 25

  return {
    basePdf: {
      width: mmToPt(width),
      height: mmToPt(height),
      padding: [0, 0, 0, 0],
    },
    schemas: [
      [
        createTextSchema('title', padding, 10, width - padding * 2, 12, 10, '#1e40af', 'left'),
        createTextSchema('datetime', padding, headerHeight + 6, width - padding * 2, 6, 6, '#374151'),
        createTextSchema('location', padding, headerHeight + 15, width - padding * 2, 6, 6, '#374151'),
        createTextSchema('speaker', padding, headerHeight + 24, width - padding * 2, 6, 5, '#6b7280'),
        createTextSchema('desc', padding, headerHeight + 38, width - padding * 2, 100, 5, '#374151'),
        createQrSchema('qr', width - padding - 20, height - padding - 20, 20),
      ],
    ],
  }
}

// A6 Long Landscape (210mm x 105mm)
const createA6LongLandscapeTemplate = (): Template => {
  const width = 210
  const height = 105
  const padding = 8
  const headerHeight = 25

  return {
    basePdf: {
      width: mmToPt(width),
      height: mmToPt(height),
      padding: [0, 0, 0, 0],
    },
    schemas: [
      [
        createTextSchema('title', padding, 10, width - padding * 2, 12, 12, '#1e40af', 'left'),
        createTextSchema('datetime', padding, headerHeight + 6, 80, 6, 7, '#374151'),
        createTextSchema('location', 100, headerHeight + 6, 80, 6, 7, '#374151'),
        createTextSchema('speaker', padding, headerHeight + 18, 80, 6, 6, '#6b7280'),
        createTextSchema('desc', padding, headerHeight + 32, width - padding * 2 - 35, 45, 6, '#374151'),
        createQrSchema('qr', width - padding - 25, height - padding - 25, 25),
      ],
    ],
  }
}

// Template factory
export const getTemplate = (format: LayoutFormat): Template => {
  switch (format) {
    case 'a5-portrait':
      return createA5PortraitTemplate()
    case 'a5-landscape':
      return createA5LandscapeTemplate()
    case 'a6-long-portrait':
      return createA6LongPortraitTemplate()
    case 'a6-long-landscape':
      return createA6LongLandscapeTemplate()
    default:
      throw new Error(`Unknown layout format: ${format}`)
  }
}

// Get all templates
export const getAllTemplates = (): Record<LayoutFormat, Template> => ({
  'a5-portrait': createA5PortraitTemplate(),
  'a5-landscape': createA5LandscapeTemplate(),
  'a6-long-portrait': createA6LongPortraitTemplate(),
  'a6-long-landscape': createA6LongLandscapeTemplate(),
})

// Convert FlyerData to pdfme input format
export const flyerDataToInput = (data: FlyerData): Record<string, string> => ({
  title: data.title || '',
  datetime: data.datetime || '',
  location: data.location || '',
  speaker: data.speaker || '',
  desc: data.desc || '',
  qr: data.qr || 'https://example.com',
})

// Get all layout formats
export const getAllFormats = (): LayoutFormat[] => [
  'a5-portrait',
  'a5-landscape',
  'a6-long-portrait',
  'a6-long-landscape',
]
