"use client";

import Contents from "@/components/Contents";
import { useSite } from "@/contexts/SiteContext";
import { StockInterestedResponseWithData } from "@/types/StockInterest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import InterestDetails from "./InterestDetails";

const Page = () => {
  const router = useRouter();
  const { interest } = useSite();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalValue, setDeleteModalValue] =
    useState<StockInterestedResponseWithData | null>(null);

  const handleOnInvalidate = () => {
    router.refresh();
  };

  return (
    <>
      <Contents>
        <div style={{ height: "1rem" }} />
        {interest && (
          <InterestDetails
            interest={interest}
            onAddModalOpen={() => setAddModalOpen(true)}
            onDeleteModalOpen={(stock) => setDeleteModalValue(stock)}
          />
        )}
        <div style={{ height: "1rem" }} />
      </Contents>
      <AddModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleOnInvalidate}
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
