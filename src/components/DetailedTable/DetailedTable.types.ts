export interface BasicExpense {
  concept: string
  amount: number
  paidBy: string
  month: number
}

export interface VariableExpense extends BasicExpense {
  installments: number
}

export type MergedExpenses = Omit<BasicExpense, "installments"> & {
  installments?: number
}
