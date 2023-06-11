export interface Person {
  name: string
  monthlyIncome: number
}

export interface PeopleContextProps {
  people: Person[]
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
}
