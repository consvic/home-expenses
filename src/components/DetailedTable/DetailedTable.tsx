import { useContext, useMemo } from "react"
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react"
import calculatePercentage from "../../utils/calculatePercentage"
import numberWithCommas from "../../utils/numberWithCommas"
import { PeopleContext } from "../../context/PeopleContext"

import { BasicExpense } from "./DetailedTable.types"

import expenses from "../../mocks/expenses.json"
import frequentExpenses from "../../mocks/frequentExpenses.json"
import { getTotalPerMonth } from "../../utils/getTotalPerMonth"

const STARTING_MONTH = 3

export function DetailedTable() {
  const { people } = useContext(PeopleContext)

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
        [key: string]: Array<BasicExpense>
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
    return getTotalPerMonth(expenses, frequentExpenses)
  }, [])
  return (
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
              Array.from(Array(expense.month - STARTING_MONTH).keys()).map(
                () => <Td isNumeric>-</Td>
              )}
            {expense.installments > 1 ? (
              Array.from(Array(expense.installments).keys()).map((month) => (
                <Td key={month} isNumeric>
                  $
                  {numberWithCommas(
                    Number((expense.amount / expense.installments).toFixed(2))
                  )}
                </Td>
              ))
            ) : (
              <Td isNumeric>
                ${numberWithCommas(Number(expense.amount.toFixed(2)))}
              </Td>
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
            {Array.from(Array(value[0].month - STARTING_MONTH).keys()).map(
              (month) => (
                <Td key={month} isNumeric>
                  -
                </Td>
              )
            )}
            {value.map((item) => (
              <Td isNumeric>${numberWithCommas(item.amount)}</Td>
            ))}
            {Array.from(
              Array(
                maxPayments - value.length - value[0].month + STARTING_MONTH
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
              ${numberWithCommas(Number(totalAmountPerMonth[key].toFixed(2)))}
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
  )
}
