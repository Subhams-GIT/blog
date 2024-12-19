import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import {system} from "./theme/theme.jsx"
createRoot(document.getElementById('root')).render(
  <ChakraProvider value={system}>
    <App />
  </ChakraProvider>,
)