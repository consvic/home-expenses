import { useEffect, useState } from "react"
import { Box, Button, Flex, Heading, TableContainer } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

import { ExpenseForm } from "../ExpenseForm/ExpenseForm"
import { DetailedTable } from "../DetailedTable/DetailedTable"
import { BasicTable } from "../BasicTable"
import { getExpenses } from "../../firestore/getExpenses"

export function Expenses() {
  const [showForm, setShowForm] = useState(false)
  const [view, setView] = useState<"full" | "summary">("summary")

  useEffect(() => {
    getExpenses()
  }, [])

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
        {view === "full" && (
          <Button
            colorScheme="teal"
            variant="ghost"
            onClick={() => setView("summary")}
          >
            Show summary
          </Button>
        )}
        {view === "summary" && (
          <Button
            colorScheme="teal"
            variant="ghost"
            onClick={() => setView("full")}
          >
            Show full
          </Button>
        )}
      </Flex>
      {view === "summary" && !showForm && (
        <TableContainer paddingTop="24px">
          <Heading as="h6" color="teal.600" marginBottom={10} textAlign="left">
            Summary table (current month {new Date().getMonth() + 1})
          </Heading>
          <BasicTable />
        </TableContainer>
      )}
      {view === "full" && !showForm && (
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
      {showForm && <ExpenseForm closeForm={() => setShowForm(false)} />}
    </Box>
  )
}
