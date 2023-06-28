import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react"
import { useContext, useMemo } from "react"
import { getTotalPerMonth } from "../../utils/getTotalPerMonth"

import expenses from "../../mocks/expenses.json"
import frequentExpenses from "../../mocks/frequentExpenses.json"
import { PeopleContext } from "../../context/PeopleContext"
import calculatePercentage from "../../utils/calculatePercentage"
import numberWithCommas from "../../utils/numberWithCommas"

export function BasicTable() {
  const { people } = useContext(PeopleContext)

  const totalAmountPerMonth = useMemo(() => {
    return getTotalPerMonth(expenses, frequentExpenses)
  }, [])
  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th fontSize="lg">Person</Th>
          <Th fontSize="lg" isNumeric>
            Amount
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {people.map((person) => (
          <Tr>
            <Td>{person.name}</Td>
            <Td isNumeric>
              $
              {numberWithCommas(
                Number(
                  (
                    totalAmountPerMonth[new Date().getMonth() + 1] *
                    calculatePercentage(people, person)
                  ).toFixed(2)
                )
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
