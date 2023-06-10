import {
  ChakraProvider,
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react"

import "./App.css"
import { Income } from "./components/Income"
import { Expenses } from "./components/Expenses"

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Container
          backgroundColor="teal.50"
          maxWidth="100vw"
          width="100vw"
          height="100vh"
          padding={6}
        >
          <Heading color="teal.900">Home expenses</Heading>
          <Tabs variant="soft-rounded" colorScheme="teal">
            <TabList gap="8px">
              <Tab _hover={{ borderColor: "teal.500" }}>Income</Tab>
              <Tab _hover={{ borderColor: "teal.500" }}>Expenses</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Income />
              </TabPanel>
              <TabPanel>
                <Expenses />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </div>
    </ChakraProvider>
  )
}

export default App
