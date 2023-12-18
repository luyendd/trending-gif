import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Autocomplete from ".";

const data = [
  {
    label: "test",
    value: "test",
  },
];

test("Autocomplete will be able to select item", async () => {
  const user = userEvent.setup();
  const { getByText } = render(
    <Autocomplete aria-label="test" id="test" items={data} placeholder="test placeholder" />,
  );
  const autocompleteComponent = screen.getByPlaceholderText("test placeholder");
  expect(autocompleteComponent).toBeDefined();
  await user.click(autocompleteComponent);
  const testItem = getByText("test");
  expect(testItem).toBeDefined();
  await user.click(testItem);
  expect(getByText("test")).toBeDefined();
});
