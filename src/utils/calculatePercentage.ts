import { Person } from "../components/context/types"

export default function calculatePercentage(
  people: Array<Person>,
  person: Person
) {
  const totalIncome = people.reduce(
    (acc, person) => acc + person.monthlyIncome,
    0
  )
  return person.monthlyIncome / totalIncome
}
