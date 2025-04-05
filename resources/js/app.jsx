import '@mantine/core/styles.css'
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import { createTheme, MantineProvider } from '@mantine/core'; 

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <MantineProvider>
        <App {...props} />
      </MantineProvider>
    )
  },
})