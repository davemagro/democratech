import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './bootstrap';

import classes from './App.module.css'; 

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { createTheme, MantineProvider } from '@mantine/core'; 
import { Notifications } from '@mantine/notifications';

// const theme = createTheme({
//   components: {
//     Container: Container.extend({
//       classNames: (_, { size }) => ({
//         root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
//       }),
//     }),
//   },
// });

const queryClient = new QueryClient();

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <QueryClientProvider client={queryClient}>
        <MantineProvider 
          // theme={theme}
          >
          <Notifications />
          <App {...props} />
        </MantineProvider>
      </QueryClientProvider>
    )
  },
})