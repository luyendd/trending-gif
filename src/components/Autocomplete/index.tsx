import React from "react";
import { Autocomplete as NextUIAutocomplete, AutocompleteItem, AutocompleteProps } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";

export type SelectItem = { label: string; value: string; isReadOnly?: boolean };

type Props = {
  onClickSelectorIcon?: () => void; // Handle click in search icon
};

// Read more at official docs: https://nextui.org/docs/components/autocomplete
export default function Autocomplete(props: Omit<AutocompleteProps<SelectItem> & Props, "children">) {
  return (
    <NextUIAutocomplete
      allowsCustomValue
      isClearable
      selectorIcon={<SearchIcon onClick={props.onClickSelectorIcon} />}
      disableSelectorIconRotation
      {...props}
    >
      {(item) => (
        <AutocompleteItem
          className="text-black"
          key={item.value}
          isDisabled={item.isReadOnly} // use this to show disabled style in select item
          isReadOnly={item.isReadOnly} // version 2.0.9 documentation recommend use isReadOnly props
        >
          {item.label}
        </AutocompleteItem>
      )}
    </NextUIAutocomplete>
  );
}
