import { useState } from "react"
import { Box, Button, Flex, Heading, TableContainer } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

import { ExpenseForm } from "../ExpenseForm/ExpenseForm"
import { DetailedTable } from "../DetailedTable/DetailedTable"

export function Expenses() {
  const [showForm, setShowForm] = useState(false)

  return (
    <Box paddingTop={6}>
      <Flex marginBottom={8} gap={4}>
        {!showForm && (
          <Button
            colorScheme="teal"
            leftIcon={<AddIcon />}
            variant="outline"
            backgroundColor="teal.100"
            onClick={() => setShowForm(true)}
          >
            Add expense
          </Button>
        )}
        <Button colorScheme="teal" variant="ghost">
          Show summary
        </Button>
      </Flex>
      {/* <TableContainer paddingTop="24px">
        <Heading as="h6" color="teal.600" marginBottom={10} textAlign="left">
          Summary table
        </Heading>
        <Table variant="striped" colorScheme="teal"></Table>
      </TableContainer> */}
      {showForm ? (
        <ExpenseForm closeForm={() => setShowForm(false)} />
      ) : (
        <TableContainer
          borderTop="1px solid"
          borderTopColor="teal.100"
          paddingTop="24px"
        >
          <Heading as="h6" color="teal.600" marginBottom={10} textAlign="left">
            Detailed table
          </Heading>
          <DetailedTable />
        </TableContainer>
      )}
    </Box>
  )
}
