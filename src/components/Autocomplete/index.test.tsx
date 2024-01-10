import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import Autocomplete, { SelectItem } from ".";

const data: SelectItem[] = new Array(2).fill(null).map(() => ({
  label: faker.animal.cat(),
  value: faker.animal.cat(),
}));

test("Autocomplete will be able to select/ deselect item", async () => {
  const user = userEvent.setup();
  render(
    <Autocomplete
      aria-label="autocomplete"
      id="autocomplete"
      items={data}
      data-testid="autocomplete"
      clearButtonProps={{ "aria-label": "Clear button" }}
    />,
  );
  const autocompleteComponent = screen.getByTestId<HTMLInputElement>("autocomplete");
  expect(autocompleteComponent).toBeDefined();
  await user.click(autocompleteComponent);
  const firstItem = data[0];
  const secondItem = data[1];
  const firstOption = screen.getByText(firstItem.label);
  expect(screen.getByText(secondItem.label)).toBeDefined();
  await user.click(firstOption);
  expect(autocompleteComponent.value).toEqual(firstItem.label);
  const clearBtn = screen.getByLabelText<HTMLButtonElement>("Clear button");
  await user.click(clearBtn);
  expect(autocompleteComponent.value).toBe("");
});
