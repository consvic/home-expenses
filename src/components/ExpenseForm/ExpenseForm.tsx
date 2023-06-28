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
import { useState } from "react"

export function ExpenseForm({ closeForm }: { closeForm: () => void }) {
  const [formValues, setFormValues] = useState<{
    concept?: string
    amount?: number
    month?: number
    type?: string
    installments?: number
  }>()

  function save() {
    console.log("save")
  }

  const isSaveDisabled =
    !formValues ||
    !(
      formValues.concept &&
      formValues.amount &&
      formValues.month &&
      formValues.type
    )

  return (
    <form>
      <Flex
        direction="column"
        width={{ base: "100%", lg: "30%" }}
        margin="0 auto"
        gap="12px"
      >
        <FormControl>
          <FormLabel color="teal.800">Concept</FormLabel>
          <Input
            colorScheme="teal"
            placeholder="Concept"
            backgroundColor="white"
            color="teal.700"
            onChange={({ target }) =>
              setFormValues({ ...formValues, concept: target.value })
            }
            _focusVisible={{ borderColor: "#4FD1C5" }}
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
            onChange={(_, value) =>
              setFormValues({ ...formValues, amount: value })
            }
          >
            <NumberInputField _focusVisible={{ borderColor: "#4FD1C5" }} />
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
            onChange={(_, value) =>
              setFormValues({ ...formValues, month: value })
            }
          >
            <NumberInputField _focusVisible={{ borderColor: "#4FD1C5" }} />
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
            onChange={({ target }) =>
              setFormValues({ ...formValues, type: target.value })
            }
            _focusVisible={{ borderColor: "#4FD1C5" }}
          >
            <option value="fixed">Fixed</option>
            <option value="variable">Variable</option>
          </Select>
        </FormControl>
        {formValues?.type === "variable" && (
          <FormControl>
            <FormLabel color="teal.800">Installments</FormLabel>
            <NumberInput
              placeholder="Installments"
              min={2}
              step={1}
              backgroundColor="white"
              color="teal.700"
              onChange={(_, value) =>
                setFormValues({ ...formValues, installments: value })
              }
            >
              <NumberInputField _focusVisible={{ borderColor: "#4FD1C5" }} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        )}
        <Flex gap="4px" marginTop="24px">
          <Button
            w="full"
            colorScheme="teal"
            variant="ghost"
            onClick={closeForm}
          >
            Cancel
          </Button>
          <Button
            w="full"
            colorScheme="teal"
            isDisabled={isSaveDisabled}
            onClick={save}
            _disabled={{
              backgroundColor: "gray.50",
              color: "teal.900",
              _hover: {
                backgroundColor: "gray.50",
                color: "teal.800",
              },
            }}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}
