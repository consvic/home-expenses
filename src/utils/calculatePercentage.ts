export default function calculatePercentage(
  people: Array<{
    name: string
    monthlyIncome: number
  }>,
  person: {
    name: string
    monthlyIncome: number
  }
) {
  const totalIncome = people.reduce(
    (acc, person) => acc + person.monthlyIncome,
    0
  )
  return person.monthlyIncome / totalIncome
}
