import { Box, Button, Heading } from '@chakra-ui/react'
import { getSession, signOut, useSession } from 'next-auth/react'
import React from 'react'

const HomePage = () => {
  const { data } = useSession()
  return (
    <Box>
      <Heading>Home Page</Heading>
      <pre>{ JSON.stringify(data, null, 3)}</pre>
      <Button onClick={() => signOut()}>Logout</Button>
    </Box>
  )
}

export default HomePage

export const getServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: { }
  }
}
