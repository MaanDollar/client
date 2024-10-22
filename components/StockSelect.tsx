import {
  MOCK_STOCK_OPTIONS,
  MockStockTemplateResponse,
} from "@/types/StockTemplate";
import {
  Autocomplete,
  Typography,
  AutocompleteOption,
  ListItemContent,
  AutocompleteProps,
} from "@mui/joy";
import { useMemo } from "react";

interface Props
  extends Omit<
    AutocompleteProps<MockStockTemplateResponse, false, false, false>,
    "value" | "onChange" | "options"
  > {
  value: MockStockTemplateResponse | null;
  onChange: (value: MockStockTemplateResponse | null) => void;
  allowedCodes?: string[];
}

const StockSelect = ({ value, onChange, allowedCodes, ...rest }: Props) => {
  const options = useMemo(() => {
    if (!allowedCodes) {
      return MOCK_STOCK_OPTIONS;
    }
    const allowedCodesSet = new Set(allowedCodes || []);
    return MOCK_STOCK_OPTIONS.filter((item) => allowedCodesSet.has(item.code));
  }, [allowedCodes]);

  return (
    <Autocomplete
      required
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={options}
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
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          <ListItemContent>
            <Typography sx={{ display: "inline" }}>{option.name}</Typography>{" "}
            <Typography sx={{ display: "inline" }} textColor={"text.tertiary"}>
              {option.code}
            </Typography>
          </ListItemContent>
        </AutocompleteOption>
      )}
      {...rest}
    />
  );
};

export default StockSelect;
