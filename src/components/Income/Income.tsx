import {
  Button,
  Flex,
  Input,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useContext, useState } from "react"
import { PeopleContext } from "../../context/PeopleContext"
import calculatePercentage from "../../utils/calculatePercentage"

export function Income() {
  const { people, setPeople } = useContext(PeopleContext)

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
                {calculatePercentage(people, person) * 100}%
              </StatHelpText>
            </Stat>
          ))}
        </StatGroup>
      </Flex>
    </Flex>
  )
}
