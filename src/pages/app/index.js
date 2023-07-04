import { DashBoardLayout } from '@/layout'
import { Heading } from '@chakra-ui/react'
import { getSession, useSession } from 'next-auth/react'
import React from 'react'

const HomePage = () => {
  const { data } = useSession()
  return (
    <DashBoardLayout>
      <Heading>Home Page</Heading>
      <pre>{ JSON.stringify(data, null, 3)}</pre>
    </DashBoardLayout>
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
