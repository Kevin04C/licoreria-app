import { CardHome } from '@/components/home'
import { DashBoardLayout } from '@/layout'
import { Grid, Heading } from '@chakra-ui/react'
import { getSession } from 'next-auth/react'

const HomePage = () => {
  return (
    <DashBoardLayout>
      <Heading color="facebook.900" mb={8} fontWeight="black" fontSize="30px">
        PÁGINA PRINCIPAL
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <CardHome text="PRODUCTOS" value={382} bg="yellow.500" />
        <CardHome text="CATEGORIAS" value={15} bg="gray.500" />
        <CardHome text="VENTAS" value={120} bg="green.500" />
      </Grid>
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
    props: {}
  }
}
