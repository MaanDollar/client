"use client";

import Contents from "@/components/Contents";
import { MOCK_STOCK_PORTFOLIO, MockStockResponse } from "@/types/Stock";
import { Card } from "@mui/joy";
import { useState } from "react";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import PortfolioDetails from "./PortfolioDetails";
import PortfolioSummary from "./PortfolioSummary";

const Page = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalValue, setEditModalValue] =
    useState<MockStockResponse | null>(null);
  const [deleteModalValue, setDeleteModalValue] =
    useState<MockStockResponse | null>(null);
  const [portfolio, setPortfolio] =
    useState<MockStockResponse[]>(MOCK_STOCK_PORTFOLIO);

  const handleOnAdd = (stock: MockStockResponse) => {
    setPortfolio([...portfolio, stock]);
  };

  const handleOnEdit = (stock: MockStockResponse) => {
    setPortfolio(
      portfolio.map((item) => (item.code === stock.code ? stock : item))
    );
  };

  const handleOnDelete = (stock: MockStockResponse) => {
    setPortfolio(portfolio.filter((item) => item.code !== stock.code));
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
        onAdd={handleOnAdd}
      />
      <EditModal
        open={!!editModalValue}
        value={editModalValue}
        onClose={() => setEditModalValue(null)}
        onEdit={(stock) => handleOnEdit(stock)}
      />
      <DeleteModal
        open={!!deleteModalValue}
        value={deleteModalValue}
        onClose={() => setDeleteModalValue(null)}
        onDelete={(stock) => handleOnDelete(stock)}
      />
    </>
  );
};

export default Page;
