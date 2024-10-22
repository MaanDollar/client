import { MockStockInterestResponse } from "@/types/StockInterest";
import {
  MOCK_STOCK_OPTIONS,
  MockStockTemplateResponse,
} from "@/types/StockTemplate";
import {
  Autocomplete,
  AutocompleteOption,
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  ListItemContent,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
  Typography,
} from "@mui/joy";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose?: () => void;
  onAdd?: (stock: MockStockInterestResponse) => void;
}

const AddModal = ({ open, onClose, onAdd }: Props) => {
  const [selectedStock, setSelectedStock] =
    useState<MockStockTemplateResponse | null>(null);

  const handleInit = () => {
    setSelectedStock(null);
  };

  useEffect(() => {
    if (open) {
      handleInit();
    }
  }, [open]);

  const handleOnSubmit = () => {
    if (!selectedStock) {
      return;
    }

    onAdd?.({
      code: selectedStock.code,
      name: selectedStock.name,
      priceCurrent: selectedStock.priceCurrent,
      priceYesterday: Math.round(
        selectedStock.priceCurrent * (0.8 + 0.4 * Math.random())
      ),
      addedAt: new Date().toISOString(),
      color: selectedStock.color,
    });
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>보유 종목 추가</DialogTitle>
          <div style={{ height: "1rem" }} />
          <form
            style={{ flex: 1, minHeight: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
          >
            <Stack spacing={4} minHeight="100%">
              <FormControl>
                <FormLabel>종목명/코드</FormLabel>
                <Autocomplete
                  required
                  value={selectedStock}
                  onChange={(_, newValue) => setSelectedStock(newValue)}
                  options={MOCK_STOCK_OPTIONS}
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
                        <Typography sx={{ display: "inline" }}>
                          {option.name}
                        </Typography>{" "}
                        <Typography
                          sx={{ display: "inline" }}
                          textColor={"text.tertiary"}
                        >
                          {option.code}
                        </Typography>
                      </ListItemContent>
                    </AutocompleteOption>
                  )}
                  size="lg"
                />
                <div style={{ height: "0.5rem" }} />
                <Typography level="body-sm" textColor="text.tertiary">
                  현재가{" "}
                  <NumberFlow
                    value={selectedStock?.priceCurrent || 0}
                    style={{
                      fontFeatureSettings: "'tnum'",
                    }}
                  />
                  원
                </Typography>
              </FormControl>
              <div style={{ flex: 1 }} />
              <Button type="submit">추가</Button>
            </Stack>
          </form>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default AddModal;
