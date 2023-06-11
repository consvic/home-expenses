import React, { createContext, useState, ReactNode } from "react"
import { PeopleContextProps, Person } from "./types"

const PeopleContext = createContext<PeopleContextProps>({
  people: [],
  setPeople: () => {},
})

interface PeopleProviderProps {
  children: ReactNode
}

const PeopleProvider: React.FC<PeopleProviderProps> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([])

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  )
}

export { PeopleContext, PeopleProvider }
