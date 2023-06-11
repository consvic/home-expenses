import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react"

export function ExpenseForm() {
  return (
    <form>
      <Flex direction="column" width="30%" margin="0 auto" gap="12px">
        <FormControl>
          <FormLabel color="teal.800">Concept</FormLabel>
          <Input
            colorScheme="teal"
            placeholder="Concept"
            backgroundColor="white"
            color="teal.700"
          />
        </FormControl>
        <FormControl>
          <FormLabel color="teal.800">Amount</FormLabel>
          <NumberInput
            placeholder="Amount"
            precision={2}
            step={0.2}
            backgroundColor="white"
            color="teal.700"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel color="teal.800">Month</FormLabel>
          <NumberInput
            placeholder="Month"
            min={3}
            step={1}
            backgroundColor="white"
            color="teal.700"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel color="teal.800">Type of expense</FormLabel>
          <Select
            placeholder="Type of expense"
            backgroundColor="white"
            color="teal.700"
          >
            <option value="fixed">Fixed</option>
            <option value="variable">Variable</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel color="teal.800">Installments</FormLabel>
          <NumberInput
            placeholder="Installments"
            min={2}
            step={1}
            backgroundColor="white"
            color="teal.700"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Flex gap="4px" marginTop="24px">
          <Button w="full" colorScheme="teal" variant="ghost">
            Cancel
          </Button>
          <Button w="full" colorScheme="teal">
            Save
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}
