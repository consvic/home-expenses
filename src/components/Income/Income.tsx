import {
  Button,
  Flex,
  Input,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useState } from "react"

export function Income() {
  const [people, setPeople] = useState<
    { name: string; monthlyIncome: number }[]
  >([])
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState<{ name?: string; monthlyIncome?: number }>()

  function savePerson() {
    if (!form || !form.name) return
    setShowForm(false)
    setPeople((prevPeople) =>
      prevPeople.length
        ? [...prevPeople, form as { name: string; monthlyIncome: number }]
        : [form as { name: string; monthlyIncome: number }]
    )
  }
  function calculatePercentage(person: {
    name: string
    monthlyIncome: number
  }) {
    const totalIncome = people.reduce(
      (acc, person) => acc + person.monthlyIncome,
      0
    )
    return (person.monthlyIncome / totalIncome) * 100
  }
  return (
    <Flex paddingTop={8} gap={10}>
      <Flex direction="column" width="sm" gap={5}>
        {!showForm && (
          <Button
            variant="solid"
            colorScheme="teal"
            leftIcon={<AddIcon />}
            onClick={() => setShowForm(true)}
          >
            Add a person
          </Button>
        )}
        {showForm && (
          <Stack spacing={3}>
            <Input
              colorScheme="teal"
              color="teal.900"
              backgroundColor="white"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              colorScheme="teal"
              color="teal.900"
              backgroundColor="white"
              placeholder="Income"
              type="number"
              onChange={(e) =>
                setForm({ ...form, monthlyIncome: e.target.valueAsNumber })
              }
            />
            <Button variant="solid" colorScheme="teal" onClick={savePerson}>
              Save
            </Button>
          </Stack>
        )}
      </Flex>
      <Flex>
        <StatGroup gap={6}>
          {people.map((person) => (
            <Stat colorScheme="teal">
              <StatLabel color="teal.500">{person.name}</StatLabel>
              <StatNumber color="teal.900">{person.monthlyIncome}</StatNumber>
              <StatHelpText color="teal.600">
                {calculatePercentage(person)}%
              </StatHelpText>
            </Stat>
          ))}
        </StatGroup>
      </Flex>
    </Flex>
  )
}
