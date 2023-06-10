import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

import expenses from "../../mocks/expenses.json"
import { useMemo } from "react"

export function Expenses() {
  const maxInstallments = useMemo(() => {
    return expenses.reduce((prev, current) => {
      return prev.installments > current.installments ? prev : current
    }).installments
  }, [])

  return (
    <Box>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Amounts are calculated automatically</TableCaption>
          <Thead>
            <Tr>
              <Th>Concept</Th>
              <Th isNumeric>Amount</Th>
              <Th isNumeric>Installments</Th>
              {Array.from(Array(maxInstallments).keys()).map((month) => (
                <Th key={month} isNumeric>
                  {month + 1}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map((expense) => (
              <Tr key={expense.concept}>
                <Td>{expense.concept}</Td>
                <Td isNumeric>{expense.amount}</Td>
                <Td isNumeric>{expense.installments || "N/A"}</Td>
                {expense.installments > 1 &&
                  Array.from(Array(expense.installments).keys()).map(
                    (month) => (
                      <Td key={month} isNumeric>
                        ${(expense.amount / expense.installments).toFixed(2)}
                      </Td>
                    )
                  )}
                {expense.installments < maxInstallments &&
                  Array.from(
                    Array(maxInstallments - expense.installments).keys()
                  ).map((month) => (
                    <Td key={month} isNumeric>
                      -
                    </Td>
                  ))}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total</Th>
              <Th></Th>
              <Th></Th>
              {Array.from(Array(maxInstallments).keys()).map(() => (
                <Th></Th>
              ))}
            </Tr>
            <Tr>
              <Th>Pago Ale</Th>
              <Th></Th>
              <Th></Th>
              {Array.from(Array(maxInstallments).keys()).map(() => (
                <Th></Th>
              ))}
            </Tr>
            <Tr>
              <Th>Pago Cocoy</Th>
              <Th></Th>
              <Th></Th>
              {Array.from(Array(maxInstallments).keys()).map(() => (
                <Th></Th>
              ))}
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}
