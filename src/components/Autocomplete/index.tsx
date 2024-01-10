import React, { Ref } from "react";
import { Autocomplete as NextUIAutocomplete, AutocompleteItem, AutocompleteProps } from "@nextui-org/react";

import { IconProps } from "../icons/props";
import { SearchIcon } from "../icons/SearchIcon";

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
      selectorIcon={<SearchIcon {...searchIconProps} />}
      allowsCustomValue
      disableSelectorIconRotation
      isClearable
      {...props}
    >
      {(item) => (
        <AutocompleteItem
          className="text-black"
          isDisabled={item.isReadOnly} // use this to show disabled style in select item
          isReadOnly={item.isReadOnly} // version 2.0.9 documentation recommend use isReadOnly props
          key={item.value}
        >
          {item.label}
        </AutocompleteItem>
      )}
    </NextUIAutocomplete>
  );
});

export default AutocompleteWrapper;
