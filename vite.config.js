import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/GrowTogether/',

  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.svg',
        'icons/*.png',
      ],

      manifest: {
        name: 'GrowTogether',
        short_name: 'GrowTogether',
        description:
          'A romantic daily routine and career growth planner for two people growing together.',

        theme_color: '#BE185D',
        background_color: '#FFF7FB',

        display: 'standalone',
        orientation: 'portrait',

        start_url: '/GrowTogether/',
        scope: '/GrowTogether/',

        icons: [
          {
            src: '/GrowTogether/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/GrowTogether/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/GrowTogether/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,svg,png,ico,webmanifest}',
        ],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
