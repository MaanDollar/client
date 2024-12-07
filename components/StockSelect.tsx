import { useSite } from "@/contexts/SiteContext";
import { StockTemplateResponse } from "@/types/StockTemplate";
import {
  Autocomplete,
  AutocompleteOption,
  AutocompleteProps,
  ListItemContent,
  Typography,
} from "@mui/joy";
import { useMemo } from "react";

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
