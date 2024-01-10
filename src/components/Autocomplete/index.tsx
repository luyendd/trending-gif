import React, { Ref } from "react";
import { Autocomplete as NextUIAutocomplete, AutocompleteItem, AutocompleteProps } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { IconProps } from "../icons/props";

export type SelectItem = { label: string; value: string; isReadOnly?: boolean };

type Props = {
  searchIconProps?: IconProps;
};

// Read more at official docs: https://nextui.org/docs/components/autocomplete
const AutocompleteWrapper = React.forwardRef(function Autocomplete(
  { searchIconProps, ...props }: Omit<AutocompleteProps<SelectItem> & Props, "children">,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <NextUIAutocomplete
      ref={ref}
      allowsCustomValue
      isClearable
      selectorIcon={<SearchIcon {...searchIconProps} />}
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
});

export default AutocompleteWrapper;
