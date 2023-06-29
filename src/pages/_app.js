import { ChakraProvider } from '@chakra-ui/react'

// eslint-disable-next-line react/prop-types
export default function App ({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
