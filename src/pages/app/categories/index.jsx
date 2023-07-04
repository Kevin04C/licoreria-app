import { FilterCategories } from '@/components/categories'
import { NewCategory } from '@/components/categories/NewCategory'
import { DashBoardLayout } from '@/layout'
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'
import { IoAddOutline } from 'react-icons/io5'
import { MdOutlineCategory } from 'react-icons/md'

const CategoriesPage = () => {
  return (
    <DashBoardLayout>
      <Tabs variant="soft-rounded" colorScheme="facebook">
        <TabList>
          <Tab>
            <Flex gap={2} alignItems="center">
              <MdOutlineCategory />
              <Text>MOSTRAR CATEGORÍAS</Text>
            </Flex>
          </Tab>
          <Tab>
            <Flex gap={2} alignItems="center">
              <IoAddOutline />
              <Text>NUEVA CATEGORÍA</Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel mt={2}>
            <FilterCategories />
          </TabPanel>
          <TabPanel>
            <NewCategory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashBoardLayout>
  )
}

export default CategoriesPage

// export const getServerSideProps = async (ctx) => {
//   const categories = await getCategories()
//   return {
//     props: {
//       categories
//     }
//   }
// }
