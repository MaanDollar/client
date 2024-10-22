"use client";

import Contents from "@/components/Contents";
import { MOCK_STOCK_PORTFOLIO, MockStockResponse } from "@/types/Stock";
import { Divider } from "@mui/joy";
import { useState } from "react";
import AddModal from "./AddModal";
import PortfolioDetails from "./PortfolioDetails";
import ProtfolioSummary from "./PortfolioSummary";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

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
        <ProtfolioSummary portfolio={portfolio} />
        <div style={{ height: "1rem" }} />
        <Divider />
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
