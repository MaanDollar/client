import { StockInterestedResponseWithData } from "@/types/StockInterest";
import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import axios from "axios";
import { ko } from "k-popo";
import { useState } from "react";

interface Props {
  open: boolean;
  value: StockInterestedResponseWithData | null;
  onClose?: () => void;
  onDelete?: () => void;
}

const DeleteModal = ({ open, value, onClose, onDelete }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleOnDelete = async () => {
    if (!value) return;
    setLoading(true);
    try {
      await axios.post(`/api/stock/recommended/${value.id}/delete`);
      onDelete?.();
      onClose?.();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>관심종목 삭제</DialogTitle>
        <DialogContent>{ko`${
          value?.name || ""
        }(을)를 정말로 삭제하시겠습니까?`}</DialogContent>
        <div style={{ height: "1rem" }} />
        <Stack spacing={2} direction="row" justifyContent="stretch">
          <Button
            onClick={onClose}
            sx={{ flex: 1 }}
            variant="outlined"
            disabled={loading}
          >
            취소
          </Button>
          <Button
            onClick={handleOnDelete}
            sx={{ flex: 1 }}
            color="danger"
            disabled={loading}
          >
            삭제
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteModal;
