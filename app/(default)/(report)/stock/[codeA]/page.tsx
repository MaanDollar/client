import { MOCK_STOCK_OPTIONS } from "@/types/StockTemplate";
import { notFound, redirect } from "next/navigation";

const Page = ({
  params,
}: {
  params: {
    codeA: string;
  };
}) => {
  const { codeA } = params;
  const mockStockTemplate = MOCK_STOCK_OPTIONS.find(
    (item) => item.code === codeA
  );
  if (!mockStockTemplate) {
    return notFound();
  }
  const mockRelatedFirstStock = MOCK_STOCK_OPTIONS.find(
    (item) => item.code !== codeA
  );
  return redirect(`/stock/${codeA}/${mockRelatedFirstStock?.code}`);
};

export default Page;
