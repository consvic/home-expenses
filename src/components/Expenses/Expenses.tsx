import { useContext, useMemo, useState } from "react"
import {
  Box,
  Button,
  Flex,
  Heading,
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
import { AddIcon } from "@chakra-ui/icons"

import expenses from "../../mocks/expenses.json"
import frequentExpenses from "../../mocks/frequentExpenses.json"
import numberWithCommas from "../../utils/numberWithCommas"
import { PeopleContext } from "../../context/PeopleContext"
import calculatePercentage from "../../utils/calculatePercentage"
import { ExpenseForm } from "../ExpenseForm/ExpenseForm"

const STARTING_MONTH = 3

export function Expenses() {
  const { people } = useContext(PeopleContext)
  const [showForm, setShowForm] = useState(false)

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

  const emptyTitleCells = Array.from(
    Array(maxInstallments + (maxInstallmentsMonth - STARTING_MONTH)).keys()
  ).map(() => <Th></Th>)

  // Group items by concept
  const groupedExpenses = frequentExpenses.reduce(
    (
      acc: {
        [key: string]: Array<{
          concept: string
          amount: number
          paidBy: string
          month: number
        }>
      },
      item
    ) => {
      const { concept } = item
      if (!acc[concept]) {
        acc[concept] = []
      }
      acc[concept].push(item)
      return acc
    },
    {}
  )

  const totalAmountPerMonth = useMemo(() => {
    // calculate the total amount per month taking account of the installments per each item
    const allExpenses: Array<{
      concept: string
      amount: number
      paidBy: string
      month: number
      installments?: number
    }> = [...expenses, ...frequentExpenses]
    const addPaymentWithInstallments = allExpenses.reduce(
      (
        acc: Array<{
          concept: string
          amount: number
          paidBy: string
          month: number
          installments?: number
        }>,
        item
      ) => {
        const installments = item?.installments
        if (installments && installments > 1) {
          const newExpenses = Array.from(Array(installments).keys()).map(
            (month) => {
              return {
                ...item,
                amount: item.amount / installments,
                installments: 0,
                month: month + item.month,
              }
            }
          )
          return [...acc, ...newExpenses]
        } else {
          return [...acc, item]
        }
      },
      []
    )
    const grouppedByMonth = addPaymentWithInstallments.reduce(
      (
        acc: {
          [key: string]: Array<{
            concept: string
            amount: number
            paidBy: string
            month: number
            installments?: number
          }>
        },
        item
      ) => {
        const { month } = item
        if (!acc[month]) {
          acc[month] = []
        }
        acc[month].push(item)
        return acc
      },
      {}
    )
    let sumsPerMonth: Record<string, number> = {}
    for (const month in grouppedByMonth) {
      let sum = 0
      grouppedByMonth[month].forEach((expense) => {
        sum += expense.amount
      })
      sumsPerMonth[month] = sum
    }
    return sumsPerMonth
  }, [])

  return (
    <Box paddingTop={6}>
      <Flex marginBottom={8}>
        <Button
          colorScheme="teal"
          leftIcon={<AddIcon />}
          variant="outline"
          backgroundColor="teal.100"
          onClick={() => setShowForm(true)}
        >
          Add expense
        </Button>
      </Flex>
      {showForm ? (
        <ExpenseForm />
      ) : (
        <TableContainer
          borderTop="1px solid"
          borderTopColor="teal.100"
          paddingTop="24px"
        >
          <Heading as="h6" color="teal.600" marginBottom={10} textAlign="left">
            Detail table
          </Heading>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Amounts are calculated automatically</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize="lg">Concept</Th>
                <Th fontSize="lg" isNumeric>
                  Amount
                </Th>
                <Th fontSize="lg" isNumeric>
                  Installments
                </Th>
                {Array.from(Array(maxPayments).keys()).map((month) => (
                  <Th fontSize="lg" key={month} isNumeric>
                    {month + STARTING_MONTH}
                  </Th>
                ))}
              </Tr>
              <Tr>
                <Th></Th>
                <Th fontSize="md" letterSpacing="widest">
                  ONE TIMERS
                </Th>
                <Th></Th>
                {emptyTitleCells}
              </Tr>
            </Thead>
            <Tbody>
              {expenses.map((expense) => (
                <Tr key={expense.concept}>
                  <Td fontWeight="500">{expense.concept}</Td>
                  <Td isNumeric>${numberWithCommas(expense.amount)}</Td>
                  <Td isNumeric>{expense.installments || "N/A"}</Td>
                  {expense.month - STARTING_MONTH !== 0 &&
                    Array.from(
                      Array(expense.month - STARTING_MONTH).keys()
                    ).map(() => <Td isNumeric>-</Td>)}
                  {expense.installments > 1 ? (
                    Array.from(Array(expense.installments).keys()).map(
                      (month) => (
                        <Td key={month} isNumeric>
                          $
                          {numberWithCommas(
                            Number(
                              (expense.amount / expense.installments).toFixed(2)
                            )
                          )}
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
            <Thead>
              <Tr>
                <Th></Th>
                <Th fontSize="md" letterSpacing="widest">
                  FREQUENT
                </Th>
                <Th></Th>
                {emptyTitleCells}
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(groupedExpenses).map(([key, value]) => (
                <Tr>
                  <Td fontWeight="500">{key}</Td>
                  <Td isNumeric>-</Td>
                  <Td isNumeric>-</Td>
                  {Array.from(
                    Array(value[0].month - STARTING_MONTH).keys()
                  ).map((month) => (
                    <Td key={month} isNumeric>
                      -
                    </Td>
                  ))}
                  {value.map((item) => (
                    <Td isNumeric>${numberWithCommas(item.amount)}</Td>
                  ))}
                  {Array.from(
                    Array(
                      maxPayments -
                        value.length -
                        value[0].month +
                        STARTING_MONTH
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
                {Object.entries(totalAmountPerMonth).map(([key]) => (
                  <Th key={key} isNumeric>
                    $
                    {numberWithCommas(
                      Number(totalAmountPerMonth[key].toFixed(2))
                    )}
                  </Th>
                ))}
              </Tr>
              {people.map((person) => (
                <Tr>
                  <Th>Pago {person.name}</Th>
                  <Th></Th>
                  <Th></Th>
                  {Object.entries(totalAmountPerMonth).map(([key]) => (
                    <Th key={key} isNumeric>
                      $
                      {numberWithCommas(
                        Number(
                          (
                            totalAmountPerMonth[key] *
                            calculatePercentage(people, person)
                          ).toFixed(2)
                        )
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
