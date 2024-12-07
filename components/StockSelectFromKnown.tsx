import { useSite } from "@/contexts/SiteContext";
import { MOCK_STOCK_PORTFOLIO } from "@/types/Stock";
import { MOCK_STOCK_INTEREST_LIST } from "@/types/StockInterest";
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
    "value" | "onChange" | "options" | "groupBy"
  > {
  value: StockTemplateResponse | null;
  onChange: (value: StockTemplateResponse | null) => void;
}

const StockSelectFromKnown = ({ value, onChange, ...rest }: Props) => {
  const { stocks } = useSite();
  const options = useMemo(() => {
    const portfolio = MOCK_STOCK_PORTFOLIO.map((item) => item.code);
    const interest = MOCK_STOCK_INTEREST_LIST.map((item) => item.code);
    const portfolioSet = new Set(portfolio);
    const interestSet = new Set(interest);

    return [
      ...(stocks || [])
        .filter((item) => portfolioSet.has(item.code))
        .map((item) => ({ ...item, type: "portfolio" })),
      ...(stocks || [])
        .filter((item) => interestSet.has(item.code))
        .map((item) => ({ ...item, type: "interest" })),
    ];
  }, [stocks]);

  return (
    <Autocomplete
      required
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={options}
      groupBy={(option) => {
        if (!("type" in option)) return "";
        if (option.type === "portfolio") return "보유종목";
        if (option.type === "interest") return "관심종목";
        return "";
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

export default StockSelectFromKnown;
