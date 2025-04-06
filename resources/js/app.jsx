import '@mantine/core/styles.css'
import './bootstrap';

import classes from './App.module.css'; 

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import { createTheme, MantineProvider } from '@mantine/core'; 

// const theme = createTheme({
//   components: {
//     Container: Container.extend({
//       classNames: (_, { size }) => ({
//         root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
//       }),
//     }),
//   },
// });

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <MantineProvider 
        // theme={theme}
        >
        <App {...props} />
      </MantineProvider>
    )
  },
})