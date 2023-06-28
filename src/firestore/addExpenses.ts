import { collection, addDoc, writeBatch, doc } from "firebase/firestore"
import {
  BasicExpense,
  VariableExpense,
} from "../components/DetailedTable/DetailedTable.types"
import { db } from "../utils/initFirebase"

export async function addExpense(expense: VariableExpense): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, "expense"), expense)
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}
export async function addFrequentExpense(expense: BasicExpense): Promise<void> {
  try {
    const docRef = await addDoc(collection(db, "frequent-expense"), expense)
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export async function addExpenses(expenses: VariableExpense[]) {
  const batch = writeBatch(db)
  expenses.forEach((expense) => {
    const docRef = doc(db, "expense")
    batch.set(docRef, expense)
  })

  // Commit the batch
  await batch.commit()
}

export async function addFrequenExpenses(expenses: BasicExpense[]) {
  const batch = writeBatch(db)
  expenses.forEach((expense) => {
    const docRef = doc(db, "frequent-expense")
    batch.set(docRef, expense)
  })

  // Commit the batch
  await batch.commit()
}
