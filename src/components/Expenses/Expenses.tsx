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

const STARTING_MONTH = 3

export function Expenses() {
  const maxInstallments = useMemo(() => {
    return expenses.reduce((prev, current) => {
      return prev.installments > current.installments ? prev : current
    }).installments
  }, [])
  const maxInstallmentsMonth = useMemo(() => {
    return expenses.reduce((prev, current) => {
      return prev.installments > current.installments ? prev : current
    }).month
  }, [])

  const maxPayments = useMemo(() => {
    const maxExpense = expenses.reduce((prev, current) => {
      return prev.installments > current.installments ? prev : current
    })
    const earliestExpense = expenses.reduce((prev, current) => {
      return prev.month < current.month ? prev : current
    })
    return maxExpense.installments + (maxExpense.month - earliestExpense.month)
  }, [])

  return (
    <Box paddingTop={6}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Amounts are calculated automatically</TableCaption>
          <Thead>
            <Tr>
              <Th fontSize="lg">ONE TIMERS</Th>
            </Tr>
            <Tr>
              <Th>Concept</Th>
              <Th isNumeric>Amount</Th>
              <Th isNumeric>Installments</Th>
              {Array.from(Array(maxPayments).keys()).map((month) => (
                <Th key={month} isNumeric>
                  {month + STARTING_MONTH}
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
                {expense.month - STARTING_MONTH !== 0 &&
                  Array.from(Array(expense.month - STARTING_MONTH).keys()).map(
                    () => <Td isNumeric>-</Td>
                  )}
                {expense.installments > 1 ? (
                  Array.from(Array(expense.installments).keys()).map(
                    (month) => (
                      <Td key={month} isNumeric>
                        ${(expense.amount / expense.installments).toFixed(2)}
                      </Td>
                    )
                  )
                ) : (
                  <Td isNumeric>${expense.amount.toFixed(2)}</Td>
                )}
                {expense.installments < maxInstallments &&
                  Array.from(
                    Array(
                      maxInstallments -
                        (expense.installments || 1) +
                        (maxInstallmentsMonth - expense.month)
                    ).keys()
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
