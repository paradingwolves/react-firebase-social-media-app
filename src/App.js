// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
// 2. import `RouterProvider` component
import { RouterProvider } from 'react-router-dom';
// 3. import `router` property
import {router} from './lib/routes.js';


function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;

