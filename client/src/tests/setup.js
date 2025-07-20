// src/tests/setup.js
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Polyfill for TextEncoder/TextDecoder in Jest
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock window.scrollTo
window.scrollTo = jest.fn()