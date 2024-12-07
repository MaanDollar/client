"use client";

import Contents from "@/components/Contents";
import { MOCK_STOCK_PORTFOLIO, MockStockResponse } from "@/types/Stock";
import { Card } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import PortfolioDetails from "./PortfolioDetails";
import PortfolioSummary from "./PortfolioSummary";

const Page = () => {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalValue, setEditModalValue] =
    useState<MockStockResponse | null>(null);
  const [deleteModalValue, setDeleteModalValue] =
    useState<MockStockResponse | null>(null);
  const portfolio = MOCK_STOCK_PORTFOLIO;

  const handleOnInvalidate = () => {
    router.refresh();
  };

  return (
    <>
      <Contents>
        <div style={{ height: "1rem" }} />
        <Card sx={{ backgroundColor: "white" }}>
          <PortfolioSummary portfolio={portfolio} />
        </Card>
        <div style={{ height: "1rem" }} />
        <PortfolioDetails
          portfolio={portfolio}
          onAddModalOpen={() => setAddModalOpen(true)}
          onEditModalOpen={(stock) => setEditModalValue(stock)}
          onDeleteModalOpen={(stock) => setDeleteModalValue(stock)}
        />
        <div style={{ height: "1rem" }} />
      </Contents>
      <AddModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleOnInvalidate}
      />
      <EditModal
        open={!!editModalValue}
        value={editModalValue}
        onClose={() => setEditModalValue(null)}
        onEdit={handleOnInvalidate}
      />
      <DeleteModal
        open={!!deleteModalValue}
        value={deleteModalValue}
        onClose={() => setDeleteModalValue(null)}
        onDelete={handleOnInvalidate}
      />
    </>
  );
};

export default Page;
