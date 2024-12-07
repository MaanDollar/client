/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSite } from "@/contexts/SiteContext";
import { StockTemplateResponse } from "@/types/StockTemplate";
import { Popper } from "@mui/base/Popper";
import {
  Autocomplete,
  AutocompleteOption,
  AutocompleteProps,
  ListItemContent,
  ListSubheader,
  Typography,
} from "@mui/joy";
import AutocompleteListbox from "@mui/joy/AutocompleteListbox";
import { createContext, forwardRef, useContext, useMemo } from "react";
import { FixedSizeList, ListChildComponentProps } from "react-window";

// Code is from:
// https://mui.com/joy-ui/react-autocomplete/#virtualization

const LISTBOX_PADDING = 6; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="li" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const option = dataSet[1] as StockTemplateResponse;

  return (
    <AutocompleteOption {...dataSet[0]} style={inlineStyle}>
      <ListItemContent>
        <Typography sx={{ display: "inline" }}>{option.name}</Typography>{" "}
        <Typography sx={{ display: "inline" }} textColor={"text.tertiary"}>
          {option.code}
        </Typography>
      </ListItemContent>
    </AutocompleteOption>
  );
}

const OuterElementContext = createContext({});

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return (
    <AutocompleteListbox
      {...props}
      {...outerProps}
      component="div"
      ref={ref}
      sx={{
        "& ul": {
          padding: 0,
          margin: 0,
          flexShrink: 0,
        },
      }}
    />
  );
});

OuterElementType.displayName = "OuterElementType";

// Adapter for react-window
const ListboxComponent = forwardRef<
  HTMLDivElement,
  {
    anchorEl: any;
    open: boolean;
    modifiers: any[];
  } & React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, anchorEl, open, modifiers, ...other } = props;
  const itemData: Array<any> = [];
  (
    children as [
      Array<{ children: Array<React.ReactElement<any>> | undefined }>
    ]
  )[0].forEach((item) => {
    if (item) {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  });

  const itemCount = itemData.length;
  const itemSize = 56;

  return (
    <Popper
      ref={ref}
      anchorEl={anchorEl}
      open={open}
      modifiers={modifiers}
      style={{ zIndex: 1300 }}
    >
      <OuterElementContext.Provider value={other}>
        <FixedSizeList
          itemData={itemData}
          height={itemSize * 8}
          width="100%"
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={itemSize}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </FixedSizeList>
      </OuterElementContext.Provider>
    </Popper>
  );
});

interface Props
  extends Omit<
    AutocompleteProps<StockTemplateResponse, false, false, false>,
    "value" | "onChange" | "options"
  > {
  value: StockTemplateResponse | null;
  onChange: (value: StockTemplateResponse | null) => void;
  allowedCodes?: string[];
}

const StockSelect = ({ value, onChange, allowedCodes, ...rest }: Props) => {
  const { stocks } = useSite();
  const options = useMemo(() => {
    if (!allowedCodes) {
      return stocks || [];
    }
    const allowedCodesSet = new Set(allowedCodes || []);
    return (stocks || []).filter((item) => allowedCodesSet.has(item.code));
  }, [allowedCodes, stocks]);

  return (
    <Autocomplete
      required
      disableListWrap
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={options}
      slots={{
        listbox: ListboxComponent,
      }}
      getOptionLabel={(option) => option.name}
      filterOptions={(options, params) => {
        const filtered = options.filter(
          (option) =>
            option.name
              .toLocaleLowerCase()
              .includes(params.inputValue.toLocaleLowerCase()) ||
            option.code
              .toLocaleLowerCase()
              .includes(params.inputValue.toLocaleLowerCase())
        );
        return filtered;
      }}
      renderOption={(props, option) => [props, option] as React.ReactNode}
      // renderOption={(props, option) => (
      //   <AutocompleteOption {...props}>
      //     <ListItemContent>
      //       <Typography sx={{ display: "inline" }}>{option.name}</Typography>{" "}
      //       <Typography sx={{ display: "inline" }} textColor={"text.tertiary"}>
      //         {option.code}
      //       </Typography>
      //     </ListItemContent>
      //   </AutocompleteOption>
      // )}
      {...rest}
    />
  );
};

export default StockSelect;
