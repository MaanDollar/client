import { listAllStocks } from "@/api/stock";
import { notFound, redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: {
    codeA: string;
  };
}) => {
  const stocks = await listAllStocks();
  if (!stocks) {
    return notFound();
  }

  const { codeA } = params;
  const mockStockTemplate = stocks.find((item) => item.code === codeA);
  if (!mockStockTemplate) {
    return notFound();
  }
  const mockRelatedFirstStock = stocks.find((item) => item.code !== codeA);
  return redirect(`/stock/${codeA}/${mockRelatedFirstStock?.code}`);
};

export default Page;
