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
import { PeopleProvider } from "./components/context/PeopleContext"

function App() {
  return (
    <ChakraProvider>
      <PeopleProvider>
        <div className="App">
          <Container
            backgroundColor="teal.50"
            maxWidth="100vw"
            width="100vw"
            minHeight="100vh"
            height="100%"
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
      </PeopleProvider>
    </ChakraProvider>
  )
}

export default App
