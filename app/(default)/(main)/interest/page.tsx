"use client";

import Contents from "@/components/Contents";
import {
  MOCK_STOCK_INTEREST_LIST,
  MockStockInterestResponse,
} from "@/types/StockInterest";
import { useState } from "react";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import InterestDetails from "./InterestDetails";

const Page = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalValue, setDeleteModalValue] =
    useState<MockStockInterestResponse | null>(null);
  const [interestList, setInterestList] = useState<MockStockInterestResponse[]>(
    MOCK_STOCK_INTEREST_LIST
  );

  const handleOnAdd = (stock: MockStockInterestResponse) => {
    setInterestList([...interestList, stock]);
  };

  const handleOnDelete = (stock: MockStockInterestResponse) => {
    setInterestList(interestList.filter((item) => item.code !== stock.code));
  };

  return (
    <>
      <Contents>
        <div style={{ height: "1rem" }} />
        <InterestDetails
          interest={interestList}
          onAddModalOpen={() => setAddModalOpen(true)}
          onDeleteModalOpen={(stock) => setDeleteModalValue(stock)}
        />
        <div style={{ height: "1rem" }} />
      </Contents>
      <AddModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleOnAdd}
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
