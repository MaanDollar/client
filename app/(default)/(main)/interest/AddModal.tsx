import StockSelect from "@/components/StockSelect";
import { ApiResponse } from "@/types/Api";
import { StockTemplateResponse } from "@/types/StockTemplate";
import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
  Typography,
} from "@mui/joy";
import NumberFlow from "@number-flow/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose?: () => void;
  onAdd?: () => void;
}

const AddModal = ({ open, onClose, onAdd }: Props) => {
  const [loading, setLoading] = useState(false);

  const [selectedStock, setSelectedStock] =
    useState<StockTemplateResponse | null>(null);

  const handleInit = () => {
    setSelectedStock(null);
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

      const { data } = await axios.post<ApiResponse<{ message: "string" }>>(
        "/api/stock/recommended/add",
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
              <div style={{ flex: 1 }} />
              <Button type="submit" disabled={!selectedStock}>
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
