import {
  BasicExpense,
  MergedExpenses,
  VariableExpense,
} from "../components/DetailedTable/DetailedTable.types"

export function getTotalPerMonth(
  expenses: VariableExpense[],
  frequentExpenses: BasicExpense[]
) {
  // calculate the total amount per month taking account of the installments per each item
  const allExpenses: Array<MergedExpenses> = [...expenses, ...frequentExpenses]
  const addPaymentWithInstallments = allExpenses.reduce(
    (acc: Array<MergedExpenses>, item) => {
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
        [key: string]: Array<MergedExpenses>
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
}
