import { collection, getDocs } from "firebase/firestore"
import { db } from "../utils/initFirebase"
import {
  BasicExpense,
  VariableExpense,
} from "../components/DetailedTable/DetailedTable.types"

export async function getExpenses(): Promise<BasicExpense[]> {
  const querySnapshot = await getDocs(collection(db, "expense"))
  console.log("docs", { docs: querySnapshot.docs })
  const results = querySnapshot.docs.map((doc) => {
    return doc.data()
  })
  console.log("results", { results })
  return results as VariableExpense[]
}

export async function getFrequentExpenses(): Promise<BasicExpense[]> {
  const querySnapshot = await getDocs(collection(db, "frequent-expense"))
  console.log("docs", { docs: querySnapshot.docs })
  const results = querySnapshot.docs.map((doc) => {
    return doc.data()
  })
  console.log("results", { results })
  return results as BasicExpense[]
}
