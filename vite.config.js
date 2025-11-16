import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/student_survay_PWA/",   // REQUIRED for GitHub Pages
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.openweathermap\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'weather-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 // 1 hour
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Student Survey PWA',
        short_name: 'Survey PWA',
        description: 'Dynamic student survey application with weather integration',
        start_url: '/student_survay_PWA/',   // IMPORTANT for PWA on GH pages
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4F46E5',
        icons: [
          {
            src: '/student_survay_PWA/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/student_survay_PWA/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
