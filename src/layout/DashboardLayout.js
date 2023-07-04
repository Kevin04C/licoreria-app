import { Box } from '@chakra-ui/react'
import { SidebarContent } from '@/components/sidebar'
import Head from 'next/head'

export const DashBoardLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Licoreria Lluvia</title>
      </Head>
      <Box minH="100vh" bg="gray.50">
        <SidebarContent />
        <Box ml={60} p="4">
          {children}
        </Box>
      </Box>
    </>
  )
}
