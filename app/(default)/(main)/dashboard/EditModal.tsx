import NumericFormatAdapter from "@/components/NumericFormatAdapter";
import { StockOwnedResponseWithData } from "@/types/Stock";
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
import { useCallback, useEffect, useState } from "react";

type AmountInputMode = "amount" | "total";
type BoughtPriceInputMode = "price" | "totalPrice";

interface Props {
  open: boolean;
  value: StockOwnedResponseWithData | null;
  onClose?: () => void;
  onEdit?: (stock: StockOwnedResponseWithData) => void;
}

const EditModal = ({ open, value, onClose, onEdit }: Props) => {
  const [amount, setAmount] = useState<string>("");
  const [boughtPrice, setBoughtPrice] = useState<string>("");
  const [amountInputMode, setAmountInputMode] =
    useState<AmountInputMode>("amount");
  const [boughtPriceInputMode, setBoughtPriceInputMode] =
    useState<BoughtPriceInputMode>("price");
  const amountRealInputValue =
    amountInputMode === "amount"
      ? +amount
      : value
      ? Math.round(+amount / value.priceCurrent)
      : 0;
  const boughtPriceRealInputValue =
    boughtPriceInputMode === "price"
      ? +boughtPrice
      : Math.round(+boughtPrice / Math.max(1, amountRealInputValue));

  const handleInit = useCallback(() => {
    if (!value) return;
    setAmount(value.quantity.toString());
    setBoughtPrice(value.priceBought.toString());
    setAmountInputMode("amount");
    setBoughtPriceInputMode("price");
  }, [value]);

  useEffect(() => {
    if (open) {
      handleInit();
    }
  }, [handleInit, open]);

  const handleOnSubmit = () => {
    if (!value) return;
    onEdit?.({
      ...value,
      quantity: amountRealInputValue,
      priceBought: boughtPriceRealInputValue,
    });
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>보유 종목 수정</DialogTitle>
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
                <FormLabel>종목명</FormLabel>
                <Typography level="title-lg">{value?.name}</Typography>
                <div style={{ height: "0.5rem" }} />
                <Typography level="body-sm" textColor="text.tertiary">
                  현재가{" "}
                  <NumberFlow
                    value={value?.priceCurrent || 0}
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
              <Button type="submit">수정</Button>
            </Stack>
          </form>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default EditModal;
