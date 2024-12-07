import NumericFormatAdapter from "@/components/NumericFormatAdapter";
import StockSelect from "@/components/StockSelect";
import { ApiResponse } from "@/types/Api";
import { StockTemplateResponse } from "@/types/StockTemplate";
import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
  Typography,
} from "@mui/joy";
import NumberFlow from "@number-flow/react";
import { IconRefresh } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";

type AmountInputMode = "amount" | "total";
type BoughtPriceInputMode = "price" | "totalPrice";

interface Props {
  open: boolean;
  onClose?: () => void;
  onAdd?: () => void;
}

const AddModal = ({ open, onClose, onAdd }: Props) => {
  const [loading, setLoading] = useState(false);

  const [selectedStock, setSelectedStock] =
    useState<StockTemplateResponse | null>(null);
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
      ? Math.round(+amount / selectedStock.close)
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

  const handleOnSubmit = async () => {
    if (!selectedStock || loading) {
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("code", selectedStock.code);
      formData.append("quantity", amountRealInputValue.toString());
      formData.append("price", boughtPriceRealInputValue.toString());

      const { data } = await axios.post<ApiResponse<{ message: "string" }>>(
        "/api/stock/owned/add",
        formData
      );
      if (data.status === "error") {
        throw new Error(data.message);
      }

      onAdd?.();
      onClose?.();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
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
                <StockSelect
                  value={selectedStock}
                  onChange={(newValue) => setSelectedStock(newValue)}
                  size="lg"
                />
                <div style={{ height: "0.5rem" }} />
                <Typography level="body-sm" textColor="text.tertiary">
                  현재가{" "}
                  <NumberFlow
                    value={selectedStock?.close || 0}
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
              <div style={{ flex: 1 }} />
              <Button
                type="submit"
                disabled={!selectedStock || !amount || !boughtPrice || loading}
              >
                추가
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default AddModal;
