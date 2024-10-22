import { MockStockResponse } from "@/types/Stock";
import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { ko } from "k-popo";

interface Props {
  open: boolean;
  value: MockStockResponse | null;
  onClose?: () => void;
  onDelete?: (stock: MockStockResponse) => void;
}

const DeleteModal = ({ open, value, onClose, onDelete }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>보유종목 삭제</DialogTitle>
        <DialogContent>{ko`${
          value?.name || ""
        }(을)를 정말로 삭제하시겠습니까?`}</DialogContent>
        <div style={{ height: "1rem" }} />
        <Stack spacing={2} direction="row" justifyContent="stretch">
          <Button onClick={onClose} sx={{ flex: 1 }} variant="outlined">
            취소
          </Button>
          <Button
            onClick={() => {
              onDelete?.(value!);
              onClose?.();
            }}
            sx={{ flex: 1 }}
            color="danger"
          >
            삭제
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteModal;
