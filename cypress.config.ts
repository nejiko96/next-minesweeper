import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // baseUrl: 'https://cozy-beignet-765cd6.netlify.app',
    baseUrl: 'http://localhost:3000',
    video: true,
    videoCompression: true,
  },
})
