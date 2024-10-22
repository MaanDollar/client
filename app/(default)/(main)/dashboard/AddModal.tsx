import NumericFormatAdapter from "@/components/NumericFormatAdapter";
import { MockStockResponse } from "@/types/Stock";
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
  Input,
  ListItemContent,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
  Typography,
} from "@mui/joy";
import NumberFlow from "@number-flow/react";
import { IconRefresh } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type AmountInputMode = "amount" | "total";
type BoughtPriceInputMode = "price" | "totalPrice";

interface Props {
  open: boolean;
  onClose?: () => void;
  onAdd?: (stock: MockStockResponse) => void;
}

const AddModal = ({ open, onClose, onAdd }: Props) => {
  const [selectedStock, setSelectedStock] =
    useState<MockStockTemplateResponse | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [boughtPrice, setBoughtPrice] = useState<string>("");
  const [amountInputMode, setAmountInputMode] =
    useState<AmountInputMode>("amount");
  const [boughtPriceInputMode, setBoughtPriceInputMode] =
    useState<BoughtPriceInputMode>("price");
  const amountRealInputValue =
    amountInputMode === "amount"
      ? +amount
      : selectedStock
      ? Math.round(+amount / selectedStock.priceCurrent)
      : 0;
  const boughtPriceRealInputValue =
    boughtPriceInputMode === "price"
      ? +boughtPrice
      : selectedStock
      ? Math.round(+boughtPrice / Math.max(1, amountRealInputValue))
      : 0;

  const handleInit = () => {
    setSelectedStock(null);
    setAmount("");
    setBoughtPrice("");
    setAmountInputMode("amount");
    setBoughtPriceInputMode("price");
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
      amount: amountRealInputValue,
      priceBought: boughtPriceRealInputValue,
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
              <FormControl>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormLabel sx={{ alignSelf: "unset" }}>
                    {amountInputMode === "amount" ? "보유 수량" : "보유 금액"}
                  </FormLabel>
                  <Button
                    startDecorator={<IconRefresh />}
                    onClick={() => {
                      setAmountInputMode(
                        amountInputMode === "amount" ? "total" : "amount"
                      );
                    }}
                    variant="plain"
                  >
                    {amountInputMode === "amount" ? "금액" : "수량"}으로 입력
                  </Button>
                </Stack>
                <Input
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  sx={{ width: "100%" }}
                  size="lg"
                  startDecorator={
                    amountInputMode === "amount" ? undefined : "₩"
                  }
                  endDecorator={amountInputMode === "amount" ? "주" : "원"}
                  slotProps={{
                    input: {
                      component: NumericFormatAdapter,
                    },
                  }}
                />
                {amountInputMode === "total" && (
                  <>
                    <div style={{ height: "0.5rem" }} />
                    <Typography level="body-sm" textColor="text.tertiary">
                      <NumberFlow
                        value={amountRealInputValue}
                        style={{
                          fontFeatureSettings: "'tnum'",
                        }}
                      />
                      주
                    </Typography>
                  </>
                )}
              </FormControl>
              <FormControl>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <FormLabel sx={{ alignSelf: "unset" }}>
                    {boughtPriceInputMode === "price"
                      ? "매입 시 단가"
                      : "매입 시 총 금액"}
                  </FormLabel>
                  <Button
                    startDecorator={<IconRefresh />}
                    onClick={() => {
                      setBoughtPriceInputMode(
                        boughtPriceInputMode === "price"
                          ? "totalPrice"
                          : "price"
                      );
                    }}
                    variant="plain"
                  >
                    {boughtPriceInputMode === "price"
                      ? "총 금액으로"
                      : "단가로"}{" "}
                    입력
                  </Button>
                </Stack>
                <Input
                  required
                  value={boughtPrice}
                  onChange={(e) => setBoughtPrice(e.target.value)}
                  placeholder="0"
                  sx={{ width: "100%" }}
                  size="lg"
                  startDecorator={
                    boughtPriceInputMode === "price" ? "주당 ₩" : "총 ₩"
                  }
                  endDecorator="원"
                  slotProps={{
                    input: {
                      component: NumericFormatAdapter,
                    },
                  }}
                />
                {boughtPriceInputMode === "totalPrice" && (
                  <>
                    <div style={{ height: "0.5rem" }} />
                    <Typography level="body-sm" textColor="text.tertiary">
                      주당{" "}
                      <NumberFlow
                        value={boughtPriceRealInputValue}
                        style={{
                          fontFeatureSettings: "'tnum'",
                        }}
                      />
                      원
                    </Typography>
                  </>
                )}
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
